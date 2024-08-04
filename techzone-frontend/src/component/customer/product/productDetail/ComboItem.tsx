"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ProductType } from "@/model/ProductType";
import ProductItem from "../../ProductItem";
import { ReactElement, useState } from "react";

export interface ComboItemProps {
  _id: string;
  product: ProductType;
  handleCheckbox: (isChecked: boolean, combo: ProductType) => void;
  notify(message: string, content: ReactElement): void;
}

const ComboItem = (combo: ComboItemProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="flex flex-row cursor-pointer m-5"
      onClick={() => {
        combo.handleCheckbox(!isChecked, combo.product);
        setIsChecked(!isChecked);
      }}
    >
      <div className="pointer-events-none">
        <ProductItem
          _id={combo.product._id}
          imageLink={combo.product.imageLink}
          name={combo.product.name}
          rating={combo.product.rating}
          soldAmount={combo.product.soldAmount}
          price={combo.product.price}
          isFlashSale={combo.product.flashSale}
          originalPrice={combo.product.originalPrice}
          shop={combo.product.shop}
          notify={combo.notify}
        />
      </div>
      <Checkbox
        style={{ marginRight: 10, marginLeft: 20 }}
        checked={isChecked}
      />
      <PlusOutlined />
    </div>
  );
};

export default ComboItem;
