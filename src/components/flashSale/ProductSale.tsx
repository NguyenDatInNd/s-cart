"use client"

import { useEffect, useState } from 'react';
import { Progress, Typography } from 'antd';
const { Text } = Typography;
import Image from 'next/image'
import Link from 'next/link';
import { IProduct } from '@/interfaces';

const ProductSale: React.FC<IProduct> = (props) => {
    const { price, amount, name, src, code, priceSale, id } = props;
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2024-12-31T23:59:59');

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(interval);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='flex flex-row h-64 w-[540px] rounded-3xl border-red-500 border-2'>
            <div className='flex items-center'>
                <Link href={`/detail/${id?.replace(/\s+/g, '-').toLowerCase()}`} key={code}>
                    <Image className='w-[180px] h-[145px]' src={src} width={200} height={150} alt={name} />
                </Link>
            </div>

            <div className='flex items-center justify-between flex-col flex-1 py-7 px-5'>
                <Link href={`/detail/${id?.replace(/\s+/g, '-').toLowerCase()}`} key={code}>
                    <Typography.Title className='subtext-footer' level={4}>
                        {name}
                    </Typography.Title >
                </Link>


                <div className='flex flex-row justify-center w-full'>
                    <Text className='text-base px-4 text-gray-500' delete>${price}</Text>
                    <Text className='text-base text-[#d9a1a3]'>${priceSale}</Text>
                </div>

                <div className='flex flex-row justify-center w-full'>
                    <Text type="secondary" className='text-lg px-4'>Already Sold: {Number(amount) + 80}</Text>
                    <Text type="secondary" className='text-lg'>Available: {amount}</Text>
                </div>

                <Progress percent={30} showInfo={false} strokeColor='#FF324D' className='w-full' />

                <div className='flex flex-row w-full justify-between'>
                    <div className='bg-gray-200 text-base w-[73px] h-[69px] p-1 flex flex-col justify-center items-center'>{countdown.days}
                        <span>Days</span>
                    </div>

                    <div className='bg-gray-200 text-base w-[73px] h-[69px] p-1 flex flex-col justify-center items-center'>{countdown.hours}
                        <span>Hours</span>
                    </div>

                    <div className='bg-gray-200 text-base w-[73px] h-[69px] p-1 flex flex-col justify-center items-center'>{countdown.minutes}
                        <span>Minutes</span>
                    </div>

                    <div className='bg-gray-200 text-base w-[73px] h-[69px] p-1 flex flex-col justify-center items-center'>{countdown.seconds}
                        <span>Seconds</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSale