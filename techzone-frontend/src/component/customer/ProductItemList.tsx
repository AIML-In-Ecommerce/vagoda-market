import { FilterCriteria } from "@/app/[locale]/(Main)/product-list/page";
import { _ProductType } from "@/model/ProductType";
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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import ProductItem, { formatPrice } from "./ProductItem";
interface ProductListProps {
  total: number;
  totalPages: number;
  isFilterOpened: boolean;
  setIsFilterOpened: (show: boolean) => void;
  filterList: FilterCriteria[];
  products: _ProductType[];
  removeFilter: (key: string, value: any) => void;
}

const sortOptions = [
  { value: "highest rating", label: "Đánh giá cao nhất" },
  { value: " top sale", label: "Bán chạy nhất" },
  { value: " latest", label: "Mới nhất" },
  { value: "ascending price", label: "Giá tăng dần" },
  { value: "descending price", label: "Giá giảm dần" },
];

export default function ProductItemList(props: ProductListProps) {
  const query = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (pageNumber: number, pageSize: number) => {
    const updatedQuery = new URLSearchParams(query);

    updatedQuery.set("index", String(pageNumber));
    updatedQuery.set("amount", String(pageSize));

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
    setPage(pageNumber);
    setPageSize(pageSize);
  };

  const handleSortChange = (value: string) => {
    const updatedQuery = new URLSearchParams(query);

    updatedQuery.set("sortBy", value);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
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
            Chúng tôi tìm thấy {props.total} sản phẩm cho bạn!
          </div>
        </div>
        <Space className=" items-end  rounded-lg p-1  m-2 text-xs items-center ">
          Sắp xếp theo:
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  optionFontSize: 12,
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
              onChange={handleSortChange}
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

      {/* <div className="flex  flex-wrap mb-4  space-x-4 p-4 space-y-2">
        {props.filterList.map((item, index) => {
          return (
            <div
              // key={index}
              className="rounded-2xl text-sm border-black space-x-2 items-center   text-sm text-white"
            >
              {item.key === "price" ? (
                <div
                  key={index}
                  className=" flex flex-wrap rounded-2xl  items-center bg-[#797979] p-2 space-x-1 "
                >
                  <p>
                    {formatPrice(item.value.min)
                      ? formatPrice(item.value.max)
                        ? `${formatPrice(item.value.min)} - ${formatPrice(
                            item.value.max
                          )}`
                        : `Trên ${formatPrice(item.value.min)}`
                      : `Dưới ${formatPrice(item.value.max)}`}
                  </p>
                  <div
                    className=""
                    onClick={() => props.removeFilter(item.key, "")}
                  >
                    <CiCircleRemove size={20} />
                  </div>
                </div>
              ) : Array.isArray(item.value) ? (
                <div className="flex flex-wrap space-x-2 space-y-2 ">
                  {item.value.map((_item) => (
                    <div
                      key={index}
                      className=" flex p-2 rounded-2xl bg-[#797979]  items-center mx-2 space-x-1"
                    >
                      <p>{_item.name}</p>
                      <div
                        className=""
                        onClick={() =>
                          props.removeFilter("category", {
                            id: _item.id,
                            name: _item.name,
                            level: _item.level,
                          })
                        }
                      >
                        <CiCircleRemove size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex p-2 rounded-2xl items-center bg-[#797979]  space-x-1">
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
      </div> */}
      <div className="flex flex-wrap gap-2 mb-4 p-4">
        {props.filterList.map((item, index) => (
          <div
            key={index}
            className="flex  flex-wrap gap-2 items-center rounded-2xl text-sm text-white  space-x-1"
          >
            {item.key === "price" ? (
              <div className="flex items-center space-x-1 bg-[#797979] p-2 rounded-2xl">
                <p>
                  {formatPrice(item.value.min)
                    ? formatPrice(item.value.max)
                      ? `${formatPrice(item.value.min)} - ${formatPrice(
                          item.value.max
                        )}`
                      : `Trên ${formatPrice(item.value.min)}`
                    : `Dưới ${formatPrice(item.value.max)}`}
                </p>
                <div onClick={() => props.removeFilter(item.key, "")}>
                  <CiCircleRemove size={20} />
                </div>
              </div>
            ) : Array.isArray(item.value) ? (
              <div className="flex flex-wrap gap-2">
                {item.value.map((_item, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex items-center bg-[#797979] p-2 rounded-2xl space-x-1"
                  >
                    <p>{_item.name}</p>
                    <div
                      onClick={() =>
                        props.removeFilter("category", {
                          id: _item.id,
                          name: _item.name,
                          level: _item.level,
                        })
                      }
                    >
                      <CiCircleRemove size={20} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-1 bg-[#797979] p-2 rounded-2xl">
                <p>{item.value}</p>
                <div onClick={() => props.removeFilter(item.key, item.value)}>
                  <CiCircleRemove size={20} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {props.products.length == 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="mt-24"
          description="No items found"
        />
      ) : (
        <div
          className={`grid   ${
            props.isFilterOpened
              ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
              : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 "
          } 
          justify-center gap-y-6`}
        >
          {props.products.map((product, index) =>
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
                  rating={product.avgRating}
                  soldAmount={product.soldQuantity}
                  price={product.finalPrice}
                  isFlashSale={true}
                  imageLink={product.image}
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
        total={props.total}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="flex justify-center mx-auto mb-4 mt-8"
        showTotal={(total, range) =>
          // `${range[0]}-${range[1]} of ${total} items`
          ` ${range[0]} - ${range[1]} trên tổng ${total} sản phẩm`
        }
        locale={{ jump_to: "Nhảy đến trang", page: "" }}
      />
    </>
  );
}
