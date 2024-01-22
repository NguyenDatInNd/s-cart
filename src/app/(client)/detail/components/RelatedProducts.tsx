'use client'

import { IProduct } from "@/interfaces";
import useStoreShop from "@/store/storeShop";
import { Divider, Space, Typography } from "antd"
import Image from "next/image"
import Link from "next/link";
import { useEffect } from "react";
const { Text } = Typography;

const RelatedProducts: React.FC = () => {
    const { fetchCategory, fetchProducts, products } = useStoreShop();

    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [fetchCategory, fetchProducts]);

    const specialProducts = products.filter(product => product.outstanding && product.status);

    const lastViewProductsString = localStorage.getItem('viewedProducts');
    const lastViewProducts: IProduct[] = lastViewProductsString ? JSON.parse(lastViewProductsString) : [];

    return (
        <div>
            <div className="flex flex-col gap-12">
                <div>
                    <p className="text-base uppercase text-[#151515]"> SPECIAL PRODUCTS</p>

                    <Divider className="mt-5" />

                    <Space size='small' direction='vertical'>
                        {specialProducts.slice(0, Math.min(4, specialProducts.length)).map(product => (
                            <div key={product?.code} className="flex gap-2 my-1">
                                <Link className='ImageContainer' href={`/detail/${product?.code.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <Image src={product?.src} width={106} height={104} alt={product?.name} />
                                </Link>

                                <Space className="justify-center" direction='vertical'>
                                    <Link href={`/detail/${product?.code.replace(/\s+/g, '-').toLowerCase()}`} className="text-black">
                                        <p className="subtext-footer capitalize ">{product?.name}</p>
                                    </Link>

                                    <div className='flex flex-row gap-4 w-full text-sm mt-1'>
                                        <Text delete={product?.priceSale > 0} className={`${product?.priceSale === 0 ? 'text-[#d9a1a3]' : 'text-gray-500 '}`}>${product?.price}</Text>
                                        {product?.priceSale > 0 && <Text className='text-[#d9a1a3]'>${product?.priceSale}</Text>}
                                    </div>
                                </Space>
                            </div>
                        ))
                        }
                    </Space>
                </div>

                <div>
                    <p className="text-base uppercase text-[#151515]">LAST VIEW PRODUCTS</p>

                    <Divider className="mt-5" />

                    <Space size='small' direction='vertical'>
                        {lastViewProducts.length > 0 && lastViewProducts.slice(0, Math.min(4, lastViewProducts.length)).map(product => (
                            <div key={product?.code} className="flex gap-2 my-1">
                                <Link className='ImageContainer' href={`/detail/${product?.code.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <Image src={product?.src} width={106} height={104} alt={product?.name} />
                                </Link>

                                <Space className="justify-center" direction='vertical'>
                                    <Link href={`/detail/${product?.code.replace(/\s+/g, '-').toLowerCase()}`} className="text-black">
                                        <p className="subtext-footer capitalize ">{product?.name}</p>
                                    </Link>

                                    <div className='flex flex-row gap-4 w-full text-sm mt-1'>
                                        <Text delete={product?.priceSale > 0} className={`${product?.priceSale === 0 ? 'text-[#d9a1a3]' : 'text-gray-500 '}`}>${product?.price}</Text>
                                        {product?.priceSale > 0 && <Text className='text-[#d9a1a3]'>${product?.priceSale}</Text>}
                                    </div>
                                </Space>
                            </div>
                        ))
                        }
                    </Space>
                </div>
            </div >

            <div>

            </div>
        </div >
    )
}

export default RelatedProducts