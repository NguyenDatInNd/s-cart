'use client'

import FooterApp from '@/components/footer/FooterApp'
import HeaderApp from '@/components/header/HeaderApp'
import { FloatButton, Layout } from 'antd'

interface IMainLayout {
    children: React.ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
    return (
        <>
            <Layout>
                <HeaderApp />
                <main className="z-0">{children}</main>
                <FooterApp />
                <FloatButton.BackTop duration={1200} className="h-12 w-12 opacity-55" />
            </Layout>
        </>
    )
}