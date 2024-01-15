import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IProduct } from '@/interfaces';
import { products } from '@/data/products';

const TableCategory = () => {
    const columns: TableColumnsType<IProduct> = [
        {
            title: 'Hình ảnh',
            dataIndex: 'src',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: number[]) => <p className={`${status ? 'bg-green-500' : 'bg-red-500'}`}>{status}</p>
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
            <p className='text-2xl my-5'>Danh mục sản phẩm</p>

            <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    )
}

export default TableCategory