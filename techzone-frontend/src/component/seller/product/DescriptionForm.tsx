"use client";
import { Divider, Flex, Rate } from "antd";
// import { useTranslations } from "next-intl";
import { priceIndex } from "@/component/customer/product/ProductDetail";
import Link from "next/link";
import { useMemo } from "react";

interface FormProps {
  editable: boolean;
  currentEditMode: string;
  //   visible: boolean;
  //   name: string;
  //   avgRating: number;
  //   originalPrice: number;
  //   finalPrice: number;
}

const DescriptionForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  // display UI elements that are editable
  const visible = useMemo(() => {
    if (formData.currentEditMode === "description") return formData.editable;
    return false;
  }, [formData.editable, formData.currentEditMode]);

  return <div className="p-4"></div>;
};

export default DescriptionForm;
