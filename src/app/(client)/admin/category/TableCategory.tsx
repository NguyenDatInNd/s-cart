import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { ICategory } from '@/interfaces';
import FormAddCategory from './FormAddCategory';
import Image from 'next/image';
import useStoreShop from '@/store/storeShop';
// import useDocumentIDsByCode from '@/hooks/useDocumentIDsByCode';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import useNotification from '@/hooks/useNotification';
import ModalProduct, { titleCategory } from '../../../../components/admin/ModalProduct';
import FormEditCategory from './FormEditCategory';
import { getDocumentIDsByCode } from '@/hooks/useDocumentIDsByCode';

const TableCategory = () => {
    const [isModal, setIsModal] = useState(false);
    const { category, fetchCategory } = useStoreShop();
    const showNotification = useNotification();
    const [title, setTitle] = useState<titleCategory>('Thêm danh mục');

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
            render: (_, record) =>
                <Button onClick={() => {
                    setIsModal(true)
                    setTitle('Sửa danh mục')
                    setRecordSelected(record)
                }}
                    type="primary">Sửa/Xem</Button>
        }
    ];

    const data = category.map((item, index) => {
        return {
            key: index,
            ...item
        }
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [recordSelected, setRecordSelected] = useState<ICategory>();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDeleteCategory = async () => {
        try {
            const selectedCode = data
                .filter((item: ICategory & { key: number }) =>
                    selectedRowKeys.includes(item.key)
                )
                .map((item: ICategory) => item.name);

            const documentIDs = await getDocumentIDsByCode({
                selectedCode,
                targetTable: "category",
                params: "name",
            });
            const batch: Promise<void>[] = [];
            documentIDs.forEach((documentID: string) => {
                const documentRef = doc(db, "category", documentID);
                batch.push(deleteDoc(documentRef));
            });

            await Promise.all(batch);
            showNotification("success", "Category deleted", "");
            setSelectedRowKeys([]);
            fetchCategory();
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

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
                    <Button disabled={selectedRowKeys.length === 0} type="primary" danger>Xóa</Button>
                </Popconfirm>
            </div>

            <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

            <Table bordered rowSelection={rowSelection} columns={columns} dataSource={data} />

            <ModalProduct isModal={isModal} title={title} oncancel={() => setIsModal(false)}>
                {title === 'Thêm danh mục' && <FormAddCategory handleClose={() => setIsModal(false)} />}
                {title === 'Sửa danh mục' && <FormEditCategory record={recordSelected} handleClose={() => setIsModal(false)} />}
            </ModalProduct>
        </div>
    )
}

export default TableCategory