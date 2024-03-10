"use client";
import { Avatar, Flex, Rate } from "antd";
// import { useTranslations } from "next-intl";
import CommentContainer from "./comment/CommentContainer";
// import { ReviewType } from "@/model/ReviewType";

// const Review = (review: ReviewType) => {
const Review = () => {
  //   const t = useTranslations("Review");

  return (
    <div className="m-2 bg-white rounded-xl border-2 overflow-hidden relative">
      <div className="m-2 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-row">
          <div className="m-3">
            <Avatar
              size="large"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            />
          </div>
          <div className="m-3">
            <Flex vertical gap="small">
              <b>Lê Quốc Dũng</b>
              <div className="text-gray-600 font-light">Đã tham gia 7 năm</div>
            </Flex>
          </div>
          {/* <b>{t("grade_composition")}:</b> {review.gradeComposition} */}
        </div>
        <div className="col-span-2 flex flex-col">
          <Flex gap="small">
            <Rate disabled defaultValue={5} style={{ padding: 5 }} />
            <div className="font-bold ">Cực kì hài lòng</div>
          </Flex>
          <b>Góp ý: </b>Shipper rất nhiệt tình và tận tâm, giao hàng nhanh, đóng
          gói cẩn thận, thử máy rất tốt trong tầm giá. Hy vọng máy xài bền.
        </div>
        <div className="col-span-3 flex flex-row gap-10 text-xs">
          <div>Màu: Xanh Dương</div>
          <div>Đánh giá vào 24 ngày trước</div>
          <div> Đã dùng 5 phút</div>
        </div>
      </div>
      {/* <CommentContainer productId={review._id} customerId={review.customerId} /> */}
      <CommentContainer />
    </div>
  );
};

export default Review;
