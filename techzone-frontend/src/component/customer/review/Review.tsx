"use client";
import { Avatar, Flex, Rate } from "antd";
// import { useTranslations } from "next-intl";
import CommentContainer from "./comment/CommentContainer";
import { ReviewType } from "@/model/ReviewType";

const Review = (review: ReviewType) => {
  //   const t = useTranslations("Review");

  return (
    <div className="m-2 bg-white rounded-xl border-2 overflow-hidden relative">
      <div className="m-2 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-row">
          <div className="m-3">
            {(review.user.avatar === "" && (
              <Avatar size="large">{review.user.name}</Avatar>
            )) || (
              <Avatar
                size="large"
                src={review.user.avatar}
                alt={review.user.name}
              />
            )}
          </div>
          <div className="m-3">
            <Flex vertical>
              {/* <b>Lê Quốc Dũng</b> */}
              <b>{review.user.name}</b>
              <div className="text-gray-600 font-light text-xs">
                Đã tham gia 7 năm
              </div>
            </Flex>
          </div>
          {/* <b>{t("grade_composition")}:</b> {review.gradeComposition} */}
        </div>
        <div className="col-span-2 flex flex-col">
          <Flex gap="small">
            <Rate
              disabled
              defaultValue={1}
              value={review.starRating}
              style={{ padding: 5 }}
            />
            {/* <div className="font-bold ">{satisfactoryStatus}</div> */}

            {review.starRating == 1 && (
              <div className="font-bold ">Không hài lòng</div>
            )}
            {review.starRating == 2 && (
              <div className="font-bold ">Hơi kém</div>
            )}
            {review.starRating == 3 && (
              <div className="font-bold ">Bình thường</div>
            )}
            {review.starRating == 4 && (
              <div className="font-bold ">Hài lòng</div>
            )}
            {review.starRating == 5 && (
              <div className="font-bold ">Cực kì hài lòng</div>
            )}
          </Flex>
          <b>Góp ý: </b>
          {review.desc}
        </div>
        <div className="col-span-3 flex flex-row gap-10 text-xs">
          <div>Màu: Xanh Dương</div>
          <div>{review.createdAt}</div>
          <div>{review.useTime}</div>
        </div>
      </div>
      {/* <CommentContainer productId={review._id} customerId={review.customerId} /> */}
      <CommentContainer />
    </div>
  );
};

export default Review;
