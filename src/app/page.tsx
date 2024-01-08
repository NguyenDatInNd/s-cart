'use client'

import FlaskSale from "@/components/flashSale/FlashSale"
import HeaderApp from "@/components/header/HeaderApp"
import Slider from "@/components/slider/Slider"
import { Layout } from "antd"

const Home: React.FC = () => {
  return (
    <>
      <HeaderApp />

      <Layout className="">
        <Slider />

        <FlaskSale />
      </Layout>

    </>
  )
}

export default Home