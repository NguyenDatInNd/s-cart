import ProductSale from "./ProductSale"
import { Typography, Space } from 'antd';
import useStoreShop from "@/store/storeShop";
import { useEffect } from "react";

const FlaskSale: React.FC = () => {
    const { fetchCategory, fetchProducts, products } = useStoreShop();

    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [fetchCategory, fetchProducts]);

    const data = products.filter(product => product.priceSale > 0);

    return (
        <Space size='large' direction='vertical' className="w-full my-20">
            <Typography.Title className="flex justify-center">FLASH SALE</Typography.Title>

            <div className="flex justify-between w-full px-11">
                {data.slice(0, Math.min(2, data.length)).map(product => (
                    <ProductSale key={product.code} {...product} />
                ))}
            </div>
        </Space>
    )
}

export default FlaskSale