import { FilterCriteria } from "@/app/[locale]/(Main)/product-list/page";
import { ProductType } from "@/model/ProductType";
import {
  Button,
  ConfigProvider,
  Divider,
  Empty,
  Pagination,
  Select,
  Skeleton,
  Space,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import ProductItem, { formatPrice } from "./ProductItem";
interface ProductListProps {
  isFilterOpened: boolean;
  setIsFilterOpened: (show: boolean) => void;
  filterList: FilterCriteria[];
  products: ProductType[];
  removeFilter: (key: string, value: any) => void;
}
const sortOptions = [
  { value: "Đánh giá cao nhất", label: "Đánh giá cao nhất" },
  { value: "Bán chạy nhất", label: "Bán chạy nhất" },
  { value: "Giá tăng dần", label: "Giá tăng dần" },
  { value: "Giá giảm dần", label: "Giá giảm dần" },
];

export default function ProductItemList(props: ProductListProps) {
  const maxItemNumber = 8;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(
    props.products,
  );

  const displayedProducts = useMemo(() => {
    const startIndex = (page - 1) * maxItemNumber;
    const endIndex = startIndex + maxItemNumber;
    return sortedProducts.slice(startIndex, endIndex);
  }, [page, sortedProducts]);

  const handleDisplayProduct = (page: number) => {
    setPage(page);
  };

  const handleSortProducts = (criteria: string) => {
    let sortedProductList = [...sortedProducts];
    console.log(criteria);
    switch (criteria) {
      case "Đánh giá cao nhất":
        sortedProductList.sort((a, b) => b.rating - a.rating);
        break;
      case "Bán chạy nhất":
        sortedProductList.sort((a, b) => b.soldAmount - a.soldAmount);
        break;
      case "Giá tăng dần":
        sortedProductList.sort((a, b) => a.price - b.price);
        break;
      case "Giá giảm dần":
        sortedProductList.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedProducts(sortedProductList);
    setPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex m-1 items-center justify-between">
        <div className="flex space-x-1 items-center">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: "#5c6856",
                  defaultHoverBorderColor: "#5c6856",
                  textHoverBg: "#ffffff",
                },
              },
            }}
          >
            <Button
              // type="primary"
              icon={<HiOutlineAdjustmentsHorizontal color="black" />}
              className="bg-white rounded-md border-slate-300 m-1 hover:text-white"
              onClick={() => props.setIsFilterOpened(!props.isFilterOpened)}
            />
          </ConfigProvider>

          <div className="text-xs font-semibold">
            {" "}
            Chúng tôi tìm thấy {sortedProducts.length} sản phẩm cho bạn!
          </div>
        </div>
        <Space className=" items-end  rounded-lg p-1  m-2 text-xs items-center ">
          Sắp xếp theo:
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionFontSize: 12,
                  // colorBgContainer: "#f3f3f3",
                },
              },
              token: {
                fontSize: 12,
              },
            }}
          >
            <Select
              defaultValue="Đánh giá cao nhất"
              style={{ width: 140, fontSize: 10 }}
              options={sortOptions}
              className="text-[10px]"
              onChange={handleSortProducts}
            />
          </ConfigProvider>
        </Space>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Divider: {
              textPaddingInline: 0,
            },
          },
        }}
      >
        <Divider className="p-0 m-0" />
      </ConfigProvider>

      <div className="flex  mb-4  space-x-4 p-4">
        {props.filterList.map((item, index) => {
          return (
            <div
              // key={index}
              className="flex p-2 rounded-2xl border-black space-x-2 items-center  bg-[#797979] text-sm text-white"
            >
              {item.key === "price" ? (
                <div
                  key={index}
                  className=" flex rounded-2xl  space-x-2 items-center  text-sm mx-2"
                >
                  <p>
                    {formatPrice(item.value.min)
                      ? formatPrice(item.value.max)
                        ? `${formatPrice(item.value.min)} - ${formatPrice(
                            item.value.max,
                          )}`
                        : `Trên ${formatPrice(item.value.min)}`
                      : `Dưới ${formatPrice(item.value.max)}`}
                  </p>
                  <div
                    className=""
                    // onClick={() => props.removeFilter(item.key, value)}
                  >
                    <CiCircleRemove size={20} />
                  </div>
                </div>
              ) : Array.isArray(item.value) ? (
                item.value.map((value: string, idx: number) => (
                  <div
                    key={index}
                    className=" flex rounded-2xl  space-x-2 items-center  text-sm mx-2"
                  >
                    <p>{value}</p>
                    <div
                      className=""
                      onClick={() => props.removeFilter(item.key, value)}
                    >
                      <CiCircleRemove size={20} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center space-x-2">
                  <p>{item.value}</p>
                  <div
                    className=""
                    onClick={() => props.removeFilter(item.key, item.value)}
                  >
                    <CiCircleRemove size={20} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {displayedProducts.length == 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="mt-24"
          description="No items found"
        />
      ) : (
        <div
          className={`grid   ${
            props.isFilterOpened
              ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 "
              : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 "
          } 
          justify-center gap-y-6`}
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
              <div
                key={index}
                className="flex items-center justify-center mx-auto"
              >
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
            ),
          )}
        </div>
      )}
      <Pagination
        showQuickJumper
        current={page}
        defaultCurrent={1}
        total={sortedProducts.length}
        pageSize={maxItemNumber}
        onChange={handleDisplayProduct}
        className="flex justify-center mx-auto mb-4 mt-8"
      />
    </>
  );
}
