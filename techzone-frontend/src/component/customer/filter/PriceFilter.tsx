import { Button, InputNumber } from "antd";
import { useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { formatPrice } from "../ProductItem";

export type PriceRange = {
  min: number | null;
  max: number | null;
};

interface PriceFilterProps {
  suggestedPrices: PriceRange[];
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string, value: any) => void;
  isFiltered: boolean;
}
export default function PriceFilter(props: PriceFilterProps) {
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number | null>(
    null
  );
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const handleApplyFilter = () => {
    props.addFilter("price", { min: minPrice, max: maxPrice });
    setSelectedPriceIndex(null);
  };

  const handleAddPrice = async (
    index: number,
    priceMin: number | null,
    priceMax: number | null
  ) => {
    console.log("selected", priceMin, priceMax);
    setSelectedPriceIndex(index);
    setMinPrice(priceMin);
    setMaxPrice(priceMax);

    props.addFilter("price", { min: priceMin, max: priceMax });
  };
  return (
    <>
      <h3 className="font-semibold mb-4">Giá</h3>
      {props.suggestedPrices.map((price, index) => {
        const description = price.min
          ? price.max
            ? `${formatPrice(price.min)} - ${formatPrice(price.max)}`
            : `Trên ${formatPrice(price.min)}`
          : `Dưới ${formatPrice(price.max)}`;
        return (
          <Button
            key={index}
            className={`rounded-2xl mt-1 mr-4 ${
              selectedPriceIndex === index && props.isFiltered
                ? " bg-[#797979]"
                : ""
            }`}
            onClick={() => handleAddPrice(index, price.min, price.max)}
          >
            {description}
          </Button>
        );
      })}

      <h4 className="text-sm text-slate-500 mt-4">Chọn khoảng giá</h4>

      <div className="w-1/2 flex items-center w-full mt-1">
        <InputNumber
          min={0}
          max={9999999999}
          defaultValue={0}
          value={minPrice && props.isFiltered ? minPrice : 0}
          onChange={(value) => setMinPrice(value)}
          className="w-64"
          formatter={(value) =>
            `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
        <IoRemoveOutline size={20} className="mx-4" />
        <InputNumber
          min={10000}
          max={9999999999}
          defaultValue={10000}
          value={maxPrice && props.isFiltered ? maxPrice : 1000000000}
          onChange={(value) => setMaxPrice(value)}
          className="w-64"
          formatter={(value) =>
            `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
        />
      </div>
      <Button
        type="default"
        className="flex mx-auto items-center justify-center mt-2 w-36 border-sky-500 text-sky-500"
        onClick={handleApplyFilter}
      >
        Áp dụng
      </Button>
    </>
  );
}
