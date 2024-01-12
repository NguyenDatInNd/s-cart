'use client';

import { Select, Space } from "antd";
import Image from 'next/image'

const LanguageSwitch: React.FC = () => {
    const Us = (
        <Space>
            <Image src="/icons/english.svg" width={22} height={22} priority alt='scart-icon' className='mr-[11px]' />
            <p>ENGLISH</p>
        </Space>
    )

    const Vi = (
        <Space>
            <Image src="/icons/vietnamese.svg" width={22} height={22} priority alt='scart-icon' />
            <p>TIẾNG VIỆT</p>
        </Space>
    )

    const language = [
        { value: 'en', label: Us },
        { value: 'vi', label: Vi },
    ]

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Select size='middle' defaultValue="vi" style={{ width: 145 }} bordered={false} options={language} onChange={handleChange} />
    )
}

export default LanguageSwitch;