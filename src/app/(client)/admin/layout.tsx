"use client";

import { Button, Dropdown, Layout, MenuProps, Spin, Tabs, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import CategoryTable from "./categories/components/category-table/categoryTable";
import ProductTable from "./products/components/product-table/productTable";
import OrderTable from "./orders/components/order-table/orderTable";
import useNotification from "@/hooks/useNotification";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
const { Header, Footer } = Layout;

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const pathname = usePathname()
  const shouldRenderChil = pathname.split("/")?.length >= 4;

  const handleTabClick = (key: string) => {
    router.push(`/admin/${key}`);
    return;
  };

  const showNotification = useNotification();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          defaultActiveKey="products"
          tabPosition="left"
          style={{
            height: "86vh",
            width: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          items={[
            {
              label: <p>Danh sách sản phẩm </p>,
              key: "products",
              children: <ProductTable />,
            },
            {
              label: <p>Danh mục sản phẩm</p>,
              key: "categories",
              children: <CategoryTable />,
            },
            {
              label: <p>Quản lý đơn hàng</p>,
              key: "orders",
              children: <OrderTable />,
            },
          ]}
          onChange={handleTabClick}
        />

        {shouldRenderChil && <>{children}</>}
        {/* {children} */}
      </Layout>
      <Footer className="text-center">
        Copyright © 2024 S-Cart: Free Open Source eCommerce for Business. All
        rights reserved.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
