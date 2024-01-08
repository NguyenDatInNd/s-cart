"use client"

import ProductSale from "./ProductSale"
import { Typography, Space } from 'antd';

const { Paragraph } = Typography;

const FlaskSale: React.FC = () => {
    return (
        <div className="mx-[255px] my-3">
            <Space size='large' direction='vertical' className="w-full">
                <Typography.Title className="flex justify-center">FLASH SALE</Typography.Title>

                <div className="flex justify-between w-full px-11">
                    <ProductSale />
                    <ProductSale />
                </div>
            </Space>
        </div >
    )
}

export default FlaskSale