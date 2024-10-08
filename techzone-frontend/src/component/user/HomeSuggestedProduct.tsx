"use client";

import { Carousel, Flex, Skeleton, Typography } from "antd";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { CarouselArrow } from "./utils/CarouselArrow";
import ProductItem from "../customer/ProductItem";
import { ProductDetailType } from "@/model/ProductType";

// import SimpleProductCard from "./utils/SimpleProductCard"

interface HomeSuggestedProductProps {
  notify(message: string, content: ReactElement): void;
}

// interface SimpleProductInfo
// {
//     _id: string,
//     name: string,
//     originalPrice: number,
//     finalPrice: number,
//     status: string,
//     image: string,
// }

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

enum WrapperType {
  paddingBlock,
  infoBlock,
}

interface ProductItemPropsWrapper {
  type: WrapperType;
  productInfo: ProductItemProps;
}

const paddingBlockProps: ProductItemProps = {
  _id: "",
  imageLink: "",
  name: "padding",
  rating: 0.0,
  soldAmount: 0,
  price: 0,
  isFlashSale: false,
  originalPrice: 0,
  shop: "",
};

export default function HomeSuggestedProduct({
  notify,
}: HomeSuggestedProductProps) {
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const numberOfDisplayedProductPerScreen = 5;
  // const gridColumnSpan = 5;
  const SuggestionProductsMoreDetailHref = "#";
  const autoPlayCarouselSpeed = 5000; //ms

  useEffect(() => {
    //fetch data here

    // const data = MockData;
    const data: ProductDetailType[] = [];
    const tr_data: ProductItemProps[] = data.map((value) => {
      const tr_item: ProductItemProps = {
        _id: value._id,
        imageLink: value.images[0],
        name: value.name,
        rating: value.avgRating,
        soldAmount: value.soldQuantity,
        price: value.finalPrice,
        isFlashSale: value.isFlashSale,
        originalPrice: value.originalPrice,
        shop: value.shop,
      };

      return tr_item;
    });

    setProducts(tr_data);
  }, []);

  const productDisplay = () => {
    if (products.length < 1) {
      return <Skeleton active />;
    }

    let result: JSX.Element[] = [];

    const max = products.length / numberOfDisplayedProductPerScreen;

    for (let i = 0; i <= max; i++) {
      const startIndex = i * numberOfDisplayedProductPerScreen;
      const endIndex =
        startIndex + numberOfDisplayedProductPerScreen > products.length
          ? products.length
          : startIndex + numberOfDisplayedProductPerScreen;
      let items = products
        .slice(startIndex, endIndex)
        .map((value: ProductItemProps) => {
          const item: ProductItemPropsWrapper = {
            type: WrapperType.infoBlock,
            productInfo: value,
          };

          return item;
        });

      if (items.length == 0) {
        continue;
      } else if (items.length < numberOfDisplayedProductPerScreen) {
        const paddingBlocks: ProductItemPropsWrapper[] =
          new Array<ProductItemProps>(
            numberOfDisplayedProductPerScreen - items.length
          )
            .fill(paddingBlockProps)
            .map((value: ProductItemProps) => {
              const item: ProductItemPropsWrapper = {
                type: WrapperType.paddingBlock,
                productInfo: value,
              };

              return item;
            });

        items = items.concat(paddingBlocks);
      }

      const row = items.map(
        (valueWrapper: ProductItemPropsWrapper, index: number) => {
          let isInvisible = "text-black";
          if (valueWrapper.type == WrapperType.paddingBlock) {
            isInvisible = "text-black invisible";
          }
          const value = valueWrapper.productInfo;

          return (
            <div key={value._id + index.toString()} className={isInvisible}>
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
          );
        }
      );

      const rowWrapper = (
        <Flex
          key={startIndex.toString() + endIndex.toString()}
          justify="center"
          align="center"
          gap={6}
        >
          {row}
        </Flex>
      );

      result = result.concat(
        <div
          key={i.toString() + startIndex.toString() + endIndex.toString()}
          className="py-3 px-6"
        >
          {rowWrapper}
        </div>
      );
    }

    return result;
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-11/12">
          <div className="invisible h-10 w-full"></div>
          {/* <Card className="w-full"> */}
          <div className="w-full">
            <Flex className="w-full mb-4" align="center">
              <Typography.Text className="text-3xl font-semibold w-full">
                Sản phẩm bạn có thể thích
              </Typography.Text>
              <Flex
                className="w-full px-4"
                justify="end"
                align="center"
                gap={6}
              >
                <Link href={SuggestionProductsMoreDetailHref} prefetch={false}>
                  <Typography.Text className="text-base">
                    Xem thêm
                  </Typography.Text>
                </Link>
                <Typography.Text className="text-base">
                  <AiOutlineRight size={"16px"} />
                </Typography.Text>
              </Flex>
            </Flex>
            <Carousel
              autoplay
              autoplaySpeed={autoPlayCarouselSpeed}
              arrows
              prevArrow={<CarouselArrow direction="left" />}
              nextArrow={<CarouselArrow direction="right" />}
            >
              {productDisplay()}
            </Carousel>
          </div>
          {/* </Card> */}
          <div className="invisible h-10 w-full"></div>
        </div>
      </div>
    </>
  );
}
