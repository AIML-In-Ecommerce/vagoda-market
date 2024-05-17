"use client";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { priceIndex } from "./ProductDetail";
import ProductItem from "../ProductItem";
import { ProductType } from "@/model/ProductType";

export interface ComboItemProps {
  _id: string;
  // imageUrl: string;
  // name: string;
  // price: number;
  // productUrl: string;
  product: ProductType;
  handleCheckbox: (isChecked: boolean, id: string, price: number) => void;
}

const ComboItem = (combo: ComboItemProps) => {
  return (
    <div className="flex flex-row">
      <PlusOutlined />
      <Checkbox
        style={{ marginRight: 3, marginLeft: 10 }}
        onChange={(e) =>
          combo.handleCheckbox(e.target.checked, combo._id, combo.product.price)
        }
      >
        <div className="m-5">
          <ProductItem
            imageLink={combo.product.imageLink}
            name={combo.product.name}
            rating={combo.product.rating}
            soldAmount={combo.product.soldAmount}
            price={combo.product.price}
            isFlashSale={combo.product.flashSale}
            originalPrice={combo.product.originalPrice}
          />
        </div>
      </Checkbox>
    </div>
  );
};

export default ComboItem;

{
  /* <div className="max-w-[240px] h-[250px] bg-white rounded-xl overflow-hidden md:max-w-2xl relative">
<div className="flex flex-col">
  <Link href={`/${combo.productUrl}`}>
    <div className="md:shrink-0">
      <img
        className="h-40 object-contain w-full"
        src={combo.imageUrl}
        alt={combo.name}
      />
    </div>
  </Link>
  <div className="p-3">
    <Link href={`/${combo.productUrl}`}>
      <div className="mt-1 leading-tight font-medium text-black overflow-hidden roboto-bold line-clamp-2">
        {combo.name}
      </div>
    </Link>
    <div className="mt-1 leading-tight font-medium text-black text-ellipsis overflow-hidden roboto-bold text-wrap-2-line">
      {priceIndex(combo.price)}
    </div>
  </div>
</div>
</div> */
}
