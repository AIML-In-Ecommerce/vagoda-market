import { ProductDetailType } from "@/model/ProductType";
import {
  Popover,
  Flex,
  Rate,
  Progress,
  Collapse,
  Divider,
  Skeleton,
} from "antd";
import Link from "next/link";
import SimplePieChart from "./SimplePieChart";
import { useEffect, useMemo, useState } from "react";
import { GET_GetAllReviewsByQuery } from "@/apis/review/ReviewAPI";
import { ReviewType } from "@/model/ReviewType";
import axios from "axios";
import { GET_GetProductDetail } from "@/apis/product/ProductDetailAPI";
const AI_DOMAIN = process.env.NEXT_PUBLIC_AI_DOMAIN;
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;

console.log("AI DOMAIN: ", AI_DOMAIN);

interface ReviewSummaryProps {
  product: ProductDetailType | undefined;
  reviews: ReviewType[];
}

interface ReviewSummary {
  positiveCount: number;
  negativeCount: number;
  trashCount: number;
  positiveSummary: string;
  negativeSummary: string;
}

export default function ReviewSummary(props: ReviewSummaryProps) {
  // const [totalNumber, setTotalNumber] = useState(0);
  const [oneStarNumber, setOneStarNumber] = useState(0);
  const [twoStarNumber, setTwoStarNumber] = useState(0);
  const [threeStarNumber, setThreeStarNumber] = useState(0);
  const [fourStarNumber, setFourStarNumber] = useState(0);
  const [fiveStarNumber, setFiveStarNumber] = useState(0);

  const [summaryReview, setSummaryReview] = useState<ReviewSummary>({
    positiveCount: 0,
    negativeCount: 0,
    trashCount: 0,
    positiveSummary: "",
    negativeSummary: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [menuMode, setMenuMode] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  const checkWindowSize = () => {
    if (window.innerWidth < 768 || window.innerWidth > 1024) {
      setMenuMode("horizontal");
    } else {
      setMenuMode("vertical");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  useEffect(() => {
    // GET_GetReviewListByProduct(props.product?._id);
    for (let i = 1; i <= 5; i++) {
      handleGetNumber(i);
    }
  });

  const reviewContentList = useMemo(() => {
    let list: string[] = [];
    props.reviews.forEach((review) => {
      list.push(review.content);
    });
    console.log("list", list);
    return list;
  }, [props.reviews]);

  // const getSummaryReview = async () => {
  //   const postBody = {
  //     reviews: reviewContentList,
  //   };

  //   console.log("Post reviews body: ", postBody);

  //   try {
  //     const rawResponse = await axios.post(
  //       `${AI_DOMAIN}/genai/review-synthesis`,
  //       postBody,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );
  //     if (rawResponse.status == 200) {
  //       console.log("Get summary review successfully:", rawResponse.data);
  //       const response = JSON.parse(rawResponse.data.data);
  //       console.log("Response: ", response);
  //       setSummaryReview(response);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error getting summary review :", error);
  //   }
  // };

  // const handleGetProductDetail = async () => {
  //   if (!props.product?._id) return;
  //   const response = await GET_GetProductDetail(
  //     props.product?._id.toString(),
  //   );
  //   if (response.status == 200) {
  //     let data = response.data as ProductDetailType;
  //     if (data) {
  //       setProduct(data);
  //       console.log("product", data);
  //       await setAccessProductByAuthUser(data.shop, data._id);
  //     }
  //   } else console.log(response.message);
  // };

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${GATEWAY_PREFIX}/product/${props.product?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status == 200) {
        console.log("Product Summary", response.data.data.reviewSynthesis);
        setSummaryReview(response.data.data.reviewSynthesis);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error getting summary review :", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  // api
  const handleGetNumber = async (rating: number) => {
    if (!props.product || !props.product._id) return;
    const response = await GET_GetAllReviewsByQuery(props.product?._id, rating);

    if (response.status == 200 && response.data) {
      switch (rating) {
        case 1: {
          setOneStarNumber(response.data.length);
          break;
        }
        case 2: {
          setTwoStarNumber(response.data.length);
          break;
        }
        case 3: {
          setThreeStarNumber(response.data.length);
          break;
        }
        case 4: {
          setFourStarNumber(response.data.length);
          break;
        }
        case 5: {
          setFiveStarNumber(response.data.length);
          break;
        }
      }
    } else {
      console.log(response.message);
    }
  };

  return (
    <div>
      {props.product && (
        <div className="sticky bg-white rounded-xl mt-2 border-2 top-0 p-3">
          <Collapse
            ghost
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: (
                  <div className="flex justify-center md:justify-start lg:justify-center font-bold uppercase text-sm md:text-sm">
                    đánh giá sản phẩm 🌟
                  </div>
                ),
                children: (
                  <div className="flex flex-col md:flex-row lg:flex-col items-center w-full h-full">
                    <div id="star-review-summary">
                      <Popover
                        className="mx-5"
                        title="Thống kê chung"
                        content={
                          <div>
                            <Flex vertical gap="small" style={{ width: 300 }}>
                              <Flex gap="small">
                                <Rate
                                  disabled
                                  defaultValue={5}
                                  style={{ padding: 5, fontSize: 10 }}
                                />
                                <Flex gap="small" style={{ width: 180 }}>
                                  <Progress
                                    percent={Math.round(
                                      (fiveStarNumber / props.reviews.length) *
                                        100,
                                    )}
                                    size="small"
                                  />
                                </Flex>
                              </Flex>
                              <Flex gap="small">
                                <Rate
                                  disabled
                                  defaultValue={4}
                                  style={{ padding: 5, fontSize: 10 }}
                                />
                                <Flex gap="small" style={{ width: 180 }}>
                                  <Progress
                                    percent={Math.round(
                                      (fourStarNumber / props.reviews.length) *
                                        100,
                                    )}
                                    size="small"
                                  />
                                </Flex>
                              </Flex>
                              <Flex gap="small">
                                <Rate
                                  disabled
                                  defaultValue={3}
                                  style={{ padding: 5, fontSize: 10 }}
                                />
                                <Flex gap="small" style={{ width: 180 }}>
                                  <Progress
                                    percent={Math.round(
                                      (threeStarNumber / props.reviews.length) *
                                        100,
                                    )}
                                    size="small"
                                  />
                                </Flex>
                              </Flex>
                              <Flex gap="small">
                                <Rate
                                  disabled
                                  defaultValue={2}
                                  style={{ padding: 5, fontSize: 10 }}
                                />
                                <Flex gap="small" style={{ width: 180 }}>
                                  <Progress
                                    percent={Math.round(
                                      (twoStarNumber / props.reviews.length) *
                                        100,
                                    )}
                                    size="small"
                                  />
                                </Flex>
                              </Flex>
                              <Flex gap="small">
                                <Rate
                                  disabled
                                  defaultValue={1}
                                  style={{ padding: 5, fontSize: 10 }}
                                />
                                <Flex gap="small" style={{ width: 180 }}>
                                  <Progress
                                    percent={Math.round(
                                      (oneStarNumber / props.reviews.length) *
                                        100,
                                    )}
                                    size="small"
                                  />
                                </Flex>
                              </Flex>
                            </Flex>
                          </div>
                        }
                      >
                        <div className="flex flex-col cursor-pointer items-center gap-2 w-max">
                          {/* <div className="font-bold uppercase text-sm md:text-sm">
                            đánh giá sản phẩm
                          </div> */}
                          <div className="font-extrabold uppercase text-2xl md:text-6xl">
                            {props.product.avgRating}
                          </div>
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={
                              Math.round(props.product.avgRating * 10) / 10
                            }
                            style={{ padding: 5, fontSize: 28 }}
                          />
                          <div className="italic text-[9px] md:text-sm">
                            {props.reviews.length} đánh giá
                            {/* {totalNumber}  */}
                          </div>
                        </div>
                      </Popover>
                    </div>

                    <Divider
                      type={menuMode}
                      style={{
                        height: menuMode === "vertical" ? "200px" : "auto",
                        border: "0.25px solid #DCDCDC",
                      }}
                    />
                    <div
                      id="ai-review-summary"
                      className="md:pl-5 lg:pl-0 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-3 md:min-h-[200px]"
                    >
                      <div className="col-span-1 flex items-center">
                        <Skeleton loading={isLoading} active avatar>
                          <SimplePieChart
                            positiveValue={summaryReview?.positiveCount}
                            negativeValue={summaryReview?.negativeCount}
                            trashValue={summaryReview?.trashCount}
                          />
                        </Skeleton>
                      </div>

                      <div className="col-span-2 md:col-span-4 lg:col-span-2 pl-5">
                        <div className="font-semibold text-xs md:text-sm w-full">
                          🤖 <Link href="#">Trợ lý AI </Link>
                          tổng hợp từ các đánh giá mới nhất
                        </div>

                        <Skeleton loading={isLoading} active avatar>
                          <div className="pt-2 text-xs md:text-sm flex flex-col">
                            {/* max-h-[350px] text-ellipsis overflow-clip */}
                            <div className="flex flex-row gap-1">
                              <span className="font-bold">Tích cực: </span>{" "}
                              <span className="text-slate-500">
                                {" "}
                                ({summaryReview.positiveCount} đánh giá)
                              </span>
                            </div>
                            <div>{summaryReview.positiveSummary}</div>
                          </div>

                          <div className="pt-2 text-xs md:text-sm flex flex-col">
                            {/* max-h-[350px] text-ellipsis overflow-clip */}
                            <div className="flex flex-row gap-1">
                              <span className="font-bold">Tiêu cực: </span>{" "}
                              <span className="text-slate-500">
                                {" "}
                                ({summaryReview.negativeCount} đánh giá)
                              </span>
                            </div>
                            <div>{summaryReview.negativeSummary}</div>
                          </div>
                        </Skeleton>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
