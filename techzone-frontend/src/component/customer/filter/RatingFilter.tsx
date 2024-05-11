import { Radio, RadioChangeEvent, Rate, Space } from "antd";
import { useState } from "react";

interface RadioFilterProps {
  addFilter: (key: string, value: any) => void;
  removeFilter: (key: string, value: any) => void;
  isFiltered: boolean;
}

export default function RatingFilter(props: RadioFilterProps) {
  const [ratingFilter, setRatingFilter] = useState(0);

  const onChangeRatingFilter = async (e: RadioChangeEvent) => {
    const value = e.target.value;
    await props.removeFilter("rating", `${ratingFilter} sao`);
    setRatingFilter(value);
    if (value != 0) {
      props.addFilter("rating", `${value} sao`);
    }
  };

  return (
    <>
      <h3 className="font-semibold my-4">Đánh giá</h3>
      <Radio.Group
        style={{ color: "#797979" }}
        onChange={onChangeRatingFilter}
        value={props.isFiltered ? ratingFilter : 0}
      >
        <Space direction="vertical">
          <Radio value={0}>All</Radio>
          <Radio value={5}>
            <div className="flex space-x-2 items-center">
              <Rate style={{ fontSize: "16px" }} disabled defaultValue={5} />
              <p>5 sao</p>
            </div>
          </Radio>
          <Radio value={4}>
            <div className="flex space-x-2 items-center mt-1">
              <Rate style={{ fontSize: "16px" }} disabled defaultValue={4} />
              <p>từ 4 sao</p>
            </div>
          </Radio>
          <Radio value={3}>
            <div className="flex space-x-2 items-center mt-1">
              <Rate style={{ fontSize: "16px" }} disabled defaultValue={3} />
              <p>từ 3 sao</p>
            </div>
          </Radio>
        </Space>
      </Radio.Group>
    </>
  );
}
