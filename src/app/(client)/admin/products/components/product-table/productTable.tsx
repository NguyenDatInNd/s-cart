import { getDocumentIDsByCode } from "@/hooks/useDocumentIDsByCode";
import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { IProduct } from "@/interfaces";
import useStoreShop from "@/store/storeShop";
import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Table } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const columns: TableColumnsType<IProduct> = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
        render: (key: number) => <p>{key + 1}</p>
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
        render: (_: string, record: IProduct) =>
            <Link href={`/admin/products/edit/${record.id}`}>Sửa/Xem</Link>
    }
];

const ProductTable = () => {
    const router = useRouter();
    const { products, fetchProducts } = useStoreShop();
    const showNotification = useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const data = products.map((item: IProduct, index: number) => {
        return {
            key: index,
            ...item,
        };
    });

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDeleteProduct = async () => {
        try {
            const selectedCode = data
                .filter((item: IProduct & { key: number }) =>
                    selectedRowKeys.includes(item.key)
                )
                .map((item: IProduct) => item.code);

            const documentIDs = await getDocumentIDsByCode({
                selectedCode,
                targetTable: "products",
                params: "code",
            });

            const batch: Promise<void>[] = [];
            documentIDs.forEach((documentID: string) => {
                const documentRef = doc(db, "products", documentID);
                batch.push(deleteDoc(documentRef));
            });

            await Promise.all(batch);
            showNotification("success", "Product deleted", "");
            setSelectedRowKeys([]);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="my-5 mx-10">
            <p className="text-3xl my-5">Danh sách sản phẩm</p>

            <div className="w-full flex justify-end pb-4">
                <Button
                    onClick={() => router.push("products/add")}
                    type="primary"
                    className="mr-5"
                >
                    Thêm mới
                </Button>

                <Popconfirm
                    title="Are you sure to delete this product?"
                    onConfirm={() => handleDeleteProduct()}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button disabled={selectedRowKeys.length === 0} type="primary" danger>
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

export default ProductTable;
