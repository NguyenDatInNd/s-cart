"use client";

import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { IProduct } from "@/interfaces";
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
import { ProductFormValues } from "../../components";
import ProductForm from "../../components/product/product-form";

const DOCUMENT_TABLE_REFERENCE = collection(db, "products");

export default function Page({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [recordDetail, setRecordDetail] = useState({});
    const handleClose = () => {
        router.push("/admin/products");
    };

    const showNotification = useNotification();
    const updateProduct = async (product: any) => {
        console.log("product", product);
        try {
            const queryString = query(
                DOCUMENT_TABLE_REFERENCE,
                where("id", "==", params.slug)
            );
            const querySnapshot = await getDocs(queryString);
            const documentID = querySnapshot.docs.map((doc) => doc.id);

            const documentRef = doc(db, "products", documentID[0]);
            await updateDoc(documentRef, product);
            showNotification(
                "success",
                "Updated this product successfully",
                `Updated ${product.name} to shop`
            );
        } catch (error) {
            console.error("Error updating document:", error);
            showNotification("error", "Updated this product failed", `${error}`);
        }
    };
    const onFinish = async (values: ProductFormValues) => {
        await updateProduct(values);
        handleClose();
    };

    useEffect(() => {
        const getProductByID = async () => {
            const queryString = query(DOCUMENT_TABLE_REFERENCE);
            const querySnapshot = await getDocs(queryString);
            const data = querySnapshot.docs
                .map((doc) => doc.data())
                ?.find(
                    (doc) => doc.id === params.slug
                ) as IProduct;

            const updateData = {
                ...data,
                priceSale: Number(data?.priceSale) ? [data?.priceSale] : [],
                category: data?.category ?? '',
            }
            setRecordDetail(updateData);
        };
        getProductByID();
    }, [params.slug]);

    return (
        <Modal
            title="Sửa sản phẩm"
            open
            centered
            onCancel={handleClose}
            footer
            destroyOnClose
        >
            <ProductForm
                handleClose={handleClose}
                onFinish={onFinish}
                initialValues={recordDetail}
            />
        </Modal>
    );
}
