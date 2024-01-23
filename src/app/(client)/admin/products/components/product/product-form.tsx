"use client";

import useFileUpload from "@/hooks/useFileUpload";
import { ICategory, IProduct } from "@/interfaces";
import useStoreShop from "@/store/storeShop";
import { CloseOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Switch, Upload } from "antd";
import Image from "next/image";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export interface ProductFormValues {
    name?: string;
    code?: string;
    category?: string;
    amount?: number;
    price?: number;
    priceSale?: number;
    attributes?: string;
    description?: string;
    outstanding?: boolean;
    src?: string;
    status?: boolean;
}

interface Props {
    handleClose: () => void;
    onFinish: (values: ProductFormValues) => void;
    initialValues: ProductFormValues;
}

const ProductForm: React.FC<Props> = ({
    handleClose,
    onFinish,
    initialValues,
}) => {
    const [form] = Form.useForm();
    const { category, fetchCategory } = useStoreShop();
    const { previewUrl, image, handleUpload } = useFileUpload(
        "products",
        initialValues as IProduct
    );

    useEffect(() => {
        if (initialValues?.name) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const options = category.map((item) => ({
        label: item.name,
        value: item.name,
    }));

    console.log("initialValues ==>>", initialValues)

    return (
        <div>
            <Form
                form={form}
                onFinish={(values) => onFinish(
                    {
                        ...values,
                        src: image,
                        status: values.status ?? true,
                        amount: Number(values.amount),
                        price: Number(values.price),
                        outstanding: values.outstanding ?? false,
                        priceSale: (Array.isArray(values.priceSale) && values.priceSale.length > 0)
                            ? Number(values.priceSale[0]) || 0 : 0,
                        attributes: values.attributes || [],
                        timestamp: values.timestamp || Date.now(),
                        id: values.id || uuid(),
                    }
                )}
                layout="vertical"
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
                        <Upload
                            onChange={handleUpload}
                            showUploadList={false}
                            multiple={false}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    {(previewUrl || initialValues?.src) && (
                        <Image
                            src={previewUrl || (initialValues?.src as string)}
                            alt="Preview"
                            width={250}
                            height={200}
                        />
                    )}
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
                        }}
                        className="mr-5"
                    >
                        Hủy
                    </Button>

                    <Button type="primary" htmlType="submit">
                        {initialValues?.src ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductForm;
