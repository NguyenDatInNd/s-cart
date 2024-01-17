import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { ICategory } from '@/interfaces';
import FormAddCategory from './FormAddCategory';
import Image from 'next/image';
import useStoreShop from '@/store/storeShop';

const TableCategory = () => {
    const [isModal, setIsModal] = useState(false);
    const { category, fetchCategory } = useStoreShop();

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const columns: TableColumnsType<ICategory> = [
        {
            title: 'Hình ảnh',
            dataIndex: 'src',
            render: (src: string) => <Image src={src} width={100} height={100} alt='category' />
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: boolean) => <p className={`${status ? 'bg-green-500' : 'bg-red-500'}`}>{status}</p>
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

    const data = category.map((item, index) => {
        return {
            key: index,
            ...item
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
            <p className='text-3xl my-5'>Danh mục sản phẩm</p>

            <div className='flex w-full justify-end'>
                <Button onClick={() => setIsModal(true)} type="primary" className='mr-5'>Thêm mới</Button>
                <Button type="primary" danger>Xóa</Button>
            </div>

            <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

            <Table bordered rowSelection={rowSelection} columns={columns} dataSource={data} />

            <Modal
                title='Thêm danh mục sản phẩm'
                open={isModal}
                centered
                onCancel={() => setIsModal(false)}
                footer
            >
                <FormAddCategory handleClose={() => setIsModal(false)} />
            </Modal>
        </div>
    )
}

export default TableCategory