"use client";

import useNotification from "@/hooks/useNotification";
import { db } from "@/firebase/firebase";
import { ICategory, IFormValues } from "@/interfaces";
import { Modal } from "antd";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderForm from "../components/order/order-form";
import useStoreAdmin from "@/store/storeAdmin";
import { getDocumentIDsByCode } from "@/hooks/useDocumentIDsByCode";

const DOCUMENT_TABLE_REFERENCE = collection(db, "order");

export default function Page({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const [recordDetail, setRecordDetail] = useState({});
    const handleClose = () => {
        router.push("/admin/orders");
    };

    useEffect(() => {
        const getOrderByID = async () => {
            const queryString = query(DOCUMENT_TABLE_REFERENCE);
            const querySnapshot = await getDocs(queryString);
            const data = querySnapshot.docs
                .map((doc) => doc.data())
                ?.find(
                    (doc) => doc.id === params.slug
                ) as IFormValues;
            setRecordDetail(data);
        };
        getOrderByID();
    }, [params.slug]);


    return (
        <Modal
            title="Xem đơn hàng"
            open
            centered
            onCancel={handleClose}
            footer
            destroyOnClose
        >
            <OrderForm initialValues={recordDetail} />
        </Modal>
    );
}
