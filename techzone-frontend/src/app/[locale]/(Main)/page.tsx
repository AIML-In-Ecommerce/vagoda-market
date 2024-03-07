import HomeCarousel from "@/component/user/HomeCarousel";
import HomeFlashSales from "@/component/user/HomeFlashSales";
import HomeSuggestedProduct from "@/component/user/HomeSuggestedProduct";
import { Flex } from "antd";


export default function Home() {



  return (
    <>
      <Flex vertical className="w-full h-full" align="center" gap={"6px"}>
        <HomeCarousel />
        <HomeFlashSales />
        <HomeSuggestedProduct />
      </Flex>
    </>
  );
}
