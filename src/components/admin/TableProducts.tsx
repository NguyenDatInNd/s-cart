import React, { useEffect, useMemo, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IProduct } from '@/interfaces';
import FormAddProduct from './FormAddProduct';
import Image from 'next/image';
import useStoreShop from '@/store/storeShop';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import useNotification from '@/app/hooks/useNotification';
import ModalProduct, { titleProduct } from './ModalProduct';
import FormEditProduct from './FormEditProduct';
import useDocumentIDsByCode from '@/app/hooks/useDocumentIDsByCode';

const TableProducts = () => {
    const [isModal, setIsModal] = useState(false);
    const { fetchCategory, fetchProducts, products } = useStoreShop();
    const showNotification = useNotification();
    const [title, setTitle] = useState<titleProduct>('Thêm sản phẩm');

    useEffect(() => {
        fetchCategory();
        fetchProducts();
    }, [fetchCategory, fetchProducts]);

    const columns: TableColumnsType<IProduct> = [
        {
            title: 'Số thứ tự',
            dataIndex: 'key',
            render: (key: number) => <p>{key}</p>
        },
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
            render: (category: string) => <p>{category ?? ''}</p>
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price: number) => <p>{price}</p>,
            width: 150,
        },

        {
            title: 'Giá khuyến mãi',
            dataIndex: 'priceSale',
            render: (priceSale: number) => <p>{priceSale > 0 && priceSale}</p>,
            width: 150,
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            render: (amount: number) => <p>{amount}</p>
        },
        {
            title: 'Thao tác',
            render: (_, record) =>
                <Button
                    onClick={() => {
                        setIsModal(true)
                        setTitle('Sửa sản phẩm')
                        setRecordSelected(record)
                    }}
                    type="primary">Sửa / Xem</Button>
        }
    ];

    const data = useMemo(() => {
        return products.map((product, index) => ({
            key: index + 1,
            ...product,
        }));
    }, [products]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [recordSelected, setRecordSelected] = useState<IProduct>();

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
            .map((item) => item.code);
    }, [data, selectedRowKeys]);

    const documentIDs = useDocumentIDsByCode(codeSelected, 'products', 'code');

    const handleDeleteProduct = async () => {
        try {
            const batch: Promise<void>[] = [];
            documentIDs.forEach((documentID) => {
                const documentRef = doc(db, 'products', documentID);
                batch.push(deleteDoc(documentRef));
            });

            await Promise.all(batch);
            showNotification('success', 'Product deleted', '');
            setSelectedRowKeys([]);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting documents:', error);
        }
    }

    return (
        <div className='my-5 mx-10' >
            <p className='text-3xl my-5'>Danh sách sản phẩm</p>

            <div className='flex w-full justify-end'>
                <Button
                    onClick={() => {
                        setIsModal(true)
                        setTitle('Thêm sản phẩm')
                    }}
                    type="primary" className='mr-5'>Thêm mới</Button>
                <Popconfirm
                    title="Are you sure to delete this product?"
                    onConfirm={() => handleDeleteProduct()}
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

            <ModalProduct isModal={isModal} title={title} oncancel={() => setIsModal(false)}>
                {title === 'Thêm sản phẩm' && <FormAddProduct handleClose={() => setIsModal(false)} />}
                {title === 'Sửa sản phẩm' && <FormEditProduct record={recordSelected} handleClose={() => setIsModal(false)} />}
            </ModalProduct>
        </div>
    );
}

export default TableProducts;