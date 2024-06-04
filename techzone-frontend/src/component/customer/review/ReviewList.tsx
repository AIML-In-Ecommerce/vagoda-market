"use client";
import { useEffect, useMemo, useState } from "react";
import { Pagination, PaginationProps } from "antd";
// import { useTranslations } from "next-intl";
import Review from "./Review";
import { GET_GetReviewListByProduct } from "@/apis/review/ReviewAPI";
import { ReviewType } from "@/model/ReviewType";
import CustomEmpty from "../shop/mini/CustomEmpty";

interface ReviewListProps {
  setNumberOfReview(value: number): void;
  productId: string;
}

const ReviewList = (reviewListProps: ReviewListProps) => {
  //   const t = useTranslations("Review");
  // const reviews = Array.from("x".repeat(15));

  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const [page, setPage] = useState(1);
  const [itemNumber, setItemNumber] = useState(3);

  const filterData = useMemo(() => {
    reviewListProps.setNumberOfReview(reviews.length);

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

  // call api
  useEffect(() => {
    handleGetReviews();
  }, [reviewListProps.productId]);

  const handleGetReviews = async () => {
    const response = await GET_GetReviewListByProduct(
      reviewListProps.productId
    );
    if (response.status == 200) {
      let data = response.data;
      if (data) {
        console.log("review", data);
        setReviews(data);
      }
    } else console.log(response.message);
  };

  return (
    <div className="justify-center align-middle">
      {(filterData.length == 0 && <CustomEmpty />) || (
        <div>
          {filterData.map((item, index) => (
            <Review
              review={item}
              updateReviews={() => {
                setReviews(reviews);
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
              total={reviews.length}
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

// const reviewsData = [
//   {
//     id: "string",
//     productId: "string",
//     user: {
//       id: "string",
//       name: "Lê Quốc Dũng",
//       avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
//     },
//     desc: "Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.",
//     createdAt: "Đánh giá vào 24 ngày trước",
//     starRating: 4,

//     asset: [
//       // "https://i.insider.com/5f835d4ebab422001979aaeb",
//       // "https://robothutbuisky.com/wp-content/uploads/2020/06/t8-max-100-1.jpg?v=1677693356",
//       // "https://product.hstatic.net/200000805527/product/z3994157810128_ac5e199adba96c46d6d7282b2bfdcdc5-scaled_843ed368395649f6a68bc7c08dd20524_master.jpg",
//       // "https://product.hstatic.net/200000805527/product/z3994157835398_2b54a80e46f44a6d57b7a7500a87e49e-scaled_37202a4918fa4f03a6e275b8312f0587_master.jpg",
//       // "https://i.insider.com/5f835d4ebab422001979aaeb",
//       // "https://robothutbuisky.com/wp-content/uploads/2020/06/t8-max-100-1.jpg?v=1677693356",
//       // "https://product.hstatic.net/200000805527/product/z3994157810128_ac5e199adba96c46d6d7282b2bfdcdc5-scaled_843ed368395649f6a68bc7c08dd20524_master.jpg",
//       // "https://product.hstatic.net/200000805527/product/z3994157835398_2b54a80e46f44a6d57b7a7500a87e49e-scaled_37202a4918fa4f03a6e275b8312f0587_master.jpg",
//       // "https://i.insider.com/5f835d4ebab422001979aaeb",
//       // "https://robothutbuisky.com/wp-content/uploads/2020/06/t8-max-100-1.jpg?v=1677693356",
//     ],
//     conversation: [],
//     like: [],
//   },
//   {
//     id: "string",
//     productId: "string",
//     user: { id: "string", name: "Thuỳ Dương", avatar: "" },
//     desc: "Đóng gói cẩn thận, mua khuyến mãi nên giá rẻ và miễn Ship, còn được tặng bình nhựa.",
//     createdAt: "Đánh giá vào 1 năm trước",
//     starRating: 5,

//     asset: [],
//     conversation: [],
//     like: [],
//   },
//   {
//     id: "string",
//     productId: "string",
//     user: {
//       id: "string",
//       name: "Lê Quốc Dũng",
//       avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
//     },
//     desc: "Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.",
//     createdAt: "Đánh giá vào 24 ngày trước",
//     starRating: 4,

//     asset: [],
//     conversation: [],
//     like: [],
//   },
//   {
//     id: "string",
//     productId: "string",
//     user: { id: "string", name: "Thuỳ Dương", avatar: "" },
//     desc: "Đóng gói cẩn thận, mua khuyến mãi nên giá rẻ và miễn Ship, còn được tặng bình nhựa.",
//     createdAt: "Đánh giá vào 1 năm trước",
//     starRating: 5,

//     asset: [],
//     conversation: [],
//     like: [],
//   },
// ];
