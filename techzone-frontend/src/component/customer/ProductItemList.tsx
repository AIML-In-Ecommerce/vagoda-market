import { ProductType } from "@/model/ProductType";
import { Button, Empty, Pagination, Select, Skeleton, Space } from "antd";
import React, { useMemo, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GrFilter } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";
import ProductItem from "./ProductItem";
interface ProductListProps {
  isFilterOpened: boolean;
  setIsFilterOpened: (show: boolean) => void;
  filterList: string[];
  products: ProductType[];
}
const sortOptions = [
  { value: "Highest rating", label: "Highest rating" },
  { value: "Latest ", label: "Latest" },

  { value: "Top sale", label: "Top sale" },
  { value: "Ascending price", label: "Ascending price" },
  { value: "Descending price", label: "Descending price" },
];

export default function ProductItemList(props: ProductListProps) {
  const maxItemNumber = 5;
  const limit = 5;
  const totalPages =
    props.products.length % maxItemNumber === 0
      ? props.products.length / maxItemNumber
      : (props.products.length - (props.products.length % maxItemNumber)) /
          maxItemNumber +
        1;
  const [page, setPage] = useState(1);

  const displayedProducts = useMemo(() => {
    const startIndex = (page - 1) * maxItemNumber;
    const endIndex = startIndex + maxItemNumber;
    return props.products.slice(startIndex, endIndex);
  }, [page, props.products]);

  const handleDisplayProduct = (page: number) => {
    setPage(page);
  };
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="flex bg-slate-100 m-1 items-center justify-between">
        <div className="flex space-x-1 items-center">
          <Button
            type="primary"
            icon={<GrFilter color="black" />}
            className="bg-white rounded-md border-slate-300 m-1"
            onClick={() => props.setIsFilterOpened(!props.isFilterOpened)}
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
        {props.filterList.map((item, index) => (
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
          className={`grid   ${props.isFilterOpened ? "xl:grid-cols-3" : ""}
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
                  <IoImageOutline style={{ fontSize: 50, color: "#bfbfbf" }} />
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
        total={displayedProducts.length}
        pageSize={maxItemNumber}
        onChange={handleDisplayProduct}
        className="flex justify-center mx-auto mb-4"
      />
    </>
  );
}
