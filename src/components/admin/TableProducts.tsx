import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IProduct } from '@/interfaces';
import { products } from '@/data/products';

const TableProducts = () => {
    const columns: TableColumnsType<IProduct> = [
        {
            title: 'Hình ảnh',
            dataIndex: 'src',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price: number[]) => <p>{price[0]}</p>
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'price',
            render: (price: number[]) => <p>{price[1]}</p>
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (amount: number[]) => <p>{amount[0]}</p>
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
        <div className='m-5' >
            <p className='text-2xl my-5'>Danh sách sản phẩm</p>

            <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
}

export default TableProducts;