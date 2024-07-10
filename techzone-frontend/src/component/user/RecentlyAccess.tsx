"use client";

import { Flex, List, Skeleton } from "antd";
import CenterTitle from "./utils/CenterTitle";
import { _ProductType, ProductDetailType } from "@/model/ProductType";
import { ReactElement, useContext, useEffect, useState } from "react";
import ProductItem from "@/component/customer/ProductItem";
import { AuthContext } from "@/context/AuthContext";
import CustomEmpty from "../customer/shop/mini/CustomEmpty";
import StatisticsService from "@/services/statistics.service";

interface RecentlyAccessProps {
  notify(message: string, content: ReactElement): void;
}

function RecentlyAccess({ notify }: RecentlyAccessProps) {
  // const numberOfProductToDisplay = 6;
  const titleValue = "Truy cập gần đây";
  const subTitle = "Sản phẩm đã truy cập trong tuần";
  const titleBackground = "bg-[#F2F2F2]";

  const [products, setProducts] = useState<_ProductType[]>([]);

  // start comment--------------------------------------------------------

  // LHKN: commented
  // const [mainDisplay, setMainDisplay] = useState<JSX.Element[]>(
  //   new Array(numberOfProductToDisplay)
  //     .fill(<Skeleton active />)
  //     .map((item, index) => (
  //       <div key={Math.random() + index.toString()}>{item}</div>
  //     ))
  // );

  // LHKN: commented mock data
  //   useEffect(() => {
  //     //load data here

  //     //for testing

  //     const data = MockData.map((value: ProductDetailType) => {
  //       const mapItem: _ProductType = {
  //         _id: value._id,
  //         name: value.name,
  //         // image: value.images[0].link,
  //         image: value.images[0],
  //         avgRating: value.avgRating,
  //         soldQuantity: value.soldQuantity,
  //         finalPrice: value.finalPrice,
  //         originalPrice: value.originalPrice,
  //         isFlashSale: false,
  //       };

  //       return mapItem;
  //     });

  //     setProducts(data);
  //   }, []);

  // LHKN: commented
  // useEffect(() => {
  //   if (products.length == 0) {
  //     const loadingItems = new Array(numberOfProductToDisplay).fill(
  //       <Skeleton active />
  //     );
  //     const loadingDisplay = loadingItems.map((item, index: number) => {
  //       return (
  //         <div key={Math.random().toString() + "-" + index.toString()}>
  //           {item}
  //         </div>
  //       );
  //     });
  //     setMainDisplay(loadingDisplay);
  //   }
  //   let newDisplay = products.map((item) => {
  //     return (
  //       <Link href={`/product/${item._id}`}>
  //         <div className="text-black" key={item._id}>
  //           <ProductItem
  //             imageLink={item.image}
  //             name={item.name}
  //             rating={item.avgRating}
  //             soldAmount={item.soldQuantity}
  //             price={item.finalPrice}
  //             isFlashSale={item.isFlashSale}
  //             originalPrice={item.originalPrice}
  //           />
  //         </div>
  //       </Link>
  //     );
  //   });

  //   // if(newDisplay.length < numberOfProductToDisplay)
  //   // {
  //   //     const paddings = new Array(numberOfProductToDisplay - newDisplay.length).fill(paddingItem)
  //   //     .map((item: _ProductType, index: number) =>
  //   //     {
  //   //         return(
  //   //             <div key={item._id + Math.random().toString() + "i" + index.toString()} className="invisible">
  //   //                 <ProductItem
  //   //                     imageLink={item.image} name={item.name} rating={item.avgRating} soldAmount={item.soldQuantity}
  //   //                     price={item.finalPrice} isFlashSale={item.isFlashSale} originalPrice={item.originalPrice} inWishlist={false} />
  //   //             </div>
  //   //         )
  //   //     })

  //   //     newDisplay = newDisplay.concat(paddings)
  //   // }

  //   setMainDisplay(newDisplay);
  // }, [products]);

  // end comment----------------------------------------------------------------

  // call api
  const authContext = useContext(AuthContext);
  const userId = authContext?.userInfo?._id;

  useEffect(() => {
    handleGetProductList();
  }, [userId]);

  const handleGetProductList = async () => {
    if (userId) {
      const response = await StatisticsService.getRecentProducts(
        userId,
        "WATCH_DETAIL"
      );
      console.log("products", response);
      if (response && response.length > 0) {
        const data: _ProductType[] = response;

        data.splice(6);

        setProducts(data);
        // console.log("product", data);
      }
    }
  };

  return (
    <div className="w-full flex align-middle items-center">
      {products.length > 0 && (
        <Flex className="w-full py-4" vertical justify="center" align="center">
          <CenterTitle
            title={titleValue}
            subTitle={subTitle}
            isUppercase={true}
            background={titleBackground}
          />
          <div className="invisible h-10 w-full"></div>
          {/* <Flex className="w-full" justify="center" align="center" gap={8}>
          {mainDisplay}
        </Flex> */}

          <div className="w-full">
            {(products && (
              <List
                className="ml-10 w-full"
                grid={{
                  gutter: { xs: 0, xl: 10 },
                  // gutter: 20,
                  xs: 2,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 5,
                  xxl: 6,
                }}
                dataSource={products}
                locale={{
                  emptyText: <CustomEmpty />,
                }}
                renderItem={(item, i) => (
                  <div key={i}>
                    <List.Item>
                      <div className="text-black" key={item._id}>
                        <ProductItem
                          _id={item._id}
                          imageLink={item.images[0]}
                          name={item.name}
                          rating={item.avgRating}
                          soldAmount={item.soldQuantity}
                          price={item.finalPrice}
                          isFlashSale={item.isFlashSale}
                          originalPrice={item.originalPrice}
                          shop={item.shop}
                          notify={notify}
                        />
                      </div>
                    </List.Item>
                  </div>
                )}
              />
            )) || <Skeleton active />}
          </div>
        </Flex>
      )}
    </div>
  );
}

export default RecentlyAccess;
