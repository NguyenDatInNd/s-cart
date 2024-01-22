import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image'
import LanguageSwitch from './LanguageSwitch';
import { Badge, Drawer, Input, List } from 'antd';
import { useStoreCart } from '@/store/storeCart';
import useStoreShop from '@/store/storeShop';
import { IProduct } from '@/interfaces';

const HeaderApp: React.FC = () => {
    const storeCart = useStoreCart();
    const [open, setOpen] = useState(false);
    const { products, fetchProducts } = useStoreShop();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const [searchResults, setSearchResults] = useState<IProduct[]>([]);

    const handleSearch = (value: string) => {
        const results = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );

        setSearchResults(results);
    };

    return (
        <header className='sticky z-5 left-0 top-0'>
            <nav className='flex flex-row px-64 py-8 justify-between items-center bg-white w-full shadow-sm shadow-gray-500/35'>
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
                    <SearchOutlined onClick={() => setOpen(true)} className='hover:text-[#d9a1a3] cursor-pointer' />
                    <Badge count={storeCart.order.products.length}>
                        <Link className='text-black' href="/cart">
                            <ShoppingCartOutlined className='hover:text-[#d9a1a3] cursor-pointer text-3xl' />
                        </Link>
                    </Badge>
                </div>
            </nav>

            <Drawer title="Tìm kiếm sản phẩm" onClose={() => setOpen(false)} open={open} placement='top' style={{ minHeight: 250 }}>
                <Input placeholder='Tìm kiếm sản phẩm' prefix={<SearchOutlined />} onChange={(e) => handleSearch(e.target.value)} />
                <List
                    dataSource={searchResults}
                    renderItem={(product) => (
                        <List.Item onClick={() => setOpen(false)}>
                            <Link href={`/detail/${product.code.replace(/\s+/g, '-').toLowerCase()}`}>
                                <div className='flex gap-2 items-center text-base'>
                                    <Image src={product.src} alt={product.name} width={35} height={25} />
                                    {product.name}
                                </div>
                            </Link>
                        </List.Item>
                    )}
                />
            </Drawer>
        </header>
    );
};

export default HeaderApp;
