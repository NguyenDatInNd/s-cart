'use client'

import { auth } from "@/firebase/firebase";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd"
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const onFinish = async (values: any) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.username, values.password);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-slate-500 h-screen">
            <Card className='w-[600px] flex justify-center items-center'>
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <div className="flex justify-between mb-7">
                        <Button type="primary" htmlType="submit" className="w-full">
                            Register
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp