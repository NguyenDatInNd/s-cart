import { Typography, Space, } from 'antd';
import CardProducts from '../shop/CardProducts';
import useStoreShop from '@/store/storeShop';
import { useEffect } from 'react';

const NewProducts: React.FC = () => {
    const { fetchCategory, fetchProducts, products } = useStoreShop();

    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [fetchCategory, fetchProducts]);

    return (
        <Space size='large' direction='vertical' className="w-full mb-20">
            <Typography.Title className="flex justify-center">NEW PRODUCTS</Typography.Title>

            <div className='w-full grid grid-cols-4'>
                {products.slice(0, Math.min(12, products.length)).map(product => (
                    <CardProducts key={product.code} {...product} />
                ))}
            </div>
        </Space>
    )
}

export default NewProducts