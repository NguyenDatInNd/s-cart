"use client";

import useFileUpload from "@/hooks/useFileUpload";
import { ICategory } from "@/interfaces";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Upload } from "antd";
import Image from "next/image";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";

export interface CategoryFormValues {
  name?: string;
  description?: string;
  src?: string;
  status?: boolean;
  id?: string;
}

interface Props {
  handleClose: () => void;
  onFinish: (values: CategoryFormValues) => void;
  initialValues: CategoryFormValues;
}

const CategoryForm: React.FC<Props> = ({
  handleClose,
  onFinish,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const { previewUrl, image, handleUpload } = useFileUpload(
    "category",
    initialValues as ICategory
  );

  useEffect(() => {
    if (initialValues?.name) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <div>
      <Form
        form={form}
        onFinish={(values) => onFinish({ ...values, src: image, status: true, id: uuid() })}
        layout="vertical"
        requiredMark={false}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả danh mục!" }]}
          style={{ display: "inline-block", width: "100%" }}
        >
          <Input.TextArea placeholder="Nhập mô tả danh mục" />
        </Form.Item>

        <Space size="small" className="mb-5">
          <Form.Item
            name="src"
            label="Ảnh danh mục"
            rules={[{ required: true, message: "Vui lòng chọn ảnh danh mục!" }]}
            style={{ display: "inline-block", width: "90%" }}
          >
            <Upload
              onChange={handleUpload}
              showUploadList={false}
              multiple={false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {(previewUrl || initialValues?.src) && (
            <Image
              src={previewUrl || (initialValues?.src as string)}
              alt="Preview"
              width={250}
              height={200}
            />
          )}
        </Space>

        <Form.Item className="mt-7 flex justify-end">
          <Button
            onClick={() => {
              handleClose();
            }}
            className="mr-5"
          >
            Hủy
          </Button>

          <Button type="primary" htmlType="submit">
            {initialValues?.src ? "Cập nhật danh mục" : "Thêm danh mục"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
