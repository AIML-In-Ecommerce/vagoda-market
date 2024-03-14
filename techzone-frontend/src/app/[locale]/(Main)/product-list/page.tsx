"use client";
import ProductItem from "@/component/customer/ProductItem";
import { CiCircleRemove } from "react-icons/ci";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Divider,
  Dropdown,
  Empty,
  GetProp,
  Input,
  InputNumber,
  List,
  MenuProps,
  Pagination,
  Radio,
  RadioChangeEvent,
  Rate,
  Select,
  Skeleton,
  Slider,
  Space,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { GrFilter } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";
import "../../globals.css";
import { IoRemoveOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import ProductItemList from "@/component/customer/ProductItemList";

export default function ProductList() {
  const filterList = ["Dưới 1.000.000", "5 sao", "Laptop", "Màn hình máy tính"];
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);
  type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

  const CheckboxGroup = Checkbox.Group;

  const categories = [
    "Laptop",
    "Điện máy - Điện gia dụng",
    "PC- Máy tính bộ",
    "Màn hình máy tính",
    "Linh kiện máy tính",
    "Phụ kiện máy tính",
    "Game & Stream",
    "Điện thoại & Phụ kiện",
    "Phụ kiện",
    "Thiết bị âm thanh",
    "Thiết bị văn phòng",
    "Khác",
  ];
  const defaultCheckedList = ["Laptop"];

  const [checkedCategoryList, setCheckedCategoryList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = categories.length === checkedCategoryList.length;
  const indeterminate =
    checkedCategoryList.length > 0 &&
    checkedCategoryList.length < categories.length;

  const onChangeCheckboxCategory = (list: CheckboxValueType[]) => {
    setCheckedCategoryList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedCategoryList(e.target.checked ? categories : []);
  };

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
      imageLink:
        "https://ipoint.ae/cdn/shop/products/MacBook-A1708-1_68d90d77-c563-4afe-9359-cf9872da1cc3.jpg?v=1670855829",
      rating: 4.5,
      soldAmount: 2690000,
      price: 500000,
      originalPrice: 794300,
      flashSale: true,
      category: "Category A",
    },
    {
      name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
      rating: 4.0,
      soldAmount: 1565,
      price: 400000,
      flashSale: false,
      originalPrice: 5305000,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
      category: "Category A",
    },
    {
      name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
      rating: 5.0,
      soldAmount: 3032,
      price: 6000000,
      originalPrice: 6500000,
      flashSale: true,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
      category: "Category B",
    },
    {
      name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
      imageLink:
        "https://ipoint.ae/cdn/shop/products/MacBook-A1708-1_68d90d77-c563-4afe-9359-cf9872da1cc3.jpg?v=1670855829",
      rating: 4.5,
      soldAmount: 2690000,
      price: 500000,
      originalPrice: 794300,
      flashSale: true,
      category: "Category A",
    },
    {
      name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
      rating: 4.0,
      soldAmount: 1565,
      price: 400000,
      flashSale: false,
      originalPrice: 5305000,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
      category: "Category A",
    },
    {
      name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
      rating: 5.0,
      soldAmount: 3032,
      price: 6000000,
      originalPrice: 6500000,
      flashSale: true,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
      category: "Category B",
    },
    {
      name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
      imageLink:
        "https://ipoint.ae/cdn/shop/products/MacBook-A1708-1_68d90d77-c563-4afe-9359-cf9872da1cc3.jpg?v=1670855829",
      rating: 4.5,
      soldAmount: 2690000,
      price: 500000,
      originalPrice: 794300,
      flashSale: true,
      category: "Category A",
    },
    {
      name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
      rating: 4.0,
      soldAmount: 1565,
      price: 400000,
      flashSale: false,
      originalPrice: 5305000,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
      category: "Category A",
    },
    {
      name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
      rating: 5.0,
      soldAmount: 3032,
      price: 6000000,
      originalPrice: 6500000,
      flashSale: true,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
      category: "Category B",
    },
    {
      name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
      imageLink:
        "https://ipoint.ae/cdn/shop/products/MacBook-A1708-1_68d90d77-c563-4afe-9359-cf9872da1cc3.jpg?v=1670855829",
      rating: 4.5,
      soldAmount: 2690000,
      price: 500000,
      originalPrice: 794300,
      flashSale: true,
      category: "Category A",
    },
    {
      name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
      rating: 4.0,
      soldAmount: 1565,
      price: 400000,
      flashSale: false,
      originalPrice: 5305000,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
      category: "Category A",
    },
    {
      name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
      rating: 5.0,
      soldAmount: 3032,
      price: 6000000,
      originalPrice: 6500000,
      flashSale: true,
      imageLink:
        "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
      category: "Category B",
    },
  ];
  const filteredProducts = products.filter((product) => {
    // return (
    //   product.name.toLowerCase().includes(searchTerm.toLowerCase()) && true
    //   // (selectedCategory === "" || product.category === selectedCategory)
    // );
    return true;
  });
  const maxItemNumber = 5;
  const limit = 5;
  const totalPages =
    products.length % maxItemNumber === 0
      ? products.length / maxItemNumber
      : (products.length - (products.length % maxItemNumber)) / maxItemNumber +
        1;
  const [page, setPage] = useState(1);

  const displayedProducts = useMemo(() => {
    const startIndex = (page - 1) * maxItemNumber;
    const endIndex = startIndex + maxItemNumber;
    return filteredProducts.slice(startIndex, endIndex);
  }, [page, filteredProducts]);

  const handleDisplayProduct = (page: number) => {
    setPage(page);
  };

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const sortOptions = [
    { value: "Highest rating", label: "Highest rating" },
    { value: "Latest ", label: "Latest" },

    { value: "Top sale", label: "Top sale" },
    { value: "Ascending price", label: "Ascending price" },
    { value: "Descending price", label: "Descending price" },
  ];

  const onChangeRatingFilter = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setRatingFilter(e.target.value);
  };

  const items: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",

      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",

      danger: true,
      disabled: true,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="flex">
      {/* Filter section */}
      {isFilterOpened && (
        <div className="w-1/4 p-4 border-r">
          <div className="flex justify-center mx-auto">
            {" "}
            <GrFilter size={25} color="black" />
            <h2 className="text-xl font-bold mb-4">Filter</h2>
          </div>

          <h3 className="font-semibold mb-4">Giá</h3>
          <Button className="rounded-2xl">Dưới 1.000.000</Button>
          {/* <Button className="rounded-2xl flex items-center space-x-1 mt-1">
            500.000 <IoIosArrowRoundForward /> 1.000.000
          </Button> */}
          <Button className="rounded-2xl flex items-center space-x-1 mt-1">
            1.000.000 <IoIosArrowRoundForward /> 5.000.000
          </Button>
          <Button className="rounded-2xl flex items-center space-x-1 mt-1">
            5.000.000 <IoIosArrowRoundForward /> 10.000.000
          </Button>
          <Button className="rounded-2xl mt-1">Trên 10.000.000</Button>
          <h4 className="text-sm text-slate-500 mt-4">Chọn khoảng giá</h4>
          <div className="w-1/2 flex items-center w-full mt-1">
            <InputNumber
              min={0}
              max={9999999999}
              defaultValue={0}
              className="w-64"
            />
            <IoRemoveOutline size={20} className="mx-4" />
            <InputNumber
              min={10000}
              max={9999999999}
              defaultValue={10000}
              className="w-64"
            />
          </div>
          <Button
            type="default"
            className="flex  mx-auto items-center justify-center mt-2 w-36 border-sky-500 text-sky-500 "
          >
            Áp dụng
          </Button>
          <h3 className="font-semibold my-4">Đánh giá</h3>
          <Radio.Group onChange={onChangeRatingFilter} value={0}>
            <Space direction="vertical">
              <Radio value={0}>All</Radio>
              <Radio value={5}>
                {" "}
                <div className="flex space-x-2 items-center">
                  {" "}
                  <Rate
                    style={{ fontSize: "16px" }}
                    disabled
                    defaultValue={5}
                  />{" "}
                  <p>5 sao</p>
                </div>
              </Radio>
              <Radio value={4}>
                <div className="flex space-x-2 items-center mt-1">
                  {" "}
                  <Rate
                    style={{ fontSize: "16px" }}
                    disabled
                    defaultValue={4}
                  />{" "}
                  <p>từ 4 sao</p>
                </div>
              </Radio>
              <Radio value={3}>
                {" "}
                <div className="flex space-x-2 items-center mt-1">
                  {" "}
                  <Rate
                    style={{ fontSize: "16px" }}
                    disabled
                    defaultValue={3}
                  />{" "}
                  <p>từ 3 sao</p>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
          <h3 className="font-semibold my-4">Danh mục sản phẩm</h3>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>

          <CheckboxGroup
            options={categories}
            value={checkedCategoryList}
            onChange={onChangeCheckboxCategory}
          />
        </div>
      )}
      <div className={`${isFilterOpened ? "w-3/4" : "w-full"} ml-2`}>
        <div className="flex bg-slate-100 m-1 items-center justify-between">
          <div className="flex space-x-1 items-center">
            <Button
              type="primary"
              icon={<GrFilter color="black" />}
              className="bg-white rounded-md border-slate-300 m-1"
              onClick={() => setIsFilterOpened(!isFilterOpened)}
            />

            <div className="text-xs font-semibold">
              {" "}
              We found 231 items for you !
            </div>
          </div>
          <Space className=" items-end border rounded-lg p-2  m-2 text-sm items-center bg-white">
            Sort by:
            <Select
              defaultValue="Hight rating"
              style={{ width: 150 }}
              options={sortOptions}
              className="text-xs"
            />
          </Space>
        </div>
        <div className="flex mt-1 mb-4 bg-slate-100 space-x-4 p-4">
          {filterList.map((item, index) => (
            <div
              key={index}
              className=" flex p-2 rounded-2xl border-black space-x-2 items-center bg-sky-200  text-sm"
            >
              <p>{item}</p>
              <CiCircleRemove size={20} />
            </div>
          ))}
        </div>
        {displayedProducts.length == 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="mt-24"
            description="No items found"
          />
        ) : (
          <div
            className={`grid   ${isFilterOpened ? "xl:grid-cols-3" : ""}
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
         
          gap-4
          gap-x-4px`}
          >
            {displayedProducts.map((product, index) =>
              loading ? (
                <div key={index} className="items-center justify-center">
                  <Skeleton.Node active className="w-lg m-4">
                    <IoImageOutline
                      style={{ fontSize: 50, color: "#bfbfbf" }}
                    />
                  </Skeleton.Node>
                  <Skeleton loading={loading} active></Skeleton>
                </div>
              ) : (
                <div key={index}>
                  <ProductItem
                    key={index}
                    name={product.name}
                    rating={product.rating}
                    soldAmount={product.soldAmount}
                    price={product.price}
                    isFlashSale={product.flashSale}
                    imageLink={product.imageLink}
                    originalPrice={product.originalPrice}
                    inWishlist={true}
                  />
                </div>
              )
            )}
          </div>
        )}
        <Pagination
          showQuickJumper
          current={page}
          defaultCurrent={1}
          total={filteredProducts.length}
          pageSize={maxItemNumber}
          onChange={handleDisplayProduct}
          className="flex justify-center mx-auto mb-4"
        />
        {/* <ProductItemList
          isFilterOpened={isFilterOpened}
          setIsFilterOpened={setIsFilterOpened}
          filterList={filterList}
          products={products}
        /> */}
      </div>
    </div>
  );
}