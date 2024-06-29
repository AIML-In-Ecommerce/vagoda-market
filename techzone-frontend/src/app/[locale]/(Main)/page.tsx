import AdvertisementCarousel from "@/component/user/AdvertisementCarousel";
import HomeFlashSales from "@/component/user/HomeFlashSales";
import HotCategory from "@/component/user/HotCategory";
import HotSalesProducts from "@/component/user/HotSalesProducts";
import HotShops from "@/component/user/HotShops";
import RecentlyAccess from "@/component/user/RecentlyAccess";
import { Flex } from "antd";

export default function Home() {
  return (
    <>
      <Flex
        vertical
        className="w-full h-full bg-[#F3F3F3]"
        align="center"
        justify="center"
      >
        <AdvertisementCarousel />
        {/* <HomeCarousel /> */}
        <HotCategory />
        <RecentlyAccess />
        <HomeFlashSales />
        <HotShops />

        {/* <HomeSuggestedProduct /> */}
        <HotSalesProducts />
      </Flex>
    </>
  );
}
