"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { ProductType } from "@/model/ProductType";
import ProductItem from "../../ProductItem";

export interface ComboItemProps {
  _id: string;
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