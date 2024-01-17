'use client'

import Image from 'next/image'
import DetailProduct from '@/components/shop/DetailProduct';
import RelatedProducts from '@/components/shop/RelatedProducts';
import Review from '@/components/review/Review';
import BreadcrumbApp from '@/components/breadcrumb/BreadcrumbApp';
import { IProduct } from '@/interfaces';
import { useEffect } from 'react';
import useStoreShop from '@/store/storeShop';

export default function DetailPage({ params }: { params: { id: string } }) {
    const { fetchCategory, fetchProducts, products } = useStoreShop();

    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [fetchCategory, fetchProducts]);

    const data = products.find(product => product.code === params.id && product.status) as IProduct;

    return (
        <>
            <div className='relative'>
                <Image className='w-full h-[425px]' src="/banner/detailProduct.jpeg" alt="detail product" width={1600} height={425} />
                <h2 className='text-banner-detail uppercase'>{data?.name}</h2>
            </div>

            <BreadcrumbApp />

            <div className='px-[285px] py-28 bg-white' >
                <div className='flex gap-10'>
                    <RelatedProducts />

                    <DetailProduct {...data} />
                </div>

                <Review />
            </div>
        </>

    )
}

