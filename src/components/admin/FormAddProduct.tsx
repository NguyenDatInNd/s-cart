import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Switch } from "antd"
import { db, storage } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Image from "next/image";
import useNotification from "@/hooks/useNotification";
import useStoreShop from "@/store/storeShop";
import useFileUpload from "@/hooks/useFileUpload";

interface IFormAddProduct {
    handleClose: () => void;
}

const FormAddProduct: React.FC<IFormAddProduct> = ({ handleClose }) => {
    const [form] = Form.useForm();
    const { category, fetchCategory, docProductsRef } = useStoreShop();
    const { previewUrl, image, handleUpload, setPreviewUrl } = useFileUpload('products', undefined);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const showNotification = useNotification();

    const addProduct = async (product: any) => {
        try {
            await addDoc(docProductsRef, product);
            showNotification('success', 'Add new product successfully', `Added ${product.name} to shop`);
        } catch (error) {
            console.log(error);
            showNotification('error', 'Add new product failed', `${error}`);
        }
    }

    const options = category.map((item) => ({
        label: item.name,
        value: item.name,
    }));

    const onFinish = (values: any) => {
        const newProduct = {
            ...values,
            src: image,
            status: true,
            amount: Number(values.amount),
            price: Number(values.price),
            outstanding: values.outstanding ?? false,
            priceSale: Array.isArray(values.priceSale) ? Number(values.priceSale[0]) ?? 0 : 0,
            attributes: values.attributes || [],
            timestamp: Date.now(),
        };

        addProduct(newProduct);
        handleClose();
        form.resetFields();
        setPreviewUrl('');
    };

    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'
                requiredMark={false}
            >
                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input placeholder='Nhập tên sản phẩm' />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[{ required: true, message: 'Vui lòng nhập code!' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input placeholder='Nhập code' />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Danh mục sản phẩm"
                    rules={[{ required: true, message: 'Vui lòng nhập danh mục sản phẩm!' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Select options={options} placeholder='Chọn danh mục sản phẩm' />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Số lượng"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input type='number' placeholder='Nhập số lượng' />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input placeholder='Nhập giá sản phẩm' />
                </Form.Item>

                <Form.List name="priceSale" >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Form.Item
                                    label='Giá khuyến mãi'
                                    key={field.key}
                                    required={false}
                                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                >
                                    <Form.Item
                                        {...field}
                                        rules={[{ required: true, message: 'Vui lòng nhập giá khuyến mãi sản phẩm!' }]}
                                        noStyle
                                    >
                                        <Input placeholder='Nhập giá khuyến mãi' className="w-[80%]" />
                                    </Form.Item>
                                    {fields.length > 0 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            {fields.length === 0 && (
                                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                                    <Button
                                        className="w-[90%] mt-[30px]"
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm giá khuyến mãi
                                    </Button>
                                </Form.Item>
                            )}
                        </>
                    )}
                </Form.List>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                    style={{ display: 'inline-block', width: 'calc(100% - 8px)' }}
                >
                    <Input.TextArea placeholder='Nhập mô tả sản phẩm' />
                </Form.Item>

                <Space size='small' className="mb-5">
                    <Form.Item
                        name="src"
                        label="Ảnh sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm!' }]}
                        style={{ display: 'inline-block', width: '90%' }}
                    >
                        <Input type="file" onChange={handleUpload} value={image} />
                    </Form.Item>

                    {previewUrl &&
                        <Image src={previewUrl} alt="Preview" width={250} height={200} />
                    }
                </Space>

                <Form.Item
                    name='outstanding'
                    label='Sản phẩm nổi bật'
                >
                    <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked={false} />
                </Form.Item>

                <Form.List name="attributes">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 5, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    size="small"
                                    title={`Thuộc tính ${field.name + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item label="Tên" name={[field.name, 'name']}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item label="Options">
                                        <Form.List name={[field.name, 'options']}>
                                            {(subFields, subOpt) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
                                                    {subFields.map((subField) => (
                                                        <Space size='small' key={subField.key}>
                                                            <Form.Item noStyle name={[subField.name, 'name']}>
                                                                <Input placeholder="Nhập tên thuộc tính" />
                                                            </Form.Item>
                                                            <Form.Item noStyle name={[subField.name, 'price']}>
                                                                <Input placeholder="Nhập giá" />
                                                            </Form.Item>
                                                            <CloseOutlined
                                                                onClick={() => {
                                                                    subOpt.remove(subField.name);
                                                                }}
                                                            />
                                                        </Space>
                                                    ))}
                                                    <Button type="dashed" onClick={() => subOpt.add()} block>
                                                        + Add Sub Item
                                                    </Button>
                                                </div>
                                            )}
                                        </Form.List>
                                    </Form.Item>
                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Thêm thuộc tính sản phẩm
                            </Button>
                        </div>
                    )}
                </Form.List>

                <Form.Item className="mt-7 flex justify-end">
                    <Button
                        onClick={() => {
                            handleClose();
                            form.resetFields();
                            setPreviewUrl('');
                        }}
                        className="mr-5">
                        Hủy
                    </Button>

                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormAddProduct