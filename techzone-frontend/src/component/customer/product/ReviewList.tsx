"use client";
import { useMemo, useState } from "react";
import { Pagination, PaginationProps } from "antd";
// import { useTranslations } from "next-intl";
import Review from "../review/Review";

const ReviewList = () => {
  //   const t = useTranslations("Review");
  // const reviews = Array.from("x".repeat(15));

  const reviews = [
    {
      id: "string",
      productId: "string",
      user: {
        id: "string",
        name: "Lê Quốc Dũng",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      },
      desc: "Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.",
      createdAt: "Đánh giá vào 24 ngày trước",
      useTime: " Đã dùng 5 phút",
      starRating: 4,
    },
    {
      id: "string",
      productId: "string",
      user: { id: "string", name: "Thuỳ Dương", avatar: "" },
      desc: "Đóng gói cẩn thận, mua khuyến mãi nên giá rẻ và miễn Ship, còn được tặng bình nhựa.",
      createdAt: "Đánh giá vào 1 năm trước",
      useTime: " Đã dùng 2 ngày",
      starRating: 5,
    },
    {
      id: "string",
      productId: "string",
      user: {
        id: "string",
        name: "Lê Quốc Dũng",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      },
      desc: "Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.",
      createdAt: "Đánh giá vào 24 ngày trước",
      useTime: " Đã dùng 5 phút",
      starRating: 4,
    },
    {
      id: "string",
      productId: "string",
      user: { id: "string", name: "Thuỳ Dương", avatar: "" },
      desc: "Đóng gói cẩn thận, mua khuyến mãi nên giá rẻ và miễn Ship, còn được tặng bình nhựa.",
      createdAt: "Đánh giá vào 1 năm trước",
      useTime: " Đã dùng 2 ngày",
      starRating: 5,
    },
    {
      id: "string",
      productId: "string",
      user: {
        id: "string",
        name: "Lê Quốc Dũng",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      },
      desc: "Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.",
      createdAt: "Đánh giá vào 24 ngày trước",
      useTime: " Đã dùng 5 phút",
      starRating: 4,
    },
    {
      id: "string",
      productId: "string",
      user: { id: "string", name: "Thuỳ Dương", avatar: "" },
      desc: "Đóng gói cẩn thận, mua khuyến mãi nên giá rẻ và miễn Ship, còn được tặng bình nhựa.",
      createdAt: "Đánh giá vào 1 năm trước",
      useTime: " Đã dùng 2 ngày",
      starRating: 5,
    },
    {
      id: "string",
      productId: "string",
      user: {
        id: "string",
        name: "Lê Quốc Dũng",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      },
      desc: "Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.",
      createdAt: "Đánh giá vào 24 ngày trước",
      useTime: " Đã dùng 5 phút",
      starRating: 4,
    },
    {
      id: "string",
      productId: "string",
      user: { id: "string", name: "Thuỳ Dương", avatar: "" },
      desc: "Đóng gói cẩn thận, mua khuyến mãi nên giá rẻ và miễn Ship, còn được tặng bình nhựa.",
      createdAt: "Đánh giá vào 1 năm trước",
      useTime: " Đã dùng 2 ngày",
      starRating: 5,
    },
  ];

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
      {filterData.map((item, index) => (
        <Review
          id={item.id}
          productId={item.productId}
          user={item.user}
          desc={item.desc}
          createdAt={item.createdAt}
          useTime={item.useTime}
          starRating={item.starRating}
          key={index}
        />
      ))}

      <div className="m-3">
        <Pagination
          showQuickJumper
          showTotal={(total, range) =>
            // `${range[0]}-${range[1]} of ${total} items`
            `Từ ${range[0]} đến ${range[1]} trên tổng ${total} sản phẩm`
          }
          defaultCurrent={page}
          defaultPageSize={itemNumber}
          total={reviews.length}
          onChange={onChange}
          showLessItems={true}
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </div>
  );
};

export default ReviewList;
