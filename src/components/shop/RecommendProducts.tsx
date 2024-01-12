'use client'

import { Typography, Space } from 'antd';
import CardProducts from '../shop/CardProducts';
import { recommendProducts } from '@/data/recommendProducts';

const RecommendProducts: React.FC = () => {
    return (
        <Space size='large' direction='vertical' className="w-full mb-20">
            <Typography.Title className="flex uppercase text-2xl">RECOMMEND PRODUCTS</Typography.Title>

            <div className='w-full grid grid-cols-4'>
                {recommendProducts.slice(0, Math.min(4, recommendProducts.length)).map(product => (
                    <CardProducts small key={product.code} {...product} />
                )
                )}
            </div>
        </Space>
    )
}

export default RecommendProducts