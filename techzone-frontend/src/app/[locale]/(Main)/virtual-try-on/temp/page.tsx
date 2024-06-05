import React from "react";
// import SwipeCarousel from "@/component/user/utils/SwipeCarousel/SwipeCarousel_1";
import { SwipeCarousel } from "@/component/user/utils/SwipeCarousel/SwipeCarousel";

// const imgs: string[] = [
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337097/samples/ecommerce/accessories-bag.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337095/samples/people/bicycle.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337094/samples/landscapes/architecture-signs.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337092/samples/bike.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337089/samples/food/pot-mussels.jpg",
// ];

const imgs = [
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443926/vn-11134207-7r98o-lp8u23rvrf4r40_hcpkjk.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/%C3%A1o_thun_cppclk.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
];
const page = () => {
  return <SwipeCarousel imgs={imgs} />;
};

export default page;
