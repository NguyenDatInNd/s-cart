import ProductSale from "./ProductSale"
import { Typography, Space } from 'antd';
import { productsSale } from "@/data/productsSale";

const FlaskSale: React.FC = () => {
    return (
        <Space size='large' direction='vertical' className="w-full my-20">
            <Typography.Title className="flex justify-center">FLASH SALE</Typography.Title>

            <div className="flex justify-between w-full px-11">
                {productsSale.slice(0, Math.min(4, productsSale.length)).map(product => (
                    <ProductSale key={product.code} {...product} />
                ))}
            </div>
        </Space>
    )
}

export default FlaskSale