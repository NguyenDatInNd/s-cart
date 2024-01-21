import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Switch } from "antd"
import { db } from "@/firebase/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useNotification from "@/hooks/useNotification";
import useStoreShop from "@/store/storeShop";
import { IProduct } from "@/interfaces";
import useFileUpload from "@/hooks/useFileUpload";

interface IFormEditProduct {
    handleClose: () => void;
    record: IProduct | undefined;
}

const FormEditProduct: React.FC<IFormEditProduct> = ({ record, handleClose }) => {
    const [form] = Form.useForm();
    const { category, fetchCategory } = useStoreShop();
    const { previewUrl, image, handleUpload, setPreviewUrl } = useFileUpload('products', record);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const options = category.map((item) => ({
        label: item.name,
        value: item.name,
    }));

    const initialValues = useMemo(() => {
        return {
            name: record?.name,
            code: record?.code,
            category: record?.category ?? '',
            amount: record?.amount,
            price: record?.price,
            priceSale: record?.priceSale !== 0 ? [record?.priceSale] : [],
            description: record?.description,
            outstanding: record?.outstanding,
            attributes: record?.attributes,
            status: record?.status,
        }
    }, [record])

    useEffect(() => {
        form.setFieldsValue(initialValues)
        setPreviewUrl(record?.src);
    }, [record, form, initialValues, setPreviewUrl])

    const showNotification = useNotification();
    const [documentID, setDocumentID] = useState<string[]>([]);

    useEffect(() => {
        const getDocumentIDByCode = async (record: any) => {
            const collectionRef = collection(db, 'products');
            const q = query(collectionRef, where('code', '==', record?.code));

            try {
                const querySnapshot = await getDocs(q);
                const documentID = querySnapshot.docs.map((doc) => doc.id);
                setDocumentID(documentID);
            } catch (error) {
                console.error('Error getting document IDs:', error);
            }
        };

        getDocumentIDByCode(record);
    }, [record])


    const updateProduct = async (product: any) => {
        try {
            const documentRef = doc(db, 'products', documentID[0]);
            await updateDoc(documentRef, product);
            showNotification('success', 'Updated this product successfully', `Updated ${product.name} to shop`);
        } catch (error) {
            console.log(error);
            showNotification('error', 'Updated this product failed', `${error}`);
        }
    }

    const onFinish = (values: any) => {
        const newProduct = {
            ...values,
            src: image,
            status: values.status,
            amount: Number(values.amount),
            price: Number(values.price),
            outstanding: values.outstanding ?? false,
            priceSale: Array.isArray(values.priceSale) && values.priceSale.length > 0
                ? Number(values.priceSale[0]) || 0
                : 0,
            attributes: values.attributes || [],
        };

        updateProduct(newProduct);
        handleClose();
        form.resetFields();
        setPreviewUrl('');
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
            requiredMark={false}
            initialValues={initialValues}
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
                <Input placeholder='Nhập số lượng' />
            </Form.Item>

            <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <Input placeholder='Nhập giá sản phẩm' />
            </Form.Item>

            <Form.List name="priceSale"
                initialValue={initialValues.priceSale}
            >
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
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Form.Item>

            <Form.Item
                name='status'
                label='Trạng thái sản phẩm'
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Form.Item>

            <Form.List name="attributes"
                initialValue={initialValues.attributes}
            >
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
                    Cập nhật sản phẩm
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormEditProduct