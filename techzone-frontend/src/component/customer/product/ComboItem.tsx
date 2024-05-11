"use client";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { priceIndex } from "./ProductDetail";

export interface ComboItemProps {
  _id: string;
  imageUrl: string;
  name: string;
  price: number;
  productUrl: string;
  handleCheckbox: (isChecked: boolean, id: string, price: number) => void;
}

const ComboItem = (combo: ComboItemProps) => {
  return (
    <div className="flex flex-row">
      <PlusOutlined />
      <Checkbox
        style={{ marginRight: 3, marginLeft: 10 }}
        onChange={(e) =>
          combo.handleCheckbox(e.target.checked, combo._id, combo.price)
        }
      >
        <div className="max-w-[240px] bg-white rounded-xl overflow-hidden md:max-w-2xl relative">
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
                  {/* hover:underline */}
                  {combo.name}
                </div>
              </Link>
              <div className="mt-1 leading-tight font-medium text-black text-ellipsis overflow-hidden roboto-bold text-wrap-2-line">
                {priceIndex(combo.price)}
              </div>
            </div>
          </div>
        </div>
      </Checkbox>
    </div>
  );
};

export default ComboItem;
