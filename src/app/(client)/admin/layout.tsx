"use client";

import { Layout, Tabs, theme } from "antd";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import CategoryTable from "./categories/components/category-table/categoryTable";
import ProductTable from "./products/components/product-table/productTable";
import OrderTable from "./orders/components/order-table/orderTable";
const { Header, Footer } = Layout;

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const handleTabClick = (key: string) => {
    router.push(`/admin/${key}`);
    return;
  };

  return (
    <Layout>
      <Header className="text-center text-white text-2xl flex items-center justify-center">
        S-Cart Admin
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
      </Layout>
      <Footer className="text-center">
        Copyright © 2024 S-Cart: Free Open Source eCommerce for Business. All
        rights reserved.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
