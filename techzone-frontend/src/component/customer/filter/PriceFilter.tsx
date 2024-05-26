import { Button, InputNumber } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { formatPrice } from "../ProductItem";

export type PriceRange = {
  min: number | null;
  max: number | null;
};

interface PriceFilterProps {
  selectedPriceRange: PriceRange;
  suggestedPrices: PriceRange[];
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string, value: any) => void;
  isFiltered: boolean;
}

export default function PriceFilter(props: PriceFilterProps) {
  const query = useSearchParams();
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number | null>(
    null
  );
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const handleApplyFilter = () => {
    updateURL(minPrice, maxPrice);

    props.addFilter("price", { min: minPrice, max: maxPrice });
    // props.addFilter("maxPrice", maxPrice);
    setSelectedPriceIndex(null);
  };

  const updateURL = (_min: number | null, _max: number | null) => {
    const updatedQuery = new URLSearchParams(query);
    if (_min != null) {
      updatedQuery.set("minPrice", _min.toString());
    } else {
      updatedQuery.delete("minPrice");
    }
    if (_max != null) {
      updatedQuery.set("maxPrice", _max.toString());
    } else {
      updatedQuery.delete("maxPrice");
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const handleAddPrice = async (
    index: number,
    _minPrice: number | null,
    _maxPrice: number | null
  ) => {
    updateURL(_minPrice, _maxPrice);

    props.addFilter("price", { min: _minPrice, max: _maxPrice });
    setSelectedPriceIndex(index);
    setMinPrice(_minPrice);
    setMaxPrice(_maxPrice);
  };

  useEffect(() => {
    if (!props.isFiltered) {
      setMinPrice(null);
      setMaxPrice(null);
      setSelectedPriceIndex(null);
    }
  }, [props.isFiltered]);

  return (
    <div className="text-xs">
      <h3 className="font-semibold mb-2 text-sm">Giá</h3>
      {props.suggestedPrices.map((price, index) => {
        const description = price.min
          ? price.max
            ? `${formatPrice(price.min)} - ${formatPrice(price.max)}`
            : `Trên ${formatPrice(price.min)}`
          : `Dưới ${formatPrice(price.max)}`;
        const isSelected =
          price &&
          props.selectedPriceRange &&
          props.selectedPriceRange.max === price.max &&
          props.selectedPriceRange.min === price.min;
        return (
          <Button
            key={index}
            className={` text-xs rounded-2xl mt-1 mr-[4px] ${
              isSelected && props.isFiltered ? " bg-[#797979]" : ""
            }`}
            onClick={() => handleAddPrice(index, price.min, price.max)}
          >
            {description}
          </Button>
        );
      })}

      <h4 className=" text-slate-500 mt-4">Chọn khoảng giá</h4>
      <div className="w-1/2 flex items-center w-full mt-1">
        <InputNumber
          min={0}
          max={99999999}
          value={minPrice !== null ? minPrice : 0}
          onChange={(value) => setMinPrice(value !== null ? value : 0)}
          className="w-64 text-xs"
          formatter={(value) =>
            `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          step={1000}
        />
        <IoRemoveOutline size={20} className="mx-1" />

        <InputNumber
          min={10000}
          max={99999999}
          value={maxPrice !== null ? maxPrice : 99999999}
          onChange={(value) => setMaxPrice(value !== null ? value : 99999999)}
          className="w-64 text-xs"
          formatter={(value) =>
            `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          step={1000}
        />
      </div>
      <Button
        type="default"
        className="text-xs flex mx-auto items-center justify-center mt-2 w-32 border-sky-500 text-sky-500"
        onClick={handleApplyFilter}
      >
        Áp dụng
      </Button>
    </div>
  );
}
