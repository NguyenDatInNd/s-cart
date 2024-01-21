'use client'

import FlaskSale from "@/components/flashSale/FlashSale"
import NewProducts from "@/components/newProducts/NewProducts"
import News from "@/components/news/News"
import Slider from "@/components/slider/Slider"

const Home: React.FC = () => {
  return (
    <>
      <Slider />

      <div className="px-[255px] bg-white">
        <FlaskSale />
        <NewProducts />
      </div>

      <News />
    </>
  )
}

export default Home