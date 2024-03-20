"use client";
import { Divider, Flex, Rate } from "antd";
// import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { priceIndex } from "@/component/customer/product/ProductDetail";
import Link from "next/link";

interface FormProps {
  editable: boolean;
  currentEditMode: string;
  name: string;
  avgRating: number;
  originalPrice: number;
  finalPrice: number;
}

const OverviewForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  // display UI elements that are editable
  const visible = useMemo(() => {
    if (formData.currentEditMode === "overview") return formData.editable;
    return false;
  }, [formData.editable, formData.currentEditMode]);

  return (
    <div className="p-4">
      {/* visible? */}
      <div className="text-sm">
        Thương hiệu / Shop:{" "}
        <Link href="" className="text-blue-500">
          Ecovacs
        </Link>
      </div>

      <div className="font-bold uppercase text-lg">{formData.name}</div>

      {visible == false && (
        <Flex
          gap="small"
          style={{ lineHeight: 2, marginTop: 2, alignContent: "center" }}
        >
          <Rate disabled allowHalf defaultValue={4.5} style={{ padding: 5 }} />
          <div className="font-bold uppercase text-xl">
            {formData.avgRating}
          </div>
          <div className="text-xs font-light mt-2">(10 đánh giá)</div>
          <Divider
            type="vertical"
            style={{ height: "auto", border: "0.25px solid silver" }}
          />
          <div className="font-light">Đã bán 5000+</div>
        </Flex>
      )}

      <div className="flex flex-row gap-3 my-2">
        <div className="line-through text-gray-600 uppercase text-xl md:text-2xl lg:text-2xl">
          {/* {formData.originalPrice} Đ */}
          {priceIndex(formData.originalPrice)}
        </div>
        <div className="font-bold text-red-500 uppercase text-xl md:text-2xl lg:text-2xl">
          {priceIndex(formData.finalPrice)}
        </div>
        <div className="text-red-500 uppercase text-xs mt-1">-50%</div>
      </div>
      {/* sub category tags */}
      {/* <div className="capitalize text-xs mt-5">Sub-category:</div>
            <Tag>
              <a href="https://github.com/ant-design/ant-design/issues/1862">
                Điện máy - Điện gia dụng
              </a>
            </Tag>
            <Tag>
              <a href="https://github.com/ant-design/ant-design/issues/1862">
                Thiết bị văn phòng
              </a>
            </Tag> */}
      {/* sub category tags */}

      {/* add Link later if use */}
      {/* {visible == false && (
        <div className="flex flex-col gap-3">
          <div className="font-semibold pt-5">Dịch vụ bổ sung</div>
          <div className="bg-white shadow-md max-w-1/4 h-fit p-4">
            Thay đổi Thông tin vận chuyển
          </div>
          <div className="bg-white shadow-md max-w-1/4 h-fit p-4">
            Ưu đãi, mã giảm giá
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OverviewForm;
