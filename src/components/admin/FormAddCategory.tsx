import { Button, Form, Input, Space } from "antd"
import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import useNotification from "@/app/hooks/useNotification";
import useFileUpload from "@/app/hooks/useFileUpload";

interface IFormAddCategory {
    handleClose: () => void;
}

const FormAddCategory: React.FC<IFormAddCategory> = ({ handleClose }) => {
    const [form] = Form.useForm();
    const { previewUrl, image, handleUpload, setPreviewUrl } = useFileUpload('category');

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