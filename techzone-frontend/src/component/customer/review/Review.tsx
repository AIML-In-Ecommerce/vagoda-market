"use client";
import { Avatar, Button, Divider, Flex, List, Image, Rate, Modal } from "antd";
// import { useTranslations } from "next-intl";
import CommentContainer from "./comment/CommentContainer";
import { ReviewType } from "@/model/ReviewType";
import { useMemo, useState } from "react";

const Review = (review: ReviewType) => {
  //   const t = useTranslations("Review");

  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const like = useMemo(() => {
    // update db with axios

    if (isLiked) {
      let newLike = [...review.like];
      newLike.push("my id");
      return newLike;
    } else return review.like.filter((likeId) => likeId !== "my id"); // ? revise this later
  }, [isLiked]);

  const [open, setOpen] = useState(false);

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
              grid={{ gutter: 5, column: 10 }}
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
          <div>{review.createdAt}</div>
          {/* <div>{review.useTime}</div> */}
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
      <CommentContainer reviewId={review.id} customerId={review.user.id} />

      <Modal
        title="Thông báo"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        // width={1000}
      >
        <p>Banned...</p>
      </Modal>
    </div>
  );
};

export default Review;
