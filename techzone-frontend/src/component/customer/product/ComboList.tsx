"use client";
import { Button, Carousel, Flex } from "antd";
// import { useTranslations } from "next-intl";
import ComboItem from "./ComboItem";
import React from "react";
import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import { priceIndex } from "./ProductDetail";
import CustomEmpty from "../shop/mini/CustomEmpty";

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
        "https://product.hstatic.net/200000054280/product/capture_one_catalog0047__2__5c039fdb137c4048a69b4fa7210e118c.jpg",

      name: "Túi xách nam BST Ussé CL025",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "2",
      imageUrl:
        "https://product.hstatic.net/200000544093/product/b9bag018l_den_7950_da_bo_23x10x16__1__a83000faefdf4e808951fee3919232f1_1024x1024.png",

      name: "Túi xách nữ B9BAG018L",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "3",
      imageUrl:
        "https://product.hstatic.net/200000054280/product/capture_one_catalog0047__2__5c039fdb137c4048a69b4fa7210e118c.jpg",

      name: "Túi xách nam BST Ussé CL025",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "4",
      imageUrl:
        "https://product.hstatic.net/200000544093/product/b9bag018l_den_7950_da_bo_23x10x16__1__a83000faefdf4e808951fee3919232f1_1024x1024.png",

      name: "Túi xách nữ B9BAG018L",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "5",
      imageUrl:
        "https://product.hstatic.net/200000054280/product/capture_one_catalog0047__2__5c039fdb137c4048a69b4fa7210e118c.jpg",

      name: "Túi xách nam BST Ussé CL025",
      price: 3850000,
      productUrl: "",
      handleCheckbox: () => {},
    },
    {
      _id: "6",
      imageUrl:
        "https://product.hstatic.net/200000544093/product/b9bag018l_den_7950_da_bo_23x10x16__1__a83000faefdf4e808951fee3919232f1_1024x1024.png",

      name: "Túi xách nữ B9BAG018L",
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
      {combo.length == 0 && <CustomEmpty />}

      {combo.length > 0 && (
        <div className="align-middle grid grid-cols-5 gap-5">
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
              slidesToShow={4}
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
              {combo.map((item, index) => (
                <div key={index}>
                  <ComboItem
                    _id={item._id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    productUrl={item.productUrl}
                    handleCheckbox={handleCheckbox}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="col-span-1 lg:col-start-5 lg:col-end-6 md:col-start-1 sm:col-start-1">
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
      )}
    </div>
  );
};

export default ComboList;
