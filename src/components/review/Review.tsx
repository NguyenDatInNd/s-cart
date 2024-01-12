'use client'

import React, { useState } from 'react';
import { Button, Form, Input, Space, message, Rate } from "antd"

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Review: React.FC = () => {
    const [value, setValue] = useState(3);

    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onFill = () => {
        form.setFieldsValue({
            url: 'https://taobao.com/',
        });
    };
    return (
        <div className='flex flex-col gap-10'>
            <Space size='large' direction='vertical'>
                <p className='text-2xl '>PRODUCT REVIEWS</p>

                <Space size='small' direction='vertical'>
                    <div className="flex flex-col gap-[2px]">
                        <p className="text-[10px]">Nguyen Trong Dat</p>
                        <Rate disabled defaultValue={2} />
                        <p className="text-[10px] text-gray-500">2023-12-07 18:17</p>
                    </div>

                    <p className="h-8 bg-gray-100 p-2 text-gray-700">qsfnjqkvqvieqvbeqvi</p>
                </Space>

                <Space size='small' direction='vertical'>
                    <div className="flex flex-col gap-[2px]">
                        <p className="text-[10px]">Nguyen Trong Dat</p>
                        <Rate disabled defaultValue={3} />
                        <p className="text-[10px] text-gray-500">2023-12-07 18:17</p>
                    </div>

                    <p className="h-8 bg-gray-100 p-2 text-gray-700">qsfnjqkvqvieqvbeqvi</p>
                </Space>
            </Space>

            <div>
                <h1 className="text-[47px] text-center">WRITE A REVIEW</h1>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    requiredMark={false}
                >
                    <Form.Item
                        className='review-form'
                        name="name"
                        label="Your name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='review-form'
                        name="review"
                        label="Your review"
                        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item className='review form'>
                        <div className='w-full flex justify-center items-center'>
                            <span className="mr-3">Rating</span>
                            <Rate tooltips={desc} onChange={setValue} value={value} />
                            {value ? <span className="ml-3 mb-1">{desc[value - 1]}</span> : ''}
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <div className='flex justify-center'>
                            <Button className='btn-add-to-cart w-32 h-14 bg-[#e9da5d] uppercase text-center rounded-none mt-5' htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Review