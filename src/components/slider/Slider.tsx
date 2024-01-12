import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Slider: React.FC = () => {
    return (
        <Swiper
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <Image className="h-full max-h-[640px]" src="/banner/banner-home-1.jpg" width={1920} height={600} priority alt='slider-1' />
            </SwiperSlide>

            <SwiperSlide>
                <Image className="h-full max-h-[640px]" src="/banner/banner-home-2.jpg" width={1920} height={600} priority alt='slider-2' />
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider;