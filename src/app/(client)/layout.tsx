'use client'

import FooterApp from '@/components/footer/FooterApp'
import HeaderApp from '@/components/header/HeaderApp'
import { FloatButton, Layout } from 'antd'
import { usePathname } from "next/navigation";

interface IMainLayout {
    children: React.ReactNode
}

export default function MainLayout({ children }: IMainLayout) {
    const pathname = usePathname();
    const path = pathname.split('/').filter((x) => x)

    return (
        <>
            <Layout>
                {!path.includes('admin') && <HeaderApp />}
                <main className="z-0">{children}</main>
                {!path.includes('admin') && <>
                    <FooterApp />
                    <FloatButton.BackTop duration={1200} className="h-12 w-12 opacity-55" />
                </>}

            </Layout>
        </>
    )
}