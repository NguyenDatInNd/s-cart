import React, { useEffect, useState } from 'react';
import { Button, Modal, Switch, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { IFormValues } from '@/interfaces';
import FormAddProduct from './FormAddProduct';
import useStoreAdmin from '@/store/storeAdmin';

const TableOrder = () => {
    const [isModal, setIsModal] = useState(false);
    const { form, fetchForm } = useStoreAdmin();

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
            render: () => (
                <>
                    <Button type="primary">Sửa</Button>
                    <Button type="primary" danger>Xóa</Button>
                </>
            ),
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
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className='my-5 mx-10' >
            <p className='text-3xl my-5'>Danh sách đơn đặt hàng</p>

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

export default TableOrder;