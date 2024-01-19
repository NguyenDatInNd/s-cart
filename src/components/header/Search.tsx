import React, { useEffect, useState } from 'react';
import { AutoComplete, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useStoreShop from '@/store/storeShop';
import Image from 'next/image'
import Link from 'next/link';

interface ISearchInput {
    handleClose: () => void;
}
const { Option } = AutoComplete;

const SearchInput: React.FC<ISearchInput> = ({ handleClose }) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState<string>();
    const { products, fetchProducts } = useStoreShop();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleSearch = (inputValue: string) => {
        const result: any = products
            .filter((product) => product.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((product) => ({
                value: product.code,
                label: (
                    <Link href={`/detail/${product.code.replace(/\s+/g, '-').toLowerCase()}`}>
                        <div className='flex gap-2 items-center text-base'>
                            <Image src={product.src} alt={product.name} width={30} height={20} />
                            {product.name}
                        </div>
                    </Link>
                ),
            }));

        setData(result);
    };

    const onSelect = (selectedValue: string) => {
        setValue(selectedValue);
        handleClose();
    };

    const renderOption = (item: any) => (
        <Option key={item.value} value={item.value}>
            {item.label}
        </Option>
    );

    return (
        <AutoComplete
            style={{ width: '100%' }}
            value={value}
            placeholder="Nhập sản phẩm cần tìm kiếm"
            defaultActiveFirstOption={false}
            suffixIcon={<SearchOutlined />}
            filterOption={false}
            onSearch={handleSearch}
            onSelect={onSelect}
            notFoundContent="Không tìm thấy sản phẩm"
        >
            {data.map(renderOption)}
        </AutoComplete>
    );
};

export default SearchInput;