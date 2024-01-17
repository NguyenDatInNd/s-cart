import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Switch } from "antd"
import { db, storage } from "@/firebase/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import Image from "next/image";
import useNotification from "@/app/hooks/useNotification";

interface IFormAddCategory {
    handleClose: () => void;
}

const FormAddCategory: React.FC<IFormAddCategory> = ({ handleClose }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const showNotification = useNotification();

    const docRef = collection(db, 'category');
    const addProduct = async (category: any) => {
        try {
            await addDoc(docRef, category);
            showNotification('success', 'Add new category successfully', `Added ${category.name} to shop`);
        } catch (error) {
            console.log(error);
            showNotification('error', 'Add new category failed', `${error}`);
        }
    }

    const onFinish = (values: any) => {
        const newValue = { ...values, src: image, status: true };
        addProduct(newValue);
        handleClose();
        form.resetFields();
    };

    function handleUpload(event: any) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        const storageRef = ref(storage, `/category/${file.name + Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImage(url);
                    setPreviewUrl(URL.createObjectURL(file));
                });
            }
        );
        event.target.value = null;
    }

    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'
                requiredMark={false}
            >
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input placeholder='Nhập tên danh mục' />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả  danh mục!' }]}
                    style={{ display: 'inline-block', width: 'calc(100% - 8px)' }}
                >
                    <Input.TextArea placeholder='Nhập mô tả danh mục' />
                </Form.Item>

                <Space size='small' className="mb-5">
                    <Form.Item
                        name="src"
                        label="Ảnh danh mục"
                        rules={[{ required: true, message: 'Vui lòng chọn ảnh  danh mục!' }]}
                        style={{ display: 'inline-block', width: '90%' }}
                    >
                        <Input type="file" onChange={handleUpload} value={image} />
                    </Form.Item>

                    {previewUrl &&
                        <Image src={previewUrl} alt="Preview" width={250} height={200} />
                    }
                </Space>

                <Form.Item className="mt-7 flex justify-end">
                    <Button
                        onClick={() => {
                            handleClose();
                            form.resetFields();
                            setPreviewUrl('');
                        }}
                        className="mr-5">
                        Hủy
                    </Button>

                    <Button type="primary" htmlType="submit">
                        Thêm danh mục
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormAddCategory