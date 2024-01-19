import Image from 'next/image'
import { Typography } from 'antd'
import { IoMdHeart } from "react-icons/io";
import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AiOutlineSwap } from "react-icons/ai";
import { IOrder, IProduct } from '@/interfaces';
import useNotification from '@/app/hooks/useNotification';
import { useStoreCart } from '@/store/storeCart';
import useQuantityInOrder from '@/app/hooks/useQuantity';
import useSelectedOptions from '@/app/hooks/useSelectedOptions';
import useTotalPrice from '@/app/hooks/useTotalPrice';
const { Text } = Typography;

interface ICardProductsProps extends IProduct {
    small?: boolean;
}

const CardProducts: React.FC<ICardProductsProps> = ({ small, ...props }) => {
    const showNotification = useNotification();
    const { order, setOrder } = useStoreCart();
    const { selectedOptions } = useSelectedOptions({});
    const { quantityInOrder } = useQuantityInOrder();

    const handleAddToCart = () => {
        const existingProductIndex = order.products.findIndex(
            (orderItem) =>
                (orderItem.product.code === props.code)
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
                selectedOptions: selectedOptions,
            };

            setOrder({ products: [...order.products, newOrder] });
        }
        showNotification('success', 'Add to cart successfully', `Added ${quantityInOrder} ${props.name} to cart`);
    };


    return (
        <div className={`${small ? 'w-[195px]' : 'w-[255px] m-5'}  card-products relative px-5 pt-5 pb-10 bg-[#f5f5f5] rounded-md flex flex-col justify-between items-center`}>

            <Link href={`/detail/${props.code.replace(/\s+/g, '-').toLowerCase()}`}>
                <Image className='mt-8' src={props.src} width={small ? 146 : 225} height={small ? 110 : 169} priority alt={props.name} />
            </Link>

            <Link href={`/detail/${props.code.replace(/\s+/g, '-').toLowerCase()}`}>
                <Typography.Title className='mt-5 subtext-footer uppercase' level={5}>{props.name}</Typography.Title>
            </Link>

            <button onClick={handleAddToCart} className='h-9 w-28 bg-[#e9da5d] cursor-pointer rounded-md flex justify-between items-center px-3 py-1 btn-add-to-cart'>
                <ShoppingCartOutlined />
                <span className='text-xs1'>ADD TO CART</span>
            </button>

            <div className='flex flex-row justify-center w-full mt-1'>
                <Text delete={props.priceSale > 0} className={`text-base pr-4 ${props.priceSale === 0 ? 'text-[#d9a1a3]' : 'text-gray-500 '}`}>${props.price}</Text>
                {props.priceSale > 0 && <Text className='text-[#d9a1a3] text-base '>${props.priceSale}</Text>}
            </div>

            <div className='flex flex-row justify-center w-full mt-7 container-action'>
                <div className='bg-[#e9da5d] w-12 h-12 rounded-[50%] flex justify-center items-center mr-7 icon-circle circle-heart'><IoMdHeart className='icon-heart' /></div>
                <div className='bg-[#d9a1a3] w-12 h-12 rounded-[50%] flex justify-center items-center icon-circle circle-swap'><AiOutlineSwap className='icon-swap text-white' /></div>
            </div>
        </div>
    )
}

export default CardProducts