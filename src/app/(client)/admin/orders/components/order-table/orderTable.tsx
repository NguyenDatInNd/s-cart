import { getDocumentIDsByCode } from "@/hooks/useDocumentIDsByCode";
import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { IFormValues } from "@/interfaces";
import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Table } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useStoreAdmin from "@/store/storeAdmin";

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
        render: (_: string, record: IFormValues) => (
            <Link href={`/admin/order/view/${record.id}`}>Xem</Link>
        ),
    }
];

const OrderTable = () => {
    const { form, fetchForm } = useStoreAdmin();
    const showNotification = useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const data = form.map((item: IFormValues, index: number) => {
        return {
            key: index,
            ...item,
        };
    });

    console.log("Order Table")

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
                params: "id",
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

    useEffect(() => {
        fetchForm();
    }, [fetchForm]);

    return (
        <div className="my-5 mx-10">
            <p className="text-3xl my-5">Danh sách đơn đặt hàng</p>

            <div className="w-full flex justify-end pb-4">
                <Popconfirm
                    title="Are you sure to delete this order?"
                    onConfirm={() => handleDeleteOrder()}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger>
                        Xóa
                    </Button>
                </Popconfirm>
            </div>

            {!!selectedRowKeys.length && (
                <span style={{ marginLeft: 8 }}>
                    {`Selected ${selectedRowKeys.length} items`}
                </span>
            )}

            <Table
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default OrderTable;
