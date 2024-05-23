import React from "react";
import Image from "next/image";

interface VtoProductProps {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  size: string;
  color: string;
  image: string[];
}

const VtoProduct: React.FC<{ product: VtoProductProps }> = ({ product }) => {
  return (
    <div className="w-full flex flex-col  rounded-2xl bg-[#615A5A] bg-opacity-80">
      <div className="w-full px-2.5 py-3.5 flex flex-row  justify-between items-start">
        <div className="w-[65%] flex flex-col ">
          <div className="text-sm font-medium text-white truncate overflow-hidden overflow-ellipsis whitespace-nowrap">
            {product.name}
          </div>
          <div className="w-full flex flex-row justify-between bg-white bg-opacity-50 rounded-full ">
            <div className="px-2 py-1 text-[10px] font-normal text-white ">
              Size{" "}
              <span className="text-xs font-bold ml-1">{product.size}</span>
            </div>
            <div className="px-2 py-1 text-[10px] font-normal text-white ">
              Màu sắc{" "}
              <span className="text-xs font-bold ml-1">{product.color}</span>
            </div>
          </div>
        </div>
        <div className="w-[25%] flex flex-col items-end">
          <div className="text-sm font-bold text-white">
            {product.finalPrice}đ
          </div>
          <div className="text-[10px] font-normal text-[#D7D7D7] line-through">
            {product.originalPrice}đ
          </div>
        </div>
      </div>
      <div className="relative  w-full aspect-square">
        <Image
          src={product.image[0]}
          alt="Image of product"
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="rounded-b-2xl"
        />
      </div>
    </div>
  );
};

export default VtoProduct;
