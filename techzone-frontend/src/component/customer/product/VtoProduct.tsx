import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface VtoProductProps {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  size: string;
  color: {
    label: string;
    value: string;
  };
  image: string;
}

const VtoProduct: React.FC<{
  product: VtoProductProps;
  setChosenProduct: (product: any) => void;
}> = ({ product, setChosenProduct }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 1 }}
      key={product._id}
      onClick={(e) => setChosenProduct(product)}
      className="w-full flex flex-col  rounded-2xl bg-[#615A5A] bg-opacity-80"
    >
      <div className="w-full px-4 py-4 flex flex-row gap-2 justify-between items-start">
        <div className="w-[70%] flex flex-col gap-1">
          <div className="text-base font-bold text-white truncate overflow-hidden overflow-ellipsis whitespace-nowrap">
            {product.name}
          </div>
          <div className="w-full flex flex-row justify-between bg-white bg-opacity-50 rounded-full ">
            <div className="px-2 py-1 text-[10px] font-normal text-white ">
              Size{" "}
              <span className="text-xs font-bold ml-1">{product.size}</span>
            </div>
            <div className="px-2 py-1 text-[10px] font-normal text-white ">
              Màu sắc{" "}
              <span className="text-xs font-bold ml-1">
                {product.color.label}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[25%] flex flex-col items-end">
          <div className="text-base font-bold text-white">
            {product.finalPrice}đ
          </div>
          <div className="text-[10px] font-normal text-[#D7D7D7] line-through">
            {product.originalPrice}đ
          </div>
        </div>
      </div>
      <div className="relative  w-full aspect-square">
        <Image
          src={product.image}
          alt="Image of product"
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="rounded-b-2xl"
        />
      </div>
    </motion.div>
  );
};

export default VtoProduct;
