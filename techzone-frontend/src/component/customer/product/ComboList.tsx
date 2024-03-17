"use client";
import {
  Button,
  Carousel,
  Empty,
  Flex,
  List,
  Pagination,
  PaginationProps,
  Skeleton,
} from "antd";
// import { useTranslations } from "next-intl";
import ComboItem, { ComboItemProps } from "./ComboItem";
import { useState, useMemo } from "react";
import React from "react";
import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import { priceIndex } from "./ProductDetail";

interface ComboListProps {
  // initial price before adding the combo price
  totalPrice: number;
  totalComboPrice: number;
  updateTotalComboPrice: (price: number) => void;
  comboIdList: Array<string>;
  setComboIdList: (list: Array<string>) => void;
}

const ComboList = (comboListData: ComboListProps) => {
  //   const t = useTranslations("Review");
  // const combo = Array.from("x".repeat(15));

  const combo = [
    {
      _id: "1",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "2",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "3",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "4",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "5",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
  ];

  // pagination
  // const [page, setPage] = useState(1);
  // const [itemNumber, setItemNumber] = useState(3);

  // const filterData = useMemo(() => {
  //   return combo.filter((item, index) => {
  //     return index >= (page - 1) * itemNumber && index < page * itemNumber;
  //   });
  // }, [page, combo]);

  // const totalPages =
  //   combo.length % itemNumber > 0
  //     ? Math.floor(combo.length / itemNumber) + 1
  //     : Math.floor(combo.length / itemNumber);

  // const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  //   current,
  //   pageSize
  // ) => {
  //   console.log(current, pageSize);
  //   setItemNumber(pageSize);
  // };

  // const onChange: PaginationProps["onChange"] = (pageNumber) => {
  //   console.log("Page: ", pageNumber);
  //   setPage(pageNumber);
  // };
  // end pagination

  // carousel
  // const autoPlayCarouselSpeed = 5000; //ms
  const numberOfDisplayedProductPerScreen = 3;

  enum WrapperType {
    paddingBlock,
    infoBlock,
  }

  interface ProductItemPropsWrapper {
    type: WrapperType;
    productInfo: ComboItemProps;
  }

  const paddingBlockProps: ComboItemProps = {
    _id: "",
    imageUrl: "",
    name: "padding",
    price: 0,
    productUrl: "",
    handleCheckbox: () => {},
  };

  const productDisplay = () => {
    if (combo.length < 1) {
      return <Skeleton active />;
    }

    let result: JSX.Element[] = [];

    const max = combo.length / numberOfDisplayedProductPerScreen;

    for (let i = 0; i <= max; i++) {
      const startIndex = i * numberOfDisplayedProductPerScreen;
      const endIndex =
        startIndex + numberOfDisplayedProductPerScreen > combo.length
          ? combo.length
          : startIndex + numberOfDisplayedProductPerScreen;
      let items = combo
        .slice(startIndex, endIndex)
        .map((value: ComboItemProps) => {
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
          new Array<ComboItemProps>(
            numberOfDisplayedProductPerScreen - items.length
          )
            .fill(paddingBlockProps)
            .map((value: ComboItemProps) => {
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
          let isInvisible = "";
          if (valueWrapper.type == WrapperType.paddingBlock) {
            isInvisible = "invisible";
          }
          const item = valueWrapper.productInfo;

          return (
            <div key={item._id + index.toString()} className={isInvisible}>
              <ComboItem
                _id={item._id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                productUrl={item.productUrl}
                handleCheckbox={handleCheckbox}
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
        >
          {row}
        </Flex>
      );

      result = result.concat(
        <div key={i.toString() + startIndex.toString() + endIndex.toString()}>
          {rowWrapper}
        </div>
      );
    }

    return result;
  };

  const handleCheckbox = (isChecked: boolean, id: string, price: number) => {
    let tempTotalPrice = comboListData.totalComboPrice;
    if (isChecked) {
      tempTotalPrice += price;
      comboListData.comboIdList.push(id);
    } else {
      tempTotalPrice -= price;
      comboListData.setComboIdList(
        comboListData.comboIdList.filter((i) => i !== id)
      );
    }
    comboListData.updateTotalComboPrice(tempTotalPrice);
  };

  return (
    <div className="align-middle grid grid-cols-5 gap-5">
      {combo.length == 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>Không có</span>}
        />
      )}

      {combo.length > 0 && (
        <div>
          <div className="lg:col-span-4 col-span-5">
            {/* pagination */}
            {/* <Flex vertical>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={filterData}
            renderItem={(item) => (
              <List.Item>
                <ComboItem
                  _id={item._id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  productUrl={item.productUrl}
                />
              </List.Item>
            )}
          />

          <div className="m-3">
            <Pagination
              showQuickJumper
              showTotal={(total, range) =>
                // `${range[0]}-${range[1]} of ${total} items`
                `Từ ${range[0]} đến ${range[1]} trên tổng ${total} lựa chọn`
              }
              defaultCurrent={page}
              defaultPageSize={itemNumber}
              total={combo.length}
              onChange={onChange}
              showLessItems={true}
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </Flex> */}

            <Carousel
              // autoplay
              // autoplaySpeed={autoPlayCarouselSpeed}
              arrows
              prevArrow={<CarouselArrow direction="left" />}
              nextArrow={<CarouselArrow direction="right" />}
              style={{ padding: 40 }}
            >
              {productDisplay()}
            </Carousel>
          </div>

          <div className="col-span-1 lg:col-start-5 lg:col-end-6 md:col-start-1 sm:col-start-1">
            <div className="my-5 min-w-40">
              <Flex vertical gap="small">
                <div className="font-semibold">Tổng cộng:</div>
                <div className="text-xl">
                  {priceIndex(comboListData.totalPrice)}
                </div>
                <Button type="primary" danger block size="large">
                  Mua ngay
                </Button>
              </Flex>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComboList;
