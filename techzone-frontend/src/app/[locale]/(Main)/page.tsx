import HomeCarousel from "@/component/user/HomeCarousel";
import HomeFlashSales from "@/component/user/HomeFlashSales";
import HomeSuggestedProduct from "@/component/user/HomeSuggestedProduct";
import HotCategory from "@/component/user/HotCategory";
import { Flex } from "antd";

// import HotSaleCarousel from "@/component/user/HotSalesProducts";
// import InfinityProductsList from "@/component/user/utils/InfinityProductsList";
// import { ProductItemScaleSize } from "@/component/user/utils/ProductItem";

export default function Home() {



  return (
    <>
      <Flex vertical className="w-full h-full" align="center" justify="center">
        <HomeCarousel />
        <HotCategory />
        <HomeFlashSales />
        {/* <HomeSuggestedProduct /> */}
        {/* <HotSalesProducts /> */}
        {/* <InfinityProductsList setup={{productsPerRow: 5, productsPerSlide:10, overFlowMaxHeight: "550px", productItemSize: "large"}} /> */}
      </Flex>
    </>
  );
}
