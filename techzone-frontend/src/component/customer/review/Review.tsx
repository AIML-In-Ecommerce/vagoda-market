"use client";
import { Avatar, Button, Divider, Flex, List, Image, Rate, Modal } from "antd";
// import { useTranslations } from "next-intl";
import CommentContainer from "./comment/CommentContainer";
import { ReviewType } from "@/model/ReviewType";
import { useEffect, useMemo, useState } from "react";
import { PUT_UpdateReview } from "@/apis/review/ReviewAPI";

interface ReviewProps {
  review: ReviewType;
  updateReviews: () => void;
}

const Review = (props: ReviewProps) => {
  //   const t = useTranslations("Review");
  const myUserId = "663a174e094abbc113a4bca0"; //mock data

  const [isLiked, setIsLiked] = useState<boolean>(
    props.review.like.includes(myUserId) //TODO
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(props.review.like.includes(myUserId)); //TODO
  }, [props.review]);

  const [open, setOpen] = useState(false);

  const handleUpdateReview = async (newLike: string[]) => {
    const response = await PUT_UpdateReview({
      _id: props.review._id,
      product: props.review.product._id,
      user: props.review.user._id,
      rating: props.review.rating,
      content: props.review.content,
      asset: props.review.asset,
      createdAt: props.review.createdAt,
      conversation: props.review.conversation,
      like: newLike,
    });
    if (response.status == 200) {
      //
      console.log("Update review successfully!");

      props.review.like = newLike;
      props.updateReviews();
    } else console.log(response.message);
  };

  const like = useMemo(() => {
    let tempLike = [...props.review.like];

    if (isLiked) {
      if (!props.review.like.includes(myUserId)) {
        tempLike.push(myUserId);
        handleUpdateReview(tempLike);
      }
    } else if (props.review.like.includes(myUserId)) {
      tempLike = props.review.like.filter((likeId) => likeId !== myUserId);
      handleUpdateReview(tempLike);
    }

    return tempLike;
  }, [isLiked]);

  return (
    <div className="m-2 bg-white rounded-xl border-2 overflow-hidden relative">
      <div className="m-2 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col md:flex-row lg:flex-row">
          <div className="m-3">
            {(props.review.user.avatar === "" && (
              <Avatar size="large">{props.review.user.fullName}</Avatar>
            )) || (
              <Avatar
                size="large"
                src={props.review.user.avatar}
                alt={props.review.user.fullName}
              />
            )}
          </div>
          <div className="m-3">
            <Flex vertical>
              <b>{props.review.user.fullName}</b>
              <div className="text-gray-600 font-light text-xs">
                Đã tham gia 2 tháng
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
              value={props.review.rating}
              style={{ padding: 5 }}
            />
            {/* <div className="font-bold ">{satisfactoryStatus}</div> */}

            {props.review.rating == 1 && (
              <div className="font-bold ">Không hài lòng</div>
            )}
            {props.review.rating == 2 && (
              <div className="font-bold ">Hơi kém</div>
            )}
            {props.review.rating == 3 && (
              <div className="font-bold ">Bình thường</div>
            )}
            {props.review.rating == 4 && (
              <div className="font-bold ">Hài lòng</div>
            )}
            {props.review.rating == 5 && (
              <div className="font-bold ">Cực kì hài lòng</div>
            )}
          </Flex>
          {props.review.content}
        </div>
        <div className="col-span-1">
          <Button danger onClick={() => setOpen(true)}>
            Báo cáo
          </Button>
        </div>
        {props.review.asset.length > 0 && (
          <div className="col-start-2 col-span-2 mx-2">
            <List
              grid={{ gutter: 5, xs: 5, sm: 5, md: 6, lg: 8, xl: 10, xxl: 10 }}
              dataSource={props.review.asset}
              renderItem={(item) => (
                <List.Item>
                  <Image
                    width={50}
                    height={50}
                    src={item}
                    preview={{
                      title: "Xem ảnh",
                    }}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
        <div className="col-start-2 col-span-3 flex flex-row gap-10 text-xs">
          <div>
            {new Date(props.review.createdAt).toLocaleDateString("vi-VN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </div>
        </div>

        <div className="col-start-2 col-span-3 flex flex-row gap-2 align-middle h-auto">
          {(isLiked && (
            <Button
              type="primary"
              style={{ background: "dodgerblue", borderColor: "dodgerblue" }}
              onClick={handleLike}
              size="small"
            >
              Hữu ích
            </Button>
          )) || (
            <Button type="primary" ghost onClick={handleLike} size="small">
              Hữu ích
            </Button>
          )}
          <Divider
            type="vertical"
            style={{ height: "auto", border: "0.25px solid silver" }}
          />
          <div className="text-gray-600 text-sm">
            {like.length} người cảm thấy hữu ích
          </div>
        </div>
      </div>
      <CommentContainer
        review={props.review}
        updateReviews={() => {
          props.updateReviews();
        }}
      />

      <Modal
        title="Thông báo"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={200}
        footer={null}
      >
        <p>Tin nhắn đã bị khóa</p>
      </Modal>
    </div>
  );
};

export default Review;
