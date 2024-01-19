import React, { useState } from 'react';
import Link from 'next/link';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image'
import LanguageSwitch from './LanguageSwitch';
import { Badge, Modal } from 'antd';
import { useStoreCart } from '@/store/storeCart';
import SearchInput from './Search';

const HeaderApp: React.FC = () => {
    const storeCart = useStoreCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header>
            <nav className=' z-10 flex flex-row px-64 py-8 justify-between items-center bg-white w-full shadow-sm shadow-gray-500/35'>
                <Link className='subtext-footer' href="/">
                    <Image src="/icons/scart-mid.png" width={120} height={70} priority alt='scart-icon' />
                </Link >


                <div className='flex  items-center w-[750px] h-[70px] justify-between text-base'>
                    <Link className='subtext-footer text-black' href="/">
                        HOME
                    </Link >

                    <Link className='subtext-footer text-black' href="/">
                        SHOP
                    </Link>

                    <Link className='subtext-footer text-black' href="/">
                        BLOGS
                    </Link>

                    <Link className='subtext-footer text-black' href="/">
                        ABOUT US
                    </Link>

                    <Link className='subtext-footer text-black' href="/">
                        CONTACT US
                    </Link>

                    <LanguageSwitch />
                </div>

                <div className='text-3xl w-20 flex justify-between'>
                    <SearchOutlined onClick={() => setIsModalOpen(true)} className='hover:text-[#d9a1a3] cursor-pointer' />
                    <Badge count={storeCart.order.products.length}>
                        <Link className='text-black' href="/cart">
                            <ShoppingCartOutlined className='hover:text-[#d9a1a3] cursor-pointer text-3xl' />
                        </Link>
                    </Badge>
                </div>
            </nav>

            <Modal
                title='Search'
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
                footer={null}
            >
                {isModalOpen && <div className='search-input'>
                    <SearchInput handleClose={() => setIsModalOpen(false)} />
                </div>}
            </Modal>
        </header>
    );
};

export default HeaderApp;
