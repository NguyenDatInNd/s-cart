'use client'

import TableCategory from "@/components/admin/TableCategory";
import TableOrder from "@/components/admin/TableOrder";
import TableProducts from "@/components/admin/TableProducts";
import { auth } from "@/firebase/firebase";
import useNotification from "@/hooks/useNotification";
import { Button, Dropdown, Layout, Menu, MenuProps, Spin, Tabs, theme } from "antd";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Header, Footer } = Layout;
import Image from "next/image";

const AdminPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const showNotification = useNotification();

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true)
            if (user) {
                setUser(user);
                setLoading(false)
            } else {
                setUser(null);
                showNotification('warning', 'Please login to continue', 'You need to login to access this page');
                router.push('/account/login');
                setLoading(false)
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button type="primary" onClick={handleLogout}>
                    Logout
                </Button>
            ),
        }]

    if (loading) {
        return <Spin size='large' tip="Loading" fullscreen />;
    }

    return (
        <Layout>
            <Header className="text-center text-white text-2xl flex items-center justify-between">
                <div className="w-full text-center">
                    S-Cart Admin
                </div>

                {user && (

                    <div className="flex justify-between items-center gap-2 w-72">
                        <span>{user.displayName}</span>

                        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                            <Image src={user.photoURL as string} alt={user.displayName as string} width={32} height={32} className="rounded-full cursor-pointer" />
                        </Dropdown>
                    </div>

                )}
            </Header>
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
                            label: <p >Quản lý đơn hàng</p>,
                            key: '3',
                            children: <TableOrder />,
                        },
                    ]}
                />
            </Layout>
            <Footer className="text-center">Copyright © 2024 S-Cart: Free Open Source eCommerce for Business. All rights reserved.</Footer>
        </Layout>

    );
}

export default AdminPage;