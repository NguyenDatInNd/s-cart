'use client'

import Image from 'next/image'
import Review from '@/components/review/Review';
import BreadcrumbApp from '@/components/breadcrumb/BreadcrumbApp';
import { IProduct } from '@/interfaces';
import { useEffect } from 'react';
import useStoreShop from '@/store/storeShop';
import RelatedProducts from '../components/RelatedProducts';
import DetailProduct from '../components/DetailProduct';

export default function DetailPage({ params }: { params: { id: string } }) {
    const { fetchProducts, products } = useStoreShop();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const data = products.find(product => product?.id === params.id && product.status) as IProduct;

    const viewedProductsString = localStorage.getItem('viewedProducts');
    const viewedProducts = viewedProductsString ? JSON.parse(viewedProductsString) : [];

    if (data && !viewedProducts.some((product: IProduct) => product.code === data.code)) {
        viewedProducts.push(data);
        localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }

    return (
        <>
            <div className='relative'>
                <Image className='w-full h-[425px]' src="/banner/detailProduct.jpeg" alt="detail product" width={1600} height={425} />
                <h2 className='text-banner-detail uppercase'>{data?.name}</h2>
            </div>

            <BreadcrumbApp props={data?.name} />

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

