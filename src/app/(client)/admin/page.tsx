'use client'

import TableCategory from "@/components/admin/TableCategory";
import TableOrder from "@/components/admin/TableOrder";
import TableProducts from "@/components/admin/TableProducts";
import { Layout, Tabs, theme } from "antd";
const { Header, Footer } = Layout;

const AdminPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header className="text-center text-white text-2xl flex items-center justify-center">S-Cart Admin</Header>
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
                            label: <p >Đánh giá sản phẩm</p>,
                            key: '3',
                            children: 'Tab 3',
                        },
                        {
                            label: <p >Quản lý đơn hàng</p>,
                            key: '4',
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