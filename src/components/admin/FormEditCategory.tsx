import { Button, Form, Input, Space, Switch } from "antd"
import { db } from "@/firebase/firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useNotification from "@/hooks/useNotification";
import { ICategory } from "@/interfaces";
import useFileUpload from "@/hooks/useFileUpload";

interface IFormEditCategory {
    handleClose: () => void;
    record: ICategory | undefined;
}

const FormEditCategory: React.FC<IFormEditCategory> = ({ record, handleClose }) => {
    const [form] = Form.useForm();
    const { previewUrl, image, handleUpload, setPreviewUrl } = useFileUpload('category', record);

    const initialValues = useMemo(() => {
        return {
            name: record?.name,
            description: record?.description,
            status: record?.status,
        }
    }, [record])

    useEffect(() => {
        form.setFieldsValue(initialValues)
        setPreviewUrl(record?.src);
    }, [record, form, initialValues, setPreviewUrl])

    const showNotification = useNotification();
    const [documentID, setDocumentID] = useState<string[]>([]);

    useEffect(() => {
        const getDocumentIDByName = async (record: any) => {
            const collectionRef = collection(db, 'category');
            const q = query(collectionRef, where('name', '==', record?.name));

            try {
                const querySnapshot = await getDocs(q);
                const documentID = querySnapshot.docs.map((doc) => doc.id);
                setDocumentID(documentID);
            } catch (error) {
                console.error('Error getting document IDs:', error);
            }
        };

        getDocumentIDByName(record);
    }, [record])


    const updateCategory = async (category: any) => {
        try {
            const documentRef = doc(db, 'category', documentID[0]);
            await updateDoc(documentRef, category);
            showNotification('success', 'Updated this category successfully', `Updated ${category.name} to shop`);
        } catch (error) {
            console.log(error);
            showNotification('error', 'Updated this category failed', `${error}`);
        }
    }

    const onFinish = (values: any) => {
        const newCategory = {
            ...values,
            src: image,
            status: values.status,
            description: values.description,
        };

        updateCategory(newCategory);
        handleClose();
        form.resetFields();
        setPreviewUrl('');
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
            requiredMark={false}
            initialValues={initialValues}
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
                rules={[{ required: true, message: 'Vui lòng nhập mô tả danh mục!' }]}
                style={{ display: 'inline-block', width: 'calc(100% - 8px)' }}
            >
                <Input.TextArea placeholder='Nhập mô tả danh mục' />
            </Form.Item>

            <Space size='small' className="mb-5">
                <Form.Item
                    name="src"
                    label="Ảnh danh mục"
                    // rules={[{ required: true, message: 'Vui lòng chọn ảnh danh mục!' }]}
                    style={{ display: 'inline-block', width: '90%' }}
                >
                    <Input type="file" onChange={handleUpload} value={image} />
                </Form.Item>

                {previewUrl &&
                    <Image src={previewUrl} alt="Preview" width={250} height={200} />
                }
            </Space>

            <Form.Item
                name='status'
                label='Trạng thái danh mục'
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Form.Item>

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
                    Cập nhật danh mục
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormEditCategory