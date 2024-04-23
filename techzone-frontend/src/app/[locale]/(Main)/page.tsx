import HomeCarousel from "@/component/user/HomeCarousel";
import HomeCategoryCarousel from "@/component/user/HomeCategoryCarousel";
import HomeFlashSales from "@/component/user/HomeFlashSales";
import HomeSuggestedProduct from "@/component/user/HomeSuggestedProduct";
import HotSalesProducts from "@/component/user/HotSalesProducts";
import { Flex } from "antd";

// import HotSaleCarousel from "@/component/user/HotSalesProducts";
// import InfinityProductsList from "@/component/user/utils/InfinityProductsList";
// import { ProductItemScaleSize } from "@/component/user/utils/ProductItem";

export default function Home() {



  return (
    <>
      <Flex vertical className="w-full h-full" align="center">
        <HomeCarousel />
        <HomeFlashSales />
        <HomeSuggestedProduct />
        <HomeCategoryCarousel />
        <HotSalesProducts />
        {/* <InfinityProductsList setup={{productsPerRow: 5, productsPerSlide:10, overFlowMaxHeight: "550px", productItemSize: "large"}} /> */}
      </Flex>
    </>
  );
}
