import { Radio, RadioChangeEvent, Rate, Space } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface RadioFilterProps {
  selectedValue: number;
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string, value: any) => void;
  isFiltered: boolean;
}

export default function RatingFilter(props: RadioFilterProps) {
  const query = useSearchParams();
  const [ratingFilter, setRatingFilter] = useState(props.selectedValue);

  const onChangeRatingFilter = async (e: RadioChangeEvent) => {
    const value = e.target.value;

    const updatedQuery = new URLSearchParams(query);
    if (value == 0) {
      updatedQuery.delete("rating");
    } else {
      updatedQuery.set("rating", value);
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );

    setRatingFilter(value);
    if (value != 0) {
      props.addFilter("rating", `${value} sao`);
    }
  };
  return (
    <>
      <h3 className="font-semibold my-4 text-sm">Đánh giá</h3>
      <Radio.Group
        style={{ color: "#797979" }}
        onChange={onChangeRatingFilter}
        value={props.isFiltered ? ratingFilter : 0}
      >
        <Space direction="vertical">
          <Radio value={0} className="text-xs">
            All
          </Radio>
          <Radio value={5}>
            <div className="flex space-x-2 items-center text-xs">
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={5} />
              <p>5 sao</p>
            </div>
          </Radio>
          <Radio value={4}>
            <div className="flex space-x-2 items-center text-xs mt-1">
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={4} />
              <p> 4 sao</p>
            </div>
          </Radio>
          <Radio value={3}>
            <div className="flex space-x-2 items-center text-xs mt-1">
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={3} />
              <p> 3 sao</p>
            </div>
          </Radio>
          <Radio value={2}>
            <div className="flex space-x-2 items-center text-xs mt-1">
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={2} />
              <p> 2 sao</p>
            </div>
          </Radio>
          <Radio value={1}>
            <div className="flex space-x-2 items-center text-xs mt-1">
              <Rate style={{ fontSize: "12px" }} disabled defaultValue={1} />
              <p>1 sao</p>
            </div>
          </Radio>
        </Space>
      </Radio.Group>
    </>
  );
}
