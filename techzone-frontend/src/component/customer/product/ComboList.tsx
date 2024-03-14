"use client";
import {
  Button,
  Carousel,
  Flex,
  List,
  Pagination,
  PaginationProps,
} from "antd";
// import { useTranslations } from "next-intl";
import ComboItem from "./ComboItem";
import { useState, useMemo } from "react";
import React from "react";

const ComboList = () => {
  //   const t = useTranslations("Review");
  // const combo = Array.from("x".repeat(15));

  const combo = [
    {
      id: "string",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
    },
    {
      id: "string",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
    },
    {
      id: "string",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
    },
    {
      id: "string",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
    },
    {
      id: "string",
      imageUrl:
        "https://salt.tikicdn.com/cache/750x750/ts/product/48/b8/5b/cb7defa29b848116d60917e6ce789047.jpg.webp",

      name: "Điện thoại Xiaomi Redmi Note 12 (8GB/128GB) - Hàng chính hãng",
      price: 3850000,
      productUrl: "",
    },
  ];

  const [page, setPage] = useState(1);
  const [itemNumber, setItemNumber] = useState(4);

  const filterData = useMemo(() => {
    return combo.filter((item, index) => {
      return index >= (page - 1) * itemNumber && index < page * itemNumber;
    });
  }, [page, combo]);

  const totalPages =
    combo.length % itemNumber > 0
      ? Math.floor(combo.length / itemNumber) + 1
      : Math.floor(combo.length / itemNumber);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
    setItemNumber(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setPage(pageNumber);
  };

  return (
    <div className="align-middle grid grid-cols-5">
      <div className="col-span-4">
        <Flex vertical>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={filterData}
            renderItem={(item) => (
              <List.Item>
                <ComboItem
                  id={item.id}
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
        </Flex>

        {/* <Carousel arrows afterChange={() => onChange}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={filterData}
          renderItem={(item) => (
            <List.Item>
              <ComboItem
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                productUrl={item.productUrl}
              />
            </List.Item>
          )}
        />
      </Carousel> */}
      </div>

      <div className="col-span-1 col-end-6">
        <div className="my-5 min-w-40">
          <Flex vertical gap="small">
            <div className="font-semibold">Tổng cộng:</div>
            <div className="text-xl">14.186.000 Đ</div>
            <Button type="primary" danger block size="large">
              Mua ngay
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ComboList;
