'use client'

import TableCategory from "@/components/admin/TableCategory";
import TableProducts from "@/components/admin/TableProducts";
import { products } from "@/data/products";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Layout, Tabs, theme } from "antd";
const { Header, Footer } = Layout;

const AdminPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const imgRef = ref(storage, 'images/1.jpg');

    function handleUpload(event: any) {
        const file = event.target.files[0];
        const storageRef = ref(storage, `/files/${file.name + Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {

                });
            }
        );
        event.target.value = null;

    }

    // async function uploadImages() {
    //     try {
    //         for (const product of products) {
    //             if (product.src) {
    //                 const imageRef = storage.ref(`images/${product.src}`);
    //                 const uploadTask = await imageRef.putString(product.src, "base64");
    //                 const downloadURL = await uploadTask.ref.getDownloadURL();
    //                 product.imageURL = downloadURL;

    //                 // Update the product in Firestore with the image URL
    //                 await db.collection("products").doc(product.id).update({ imageURL: downloadURL });
    //             }
    //         }
    //         console.log("Images uploaded to Cloud Storage!");
    //     } catch (error) {
    //         console.error("Error uploading images:", error);
    //     }
    // }

    // uploadImages();

    return (
        <Layout>
            <input type="file" onChange={handleUpload} />
            <Header className="text-center text-white text-2xl flex items-center justify-center">S-Cart Admin</Header>
            <Layout>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                    style={{ height: '86vh', width: '100%', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    items={[
                        {
                            label: <p >Danh sách sản phẩm </p>,
                            key: '1',
                            children: <TableProducts />,
                        },
                        {
                            label: <p >Danh mục sản phẩm</p>,
                            key: '2',
                            children: <TableCategory />,
                        },
                        {
                            label: <p >Đánh giá sản phẩm</p>,
                            key: '3',
                            children: 'Tab 3',
                        },
                        {
                            label: <p >Quản lý đơn hàng</p>,
                            key: '4',
                            children: 'Tab 3',
                        },
                    ]}
                />
            </Layout>
            <Footer className="text-center">Copyright © 2024 S-Cart: Free Open Source eCommerce for Business. All rights reserved.</Footer>
        </Layout>

    );
}

export default AdminPage;