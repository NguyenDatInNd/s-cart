import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useStoreShop from '@/store/storeShop';
import Image from 'next/image'
import Link from 'next/link';

const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties }> = (props) => {
    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();
    const { products, fetchProducts } = useStoreShop();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (newValue: string) => {
        fetch(newValue, setData);
    };


    let timeout: ReturnType<typeof setTimeout> | null;
    let currentValue: string;

    const fetch = (value: string, callback: Function) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const query = () => {
            if (currentValue === value) {
                const result = products
                    .filter((product) => product.name.toLowerCase().includes(value.toLowerCase()))
                    .map((product) => ({
                        value: product.code,
                        label:
                            <Link href={`/detail/${product.code.replace(/\s+/g, '-').toLowerCase()}`}>
                                <div className='flex gap-2 items-center text-base'>
                                    <Image src={product.src} alt={product.name} width={30} height={20} />
                                    {product.name}
                                </div>
                            </Link>
                    }));
                callback(result);
            }
        };

        timeout = setTimeout(query, 300);
    };


    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Select
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={<SearchOutlined />}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.label,
            }))}
        />
    );
};

export default SearchInput;