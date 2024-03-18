"use client";
import { Avatar, Button, Divider, Flex, InputNumber } from "antd";
// import { useTranslations } from "next-intl";
import { AntDesignOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { priceIndex } from "@/component/customer/product/ProductDetail";

interface FormProps {
  editable: boolean;
  currentEditMode: string;
  //   numberOfItem: number;
  //   updateItemNumber: (value: number) => void;
  //   totalPrice: number;
  //   handleCartDetail: (isOpen: boolean) => void;
}

const ComboForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  // display UI elements that are editable
  const visible = useMemo(() => {
    if (formData.currentEditMode === "combo") return formData.editable;
    return false;
  }, [formData.editable, formData.currentEditMode]);

  return (
    <div className="fixed lg:w-72 min-w-40 mr-10 p-3 bg-white rounded-xl border-2 overflow-hidden">
      askdja
    </div>
  );
};

export default ComboForm;
