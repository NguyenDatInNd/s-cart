'use client'

import { auth } from "@/firebase/firebase";
import useNotification from "@/hooks/useNotification";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd"
import { GoogleAuthProvider, UserCredential, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const showNotification = useNotification();
    const router = useRouter()

    const provider = new GoogleAuthProvider();

    const handleAuthenticationResult = (userCredential: UserCredential) => {
        const user = userCredential.user;
        showNotification('success', 'Sign in successfully', `Welcome ${user?.displayName}`);
        router.push('/admin');
    };

    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            handleAuthenticationResult(userCredential)
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = async (values: any) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.username, values.password);
            handleAuthenticationResult(userCredential)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-slate-500 h-screen">
            <Card className='w-[600px] flex justify-center items-center'>
                <Form onFinish={onFinish}
                >
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

                    <Button type="primary" htmlType="submit" className="w-full mb-4">
                        Log in
                    </Button>

                    <div className="flex gap-1 justify-center items-center">
                        <Button className="flex gap-1 justify-center items-center bg-slate-200" onClick={signInWithGoogle}>
                            <FcGoogle />   Sign In with Google
                        </Button>

                        <span>Or <Link href="/account/signup">Register now!</Link></span>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp