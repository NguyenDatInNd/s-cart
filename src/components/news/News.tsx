import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Space, Typography } from 'antd';
import CardNews from './CardNews';

const News: React.FC = () => {
    return (
        <Space size='large' direction='vertical' className="w-full py-20 bg-[#f4f3f3]">
            <Typography.Title className="flex justify-center mb-14">BLOGS</Typography.Title>

            <div className="flex justify-between w-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="w-[93%]"
                >
                    <SwiperSlide>
                        <CardNews />
                    </SwiperSlide>

                    <SwiperSlide>
                        <CardNews />
                    </SwiperSlide>

                    <SwiperSlide>
                        <CardNews />
                    </SwiperSlide>

                    <SwiperSlide>
                        <CardNews />
                    </SwiperSlide>

                    <SwiperSlide>
                        <CardNews />
                    </SwiperSlide>
                </Swiper>
            </div>
        </Space>
    )
}

export default News 