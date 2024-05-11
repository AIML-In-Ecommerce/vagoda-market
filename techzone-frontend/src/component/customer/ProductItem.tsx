import { Rate } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";

interface ProductItemProps {
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
  inWishlist: boolean;
}

export const formatAmountSold = (value: number | null): string => {
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
  const discountPercentage = Math.round(
    ((props.originalPrice - props.price) / props.originalPrice) * 100
  );

  const price = props.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const originalPrice = props.originalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-52 relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }} // Hiệu ứng mờ khi di chuột qua
        className="w-52 "
      >
        <div
          className={`${
            isHovered ? "opacity-50" : ""
          } relative w-full h-full overflow-hidden rounded-tl-lg rounded-tr-lg`}
        >
          {props.isFlashSale && (
            <div className="absolute top-2 left-2 z-20 p-1  text-white font-bold text-[8px]   ">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1374/1374072.png"
                width={30}
              />
            </div>
          )}
          <img src={props.imageLink} alt="Product" className="w-full h-52" />
        </div>

        <motion.button
          initial={{ opacity: 0, y: 0 }}
          animate={controls}
          className={`flex space-x-1 justify-center ml-8 text-xs text-white absolute  z-10 transform  -translate-y-1/4 p-2 bg-[#797979] shadow-sm rounded-lg`}
        >
          <PiShoppingCart size={16} color="white" />
          <p>Thêm vào giỏ hàng</p>
        </motion.button>

        <div className="transform w-full bg-white rounded-bl-lg rounded-br-lg shadow-sm">
          <div className="p-3 text-xs">
            <p className="font-bold overflow-hidden line-clamp-2">
              {props.name}
            </p>
            <div className="flex mt-1 justify-between items-center text-[10px]">
              <div>{soldAmount} sold</div>
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
      </motion.div>
    </div>
  );
}

// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { Button, Rate, Tooltip } from "antd";
// interface ProductItemProps {
//   imageLink: string;
//   name: string;
//   rating: number;
//   soldAmount: number;
//   price: number;
//   isFlashSale: boolean;
//   originalPrice: number;
//   inWishlist: boolean;
// }
// import { PiShoppingCart } from "react-icons/pi";
// export default function ProductItem(props: ProductItemProps) {
//   function formatAmountSold(value: number): string {
//     if (value >= 1000000) {
//       return (value / 1000000).toFixed(1) + "tr";
//     } else if (value >= 1000) {
//       return (value / 1000).toFixed(0) + "k";
//     } else {
//       return value.toLocaleString("vi-VN", {
//         style: "currency",
//         currency: "VND",
//       });
//     }
//   }

//   const soldAmount = formatAmountSold(props.soldAmount);
//   const discountPercentage = Math.round(
//     ((props.originalPrice - props.price) / props.originalPrice) * 100
//   );

//   const price = props.price.toLocaleString("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   });

//   const originalPrice = props.originalPrice.toLocaleString("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   });

//   return (
//     <div className="container h-96 w-60 mx-4">
//       <div className=" container relative w-64 h-64 rounded-lg shadow-xl border  transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//         <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl border">
//           {props.isFlashSale && (
//             <div className="absolute top-0 left-0 z-20 py-2 px-4 bg-red-500 text-white font-bold text-xs  rounded-br-3xl ">
//               Flash Sale
//             </div>
//           )}

//           <img
//             src={props.imageLink}
//             alt="Product"
//             className="object-cover w-full h-full"
//           />
//         </div>

//         <div className="absolute top-48 left-1/2 transform -translate-x-1/2 w-11/12 h-2/3 z-10 bg-white rounded-lg shadow-xl border">
//           <div className="p-4 space-y-2 text-sm ">
//             <p className="font-bold overflow-hidden line-clamp-2">
//               {props.name}
//             </p>
//             <div className="flex  space-x-8">
//               <div className="flex space-x-1 items-center">
//                 <span>{props.rating}</span>

//                 <Image
//                   src="https://cdn-icons-png.flaticon.com/128/10134/10134048.png"
//                   width={15}
//                   height={15}
//                   alt="Logo"
//                 />
//               </div>
//               <div>{soldAmount} sold</div>
//             </div>
//             <div className="flex  justify-between items-center">
//               <div className="">
//                 <p className="font-semibold text-green-500 text-lg">{price} </p>
//                 <div className="flex space-x-1 ">
//                   <p className="font-semibold text-gray-500 line-through">
//                     {originalPrice}{" "}
//                   </p>
//                   <p className="text-red-500 bg-red-200 text-xs px-1">
//                     -{discountPercentage}%
//                   </p>
//                 </div>
//               </div>
//               <Button
//                 type="primary"
//                 className=" p-1 bg-theme flex items-center "
//               >
//                 <PiShoppingCart size={16} />
//                 <span className="ml-1">Cart</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
