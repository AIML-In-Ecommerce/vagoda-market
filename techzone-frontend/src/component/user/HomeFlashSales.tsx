"use client";

import { ReactElement, useEffect, useState } from "react";
import SimpleProductCard from "./utils/SimpleProductCard";
import { Carousel, List } from "antd";
import { CarouselArrow } from "./utils/CarouselArrow";
import CenterTitle from "./utils/CenterTitle";
import { _ProductType, ProductDetailType } from "@/model/ProductType";
import CustomEmpty from "../customer/shop/mini/CustomEmpty";
import StatisticsService from "@/services/statistics.service";

interface HomeFlashSalesProps {
  notify(message: string, content: ReactElement): void;
}

interface SimpleProductInfo {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  status: string;
  image: string;
  shop: string;
}

// enum WrapperType {
//   paddingBlock,
//   infoBlock,
// }

// interface SimpleProductInfoWrapper {
//   type: WrapperType;
//   productInfo: SimpleProductInfo;
// }

// const paddingBlockProps: SimpleProductInfo = {
//   _id: "",
//   name: "",
//   originalPrice: 0,
//   finalPrice: 0,
//   status: "",
//   image: "",
// };

export default function HomeFlashSales({ notify }: HomeFlashSalesProps) {
  const titleValue = "Giảm giá sốc ";
  const subTitleValue = "MUA NGAY chỉ hôm nay";
  const titleBackground = "bg-[#F2F2F2]";

  const [products, setProducts] = useState<SimpleProductInfo[]>([]);
  // const numberOfDisplayedProductPerScreen = 10;
  // const numberOfDisplayedProductPerRow = 5;

  const cardImageHeight = "180px";
  const cardImageWidth = undefined;

  // const gridColumnSpan = 4

  // const flashSaleMoreDetailHref = "#";

  // useEffect(() => {
  //   //fetch data here

  //   const data = MockData;
  //   const tr_data: SimpleProductInfo[] = data.map((value: any) => {
  //     const tr_item: SimpleProductInfo = {
  //       _id: value._id,
  //       name: value.name,
  //       originalPrice: value.originalPrice,
  //       finalPrice: value.finalPrice,
  //       image: value.image[0],
  //       status: value.status,
  //     };

  //     return tr_item;
  //   });

  //   setProducts(tr_data);
  // }, []);

  // const productDisplay = () => {
  //   if (products.length < 1) {
  //     return <Skeleton active />;
  //   }

  //   let result: JSX.Element[] = [];

  //   const max = products.length / numberOfDisplayedProductPerScreen;

  //   for (let i = 0; i <= max; i++) {
  //     const startIndex = i * numberOfDisplayedProductPerScreen;
  //     const endIndex =
  //       startIndex + numberOfDisplayedProductPerScreen > products.length
  //         ? products.length
  //         : startIndex + numberOfDisplayedProductPerScreen;
  //     const items = products.slice(startIndex, endIndex);
  //     const turn =
  //       numberOfDisplayedProductPerScreen / numberOfDisplayedProductPerRow;
  //     let rows: JSX.Element[] = [];
  //     for (let j = 0; j < turn; j++) {
  //       const leftIndex = j * numberOfDisplayedProductPerRow;
  //       const rightIndex =
  //         (j + 1) * numberOfDisplayedProductPerRow > items.length
  //           ? items.length
  //           : (j + 1) * numberOfDisplayedProductPerRow;
  //       let itemsPerRow = items
  //         .slice(leftIndex, rightIndex)
  //         .map((value: SimpleProductInfo) => {
  //           const item: SimpleProductInfoWrapper = {
  //             type: WrapperType.infoBlock,
  //             productInfo: value,
  //           };

  //           return item;
  //         });
  //       if (itemsPerRow.length < numberOfDisplayedProductPerRow) {
  //         const complements = new Array(
  //           numberOfDisplayedProductPerRow - itemsPerRow.length
  //         )
  //           .fill(paddingBlockProps)
  //           .map((value: SimpleProductInfo) => {
  //             const item: SimpleProductInfoWrapper = {
  //               type: WrapperType.paddingBlock,
  //               productInfo: value,
  //             };

  //             return item;
  //           });

  //         //insert paddings to itemsPerRow
  //         itemsPerRow = itemsPerRow.concat(complements);
  //       }
  //       const row = itemsPerRow.map(
  //         (valueWrapper: SimpleProductInfoWrapper, index: number) => {
  //           let isInvisible = "";
  //           if (valueWrapper.type == WrapperType.paddingBlock) {
  //             isInvisible = "invisible ";
  //           }
  //           const value = valueWrapper.productInfo;

  //           return (
  //             <div
  //               className={isInvisible + "w-full"}
  //               key={value._id + new String(index)}
  //             >
  //               <SimpleProductCard
  //                 info={value}
  //                 imageWidth={cardImageWidth}
  //                 imageHeight={cardImageHeight}
  //               />
  //             </div>
  //           );
  //         }
  //       );
  //       const rowWrapper = (
  //         <Flex
  //           key={j.toString() + leftIndex.toString() + rightIndex.toString()}
  //           className="ư-full mb-3 px-1 h-full"
  //           justify={"space-evenly"}
  //           align="center"
  //           gap={8}
  //         >
  //           {row}
  //         </Flex>
  //       );

  //       rows = rows.concat(rowWrapper);
  //     }

  //     result = result.concat(
  //       <Flex
  //         vertical
  //         className="py-2 w-full h-full"
  //         key={i.toString() + startIndex.toString() + endIndex.toString()}
  //         gap={10}
  //       >
  //         {rows}
  //       </Flex>
  //     );
  //   }

  //   return result;
  // };

  // call api (temporarily)
  // const mockId = "65f1e8bbc4e39014df775166";

  // useEffect(() => {
  //   handleGetProductList();
  // }, [mockId]);

  // const handleGetProductList = async () => {
  //   const response = await POST_GetProductListByShop(mockId);
  //   if (response.status == 200) {
  //     if (response.data) {
  //       const data = response.data;
  //       const tr_data: SimpleProductInfo[] = data.map((value: ProductType) => {
  //         const tr_item: SimpleProductInfo = {
  //           _id: value._id,
  //           name: value.name,
  //           originalPrice: value.originalPrice,
  //           finalPrice: value.price,
  //           image: value.imageLink,
  //           status: "SALE",
  //         };

  //         return tr_item;
  //       });

  //       setProducts(tr_data);
  //       // console.log("product", data);
  //     }
  //   }
  // };

  useEffect(() => {
    handleGetProductList();
  }, []);

  const handleGetProductList = async () => {
    const response =
      (await StatisticsService.getSaleProducts()) as ProductDetailType[];
    console.log("products response", response);
    if (response && response.length > 0) {
      //cast from ProductInfo to SimpleProductInfo
      const castedProducts = response.map((item: ProductDetailType) => {
        const imageDisplayed = item.images.length > 0 ? item.images[0] : "";
        const castedItem: SimpleProductInfo = {
          _id: item._id,
          name: item.name,
          originalPrice: item.originalPrice,
          finalPrice: item.finalPrice,
          status: item.status,
          image: imageDisplayed,
          shop: item.shop,
        };

        return castedItem;
      });
      setProducts(castedProducts);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="invisible h-10 w-full"></div>
      <CenterTitle
        title={titleValue}
        subTitle={subTitleValue}
        isUppercase
        background={titleBackground}
      />
      <div className="invisible h-5 w-full"></div>
      <div className="container w-full">
        <div className="h-full">
          <div className="block">
            {/* double level carousel */}
            {/* <Carousel
                style={{ maxHeight: undefined }}
                className="h-full ml-10"
                autoplay={true}
                arrows
                nextArrow={<CarouselArrow direction="right" />}
                prevArrow={<CarouselArrow direction="left" />}
              >
                {productDisplay()}
              </Carousel> */}

            {/* single level carousel */}
            {products.length < 7 ? (
              <div className="px-10">
                <List
                  grid={{
                    gutter: 5,
                    xs: 2,
                    sm: 2,
                    md: 4,
                    lg: 5,
                    xl: 6,
                    xxl: 6,
                  }}
                  dataSource={products}
                  locale={{
                    emptyText: <CustomEmpty />,
                  }}
                  renderItem={(item: SimpleProductInfo) => (
                    <List.Item>
                      <SimpleProductCard
                        info={item}
                        imageWidth={cardImageWidth}
                        imageHeight={cardImageHeight}
                        notify={notify}
                      />
                    </List.Item>
                  )}
                />
              </div>
            ) : (
              <Carousel
                // autoplay
                // autoplaySpeed={5000}
                arrows
                prevArrow={<CarouselArrow direction="left" />}
                nextArrow={<CarouselArrow direction="right" />}
                slidesToShow={6}
                slidesToScroll={1}
                initialSlide={0}
                responsive={[
                  {
                    breakpoint: 1280,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      initialSlide: 1,
                    },
                  },
                ]}
              >
                {products.length > 0 &&
                  products.map((value, index) => (
                    <div
                      key={index}
                      className="pl-5 text-black pt-5 h-72 flex flex-col items-center"
                    >
                      <SimpleProductCard
                        info={value}
                        imageWidth={cardImageWidth}
                        imageHeight={cardImageHeight}
                        notify={notify}
                      />
                    </div>
                  ))}
              </Carousel>
            )}

            {/* end */}
          </div>
        </div>
        <div className="invisible h-20 w-full"></div>
      </div>
    </div>
  );
}
