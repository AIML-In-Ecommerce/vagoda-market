"use client";
import { Flex, Image, message } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ProductAccessType } from "@/enum/ProductAccessType";
import { CartProductType } from "@/model/ProductType";
import { AuthContext } from "@/context/AuthContext";

import { POST_AddToCart } from "@/apis/cart/CartAPI";
import StatisticsService from "@/services/statistics.service";
import { priceIndex } from "@/component/customer/product/ProductDetail";

interface SimpleProductCardProps {
  info: SimpleProductInfo;
  imageHeight: string | undefined;
  imageWidth: string | undefined;
  notify(message: string, content: ReactElement): void;
}

interface SimpleProductInfo {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  status: string;
  image: string;
  shop: string;
}

export default function SimpleProductCard({
  info,
  imageHeight,
  imageWidth,
  notify,
}: SimpleProductCardProps) {
  //here we can get locale from web locale language hahaha
  //ok
  const locale = "vi-VN";

  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({ opacity: 1, y: -50 });
    } else {
      controls.start({ opacity: 0, y: 0 });
    }
  }, [isHovered, controls]);

  const currencyFormater = Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
  });

  function calculateDiscountPercentage(
    originalPrice: number,
    finalPrice: number
  ) {
    return Math.ceil(((originalPrice - finalPrice) * 100) / originalPrice);
  }

  const authContext = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!authContext.userInfo || !authContext.userInfo._id) {
      message.error("Hãy đăng nhập vào tài khoản nhé!");
      return;
    }
    const userId = authContext.userInfo._id;

    let products: CartProductType[] = [
      {
        product: info._id,
        quantity: 1,
      },
    ];

    const response = await POST_AddToCart(userId, products);

    // if (response.message === "Update cart successfully") {
    if (response.data) {
      notify(
        "Bạn đã thêm thành công!",
        <div className="flex flex-row gap-6 w-max">
          <img className="m-2 h-20 w-20 object-fill" src={info.image} />
          <div className="flex flex-col justify-center">
            <div className="text-sm md:text-lg truncate">{info.name}</div>
            <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
              {priceIndex(info.finalPrice)}
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
        info._id,
        info.shop,
        accessType
      );
    } else {
      message.error("Thêm sản phẩm thất bại... Hãy thử lại sau!");

      // console.log(response.message);
    }
  };

  const ProductImage = (
    <Image
      className="rounded-lg w-max mt-3"
      height={imageHeight}
      width={imageWidth}
      src={info.image}
      alt=" ảnh minh họa sản phẩm"
      preview={false}
    />
  );

  const ProductFinalPrice = (
    <p className="text-xl sm:text-md font-semibold text-red-600">
      {currencyFormater.format(info.finalPrice)}
    </p>
  );

  const ProductOriginPrice = (
    <p className="font-semibold text-gray-500 line-through text-[10px]">
      {currencyFormater.format(info.originalPrice)}
    </p>
  );

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }} // Hiệu ứng mờ khi di chuột qua
        className="w-52 "
      >
        <Flex
          className="h-64 w-48 rounded-lg bg-white"
          vertical
          justify="center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={`/product/${info._id}`}>
            <Flex className="relative" vertical justify="center" align="center">
              <div className="z-0 text-black">{ProductImage}</div>
            </Flex>
          </Link>

          <motion.button
            onClick={() => handleAddToCart()}
            initial={{ opacity: 0, y: 0 }}
            animate={controls}
            className={`flex space-x-1 justify-center ml-8 text-xs text-white absolute z-10 transform -translate-y-1/4 p-2 bg-[#797979] shadow-sm rounded-lg`}
          >
            <PiShoppingCart size={16} color="white" />
            <p>Thêm vào giỏ hàng</p>
          </motion.button>

          <Link href={`/product/${info._id}`}>
            <div className="flex justify-between align-middle my-3 mx-3 text-black">
              <Flex
                className="pl-1 w-2/3"
                vertical
                justify="center"
                align="start"
              >
                <p className="text-xs font-bold overflow-hidden line-clamp-1">
                  {info.name}
                </p>
                {ProductFinalPrice}
                {ProductOriginPrice}
              </Flex>
              <Flex
                className="bg-red-100 h-8 rounded-2xl mt-4 py-2 px-2"
                justify="center"
                align="center"
              >
                <p className="text-red-600 text-sm font-semibold">
                  -{" "}
                  {calculateDiscountPercentage(
                    info.originalPrice,
                    info.finalPrice
                  )}
                  %
                </p>
              </Flex>
            </div>
          </Link>
        </Flex>
      </motion.div>
    </>
  );
}
