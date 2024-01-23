"use client";

import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { ICategory } from "@/interfaces";
import { Modal } from "antd";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryForm, {
  CategoryFormValues,
} from "../../components/category/category-form";

const DOCUMENT_TABLE_REFERENCE = collection(db, "category");

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [recordDetail, setRecordDetail] = useState({});
  const handleClose = () => {
    router.push("/admin/categories");
  };

  const showNotification = useNotification();
  const updateCategory = async (category: any) => {
    console.log("category", category);
    try {
      const queryString = query(
        DOCUMENT_TABLE_REFERENCE,
        where("id", "==", params.slug)
      );
      const querySnapshot = await getDocs(queryString);
      const documentID = querySnapshot.docs.map((doc) => doc.id);

      const documentRef = doc(db, "category", documentID[0]);
      await updateDoc(documentRef, category);
      showNotification(
        "success",
        "Updated this category successfully",
        `Updated ${category.name} to shop`
      );
    } catch (error) {
      showNotification("error", "Updated this category failed", `${error}`);
    }
  };
  const onFinish = async (values: CategoryFormValues) => {
    await updateCategory(values);
    handleClose();
  };

  useEffect(() => {
    const getCategoryByID = async () => {
      const queryString = query(DOCUMENT_TABLE_REFERENCE);
      const querySnapshot = await getDocs(queryString);
      const data = querySnapshot.docs
        .map((doc) => doc.data())
        ?.find(
          (doc) => doc.id === params.slug
        ) as ICategory;
      setRecordDetail(data);
    };
    getCategoryByID();
  }, [params.slug]);

  return (
    <Modal
      title="Sửa danh mục sản phẩm"
      open
      centered
      onCancel={handleClose}
      footer
      destroyOnClose
    >
      <CategoryForm
        handleClose={handleClose}
        onFinish={onFinish}
        initialValues={recordDetail}
      />
    </Modal>
  );
}
