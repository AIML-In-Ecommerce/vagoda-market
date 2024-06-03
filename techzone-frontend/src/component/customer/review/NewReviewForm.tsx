"use client";
import { Button, Rate, UploadFile } from "antd";
import React, { FormEvent, useState } from "react";
import MultipleUpload from "./MultipleUpload";
import { POST_CreateReview } from "@/apis/review/ReviewAPI";
import { RawReviewType } from "@/model/ReviewType";
import TextArea from "antd/es/input/TextArea";

interface ReviewFormProps {
  //   formSubmitHandler: (
  //     content: string,
  //     asset: string[],
  //     product: string
  //   ) => void;
}

export default function NewReviewForm(props: ReviewFormProps) {
  // data
  const desc = [
    "Không hài lòng",
    "Hơi kém",
    "Bình thường",
    "Hài lòng",
    "Cực kì hài lòng",
  ];

  // review
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState("");
  const [asset, setAsset] = useState<string[]>([]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const submitHandler = (e: FormEvent) => {
    // e.preventDefault();

    // props.formSubmitHandler("user", rating, content, asset);
    handleCreateReview();
  };

  // call api
  const handleCreateReview = async () => {
    let newReview: RawReviewType = {
      _id: "",
      product: "663da8175f77ea6b8f5b2e1d", // TODO
      user: "663a174e094abbc113a4bca0", // TODO
      rating: rating,
      content: content,
      asset: asset,
      createdAt: new Date().toISOString(),
      conversation: [],
      like: [],
    };

    const response = await POST_CreateReview(newReview);
    if (response.status == 200) {
      alert("Review created successfully!");
      //

      setRating(3);
      setContent("");
      setAsset([]);
      setFileList([]);
    } else console.log(response.message);
  };

  return (
    <div className="flex flex-col gap-5 relative items-center p-10 border-2 rounded-lg bg-white h-fit w-fit">
      <div className="text-2xl font-semibold">Chia sẻ cảm nhận</div>

      <div className="text-slate-500">Bạn cảm thấy sản phẩm như thế nào?</div>

      <form>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-2 items-center">
            <Rate
              allowClear={false}
              tooltips={desc}
              onChange={setRating}
              value={rating}
            />
            {rating ? (
              <div className="text-slate-500 text-xs">{desc[rating - 1]}</div>
            ) : null}
          </div>

          <div className="flex flex-row gap-3">
            {/* <textarea
              id="freeform"
              name="freeform"
              rows={6}
              cols={111}
              wrap="soft"
              placeholder="Để lại cảm nhận"
              className="w-full focus:outline-none mx-auto pl-[8px] pt-[2px] 
              rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
              resize-none"
              content={content}
              onChange={(e) => setContent(e.target.value)}
            /> */}

            <TextArea
              rows={6}
              cols={111}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* for testing  */}
        {/* {asset.map((a, index) => (
          <div className="truncate w-[200px]">
            {index}
            {a}
          </div>
        ))} */}

        <div className="mt-5 mb-3 text-slate-500">Ảnh đính kèm</div>

        <MultipleUpload
          asset={asset}
          setAsset={setAsset}
          fileList={fileList}
          setFileList={setFileList}
        />

        <Button
          type="primary"
          block
          className="my-2"
          size="large"
          style={{ background: "#5c6856" }}
          onClick={submitHandler}
        >
          Gửi cảm nhận
        </Button>
      </form>
    </div>
  );
}
