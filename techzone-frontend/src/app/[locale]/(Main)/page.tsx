import HomeCarousel from "@/component/user/HomeCarousel";
import HomeCategoryCarousel from "@/component/user/HomeCategoryCarousel";
import HomeFlashSales from "@/component/user/HomeFlashSales";
import HomeSuggestedProduct from "@/component/user/HomeSuggestedProduct";
import HotSalesProducts from "@/component/user/HotSalesProducts";
import { Flex } from "antd";

export default function Home() {
  return (
    <>
      <Flex vertical className="w-full h-full" align="center">
        <HomeCarousel />
        <HomeFlashSales />
        <HomeSuggestedProduct />
        <HomeCategoryCarousel />
        <HotSalesProducts />
      </Flex>
    </>
  );
}
