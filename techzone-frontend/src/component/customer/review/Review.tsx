"use client";
import { Avatar, Button, Divider, Flex, List, Image, Rate, Modal } from "antd";
// import { useTranslations } from "next-intl";
import CommentContainer from "./comment/CommentContainer";
import { ReviewType } from "@/model/ReviewType";
import { useEffect, useMemo, useState } from "react";
import { PUT_UpdateReview } from "@/apis/review/ReviewAPI";

const Review = (review: ReviewType) => {
  //   const t = useTranslations("Review");
  const myUserId = "663a174e094abbc113a4bca0"; //mock data

  const [user, setUser] = useState<{
    id: string;
    name: string;
    avatar: string;
  }>({ id: review.user, name: "Thái Văn Thiên", avatar: "" }); //TODO

  const [isLiked, setIsLiked] = useState<boolean>(
    review.like.includes(myUserId) //TODO
  );
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const [open, setOpen] = useState(false);

  const like = useMemo(() => {
    if (isLiked) {
      if (review.like.includes(myUserId)) return review.like;
      else {
        let newLike = [...review.like];
        newLike.push(myUserId);
        return newLike;
      }
    } else if (review.like.includes(myUserId)) {
      review.like.filter((likeId) => likeId !== myUserId);
    } else return review.like;
    return [];
  }, [isLiked]);

  useEffect(() => {
    handleUpdateReview();
  }, [like]);

  const handleUpdateReview = async () => {
    const response = await PUT_UpdateReview({
      _id: review.id,
      product: review.productId,
      user: review.user,
      rating: review.starRating,
      content: review.desc,
      asset: review.asset,
      createdAt: review.createdAt,
      conversation: review.conversation,
      like: like,
    });
    if (response.status == 200) {
      //
      console.log("Update review successfully!");
    } else console.log(response.message);
  };

  return (
    <div className="m-2 bg-white rounded-xl border-2 overflow-hidden relative">
      <div className="m-2 grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col md:flex-row lg:flex-row">
          <div className="m-3">
            {(user.avatar === "" && (
              <Avatar size="large">{user.name}</Avatar>
            )) || <Avatar size="large" src={user.avatar} alt={user.name} />}
          </div>
          <div className="m-3">
            <Flex vertical>
              <b>{user.name}</b>
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
          {review.desc}
        </div>
        <div className="col-span-1">
          <Button danger onClick={() => setOpen(true)}>
            Báo cáo
          </Button>
        </div>
        {review.asset.length > 0 && (
          <div className="col-start-2 col-span-2 mx-2">
            <List
              grid={{ gutter: 5, xs: 5, sm: 5, md: 6, lg: 8, xl: 10, xxl: 10 }}
              dataSource={review.asset}
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
            {new Date(review.createdAt).toLocaleDateString("vi-VN", {
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
      <CommentContainer reviewId={review.id} customerId={review.user} />

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
