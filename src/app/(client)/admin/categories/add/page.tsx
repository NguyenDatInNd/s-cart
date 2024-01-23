"use client";

import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { Modal } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import CategoryForm, {
  CategoryFormValues,
} from "../components/category/category-form";
const DOCUMENT_TABLE_REFERENCE = collection(db, "category");

const CategoryAddModal: React.FC = () => {
  const router = useRouter();
  const handleClose = () => {
    router.push("/admin/categories");
  };
  const showNotification = useNotification();

  const addCategory = async (category: any) => {
    try {
      await addDoc(DOCUMENT_TABLE_REFERENCE, category);
      showNotification(
        "success",
        "Add new category successfully",
        `Added ${category.name} to shop`
      );
    } catch (error) {
      showNotification("error", "Add new category failed", `${error}`);
    }
  };

  const onFinish = async (values: CategoryFormValues) => {
    await addCategory(values);
    handleClose();
  };

  return (
    <Modal
      title="Thêm danh mục"
      open
      centered
      onCancel={handleClose}
      footer
      destroyOnClose
    >
      <CategoryForm
        handleClose={handleClose}
        onFinish={onFinish}
        initialValues={{}}
      />
    </Modal>
  );
};

export default CategoryAddModal;
