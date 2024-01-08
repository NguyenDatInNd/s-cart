import { Carousel } from "antd";
import Image from 'next/image'

const Slider: React.FC = () => {
    return (
        <Carousel autoplay>
            <Image className="h-full max-h-[640px]" src="/banner/banner-home-1.jpg" width={1920} height={600} priority alt='slider-1' />

            <Image className="h-full max-h-[640px]" src="/banner/banner-home-2.jpg" width={1920} height={600} priority alt='slider-2' />
        </Carousel>
    )
}

export default Slider;