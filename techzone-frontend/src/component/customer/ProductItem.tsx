import { AuthContext } from "@/context/AuthContext";
import { ProductAccessType } from "@/enum/ProductAccessType";
import { CartProductType } from "@/model/ProductType";
import { message, Rate } from "antd";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { ReactElement, useContext, useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";

import { POST_AddToCart } from "@/apis/cart/CartAPI";
import StatisticsService from "@/services/statistics.service";

interface ProductItemProps {
  _id: string;
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
  shop: string;
  notify(message: string, content: ReactElement): void;
}

export const formatPrice = (value: number | null): string => {
  if (value === null) {
    return ""; // Trả về một giá trị mặc định hoặc thông báo lỗi tùy bạn muốn
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "tr";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + "k";
  } else {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
};

export const formatAmountSold = (value: number | null): string => {
  if (value === null) {
    return ""; // Trả về một giá trị mặc định hoặc thông báo lỗi tùy bạn muốn
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "tr";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + "k";
  } else {
    return value.toString();
  }
};

export default function ProductItem(props: ProductItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({ opacity: 1, y: -50 });
    } else {
      controls.start({ opacity: 0, y: 0 });
    }
  }, [isHovered, controls]);

  const soldAmount = formatAmountSold(props.soldAmount);
  // const discountPercentage = Math.round(
  //   ((props.originalPrice - props.price) / props.originalPrice) * 100
  // );

  const price = props.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const originalPrice = props.originalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const authContext = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!authContext.userInfo || !authContext.userInfo._id) {
      message.error("Hãy đăng nhập vào tài khoản nhé!");
      return;
    }
    const userId = authContext.userInfo._id;

    let products: CartProductType[] = [
      {
        product: props._id,
        quantity: 1,
      },
    ];

    const response = await POST_AddToCart(userId, products);

    // if (response.message === "Update cart successfully") {
    if (response.data) {
      props.notify(
        `Bạn đã thêm thành công!`,
        <div className="flex flex-row gap-6 w-max">
          <img className="m-2 h-20 w-20 object-fill" src={props.imageLink} alt="" />
          <div className="flex flex-col justify-center">
            <div className="text-sm md:text-lg truncate">
              {props.name.substring(0, 15) + "..."}
            </div>
            <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
              {price}
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
        props._id,
        props.shop,
        accessType
      );
    } else {
      message.error("Thêm sản phẩm thất bại... Hãy thử lại sau!");

      // console.log(response.message);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-52 relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }} // Hiệu ứng mờ khi di chuột qua
        className="w-52"
      >
        <Link href={`/product/${props._id}`}>
          <div
            className={`${
              isHovered ? "opacity-50" : ""
            } relative w-full h-full overflow-hidden rounded-tl-lg rounded-tr-lg text-black`}
          >
            {props.isFlashSale && (
              <div className="absolute top-2 left-2 z-20 p-1 text-white font-bold text-[8px]">
                <img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/1374/1374072.png"
                  width={30}
                />
              </div>
            )}
            <img
              src={props.imageLink}
              alt="ảnh minh họa sản phẩm"
              className="w-full h-52"
            />
          </div>
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

        <Link href={`/product/${props._id}`}>
          <div className="transform w-full bg-white rounded-bl-lg rounded-br-lg shadow-sm text-black ">
            <div className="p-3 text-xs">
              <p className="font-bold overflow-hidden line-clamp-2 h-8">
                {props.name}
              </p>
              <div className="flex mt-1 justify-between items-center text-[10px]">
                <div>Đã bán {soldAmount}</div>
                <Rate
                  disabled
                  defaultValue={props.rating}
                  style={{ fontSize: 10 }}
                />
              </div>
              <div className="flex mt-2 space-x-2 items-center">
                <p className="font-semibold text-green-500 text-sm">{price}</p>
                <p className="font-semibold text-gray-500 line-through text-[10px]">
                  {originalPrice}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
