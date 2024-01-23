"use client";

import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { Modal } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ProductFormValues } from "../components";
import ProductForm from "../components/product/product-form";
const DOCUMENT_TABLE_REFERENCE = collection(db, "products");

const ProductAddModal: React.FC = () => {
    const router = useRouter();
    const handleClose = () => {
        router.push("/admin/products");
    };
    const showNotification = useNotification();

    const addProduct = async (products: any) => {
        try {
            await addDoc(DOCUMENT_TABLE_REFERENCE, products);
            showNotification(
                "success",
                "Add new products successfully",
                `Added ${products.name} to shop`
            );
        } catch (error) {
            showNotification("error", "Add new products failed", `${error}`);
        }
    };

    const onFinish = async (values: ProductFormValues) => {
        await addProduct(values);
        handleClose();
    };

    console.log("ProductAddModal");

    return (
        <Modal
            title="Thêm sản phẩm"
            open
            centered
            onCancel={handleClose}
            footer
            destroyOnClose
        >
            <ProductForm
                handleClose={handleClose}
                onFinish={onFinish}
                initialValues={{}}
            />
        </Modal>
    );
};

export default ProductAddModal;
