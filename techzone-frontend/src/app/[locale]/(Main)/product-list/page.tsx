"use client";
import ProductItem from "@/component/customer/ProductItem";
import { Button, Dropdown, MenuProps, Pagination, Select, Space } from "antd";
import React, { useMemo, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { GrFilter } from "react-icons/gr";

export default function ProductList() {
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
      inWishlist: true,
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
      inWishlist: false,
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
      inWishlist: true,
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
      inWishlist: true,
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
      inWishlist: false,
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
      inWishlist: true,
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
      inWishlist: true,
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
      inWishlist: false,
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
      inWishlist: true,
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
      inWishlist: true,
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
      inWishlist: false,
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
      inWishlist: true,
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
    { value: "Ascending price", label: "Featured" },
    { value: "Descending price", label: "Featured" },
  ];
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
          <h2 className="text-xl font-bold mb-4">Filter</h2>
          {/* Add your filter options here */}
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 mb-4 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border p-2 mb-4 w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Category A">Category A</option>
            <option value="Category B">Category B</option>
            <option value="Category C">Category C</option>
          </select>
        </div>
      )}
      <div className={`${isFilterOpened ? "w-3/4" : "w-full"} ml-2`}>
        <div className="flex bg-slate-100 m-1 items-center justify-between">
          <div className="flex space-x-1 items-center">
            <Button
              type="primary"
              icon={<GrFilter color="black" />}
              className="bg-white rounded-md border-slate-300"
              onClick={() => setIsFilterOpened(!isFilterOpened)}
            />

            <div className="text-xs font-semibold">
              {" "}
              We found 231 items for you !
            </div>
          </div>
          <Space className=" items-end border rounded-lg p-2  m-2 text-sm items-center bg-white">
            Sort by:
            {/* <HiChevronDown size={15} /> */}
            <Select
              defaultValue="Hight rating"
              style={{ width: 120 }}
              options={sortOptions}
              className="text-xs"
            />
          </Space>
        </div>
        <div className="flex mt-1 mb-4 bg-slate-100 "> hello</div>

        <div className="grid grid-cols-4 auto-rows-auto gap-2">
          {displayedProducts.map((product, index) => (
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
                inWishlist={product.inWishlist}
              />
            </div>
          ))}
        </div>
        <Pagination
          showQuickJumper
          current={page}
          defaultCurrent={1}
          total={filteredProducts.length}
          pageSize={maxItemNumber}
          onChange={handleDisplayProduct}
          className="flex justify-center mx-auto mb-4"
        />
      </div>

      {/* <Pagination
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={handleDisplayProduct}
      /> */}
    </div>
  );
}
