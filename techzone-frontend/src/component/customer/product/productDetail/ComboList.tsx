"use client";
import { Button, Carousel, Flex, List } from "antd";
// import { useTranslations } from "next-intl";
import ComboItem from "./ComboItem";
import React, { ReactElement, useContext } from "react";
import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import { priceIndex } from "../ProductDetail";
import CustomEmpty from "../../shop/mini/CustomEmpty";
import {
  CartProductType,
  ProductDetailType,
  ProductType,
} from "@/model/ProductType";
import { AuthContext } from "@/context/AuthContext";
import { POST_AddToCart } from "@/apis/cart/CartAPI";
import { ProductAccessType } from "@/enum/ProductAccessType";
import StatisticsService from "@/services/statistics.service";
import { BsQuestionCircle } from "react-icons/bs";

interface ComboListProps {
  // initial price before adding the combo price
  totalPrice: number;
  totalComboPrice: number;
  updateTotalComboPrice: (price: number) => void;
  comboIdList: Array<string>;
  setComboIdList: (list: Array<string>) => void;
  notify(message: string, content: ReactElement): void;
  combo: ProductType[];
  product: ProductDetailType;
  numberOfItem: number;
  handleCartDetail: (isOpen: boolean) => void;
}

const ComboList = (comboListData: ComboListProps) => {
  //   const t = useTranslations("Review");

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

  const authContext = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!authContext.userInfo || !authContext.userInfo._id) {
      comboListData.notify("Hãy đăng nhập vào tài khoản nhé!", <></>);
      return;
    }
    const userId = authContext.userInfo._id;

    let products: CartProductType[] = [
      {
        product: comboListData.product._id,
        quantity: comboListData.numberOfItem,
      },
    ];

    if (comboListData.combo.length > 0) {
      comboListData.combo.forEach((combo) => {
        products.push({
          product: combo._id,
          quantity: 1,
        });
      });
    }

    const response = await POST_AddToCart(userId, products);

    // if (response.message === "Update cart successfully") {
    if (response.data) {
      comboListData.notify(
        "Bạn đã thêm thành công!",
        <div className="flex flex-row gap-6 w-max">
          <img
            className="m-2 h-20 w-20 object-fill"
            src={comboListData.product.images[0]}
          />
          <div className="flex flex-col justify-center">
            <div className="text-sm md:text-lg truncate">
              {comboListData.product.name.substring(0, 15) + "..."}
            </div>
            <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
              {priceIndex(comboListData.product.finalPrice)}
            </div>
          </div>
        </div>
      );

      const sessionId =
        authContext.methods && authContext.methods.getSessionId()
          ? authContext.methods.getSessionId()
          : "";
      const accessType = ProductAccessType.ADD_TO_CART;

      StatisticsService.setProductAccess(
        userId,
        sessionId,
        comboListData.product._id,
        comboListData.product.shop,
        accessType
      );

      if (comboListData.combo.length > 0) {
        comboListData.combo.forEach((combo) => {
          comboListData.notify(
            "Bạn đã thêm thành công!",
            <div className="flex flex-row gap-6 w-max">
              <img
                className="m-2 h-20 w-20 object-fill"
                src={combo.imageLink}
              />
              <div className="flex flex-col justify-center">
                <div className="text-sm md:text-lg truncate">
                  {combo.name.substring(0, 15) + "..."}
                </div>
                <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
                  {priceIndex(combo.price)}
                </div>
              </div>
            </div>
          );

          StatisticsService.setProductAccess(
            userId,
            sessionId,
            combo._id,
            combo.shop,
            accessType
          );
        });
      }
    } else {
      comboListData.notify("Thêm sản phẩm thất bại... Hãy thử lại sau!", <></>);
      // console.log(response.message);
    }
  };

  return (
    <div>
      {(comboListData.combo.length > 0 && (
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
              total={comboListData.combo.length}
              onChange={onChange}
              showLessItems={true}
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </Flex> */}
            {(comboListData.combo.length < 4 && (
              <List
                grid={{
                  gutter: 5,
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 2,
                  xl: 3,
                  xxl: 3,
                }}
                dataSource={comboListData.combo}
                locale={{
                  emptyText: <CustomEmpty />,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <ComboItem
                      _id={item._id}
                      product={item}
                      handleCheckbox={handleCheckbox}
                      notify={comboListData.notify}
                    />
                  </List.Item>
                )}
              />
            )) || (
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
                {comboListData.combo.map((item, index) => (
                  <div key={index}>
                    <ComboItem
                      _id={item._id}
                      product={item}
                      handleCheckbox={handleCheckbox}
                      notify={comboListData.notify}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className="col-span-1 col-start-1 sm:col-start-4 lg:col-start-5 xl:col-end-6 flex flex-col justify-center align-middle">
            <div className="mx-5 mb-16 min-w-32">
              <Flex vertical gap="small">
                <div className="font-semibold">Tổng cộng:</div>
                <div className="flex gap-2">
                  <div className="text-xl">
                    {priceIndex(comboListData.totalPrice)}
                  </div>
                  <div
                    className="mt-1 ml-2 cursor-pointer text-xs"
                    onClick={() => comboListData.handleCartDetail(true)}
                  >
                    <BsQuestionCircle />
                  </div>
                </div>
                <Button
                  type="primary"
                  danger
                  block
                  size="large"
                  // href="/cart"
                  onClick={handleAddToCart}
                  style={{ background: "#5c6856" }}
                  className="rounded-full text-xs md:text-sm"
                >
                  {/* Thêm vào giỏ hàng */}
                  Thêm cùng combo
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

// mock data
// const MockData = [
//   {
//     _id: "6645bab5f4c7faf064f1bcdc",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Lenovo 15i",
//     rating: 4.5,
//     soldAmount: 20,
//     price: 15000000,
//     flashSale: true,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "6645bbaef4c7faf064f1bce0",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell Vostro",
//     rating: 4.5,
//     soldAmount: 32,
//     price: 17000000,
//     flashSale: false,
//     originalPrice: 17000000,
//     category: "",
//   },
//   {
//     _id: "sp-03",
//     imageLink:
//       "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Dell SuperLight",
//     rating: 4.5,
//     soldAmount: 10,
//     price: 22000000,
//     flashSale: true,
//     originalPrice: 20000000,
//     category: "",
//   },
//   {
//     _id: "sp-04",
//     imageLink:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Lenovo 15i",
//     rating: 4.5,
//     soldAmount: 20,
//     price: 15000000,
//     flashSale: true,
//     originalPrice: 17000000,
//     category: "",
//   },
// ];
