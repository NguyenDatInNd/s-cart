import React from 'react';
import Link from 'next/link';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image'
import LanguageSwitch from './LanguageSwitch';
import { Badge } from 'antd';
import { useStoreCart } from '@/store/storeCart';

const HeaderApp: React.FC = () => {
    const storeCart = useStoreCart();
    return (
        <header>
            <nav className=' z-10 flex flex-row px-64 py-8 justify-between items-center bg-white w-full shadow-sm shadow-gray-500/35'>
                <Link href="/">
                    <Image src="/icons/scart-mid.png" width={120} height={70} priority alt='scart-icon' />
                </Link >


                <div className='flex items-center w-[750px] h-[70px] justify-between text-base'>
                    <Link className='subtext-footer' href="/">
                        HOME
                    </Link >

                    <Link className='subtext-footer' href="/">
                        SHOP
                    </Link>

                    <Link className='subtext-footer' href="/">
                        BLOGS
                    </Link>

                    <Link className='subtext-footer' href="/">
                        ABOUT US
                    </Link>

                    <Link className='subtext-footer' href="/">
                        CONTACT US
                    </Link>

                    <LanguageSwitch />
                </div>

                <div className='text-3xl w-20 flex justify-between'>
                    <SearchOutlined className='hover:text-[#d9a1a3] cursor-pointer' />
                    <Badge count={storeCart.order.products.length}>
                        <Link href="/cart">
                            <ShoppingCartOutlined className='hover:text-[#d9a1a3] cursor-pointer text-3xl' />
                        </Link>
                    </Badge>
                </div>
            </nav>
        </header>
    );
};

export default HeaderApp;
