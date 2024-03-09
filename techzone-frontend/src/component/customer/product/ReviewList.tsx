"use client";
import { useMemo, useState } from "react";
import { Pagination, PaginationProps } from "antd";
// import { useTranslations } from "next-intl";
import Review from "../review/Review";

const ReviewList = () => {
  //   const t = useTranslations("Review");
  const reviews = Array.from("x".repeat(15));

  const [page, setPage] = useState(1);
  const [itemNumber, setItemNumber] = useState(3);

  const filterData = useMemo(() => {
    return reviews.filter((item, index) => {
      return index >= (page - 1) * itemNumber && index < page * itemNumber;
    });
  }, [page, reviews]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
    setItemNumber(pageSize);
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setPage(pageNumber);
  };

  return (
    <div className="mt-10 justify-center align-middle">
      {filterData.map((items, index) => (
        <Review key={index} />
      ))}

      <Pagination
        showQuickJumper
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        defaultCurrent={page}
        defaultPageSize={itemNumber}
        total={reviews.length}
        onChange={onChange}
        showLessItems={true}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};

export default ReviewList;
