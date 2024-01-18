import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Popconfirm, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { ICategory } from '@/interfaces';
import FormAddCategory from './FormAddCategory';
import Image from 'next/image';
import useStoreShop from '@/store/storeShop';
import useDocumentIDsByCode from '@/app/hooks/useDocumentIDsByCode';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import useNotification from '@/app/hooks/useNotification';

const TableCategory = () => {
    const [isModal, setIsModal] = useState(false);
    const { category, fetchCategory } = useStoreShop();
    const showNotification = useNotification();

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
            title: 'Thao tác',
            render: () => (
                <>
                    <Button type="primary">Sửa/Xem</Button>
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
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const codeSelected = useMemo(() => {
        return data
            .filter((item) => selectedRowKeys.includes(item.key))
            .map((item) => item.name);
    }, [data, selectedRowKeys]);

    const documentIDs = useDocumentIDsByCode(codeSelected, 'category', 'name');

    const handleDeleteCategory = async () => {
        try {
            const batch: Promise<void>[] = [];
            documentIDs.forEach((documentID) => {
                const documentRef = doc(db, 'category', documentID);
                batch.push(deleteDoc(documentRef));
            });

            await Promise.all(batch);
            showNotification('success', 'Category deleted', '');
            setSelectedRowKeys([]);
            fetchCategory();
        } catch (error) {
            console.error('Error deleting documents:', error);
        }
    }

    return (
        <div className='my-5 mx-10' >
            <p className='text-3xl my-5'>Danh mục sản phẩm</p>

            <div className='flex w-full justify-end'>
                <Button onClick={() => setIsModal(true)} type="primary" className='mr-5'>Thêm mới</Button>
                <Popconfirm
                    title="Are you sure to delete this product?"
                    onConfirm={() => handleDeleteCategory()}
                    okText='Yes'
                    cancelText="No"
                >
                    <Button type="primary" danger>Xóa</Button>
                </Popconfirm>
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