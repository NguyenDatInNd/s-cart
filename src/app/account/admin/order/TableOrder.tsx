import React, { useEffect, useState } from 'react';
import { Button, Modal, Popconfirm, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IFormValues } from '@/interfaces';
import useStoreAdmin from '@/store/storeAdmin';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import useNotification from '@/hooks/useNotification';
import FormDetailOrder from './FormDetailOrder';
import { getDocumentIDsByCode } from '@/hooks/useDocumentIDsByCode';

const TableOrder = () => {
    const [isModal, setIsModal] = useState(false);
    const { form, fetchForm } = useStoreAdmin();
    const showNotification = useNotification();
    const [recordSelected, setRecordSelected] = useState<IFormValues>();

    useEffect(() => {
        fetchForm();
    }, [fetchForm]);

    const columns: TableColumnsType<IFormValues> = [
        {
            title: 'Mã order',
            dataIndex: 'orderCode',
            render: (order: string) => <p>{order}</p>
        },
        {
            title: 'Tên người đặt',
            dataIndex: 'full_name',
            render: (name: string) => <p>{name}</p>
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (email: string) => <p>{email}</p>
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            render: (phone: string) => <p>{phone}</p>
        },

        {
            title: 'Tổng đơn hàng',
            dataIndex: 'total',
            render: (total: number) => <p>{total}</p>
        },
        {
            title: 'Phương thức vận chuyển',
            dataIndex: 'shippingMethod',
            render: (shippingMethod: string) => <p>{shippingMethod}</p>
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            render: (paymentMethod: string) => <p>{paymentMethod}</p>
        },
        {
            title: 'Thao tác',
            render: (_, record) => <Button onClick={() => {
                setRecordSelected(record)
                setIsModal(true)
            }} type="primary">Xem đơn hàng</Button>
        }
    ];

    const data = form.map((item, index) => {
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

    const handleDeleteOrder = async () => {
        try {
            const selectedCode = data
                .filter((item: IFormValues & { key: number }) =>
                    selectedRowKeys.includes(item.key)
                )
                .map((item: IFormValues) => item.orderCode);

            const documentIDs = await getDocumentIDsByCode({
                selectedCode,
                targetTable: "order",
                params: "orderCode",
            });

            const batch: Promise<void>[] = [];
            documentIDs.forEach((documentID: string) => {
                const documentRef = doc(db, "order", documentID);
                batch.push(deleteDoc(documentRef));
            });

            await Promise.all(batch);
            showNotification("success", "Order deleted", "");
            setSelectedRowKeys([]);
            fetchForm();
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

    return (
        <div className='my-5 mx-10' >
            <p className='text-3xl my-5'>Danh sách đơn đặt hàng</p>

            <div className='flex w-full justify-end'>
                <Popconfirm
                    title="Are you sure to delete this product?"
                    onConfirm={() => handleDeleteOrder()}
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

            <Modal
                title='Xem đơn hàng'
                open={isModal}
                centered
                onCancel={() => setIsModal(false)}
                footer
            >
                <FormDetailOrder record={recordSelected} />
            </Modal>
        </div>
    );
}

export default TableOrder;