import { IFormValues, IOrder } from "@/interfaces";
import { Card, Form, Input, Table, TableColumnsType } from "antd";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";

interface IFormDetailOrder {
    record: IFormValues | undefined;
}

const FormDetailOrder: React.FC<IFormDetailOrder> = ({ record }) => {
    const [form] = Form.useForm();

    const initialValues = useMemo(() => {
        return {
            full_name: record?.full_name,
            email: record?.email,
            phone: record?.phone,
            address: record?.address,
            total: record?.total,
            shippingMethod: record?.shippingMethod,
            paymentMethod: record?.paymentMethod,
            orderCode: record?.orderCode,
            order: record?.order,
            timestamp: format(new Date(record?.timestamp ?? new Date()), 'yyyy-MM-dd HH:mm:ss'),
        }
    }, [record])

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [record, form, initialValues])

    const columns: TableColumnsType<IOrder> = [
        {
            title: 'Ảnh',
            dataIndex: 'product',
            key: 'src',
            render: (product) => <Image src={product.src} alt="Product" width={50} height={50} />,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (product) => <p>{product.name}</p>,
        },
        {
            title: 'Giá',
            dataIndex: 'product',
            key: 'price',
            render: (product) => <p>{product.priceSale > 0 ? product.priceSale : product.price}</p>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tổng',
            key: 'total',
            render: (_, record) => <p>{(record.product.priceSale > 0 ? record.product.priceSale : record.product.price) * record.quantity}</p>,
        },
    ];

    return (
        <div>
            <Form
                layout='vertical'
                form={form}
                initialValues={initialValues}
            >
                <Form.Item
                    name="orderCode"
                    label="Mã order"
                    style={{ display: 'inline-block', width: '100%' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="full_name"
                    label="Tên người đặt"
                    style={{ display: 'inline-block', width: '100%' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="total"
                    label="Tổng đơn hàng (10% VAT)"
                    style={{ display: 'inline-block', width: '100%' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="shippingMethod"
                    label="Phương thức vận chuyển"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="paymentMethod"
                    label="Phương thức thanh toán"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name='timestamp'
                    label="Thời gian đặt hàng"
                    style={{ display: 'inline-block', width: '100%' }}
                >
                    <Input disabled />
                </Form.Item>
            </Form>

            <Card title="Đơn hàng">
                <Table dataSource={record?.order} columns={columns}
                />
            </Card>
        </div>
    )
}

export default FormDetailOrder