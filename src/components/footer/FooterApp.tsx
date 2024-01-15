import { Divider, Input, Space, Typography } from 'antd';
import Link from 'next/link';
import { FloatButton } from 'antd';
import { GrFacebookOption } from "react-icons/gr";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaYoutube, FaTwitter } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { MdPhone, MdEmail } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
const { Text } = Typography;
import Image from "next/image"

const FooterApp: React.FC = () => {
    return (
        <>
            <div className="bg-[#454648] py-[90px] flex justify-center">
                <div className='w-[65%] flex justify-between'>
                    <div className='h-[285px] w-[273px] p-2 flex flex-col '>
                        <Link href="/">
                            <Image src='/icons/scart-mid.png' width={200} height={100} priority alt='scart-icon' />
                        </Link>

                        <Text className="m-0 mt-3 text-[15px] text-gray-400">Demo S-Cart : Free Laravel eCommerce</Text>

                        <Divider className="mt-5 bg-gray-500" />

                        <Space className='text-gray-100' direction='horizontal'>
                            <Link href="/" className='subtext-footer text-gray-100'><GrFacebookOption /></Link>

                            <Link href="/" className='subtext-footer text-gray-100'><FaTwitter /></Link>

                            <Link href="/" className='subtext-footer text-gray-100'><BiLogoInstagramAlt /></Link>

                            <Link href="/" className='subtext-footer text-gray-100'><FaYoutube /></Link>
                        </Space>
                    </div>

                    <div className='h-[285px] w-[273px] p-2 flex flex-col '>
                        <Typography.Title level={3} className="m-0 mt-3 mb-6 text-white">ABOUT US</Typography.Title>

                        <Space className='mb-6' size='middle' direction='vertical'>
                            <Text className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">
                                <RiMapPin2Fill className='text-[#d9a1a3] mr-5' />
                                Address: 123st - abc - xyz
                            </Text>

                            <Text className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">
                                <MdPhone className='text-[#d9a1a3] mr-5' />
                                Hotline: Support: 0987654321
                            </Text>

                            <Text className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">
                                <MdEmail className='text-[#d9a1a3] mr-5' />
                                Email: demo@s-cart.org
                            </Text>
                        </Space>

                        <Space className='relative'>
                            <Input className='w-[185px] h-14' placeholder="Email" />

                            <FloatButton className='h-14 w-14 relative top-0 right-0 btn-send' icon={<BsSendFill className='icon-send' />} />
                        </Space>
                    </div>

                    <div className='h-[285px] w-[273px] p-2 flex flex-col '>
                        <Typography.Title level={3} className="m-0 mt-3 mb-6 text-white">MY PROFILE</Typography.Title>

                        <Space className='mb-6' size='middle' direction='vertical'>
                            <Text className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">
                                My profile
                            </Text>

                            <Text className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">
                                Product compare
                            </Text>

                            <Text className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">
                                Product Wishlist
                            </Text>
                        </Space>
                    </div>
                </div>

            </div>

            <div className="bg-[#f4f3f3] py-[40px] flex justify-center">
                <div className='w-[65%] flex justify-between'>
                    <Text className="m-0 mt-3 text-[15px] text-gray-400 flex items-center">© 2024 Demo S-Cart : Free Laravel eCommerce.  All rights reserved</Text>
                    <Text className="m-0 mt-3 text-[15px] text-gray-400 flex items-center">Power by
                        <Link className='subtext-footer text-gray-400' href="/">
                            S-Cart 8.1.8
                        </Link>
                    </Text>
                    <Link href="/" className="m-0 mt-3 text-[15px] subtext-footer text-gray-400 flex items-center">Fanpage FB</Link>
                </div>
            </div>
        </>
    )
}

export default FooterApp