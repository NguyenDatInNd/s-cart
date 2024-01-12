import Image from 'next/image'
import { Space, Typography } from 'antd';
import Link from 'next/link';

const { Text } = Typography;

const CardNews: React.FC = () => {
    return (
        <div className="w-[367px] h-[525px] flex flex-col ">
            <Link href="/">
                <div className="ImageContainer">
                    <Image className="h-full max-h-[640px]" src="/news/sapa.jpeg" width={367} height={275} alt='sapa' />
                </div>
            </Link>

            <Space size='large' direction='vertical' className="p-10 bg-white">
                <Text type="secondary" className="m-0">2022/12/29 04:54:25</Text>
                <Typography.Title level={3} className='m-0'>Sapa</Typography.Title>
                <Text type="secondary" className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Text>
            </Space>
        </div>
    )
}

export default CardNews