import { getDocumentIDsByCode } from "@/hooks/useDocumentIDsByCode";
import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { ICategory } from "@/interfaces";
import useStoreShop from "@/store/storeShop";
import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Table } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const columns: TableColumnsType<ICategory> = [
  {
    title: "Hình ảnh",
    dataIndex: "src",
    render: (src: string) => (
      <Image src={src} width={100} height={100} alt="category" />
    ),
  },
  {
    title: "Tên danh mục",
    dataIndex: "name",
  },
  {
    title: "Thao tác",
    render: (_: string, record: ICategory) => (
      <Link href={`/admin/categories/edit/${record.id}`}>Sửa/Xem</Link>
    ),
  },
];

const CategoryTable = () => {
  const router = useRouter();
  const { category, fetchCategory } = useStoreShop();
  const showNotification = useNotification();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const data = category.map((item: ICategory, index: number) => {
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

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <div className="my-5 mx-10">
      <p className="text-3xl my-5">Danh mục sản phẩm</p>

      <div className="w-full flex justify-end pb-4">
        <Button
          onClick={() => router.push("categories/add")}
          type="primary"
          className="mr-5"
        >
          Thêm mới
        </Button>
        <Popconfirm
          title="Are you sure to delete this category?"
          onConfirm={() => handleDeleteCategory()}
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

export default CategoryTable;
