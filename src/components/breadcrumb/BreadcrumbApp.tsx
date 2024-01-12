import { ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";

const BreadcrumbApp = () => {
    const pathname = usePathname();
    const path = pathname.split('/').filter((x) => x)

    const breadcrumbItems = path.map((item, index) => {
        const url = index === path.length - 1 ? undefined : `/${path.slice(0, index + 1).join('/')}`;
        return {
            title: item,
            href: url,
        };
    });
    return (
        <div className='py-4 flex justify-center bg-[#f9faf9] text-base uppercase font-semibold'>
            <Breadcrumb separator={<ArrowRightOutlined />} items={[{ title: 'Home', href: '/' }, ...breadcrumbItems]} />
        </div>
    )
}

export default BreadcrumbApp