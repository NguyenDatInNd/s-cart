'use client'

import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Divider, Typography, Radio, Space } from 'antd';
import Image from 'next/image'
import { GrFacebookOption } from 'react-icons/gr';
import Link from 'next/link';
import { FaTwitter } from 'react-icons/fa';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { FaGooglePlusG } from "react-icons/fa6";
import RecommendProducts from './RecommendProducts';
const { Text } = Typography;
import { IOrder, IProduct } from '@/interfaces';
import useSelectedOptions from '@/app/hooks/useSelectedOptions';
import useTotalPrice from '@/app/hooks/useTotalPrice';
import { useStoreCart } from '@/store/storeCart';
import useQuantityInOrder from '@/app/hooks/useQuantity';
import useNotification from '@/app/hooks/useNotification';


const DetailProduct: React.FC<IProduct> = ({ ...props }) => {
    const showNotification = useNotification();
    const { selectedOptions, handleOptionChange, getDefaultValue } = useSelectedOptions({});
    const [totalSalePrice, totalBasePrice] = useTotalPrice(props.price[0], props.price[1], selectedOptions);
    const { quantityInOrder, handleQuantityInOrder } = useQuantityInOrder();

    const { order, setOrder } = useStoreCart();

    const handleAddToCart = () => {
        const existingProductIndex = order.products.findIndex(
            (orderItem) =>
                (orderItem.product.code === props.code && orderItem.selectedOptions === selectedOptions)
        );

        if (existingProductIndex !== -1) {
            const updatedOrder = [...order.products];
            updatedOrder[existingProductIndex].quantity += quantityInOrder;

            setOrder({ products: updatedOrder });
        } else {
            const newOrder: IOrder = {
                product: {
                    ...props,
                    selectedOptions: selectedOptions,
                },
                quantity: quantityInOrder,
                price: [totalSalePrice, totalBasePrice],
                selectedOptions: selectedOptions,
            };

            setOrder({ products: [...order.products, newOrder] });
        }
        showNotification('success', 'Add to cart successfully', `Added ${quantityInOrder} ${props.name} to cart`);
    };

    return (
        <div className="pt-24 pb-12 w-[895px] flex flex-col gap-16">
            <div className="flex gap-10">
                <div className='bg-[#f9faf9] h-[260px]'>
                    <Image className='pr-10' src={props.src} width={345} height={260} priority alt={props.name} />
                </div>

                <div className='w-[385px] flex flex-col'>
                    <div className='flex flex-col justify-between gap-4'>
                        <p className='font-medium text-4xl capitalize'>{props.name}</p>
                        <p className='uppercase'>Sku: {props.code} </p>
                        <div className='flex gap-4'>
                            <Text className='text-[#FE980F] font-bold text-xl'>${totalSalePrice}</Text>
                            <Text className='text-[#a95d5d] text-lg' delete>${totalBasePrice}</Text>
                        </div>
                    </div>

                    <Divider className='bg-[#e1e1e1]' />

                    <div className='flex gap-4 mb-7'>
                        <div className='flex gap-[6px]'>
                            <div className='w-[70px] h-[70px] text-2xl bg-[#ebebeb] text-[#151515] rounded-md flex justify-center items-center'>{quantityInOrder}</div>

                            <div className='flex flex-col justify-between gap-[6px]'>
                                <button className='w-8 h-8 text-xl bg-[#ebebeb] text-[#151515] rounded-md flex justify-center items-center' onClick={() => handleQuantityInOrder('increase')}>
                                    <PlusOutlined className='subtext-footer' />
                                </button>
                                <button className='w-8 h-8 text-xl bg-[#ebebeb] text-[#151515] rounded-md flex justify-center items-center' onClick={() => handleQuantityInOrder('decrease')}>
                                    <MinusOutlined className='subtext-footer' />
                                </button>
                            </div>
                        </div>

                        <button className='h-[70px] w-48 bg-[#e9da5d] uppercase text-base flex justify-center items-center btn-add-to-cart' onClick={handleAddToCart} >add to cart </button>
                    </div>

                    <div>
                        <div className='text-base text-[#151515] flex flex-col gap-3 mt-3'>
                            {props.attributes?.map((attribute, index) => (
                                <div key={index}>
                                    <p>{attribute.name}:</p>
                                    <Radio.Group
                                        onChange={(e) => handleOptionChange(attribute.name, e.target.value)}
                                        value={selectedOptions[attribute.name] ?? getDefaultValue(attribute.options)}
                                        className='text-base text-[#9b9b9b]'
                                    >
                                        {attribute.options.map((option, optionIndex) => (
                                            <Radio key={optionIndex} value={option.price} name={option.name}>
                                                {option.name} (+${option.price})
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>
                            ))}
                            <p>Stock status: In stock</p>
                            <p>Category: Pho Nam Dinh,</p>
                        </div>

                        <Divider className='bg-[#e1e1e1] mt-1' />

                        <div className='flex gap-2'>
                            <p className='text-base'>Share:</p>
                            <Space className='text-[#151515] text-lg' direction='horizontal'>
                                <Link href="/" className='subtext-footer'><GrFacebookOption /></Link>
                                <Link href="/" className='subtext-footer'><FaTwitter /></Link>
                                <Link href="/" className='subtext-footer'><BiLogoInstagramAlt /></Link>
                                <Link href="/" className='subtext-footer'><FaGooglePlusG /></Link>
                            </Space>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className='text-base uppercase text-[#d9a1a3]'>DESCRIPTION</p>

                <Divider className='bg-[#d7d7d7] h-1 mb-8 rounded-md relative'>
                    <div className='absolute top-[-24px] left-0 w-[90px]'>
                        <Divider className='bg-[#d9a1a3] h-1 rounded-md' />
                    </div>
                </Divider>

                <p className='text-base text-[#777777] font-sans'>{props.descrpiton}</p>

                <div className='flex items-center gap-4 text-[#777777] font-sans'>
                    <p className='text-base'>{props.descrpiton}</p>
                    <Image className='w-[150px] h-[113px] m-1' src="/shop/product-10.png" width={345} height={260} priority alt='detail-product' />
                </div>
            </div>

            <RecommendProducts />
        </div>
    )
}

export default DetailProduct