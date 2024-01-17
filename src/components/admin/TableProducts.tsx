import React, { useEffect, useState } from 'react';
import { Button, Modal, Switch, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IProduct } from '@/interfaces';
import FormAddProduct from './FormAddProduct';
import Image from 'next/image';
import useStoreShop from '@/store/storeShop';

const TableProducts = () => {
    const [isModal, setIsModal] = useState(false);
    const { fetchCategory, fetchProducts, products } = useStoreShop();

    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [fetchCategory, fetchProducts]);

    const columns: TableColumnsType<IProduct> = [
        {
            title: 'Hình ảnh',
            dataIndex: 'src',
            render: (src: string) => <Image src={src} width={100} height={100} alt='product' />
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (name: string) => <p>{name}</p>
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            render: (category: string) => <p>{category}</p>
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price: number) => <p>{price}</p>
        },

        {
            title: 'Giá khuyến mãi',
            dataIndex: 'priceSale',
            render: (priceSale: number) => <p>{priceSale > 0 && priceSale}</p>
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (amount: number) => <p>{amount}</p>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: boolean) => <Switch className='bg-red' checkedChildren="ON" unCheckedChildren="OFF" value={status} />
        },
        {
            title: 'Thao tác',
            render: () => (
                <>
                    <Button type="primary">Sửa</Button>
                    <Button type="primary" danger>Xóa</Button>
                </>
            ),
        }
    ];

    const data = products.map((product, index) => {
        return {
            key: index,
            ...product
        }
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className='my-5 mx-10' >
            <p className='text-3xl my-5'>Danh sách sản phẩm</p>

            <div className='flex w-full justify-end'>
                <Button onClick={() => setIsModal(true)} type="primary" className='mr-5'>Thêm mới</Button>
                <Button type="primary" danger>Xóa</Button>
            </div>

            <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

            <Table bordered rowSelection={rowSelection} columns={columns} dataSource={data} />

            <Modal
                title='Thêm sản phẩm'
                open={isModal}
                centered
                onCancel={() => setIsModal(false)}
                footer
            >
                <FormAddProduct handleClose={() => setIsModal(false)} />
            </Modal>
        </div>
    );
}

export default TableProducts;