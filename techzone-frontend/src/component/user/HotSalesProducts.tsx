"use client";

import { Flex, List, Skeleton } from "antd";
import { ReactElement, useEffect, useState } from "react";
import ProductItem from "../customer/ProductItem";
import CenterTitle from "./utils/CenterTitle";
import CustomEmpty from "../customer/shop/mini/CustomEmpty";
import { _ProductType } from "@/model/ProductType";
import StatisticsService from "@/services/statistics.service";

interface SpecifiedProductsCarouselProp {
  notify(message: string, content: ReactElement): void;
}

interface ProductItemProps {
  _id: string;
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
  shop: string;
}

// enum WrapperType {
//   paddingBlock,
//   infoBlock,
// }

// interface ProductItemPropsWrapper {
//   type: WrapperType;
//   productInfo: ProductItemProps;
// }

// const paddingBlockProps: ProductItemProps = {
//   _id: "",
//   imageLink: "",
//   name: "padding",
//   rating: 0.0,
//   soldAmount: 0,
//   price: 0,
//   isFlashSale: false,
//   originalPrice: 0,
//   inWishlist: false,
// };

export default function HotSalesProducts({
  notify,
}: SpecifiedProductsCarouselProp) {
  const titleValue = "Sản phẩm bán chạy";
  const subTitleValue = "Sản phẩm được lựa chọn nhiều trong tuần";
  const titleBackground = "bg-[#F2F2F2]";

  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [productDisplay, setProductDisplay] = useState<ProductItemProps[]>([]);

  const numberOfProductToDisplay = 12;
  const [count, setCount] = useState<number>(1); //consider using reducer instead

  // start comment ----------------------------------------------------------------

  // const [mainDisplay, setMainDisplay] = useState<JSX.Element>(
  //   <Skeleton active />
  // );
  // const [currentPagination, setCurrentPagination] = useState<number>(1);
  // const [totalPage, setTotalPage] = useState<number>(4);

  // const productsPerSlide = 12;
  // const productsPerRow = 6;

  // useEffect(() => {
  //   const newDisplay = getSlideOfProductsDisplay(currentPagination - 1);
  //   setMainDisplay(newDisplay);

  //   const newTotalPage = Math.round(products.length / productsPerSlide);
  //   const remainder = products.length % productsPerSlide;

  //   if (remainder != 0) {
  //     setTotalPage(newTotalPage + 1);
  //   } else {
  //     setTotalPage(newTotalPage);
  //   }
  // }, [products]);

  // function getSlideOfProductsDisplay(index: number) {
  //   if (products.length < 1) {
  //     return <Skeleton active />;
  //   }

  //   let result: JSX.Element = <></>;

  //   const startIndex = index * productsPerSlide;
  //   const endIndex =
  //     startIndex + productsPerSlide > products.length
  //       ? products.length
  //       : startIndex + productsPerSlide;
  //   let data = products
  //     .slice(startIndex, endIndex)
  //     .map((value: ProductItemProps) => {
  //       const item: ProductItemPropsWrapper = {
  //         productInfo: value,
  //         type: WrapperType.infoBlock,
  //       };

  //       return item;
  //     });

  //   //insert padding blocks
  //   if (data.length < productsPerSlide) {
  //     const paddingBlocks = new Array(productsPerSlide - data.length)
  //       .fill(paddingBlockProps)
  //       .map((value) => {
  //         const item: ProductItemPropsWrapper = {
  //           productInfo: value,
  //           type: WrapperType.paddingBlock,
  //         };
  //         return item;
  //       });
  //     data = data.concat(paddingBlocks);
  //   }

  //   const numOfRows = productsPerSlide / productsPerRow;

  //   const wrapper: JSX.Element[] = [];
  //   for (let i = 0; i < numOfRows; i++) {
  //     const left = i * productsPerRow;
  //     const right =
  //       left + productsPerRow > data.length
  //         ? data.length
  //         : left + productsPerRow;

  //     const slicedData = data.slice(left, right);

  //     const rowDisplay = slicedData.map(
  //       (valueWrapper: ProductItemPropsWrapper) => {
  //         let isVisible: string = "text-black";
  //         if (valueWrapper.type == WrapperType.paddingBlock) {
  //           isVisible = "text-black invisible";
  //         }
  //         const value = valueWrapper.productInfo;
  //         return (
  //           <Link href={`/product/${value._id}`}>
  //             <div className={isVisible} key={value._id}>
  //               <ProductItem
  //                 imageLink={value.imageLink}
  //                 name={value.name}
  //                 rating={value.rating}
  //                 soldAmount={value.soldAmount}
  //                 price={value.price}
  //                 isFlashSale={value.isFlashSale}
  //                 originalPrice={value.originalPrice}
  //               />
  //             </div>
  //           </Link>
  //         );
  //       }
  //     );

  //     wrapper.push(
  //       <Flex
  //         key={i.toString()}
  //         className="w-full my-3"
  //         justify="space-evenly"
  //         align="center"
  //         gap={3}
  //       >
  //         {rowDisplay}
  //       </Flex>
  //     );
  //   }

  //   // result = <Flex className="w-11/12" vertical={true} justify="center" align="center">
  //   //     {wrapper}
  //   // </Flex>

  //   result = (
  //     <Flex
  //       vertical
  //       className="w-full"
  //       justify="center"
  //       align="center"
  //       gap={16}
  //     >
  //       {wrapper}
  //     </Flex>
  //   );

  //   return result;
  // }

  // function handlePageChange(page: number, pageSize: number) {
  //   const newDisplay = getSlideOfProductsDisplay(page - 1);
  //   setCurrentPagination(page);
  //   setMainDisplay(newDisplay);
  // }

  // end comment ----------------------------------------------------------------

  // call api
  useEffect(() => {
    handleGetProductList();
  }, []);

  const handleGetProductList = async () => {
    const response = await StatisticsService.getHotProducts();
    if (response && response.length > 0) {
      // console.log("product response", response);

      const data: ProductItemProps[] = response.map((value: any) => {
        const mapItem: ProductItemProps = {
          _id: value.productInfo._id,
          name: value.productInfo.name,
          imageLink:
            value.productInfo.images && value.productInfo.images.length > 0
              ? value.productInfo.images[0]
              : "",
          rating: value.productInfo.avgRating,
          soldAmount: value.productInfo.soldQuantity,
          price: value.productInfo.finalPrice,
          originalPrice: value.productInfo.originalPrice,
          isFlashSale: value.productInfo.isFlashSale,
          shop: value.productInfo.shop,
        };
        return mapItem;
      });

      setProducts([...data]);
      // console.log("product", data);

      data.splice(numberOfProductToDisplay);

      setProductDisplay([...data]);
    }
  };
  const handleReadMore = () => {
    // get 6 more after click

    console.log("display", productDisplay);
    let data = [...products];
    data.splice(numberOfProductToDisplay * (count + 1));
    setProductDisplay(data);
    setCount(count + 1);
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center py-4">
        <Flex vertical className="w-full" justify="center" align="center">
          <CenterTitle
            title={titleValue}
            subTitle={subTitleValue}
            isUppercase
            background={titleBackground}
          />
          <div className="invisible h-10 w-full"></div>
          {/* {mainDisplay}
          <div className="h-10 invisible">hidden block</div>
          <Pagination
            defaultCurrent={1}
            current={currentPagination}
            total={totalPage * 10}
            showPrevNextJumpers
            onChange={handlePageChange}
          />
          <div className="invisible h-10 w-full"></div> */}

          {(products && (
            <div className="w-full flex flex-col items-center">
              <List
                className="w-full"
                // pagination={{
                //   align: "center",
                //   responsive: true,
                //   defaultPageSize: 12,
                //   pageSizeOptions: [12, 8, 6, 4],
                //   showSizeChanger: true,
                //   total: products.length,
                //   locale: {
                //     jump_to: "Nhảy đến trang",
                //     page: "",
                //     page_size: "sp/trang",
                //     items_per_page: "sp/trang",
                //   },
                //   showQuickJumper: true,
                //   showTotal: (total, range) =>
                //     `${range[0]} - ${range[1]} trên tổng ${total} đánh giá`,
                // }}
                grid={{
                  gutter: { sm: 0, lg: 100, xl: 10 },
                  xs: 2,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 5,
                  xxl: 6,
                }}
                // dataSource={products}
                dataSource={productDisplay}
                locale={{
                  emptyText: <CustomEmpty />,
                }}
                renderItem={(value, i) => (
                  <div key={i}>
                    <List.Item>
                      <div className="text-black my-3" key={value._id}>
                        <ProductItem
                          _id={value._id}
                          imageLink={value.imageLink}
                          name={value.name}
                          rating={value.rating}
                          soldAmount={value.soldAmount}
                          price={value.price}
                          isFlashSale={value.isFlashSale}
                          originalPrice={value.originalPrice}
                          shop={value.shop}
                          notify={notify}
                        />
                      </div>
                    </List.Item>
                  </div>
                )}
              />

              {productDisplay.length !== products.length && (
                <button onClick={handleReadMore}>Xem thêm</button>
              )}
            </div>
          )) || <Skeleton active />}

          <div className="invisible h-16 w-full"></div>
        </Flex>
      </div>
    </>
  );
}
