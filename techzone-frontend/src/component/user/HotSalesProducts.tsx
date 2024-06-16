"use client";

import { Flex, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import ProductItem from "../customer/ProductItem";
import CenterTitle from "./utils/CenterTitle";
import Link from "next/link";
import CustomEmpty from "../customer/shop/mini/CustomEmpty";

interface SpecifiedProductsCarouselProp {}

interface ProductItemProps {
  _id: string;
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
  inWishlist: boolean;
}

// enum WrapperType {
//   paddingBlock,
//   infoBlock,
// }

// interface ProductItemPropsWrapper {
//   type: WrapperType;
//   productInfo: ProductItemProps;
// }

const MockData = [
  {
    _id: "sp-01",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    isFlashSale: true,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-02",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    isFlashSale: false,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-03",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 22000000,
    isFlashSale: true,
    originalPrice: 20000000,
    inWishlist: false,
  },
  {
    _id: "sp-04",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    isFlashSale: true,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-05",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    isFlashSale: false,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-06",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 22000000,
    isFlashSale: true,
    originalPrice: 20000000,
    inWishlist: false,
  },
  {
    _id: "sp-07",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    isFlashSale: true,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-08",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    isFlashSale: false,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-09",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 22000000,
    isFlashSale: true,
    originalPrice: 20000000,
    inWishlist: false,
  },
  {
    _id: "sp-10",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    isFlashSale: true,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-11",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    isFlashSale: false,
    originalPrice: 17000000,
    inWishlist: false,
  },
  {
    _id: "sp-12",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 22000000,
    isFlashSale: true,
    originalPrice: 20000000,
    inWishlist: false,
  },
];

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

export default function HotSalesProducts({}: SpecifiedProductsCarouselProp) {
  const titleValue = "Sản phẩm bán chạy";
  const subTitleValue = "Sản phẩm được lựa chọn nhiều trong tuần";
  const titleBackground = "bg-[#F2F2F2]";

  const [products, setProducts] = useState<ProductItemProps[]>([]);

  useEffect(() => {
    //fetch data here

    //for testing
    const data = MockData.map((value) => {
      const item: ProductItemProps = {
        _id: value._id,
        imageLink: value.imageLink,
        name: value.name,
        rating: value.rating,
        soldAmount: value.soldAmount,
        price: value.price,
        isFlashSale: value.isFlashSale,
        originalPrice: value.originalPrice,
        inWishlist: value.inWishlist,
      };

      return item;
    });

    setProducts(data);
  }, []);

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

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center  py-4">
        <Flex
          vertical
          className="container w-full"
          justify="center"
          align="center"
        >
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
            <List
              className="ml-10 w-full"
              pagination={{
                align: "center",
                responsive: true,
                defaultPageSize: 12,
                pageSizeOptions: [12, 8, 6, 4],
                showSizeChanger: true,
                total: products.length,
                locale: { jump_to: "Nhảy đến trang", page: "" },
                showQuickJumper: true,
                showTotal: (total, range) =>
                  // `${range[0]}-${range[1]} of ${total} items`
                  `${range[0]} - ${range[1]} trên tổng ${total} đánh giá`,
              }}
              grid={{
                gutter: { sm: 0, lg: 100, xl: 10 },
                xs: 2,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 6,
                xxl: 6,
              }}
              dataSource={products}
              locale={{
                emptyText: <CustomEmpty />,
              }}
              renderItem={(value, i) => (
                <div key={i}>
                  <List.Item>
                    <Link href={`/product/${value._id}`}>
                      <div className="text-black my-3" key={value._id}>
                        <ProductItem
                          imageLink={value.imageLink}
                          name={value.name}
                          rating={value.rating}
                          soldAmount={value.soldAmount}
                          price={value.price}
                          isFlashSale={value.isFlashSale}
                          originalPrice={value.originalPrice}
                        />
                      </div>
                    </Link>
                  </List.Item>
                </div>
              )}
            />
          )) || <Skeleton active />}

          <div className="invisible h-10 w-full"></div>
        </Flex>
      </div>
    </>
  );
}
