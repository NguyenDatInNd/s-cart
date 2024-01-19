'use client'

import React, { useState } from 'react';
import { Form, Input, Space, Table, Button, Select, Row, Col, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GiShoppingBag } from "react-icons/gi";
import Image from "next/image"
import BreadcrumbApp from '@/components/breadcrumb/BreadcrumbApp';
import { GoPersonFill } from "react-icons/go";
import { FaPhone, FaEarthAmericas } from "react-icons/fa6";
import { BsBodyText } from "react-icons/bs";
import { CloseCircleFilled, MailFilled } from '@ant-design/icons';
import { TbNotes } from "react-icons/tb";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { countries } from '@/components/country';
import { IFormValues, IOrder, RenderProps } from '@/interfaces';
import { useStoreCart } from '@/store/storeCart';
import { useStoreFormInfor } from '@/store/storeFormInfor';
import { useRouter } from 'next/navigation'

const Checkout: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter()

    const onFinish = (values: IFormValues) => {
        const formValues = { ...values, total: total, appliedCoupon: appliedCoupon }
        setFormValues(formValues);
        router.push('/checkout-confirm')
    };

    const { order } = useStoreCart();
    const { setFormValues } = useStoreFormInfor();
    const [couponCode, setCouponCode] = useState<string>('');
    const [appliedCoupon, setAppliedCoupon] = useState<number>(0);

    const total = order.products.reduce((total, item) => total + (item.product.priceSale > 0 ? item.product.priceSale : item.product.price) * item.quantity, 0);
    const tax = (total * 0.1)
    const totalAll = (total + tax - appliedCoupon).toFixed(2);

    const handleApplyCoupon = () => {
        if (couponCode === 'ABC') {
            setAppliedCoupon(100);
            setCouponCode('');
        } else {

        }
    };

    const columns: ColumnsType<IOrder> = [
        {
            title: 'No.',
            key: 'order',
            render: (text, record, index) => <p>{index + 1}</p>,
        },
        {
            title: 'Name',
            dataIndex: 'product',
            key: 'product',
            render: ({ name, code, src, selectedOptions }: RenderProps) => (
                <>
                    <div className='flex gap-4 mb-3'>
                        <Image src={src} width={100} height={80} alt={name} />
                        <p className="subtext-footer capitalize text-base">{name}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-base uppercase'>SKU: {code}</p>
                        <div>
                            {Object.entries(selectedOptions).map(([attributeName, option]) => (
                                <p key={attributeName}>{`${attributeName}: ${option.name} (+$${option.price})`}</p>
                            ))}
                        </div>
                    </div>
                </>

            )
        },
        {
            title: 'Price',
            children: [
                {
                    title: 'Price',
                    dataIndex: 'product',
                    key: 'price',
                    render: ({ priceSale, price }) => <p className={`text-sm ${priceSale > 0 ? "text-[#15151580] font-extralight line-through" : 'text-[#d9a1a3]'} `}>{price}</p>,
                    width: 100,
                },
                {
                    title: 'Price Sale',
                    dataIndex: 'product',
                    key: 'priceSale',
                    render: ({ priceSale }) => <p className='text-[#d9a1a3] text-sm'>{priceSale > 0 && priceSale}</p>,
                    width: 100,
                },
            ],
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
            render: (quantity) => <p className='text-sm'>{quantity}</p>
        },
        {
            title: 'Subtotal',
            key: 'total',
            render: (_, record) => {
                const { quantity, product } = record;
                const subtotal = (product.priceSale > 0 ? product.priceSale : product.price) * quantity;
                return (
                    <Space className='w-full flex justify-between' size='large' direction='horizontal'>
                        <p className='ml-3'>${subtotal}</p>
                    </Space>
                );
            },
            width: 200,
        },
    ];

    return (
        <>
            <BreadcrumbApp />

            <div className='px-[285px] py-28 bg-white' >
                <div className="text-xl flex items-center gap-3 mb-5">
                    <GiShoppingBag /> Demo S-Cart : Free Laravel eCommerce
                </div>
                <Table bordered columns={columns} dataSource={order.products} pagination={false} />

                <div className='mt-14'>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout='vertical'
                        requiredMark={false}
                    >
                        <div className='flex gap-10'>
                            <div className='flex flex-col w-1/2'>
                                <Space direction='horizontal'>
                                    <Form.Item
                                        name="first_name"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                        label={<p className='flex items-center gap-1'><GoPersonFill /> First name</p>}
                                    >
                                        <Input placeholder='First name' />
                                    </Form.Item>

                                    <Form.Item
                                        name="last_name"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                                        label={<p className='flex items-center gap-1'><GoPersonFill /> Last name</p>}
                                    >
                                        <Input placeholder='Last name' />
                                    </Form.Item>
                                </Space>

                                <Space direction='horizontal'>
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
                                        label={<p className='flex items-center gap-1'><MailFilled /> Email</p>}
                                    >
                                        <Input type='email' placeholder='Email' />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!', min: 10, max: 10 }]}
                                        label={<p className='flex items-center gap-1'><FaPhone /> Phone</p>}
                                    >
                                        <Input placeholder='Phone' />
                                    </Form.Item>
                                </Space>

                                <Form.Item
                                    name="country"
                                    rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}
                                    label={<p className='flex items-center gap-1'><FaEarthAmericas /> Country</p>}
                                >
                                    <Select
                                        placeholder='Choose your country'
                                        style={{ width: 370 }}
                                    >
                                        {countries.map((country) => (
                                            <Select.Option key={country.code} value={country.label}>
                                                {country.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                    label={<p className='flex items-center gap-1'><BsBodyText />Address</p>}
                                >
                                    <Input style={{ width: 370 }} placeholder='Address...' />
                                </Form.Item>

                                <Form.Item
                                    name="note"
                                    label={<p className='flex items-center gap-1'><TbNotes />Note</p>}
                                >
                                    <Input.TextArea rows={3} style={{ width: 370 }} placeholder='Note...' />
                                </Form.Item>
                            </div>

                            <div className='w-full ml-40 mt-20'>
                                <Row className='text-sm content-start'>
                                    <Col className='w-full h-12 flex pl-3 items-center justify-start border border-gray-300' span={17}>SubTotal</Col>
                                    <Col className='w-full h-12 flex pr-3 border-l-0 items-center justify-end border border-gray-300' span={7}>${total.toFixed(2)}</Col>

                                    <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={17}>Tax</Col>
                                    <Col className='w-full h-12 flex pr-3 border-l-0 border-t-0  items-center justify-end border border-gray-300' span={7}>${tax.toFixed(2)}</Col>

                                    {appliedCoupon > 0 && <>
                                        <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={17}>Coupon/Discount</Col>
                                        <Col className='w-full h-12 flex pr-3 border-l-0 border-t-0  items-center justify-end border border-gray-300' span={7}>${appliedCoupon.toFixed(2)}</Col>
                                    </>}

                                    <Col className='w-full h-12 bg-[#f5f3f3] flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={17}>Total</Col>
                                    <Col className='w-full h-12 bg-[#f5f3f3] flex pr-3 border-l-0 border-t-0  items-center justify-end border border-gray-300' span={7}>${totalAll}</Col>
                                </Row>

                                <div className='flex flex-col gap-1 mt-12'>
                                    <div className='flex gap-2 text-base items-center'>
                                        <p className='flex gap-1 items-center text-[#777777]'><RiCoupon3Fill /> Coupon</p>
                                        {appliedCoupon > 0 &&
                                            <p
                                                onClick={() => {
                                                    setCouponCode('')
                                                    setAppliedCoupon(0)
                                                }}
                                                className='text-sm text-[#f95a5a] italic cursor-pointer'>(Remove coupon <CloseCircleFilled />)</p>}
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Input
                                            className='flex-1 h-8'
                                            placeholder='Coupon code'
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />

                                        <Button className='w-32 h-full uppercase text-center rounded-none' onClick={handleApplyCoupon}>
                                            Apply
                                        </Button>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-16 mt-16'>
                                    <Form.Item name="shippingMethod"
                                        rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển!' }]}
                                    >
                                        <div>
                                            <p className='text-3xl uppercase flex gap-3 items-center mb-3'><FaShippingFast />shipping method</p>
                                            <Radio.Group>
                                                <Radio name='standard' value='standard' className='text-base text-[#9b9b9b]'> Shipping Standard</Radio>
                                                <Radio name='express' value='express' className='text-base text-[#9b9b9b]'> Shipping Express</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Form.Item>

                                    <div className='flex flex-col'>
                                        <p className='text-3xl uppercase flex gap-3 items-center mb-3'><MdOutlinePayment />payment method</p>
                                        <Form.Item name="paymentMethod"
                                            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                                        >
                                            <Radio.Group>
                                                <Radio name='cash' value='cash' className='text-base'>
                                                    <Image src='/banner/cash.png' width={200} height={80} alt='cash-method' />
                                                </Radio>
                                                <Radio name='transfer' value='transfer' className='text-base'>
                                                    <Image src='/banner/bank.png' width={200} height={80} alt='transfer-method' />
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <Form.Item>
                            <div className='flex justify-end'>
                                <Button htmlType="submit" className='h-16 w-44 bg-[#e9da5d] text-black uppercase text-base flex justify-center items-center btn-add-to-cart mt-5'>checkout
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>


            </div >
        </ >
    )
}

export default Checkout