"use client";
import { Button, Rate, Skeleton, UploadFile } from "antd";
import { FormEvent, useContext, useEffect, useState } from "react";
import MultipleUpload from "./MultipleUpload";
import { POST_CreateReview } from "@/apis/review/ReviewAPI";
import { RawReviewType } from "@/model/ReviewType";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "next/navigation";
import { ProductDetailType } from "@/model/ProductType";
import { priceIndex } from "../product/ProductDetail";
import { GET_GetProductDetail } from "@/apis/product/ProductDetailAPI";
import { AuthContext } from "@/context/AuthContext";

interface NewReviewFormProps {
  notify(message: string, content: any): void;
}

export default function NewReviewForm(props: NewReviewFormProps) {
  // data
  const desc = [
    "Không hài lòng",
    "Hơi kém",
    "Bình thường",
    "Hài lòng",
    "Cực kì hài lòng",
  ];

  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetailType>();

  // review
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState<string>("");
  const [asset, setAsset] = useState<string[]>([]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const submitHandler = (e: FormEvent) => {
    // e.preventDefault();

    if (content === "") {
      props.notify("Hãy điền cảm nhận", "");
    } else {
      handleCreateReview();
    }
  };

  const authContext = useContext(AuthContext);

  // call api
  const handleCreateReview = async () => {
    if (
      !product ||
      !authContext ||
      !authContext.userInfo ||
      !authContext.userInfo._id
    )
      return;

    const userId = authContext.userInfo._id;

    let newReview: RawReviewType = {
      _id: "",
      product: productId.toString(),
      user: userId,
      rating: rating,
      content: content,
      asset: asset,
      createdAt: new Date().toISOString(),
      conversation: [],
      like: [],
    };

    const response = await POST_CreateReview(newReview);

    if (response) {
      props.notify(
        "Chia sẻ cảm nhận thành công!",
        <div className="flex flex-row gap-6 w-max">
          <img className="m-2 h-20 w-20 object-fill" src={product.images[0]} />
          <div className="flex flex-col justify-center">
            <div className="text-sm md:text-lg truncate">{product.name}</div>
            <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
              {priceIndex(product.finalPrice)}
            </div>
          </div>
        </div>
      );

      setTimeout(() => {
        // if (response.status == 200) {
        setRating(3);
        setContent("");
        setAsset([]);
        setFileList([]);
        // } else console.log(response.message);
      }, 10000);
    } else console.log("No response...");
  };

  useEffect(() => {
    handleGetProductDetail();
  }, []);

  const handleGetProductDetail = async () => {
    const response = await GET_GetProductDetail(productId.toString());
    if (response.status == 200) {
      let data = response.data as ProductDetailType;
      if (data) {
        setProduct(data);
        console.log("product", data);
      }
    } else console.log(response.message);
  };

  return (
    <div className="flex flex-col gap-5 relative items-center p-10 border-2 rounded-lg bg-white h-fit w-fit">
      <div className="text-2xl font-semibold">Chia sẻ cảm nhận</div>

      <div className="text-slate-500">Bạn cảm thấy sản phẩm như thế nào?</div>
      {(product && (
        <div className="flex flex-row gap-6 w-max">
          <img className="m-2 h-20 w-20 object-fill" src={product.images[0]} />
          <div className="flex flex-col justify-center">
            <div className="text-sm md:text-lg truncate">{product.name}</div>
            <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
              {priceIndex(product.finalPrice)}
            </div>
          </div>
        </div>
      )) || <Skeleton />}
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
            <TextArea
              rows={6}
              cols={111}
              value={content}
              placeholder="Để lại cảm nhận"
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
