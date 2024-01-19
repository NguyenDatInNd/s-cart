'use client'

import React, { useState } from 'react';
import { Popconfirm, Space, Table, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { GiShoppingBag } from "react-icons/gi";
import Image from "next/image"
import Link from 'next/link';
import BreadcrumbApp from '@/components/breadcrumb/BreadcrumbApp';
import { useStoreCart } from '@/store/storeCart';
import { IOrder } from '@/interfaces';
import useNotification from '@/app/hooks/useNotification';

const Cart: React.FC = () => {
    const showNotification = useNotification();
    const { order, deleteOrder, increaseQuantity, decreaseQuantity, setQuantity } = useStoreCart();

    // const attribute: Attribute[] = [
    //     { name: "Màu sắc", options: [{ name: "Đỏ", price: 10 }, { name: "Trắng", price: 0 }] },
    //     { name: "Khối lượng", options: [{ name: "0.5kg", price: 10 }, { name: "0.1kg", price: 0 }] }
    // ];

    // const selectedOptions = { "Màu sắc": "10", "Khối lượng": "10" };

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
            render: ({ name, code, src, selectedOptions, attribute }) => (
                <>
                    <div className='flex gap-4 mb-3'>
                        <Link className='ImageContainer' href={`/detail/${code.replace(/\s+/g, '-').toLowerCase()}`}>
                            <Image src={src} width={100} height={80} alt={name} />
                        </Link>

                        <Link className='h-6 mt-7 text-black' href={`/detail/${code.replace(/\s+/g, '-').toLowerCase()}`}>
                            <p className="subtext-footer capitalize text-base">{name}</p>
                        </Link>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-base uppercase'>SKU: {code}</p>
                        <div>
                            {Object.entries(selectedOptions).map(([attributeName, optionName]) => (
                                <p key={attributeName}>{`${attributeName}: ${optionName}`}</p>
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
            render: (quantity, record) => (
                <Space size="middle" direction='horizontal'>
                    <div className='h-10 w-10 bg-white flex justify-center items-center' onClick={() => handleQuantityChange(record, 'decrease')}>
                        <MinusOutlined className='subtext-footer' />
                    </div>

                    <input
                        type="number"
                        className='h-10 w-36 bg-[#f5f5f5] rounded text-center'
                        value={quantity}
                        onChange={(e) => handleQuantityInputChange(record, e)}
                    />

                    <div className='h-10 w-10 bg-white flex justify-center items-center' onClick={() => handleQuantityChange(record, 'increase')}>
                        <PlusOutlined className='subtext-footer' />
                    </div>

                </Space>
            ),
        },
        {
            title: 'Subtotal',
            key: 'total',
            render: (_, record) => {
                const { quantity, product } = record;
                const subtotal = product.priceSale > 0 ? quantity * product.priceSale : quantity * product.price;
                return (
                    <Space className='w-full flex justify-between' size='large' direction='horizontal'>
                        <p className='ml-3'>${subtotal}</p>

                        <Popconfirm
                            title="Are you sure to delete this item?"
                            onConfirm={() => handleDelete(record)}
                            okText='Yes'
                            cancelText="No"
                        >
                            <DeleteOutlined className='text-[#d9a1a3] cursor-pointer mr-3' />
                        </Popconfirm>
                    </Space>
                );
            },
            width: 200,
        },
    ];

    const handleQuantityChange = (record: IOrder, action: 'increase' | 'decrease') => {
        if (action === 'increase') {
            increaseQuantity(record);
        } else {
            decreaseQuantity(record);
        }
    };

    const handleQuantityInputChange = (record: IOrder, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(event.target.value, 10);
        if (!isNaN(inputValue) && inputValue >= 1) {
            setQuantity(record, inputValue);
        }
    };

    const handleDelete = (record: IOrder) => {
        deleteOrder(record);
        showNotification('success', 'Item Deleted', `${record.product.name} has been deleted from the cart.`);
    };

    console.log("order =>>", order)
    return (
        <div>
            <BreadcrumbApp />

            <div className='px-[285px] py-28 bg-white' >
                <div className="text-xl flex items-center gap-3 mb-5">
                    <GiShoppingBag /> Demo S-Cart : Free Laravel eCommerce
                </div>
                <Table bordered columns={columns} dataSource={order.products} pagination={false} />
                <div className='flex justify-end'>
                    <Link href='/checkout' className='h-16 w-44 bg-[#e9da5d] text-black uppercase text-base flex justify-center items-center btn-add-to-cart mt-5'>checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart