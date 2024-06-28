"use client";
import { useMemo, useState } from "react";
import { Pagination, PaginationProps } from "antd";
// import { useTranslations } from "next-intl";
import Review from "./Review";
import { ReviewType } from "@/model/ReviewType";
import CustomEmpty from "../shop/mini/CustomEmpty";

interface ReviewListProps {
  reviews: ReviewType[];
  setReviews(reviews: ReviewType[]): void;
  productId: string;
}

const ReviewList = (reviewListProps: ReviewListProps) => {
  //   const t = useTranslations("Review");
  // const reviews = Array.from("x".repeat(15));

  const [page, setPage] = useState(1);
  const [itemNumber, setItemNumber] = useState(3);

  const filterData = useMemo(() => {
    return reviewListProps.reviews.filter((item, index) => {
      return index >= (page - 1) * itemNumber && index < page * itemNumber;
    });
  }, [page, reviewListProps.reviews]);

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
    <div className="justify-center align-middle">
      {(filterData.length == 0 && (
        <div className="m-5">
          <CustomEmpty />
        </div>
      )) || (
        <div>
          {filterData.map((item, index) => (
            <Review
              review={item}
              updateReviews={() => {
                reviewListProps.setReviews(reviewListProps.reviews);
              }}
            />
          ))}

          <div className="m-3">
            <Pagination
              showQuickJumper
              showTotal={(total, range) =>
                // `${range[0]}-${range[1]} of ${total} items`
                `${range[0]} - ${range[1]} trên tổng ${total} đánh giá`
              }
              defaultCurrent={page}
              defaultPageSize={itemNumber}
              total={reviewListProps.reviews.length}
              onChange={onChange}
              showLessItems={true}
              onShowSizeChange={onShowSizeChange}
              locale={{ jump_to: "Nhảy đến trang", page: "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
