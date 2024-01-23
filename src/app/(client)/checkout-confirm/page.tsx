'use client'

import React, { useState } from 'react';
import { Space, Table, Row, Col, Button, Modal, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { GiShoppingBag } from "react-icons/gi";
import Image from "next/image"
import BreadcrumbApp from '@/components/breadcrumb/BreadcrumbApp';
import { IOrder, RenderProps } from '@/interfaces';
import { useStoreCart } from '@/store/storeCart';
import { useStoreFormInfor } from '@/store/storeFormInfor';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import useOrderCode from '@/hooks/useOrderCode';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { v4 as uuid } from 'uuid';

enum PaymentMethod {
    Cash = 'cash',
    Transfer = 'transfer'
}

const CheckoutConfirm: React.FC = () => {
    const { order } = useStoreCart();
    const { form } = useStoreFormInfor();
    const router = useRouter()
    const { setOrder } = useStoreCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const orderCode = useOrderCode(12);
    const docRef = collection(db, 'order');

    const addOrder = async (form: any) => {
        try {
            await addDoc(docRef, form);
            setIsModalOpen(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddOrder = () => {
        const newForm = {
            ...form, timestamp: Date.now(),
            orderCode: orderCode,
            note: form.note ?? '',
            total: form.total + form.total * 0.1 - form.appliedCoupon,
            order: order.products,
            full_name: `${form.first_name} ${form.last_name}`,
            id: uuid()
        }

        addOrder(newForm)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            router.push('/');
            setOrder({ products: [] })
        }, 1000);
    }

    const columns: ColumnsType<IOrder> = [
        {
            title: 'No.',
            key: 'order',
            render: (text, record, index) => <p>{index + 1}</p>,
        },
        {
            title: 'SKU code',
            dataIndex: 'product',
            key: 'product',
            render: ({ code }) => <p className='text-base uppercase'>{code}</p>,
            width: 150,
        },
        {
            title: 'Name',
            dataIndex: 'product',
            key: 'product',
            render: ({ name, src, selectedOptions }: RenderProps) => (
                <>
                    <div className='flex gap-4 mb-3'>
                        <Image src={src} width={100} height={80} alt={name} />
                        <p className="subtext-footer capitalize text-base">{name}</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        {Object.entries(selectedOptions).map(([attributeName, option]) => (
                            <p key={attributeName}>{`${attributeName}: ${option.name} (+$${option.price})`}</p>
                        ))}
                    </div>
                </>

            )
        },
        {
            title: 'Price',
            dataIndex: 'product',
            key: 'price',
            render: ({ price, priceSale }) => (
                <div className='flex items-center gap-4'>
                    <p className='text-[#d9a1a3] text-sm'>{priceSale > 0 ? priceSale : price}</p>
                </div>
            )
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
                    <div className='flex gap-10'>
                        <div className='w-ful mt-8'>
                            <p className='text-3xl uppercase flex gap-3 items-center mb-3'><FaShippingFast />shipping address:</p>

                            <Row className='text-sm content-start'>
                                <Col className='w-full h-12 flex pl-3 items-center justify-start border border-gray-300' span={7}>Name:</Col>
                                <Col className='w-full h-12 flex pl-3 border-l-0 items-center justify-start border border-gray-300' span={17}>{`${form.first_name} ${form.last_name}`}</Col>

                                <Col className='w-full h-12 flex pl-3 border-t-0  items-center justify-start border border-gray-300' span={7}>Phone:</Col>
                                <Col className='w-full h-12 flex pl-3 border-t-0 border-l-0 items-center justify-start border border-gray-300' span={17}>{form.phone}</Col>

                                <Col className='w-full h-12 flex pl-3 border-t-0  items-center justify-start border border-gray-300' span={7}>Email:</Col>
                                <Col className='w-full h-12 flex pl-3 border-t-0 border-l-0 items-center justify-start border border-gray-300' span={17}>{form.email}</Col>

                                <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={7}>Address:</Col>
                                <Col className='w-full h-12 flex pl-3 border-t-0 border-l-0 items-center justify-start border border-gray-300' span={17}>{form.address}</Col>

                                <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={7}>Note:</Col>
                                <Col className='w-full h-12 flex pl-3 border-t-0 border-l-0 items-center justify-start border border-gray-300' span={17}>{form.note}</Col>

                                <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={7}>Shipping method:</Col>
                                <Col className='w-full h-12 flex pl-3 border-t-0 border-l-0 items-center justify-start border border-gray-300 capitalize' span={17}>shipping {form.shippingMethod}</Col>
                            </Row>
                        </div>

                        <div className='flex flex-col w-1/2'>
                            <div className='w-full mt-20'>
                                <Row className='text-sm content-start'>
                                    <Col className='w-full h-12 flex pl-3 items-center justify-start border border-gray-300' span={17}>SubTotal</Col>
                                    <Col className='w-full h-12 flex pr-3 border-l-0 items-center justify-end border border-gray-300' span={7}>${form.total.toFixed(2)}</Col>

                                    <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={17}>Tax</Col>
                                    <Col className='w-full h-12 flex pr-3 border-l-0 border-t-0  items-center justify-end border border-gray-300' span={7}>${(form.total * 0.1).toFixed(2)}</Col>
                                    {form.appliedCoupon > 0 && <>
                                        <Col className='w-full h-12 flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={17}>Coupon/Discount</Col>
                                        <Col className='w-full h-12 flex pr-3 border-l-0 border-t-0  items-center justify-end border border-gray-300' span={7}>${form.appliedCoupon.toFixed(2)}</Col>
                                    </>}

                                    <Col className='w-full h-12 bg-[#f5f3f3] flex pl-3 border-t-0 items-center justify-start border border-gray-300' span={17}>Total</Col>
                                    <Col className='w-full h-12 bg-[#f5f3f3] flex pr-3 border-l-0 border-t-0  items-center justify-end border border-gray-300' span={7}>${(form.total + form.total * 0.1 - form.appliedCoupon).toFixed(2)}</Col>
                                </Row>

                                <p className='text-3xl uppercase flex gap-3 items-center mt-10 mb-3'><MdOutlinePayment />payment method</p>

                                {form.paymentMethod === PaymentMethod.Cash ? <Image src='/banner/cash.png' width={200} height={80} alt='cash-method' /> : <Image src='/banner/bank.png' width={200} height={80} alt='transfer-method' />}
                            </div>

                            <div className='flex justify-between mt-16'>
                                <Button onClick={() => router.push('/cart')} className='h-16 w-44 bg-[#efefef] text-black uppercase text-base flex justify-center items-center mt-5'>back to cart
                                </Button>

                                <Button onClick={handleAddOrder} className='h-16 w-44 bg-[#e9da5d] text-black uppercase text-base flex justify-center items-center btn-add-to-cart mt-5'>checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

            <Modal
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                open={isModalOpen}
                centered
                cancelButtonProps={{ style: { display: 'none' } }}
                title='ORDER SUCCESS'
            >
                <p className='text-xl my-5'>THANK YOU FOR YOUR PURCHASE!</p>
                <span className='text-xl mr-3'>YOUR ORDER</span>
                <span className='text-xl italic font-light mb-4'>{orderCode}</span>
            </Modal>
        </ >
    )
}

export default CheckoutConfirm