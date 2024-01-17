import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Popconfirm, Switch, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IProduct } from '@/interfaces';
import FormAddProduct from './FormAddProduct';
import Image from 'next/image';
import useStoreShop from '@/store/storeShop';
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import useNotification from '@/app/hooks/useNotification';

const TableProducts = () => {
    const [isModal, setIsModal] = useState(false);
    const { fetchCategory, fetchProducts, products } = useStoreShop();
    const showNotification = useNotification();

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
            render: (status: boolean) => <Switch checkedChildren="ON" unCheckedChildren="OFF" value={status} />
        },
        {
            title: 'Thao tác',
            render: () => (
                <div className='flex gap-3'>
                    <Button type="primary">Sửa</Button>
                    <Button type="primary" danger>Xem chi tiết</Button>
                </div>
            ),
        }
    ];

    const data = useMemo(() => {
        return products.map((product, index) => ({
            key: index + 1,
            ...product,
        }));
    }, [products]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [documentIDs, setDocumentIDs] = useState<string[]>([]);

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

    useEffect(() => {
        const getDocumentIDsByCode = async () => {
            if (codeSelected.length > 0) {
                const collectionRef = collection(db, 'products');
                const q = query(collectionRef, where('code', 'in', codeSelected));

                try {
                    const querySnapshot = await getDocs(q);
                    const documentIDs = querySnapshot.docs.map((doc) => doc.id);
                    setDocumentIDs(documentIDs);
                } catch (error) {
                    console.error('Error getting document IDs:', error);
                }
            }
        };

        getDocumentIDsByCode();
    }, [codeSelected]);

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
                <Button onClick={() => setIsModal(true)} type="primary" className='mr-5'>Thêm mới</Button>
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