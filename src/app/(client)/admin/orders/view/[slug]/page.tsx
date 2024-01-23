"use client";

import { db } from "@/firebase/firebase";
import { IFormValues } from "@/interfaces";
import { Modal } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderForm from "../../components/order/order-form";

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
                    (doc) => doc.id === params.slug) as IFormValues;
            setRecordDetail(data);
        };
        getOrderByID();
    }, [params.slug]);

    console.log(recordDetail);

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
