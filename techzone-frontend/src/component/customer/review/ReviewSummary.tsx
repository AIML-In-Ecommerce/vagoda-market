import { ProductDetailType } from "@/model/ProductType";
import { Popover, Flex, Rate, Progress, Collapse } from "antd";

interface ReviewSummaryProps {
  product: ProductDetailType | undefined;
  numberOfReview: number;
}

export default function ReviewSummary(props: ReviewSummaryProps) {
  return (
    <div>
      {props.product && (
        <div className="sticky bg-white rounded-xl mt-2 border-2 top-0 p-3 flex flex-col md:flex-row lg:flex-col items-center">
          <div id="star-review-summary">
            <Popover
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
                        <Progress percent={66} size="small" />
                      </Flex>
                    </Flex>
                    <Flex gap="small">
                      <Rate
                        disabled
                        defaultValue={4}
                        style={{ padding: 5, fontSize: 10 }}
                      />
                      <Flex gap="small" style={{ width: 180 }}>
                        <Progress percent={33} size="small" />
                      </Flex>
                    </Flex>
                    <Flex gap="small">
                      <Rate
                        disabled
                        defaultValue={3}
                        style={{ padding: 5, fontSize: 10 }}
                      />
                      <Flex gap="small" style={{ width: 180 }}>
                        <Progress percent={1} size="small" />
                      </Flex>
                    </Flex>
                    <Flex gap="small">
                      <Rate
                        disabled
                        defaultValue={2}
                        style={{ padding: 5, fontSize: 10 }}
                      />
                      <Flex gap="small" style={{ width: 180 }}>
                        <Progress percent={0} size="small" />
                      </Flex>
                    </Flex>
                    <Flex gap="small">
                      <Rate
                        disabled
                        defaultValue={1}
                        style={{ padding: 5, fontSize: 10 }}
                      />
                      <Flex gap="small" style={{ width: 180 }}>
                        <Progress percent={0} size="small" />
                      </Flex>
                    </Flex>
                  </Flex>
                </div>
              }
            >
              <div className="flex flex-col cursor-pointer items-center gap-2 w-max">
                <div className="font-bold uppercase text-sm md:text-sm">
                  đánh giá sản phẩm
                </div>
                <div className="font-extrabold uppercase text-2xl md:text-6xl">
                  {props.product.avgRating}
                </div>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={props.product.avgRating}
                  style={{ padding: 5, fontSize: 28 }}
                />
                <div className="italic pb-5 text-[9px] md:text-sm">
                  {props.numberOfReview} đánh giá
                </div>
              </div>
            </Popover>
          </div>

          <div id="ai-review-summary" className="mb-5 md:pl-5 lg:pl-0">
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: (
                    <div className="font-semibold text-xs md:text-sm">
                      Tổng quan đánh giá khách hàng
                    </div>
                  ),
                  children: (
                    <div className="pt-2 text-xs md:text-sm max-h-[350px] text-ellipsis overflow-clip">
                      Tổng thể, sản phẩm là một sự lựa chọn tốt cho người tiêu
                      dùng muốn đầu tư một cách thông minh và hiệu quả.
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
