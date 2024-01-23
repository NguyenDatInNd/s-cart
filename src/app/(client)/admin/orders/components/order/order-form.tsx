"use client";

import useFileUpload from "@/hooks/useFileUpload";
import { IFormValues, IOrder } from "@/interfaces";
import { Button, Card, Form, Input, Space, Table, TableColumnsType, Upload } from "antd";
import Image from "next/image";
import { useEffect } from "react";

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

export interface OrderFormValues {
    orderCode: string;
    full_name: string;
    email: string;
    phone: string;
    country: string;
    note: string;
    order?: IOrder[];
    address: string;
    appliedCoupon: number;
    timestamp?: number;
    total: number;
    shippingMethod: string;
    paymentMethod: string;
    status: boolean;
    id: string;
    first_name: string;
    last_name: string;
}

interface Props { initialValues: OrderFormValues }

const OrderForm: React.FC<Props> = ({ initialValues }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues?.id) {
            form.setFieldsValue(initialValues);
        }
    }, [form, initialValues]);

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
                <Table dataSource={initialValues.order} columns={columns}
                />
            </Card>
        </div>
    );
};

export default OrderForm;
