"use client";
import { Carousel, Flex, List, Typography } from "antd";
import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import ProductItem from "@/component/customer/ProductItem";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";
import CustomEmpty from "../mini/CustomEmpty";
import { CollectionType } from "@/model/CollectionType";
import { GET_GetCollection } from "@/apis/collection/CollectionAPI";
import { POST_GetProductList } from "@/apis/product/ProductDetailAPI";

interface ProductCarouselProps {
  widget: WidgetType;
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

export default function ProductCarousel(props: ProductCarouselProps) {
  const element = props.widget.element as ProductElement;
  const [collection, setCollection] = useState<CollectionType>();
  const [rawProducts, setRawProducts] = useState<ProductType[]>([]);

  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const SuggestionProductsMoreDetailHref = "#";
  const autoPlayCarouselSpeed = 5000; //ms

  useEffect(() => {
    //process data here
    const data = rawProducts;
    const tr_data: ProductItemProps[] = data.map((value) => {
      const tr_item: ProductItemProps = {
        _id: value._id,
        imageLink: value.imageLink,
        name: value.name,
        rating: value.rating,
        soldAmount: value.soldAmount,
        price: value.price,
        isFlashSale: value.flashSale,
        originalPrice: value.originalPrice,
        shop: value.shop,
      };

      return tr_item;
    });

    setProducts(tr_data);
  }, [rawProducts]);

  // call api
  useEffect(() => {
    handleGetCollection();
  }, [element]);

  useEffect(() => {
    handleGetProductList();
  }, [collection]);

  const handleGetCollection = async () => {
    const response = await GET_GetCollection(element.collectionId);
    if (response.status == 200) {
      if (response.data) {
        setCollection(response.data);
        // console.log("collection", response.data);
      }
    }
  };

  const handleGetProductList = async () => {
    if (!collection) return;
    const response = await POST_GetProductList(collection.productIdList);
    if (response.status == 200) {
      if (response.data) {
        setRawProducts(response.data);
        // console.log("product", data);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl my-5">
      {products.length === 0 ? (
        <div className="p-10">
          <CustomEmpty />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-5">
          <div className="w-full px-10">
            <Flex className="w-full mb-4" align="center">
              <Typography.Text className="mt-3 text-lg uppercase font-semibold w-full">
                {element.title}
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
            {products.length < 4 ? (
              <div className="px-10 mt-5">
                <List
                  grid={{
                    gutter: 5,
                    xs: 0,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 5,
                    xxl: 5,
                  }}
                  dataSource={products}
                  locale={{
                    emptyText: <CustomEmpty />,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="text-black">
                        <ProductItem
                          _id={item._id}
                          imageLink={item.imageLink}
                          name={item.name}
                          rating={item.rating}
                          soldAmount={item.soldAmount}
                          price={item.price}
                          isFlashSale={item.isFlashSale}
                          originalPrice={item.originalPrice}
                          shop={item.shop}
                          notify={props.notify}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            ) : (
              <Carousel
                autoplay
                autoplaySpeed={autoPlayCarouselSpeed}
                arrows
                prevArrow={<CarouselArrow direction="left" />}
                nextArrow={<CarouselArrow direction="right" />}
                slidesToShow={5}
                slidesToScroll={1}
                initialSlide={0}
                responsive={[
                  {
                    breakpoint: 1280,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
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
                        notify={props.notify}
                      />
                    </div>
                  ))}
              </Carousel>
            )}
            <div className="invisible h-5">hidden block</div>
          </div>
        </div>
      )}
    </div>
  );
}
