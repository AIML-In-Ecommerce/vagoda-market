"use client";
import { Button, Carousel, Flex } from "antd";
// import { useTranslations } from "next-intl";
import ComboItem from "./ComboItem";
import React, { useState } from "react";
import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import { priceIndex } from "./ProductDetail";
import CustomEmpty from "../shop/mini/CustomEmpty";
import { ProductType } from "@/model/ProductType";

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
  // mock data
  const MockData = [
    {
      _id: "6645bab5f4c7faf064f1bcdc",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "6645bbaef4c7faf064f1bce0",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell Vostro",
      rating: 4.5,
      soldAmount: 32,
      price: 17000000,
      flashSale: false,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-03",
      imageLink:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell SuperLight",
      rating: 4.5,
      soldAmount: 10,
      price: 22000000,
      flashSale: true,
      originalPrice: 20000000,
      category: "",
    },
    {
      _id: "sp-04",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
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

  // var and functions
  const [combo, setCombo] = useState<ProductType[]>(MockData);

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
    <div>
      {(combo.length > 0 && (
        <div className="align-middle grid grid-cols-5 gap-5">
          <div className="sm:col-span-3 lg:col-span-4 col-span-5">
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
              slidesToShow={3}
              slidesToScroll={1}
              initialSlide={0}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
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
              {combo.map((item, index) => (
                <div key={index}>
                  <ComboItem
                    _id={item._id}
                    product={item}
                    handleCheckbox={handleCheckbox}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="col-span-1 col-start-1 sm:col-start-4 lg:col-start-5 xl:col-end-6">
            <div className="mx-5 my-10 min-w-32">
              <Flex vertical gap="small">
                <div className="font-semibold">Tổng cộng:</div>
                <div className="text-xl">
                  {priceIndex(comboListData.totalPrice)}
                </div>
                <Button
                  type="primary"
                  danger
                  block
                  size="large"
                  href="/cart"
                  style={{ background: "#5c6856" }}
                >
                  Mua ngay
                </Button>
              </Flex>
            </div>
          </div>
        </div>
      )) || (
        <div className="bg-white p-10 my-5">
          <CustomEmpty />
        </div>
      )}
    </div>
  );
};

export default ComboList;
