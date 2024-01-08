"use client";

import React from 'react';
import Link from 'next/link';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image'
import LanguageSwitch from './LanguageSwitch';
import { Badge, Space } from 'antd';

const HeaderApp: React.FC = () => {
    return (
        <header>
            <nav className='fixed z-10 flex flex-row px-64 py-8 justify-between items-center bg-white w-full'>
                <Image src="/icons/scart-mid.png" width={120} height={70} priority alt='scart-icon' />

                <div className='flex items-center w-[750px] h-[70px] justify-between text-base'>
                    <Link href="/">
                        HOME
                    </Link >

                    <Link href="/shop">
                        SHOP
                    </Link>

                    <Link href="/news">
                        BLOGS
                    </Link>

                    <Link href="/about">
                        ABOUT US
                    </Link>

                    <Link href="/contact">
                        CONTACT US
                    </Link>

                    <LanguageSwitch />
                </div>

                <Space className='text-3xl w-20'>
                    <SearchOutlined className='hover:text-[#d9a1a3] cursor-pointer' />
                    <Badge count={5}>
                        <ShoppingCartOutlined className='hover:text-[#d9a1a3] cursor-pointer text-3xl' />
                    </Badge>
                </Space>
            </nav>
        </header>
    );
};

export default HeaderApp;
