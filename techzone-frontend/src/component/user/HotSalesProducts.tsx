"use client";

import { Divider, Flex, Pagination, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import ProductItem from "../customer/ProductItem";
import CenterTitle from "./utils/CenterTitle";
import Link from "next/link";

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

enum WrapperType {
  paddingBlock,
  infoBlock,
}

interface ProductItemPropsWrapper {
  type: WrapperType;
  productInfo: ProductItemProps;
}

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

const paddingBlockProps: ProductItemProps = {
  _id: "",
  imageLink: "",
  name: "padding",
  rating: 0.0,
  soldAmount: 0,
  price: 0,
  isFlashSale: false,
  originalPrice: 0,
  inWishlist: false,
};

export default function HotSalesProducts({}: SpecifiedProductsCarouselProp) {
  const titleValue = "Sản phẩm bán chạy";
  const subTitleValue = "Sản phẩm được lựa chọn nhiều trong tuần";
  const titleBackground = "bg-[#F2F2F2]";

  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const [mainDisplay, setMainDisplay] = useState<JSX.Element>(
    <Skeleton active />
  );
  const [currentPagination, setCurrentPagination] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(4);

  const productsPerSlide = 10;
  const productsPerRow = 5;

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

  useEffect(() => {
    const newDisplay = getSlideOfProductsDisplay(currentPagination - 1);
    setMainDisplay(newDisplay);

    const newTotalPage = Math.round(products.length / productsPerSlide);
    const remainder = products.length % productsPerSlide;

    if (remainder != 0) {
      setTotalPage(newTotalPage + 1);
    } else {
      setTotalPage(newTotalPage);
    }
  }, [products]);

  function getSlideOfProductsDisplay(index: number) {
    if (products.length < 1) {
      return <Skeleton active />;
    }

    let result: JSX.Element = <></>;

    const startIndex = index * productsPerSlide;
    const endIndex =
      startIndex + productsPerSlide > products.length
        ? products.length
        : startIndex + productsPerSlide;
    let data = products
      .slice(startIndex, endIndex)
      .map((value: ProductItemProps) => {
        const item: ProductItemPropsWrapper = {
          productInfo: value,
          type: WrapperType.infoBlock,
        };

        return item;
      });

    //insert padding blocks
    if (data.length < productsPerSlide) {
      const paddingBlocks = new Array(productsPerSlide - data.length)
        .fill(paddingBlockProps)
        .map((value) => {
          const item: ProductItemPropsWrapper = {
            productInfo: value,
            type: WrapperType.paddingBlock,
          };
          return item;
        });
      data = data.concat(paddingBlocks);
    }

    const numOfRows = productsPerSlide / productsPerRow;

    const wrapper: JSX.Element[] = [];
    for (let i = 0; i < numOfRows; i++) {
      const left = i * productsPerRow;
      const right =
        left + productsPerRow > data.length
          ? data.length
          : left + productsPerRow;

      const slicedData = data.slice(left, right);

      const rowDisplay = slicedData.map(
        (valueWrapper: ProductItemPropsWrapper) => {
          let isVisible: string = "text-black";
          if (valueWrapper.type == WrapperType.paddingBlock) {
            isVisible = "text-black invisible";
          }
          const value = valueWrapper.productInfo;
          return (
            <Link href={`/product/${value._id}`}>
              <div className={isVisible} key={value._id}>
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
          );
        }
      );

      wrapper.push(
        <Flex
          key={i.toString()}
          className="w-full"
          justify="space-evenly"
          align="center"
          gap={6}
        >
          {rowDisplay}
        </Flex>
      );
    }

    // result = <Flex className="w-11/12" vertical={true} justify="center" align="center">
    //     {wrapper}
    // </Flex>

    result = (
      <Flex
        vertical
        className="w-full"
        justify="center"
        align="center"
        gap={16}
      >
        {wrapper}
      </Flex>
    );

    return result;
  }

  function handlePageChange(page: number, pageSize: number) {
    const newDisplay = getSlideOfProductsDisplay(page - 1);
    setCurrentPagination(page);
    setMainDisplay(newDisplay);
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center  py-4">
        <Flex
          vertical
          className="container w-full"
          justify="center"
          align="center"
        >
          {/* <div className="w-full pb-4">
                        <Flex justify="start" align="center">
                            <Typography.Text className="text-3xl font-semibold w-full pt-4">
                                Sản phẩm bán chạy
                            </Typography.Text>
                        </Flex>
                        <Flex className="w-full mt-4" align="baseline">
                                <div className="w-80 h-1 bg-[#683A25] mb-4"></div>
                                <div className="w-full h-px bg-gray-200 mb-4"></div>
                        </Flex>
                    </div> */}
          <CenterTitle
            title={titleValue}
            subTitle={subTitleValue}
            isUppercase
            background={titleBackground}
          />
          <div className="invisible h-10 w-full"></div>
          {mainDisplay}
          <div className="h-10 invisible">hidden block</div>
          <Pagination
            defaultCurrent={1}
            current={currentPagination}
            total={totalPage * 10}
            showPrevNextJumpers
            onChange={handlePageChange}
          />
          <div className="invisible h-10 w-full"></div>
        </Flex>
      </div>
    </>
  );
}
