"use client";
import { CascaderProps, Dropdown, MenuProps } from "antd";

import { useState } from "react";
import { MdMenu } from "react-icons/md";

interface NavbarMenuProps {
  name: string;
  //   options: string[];
  image_link: string;
}

interface Option {
  id: string;
  value: string;
  children: Option[] | null;
  image_link?: string;
}

const options: Option[] = [
  {
    id: "nam",
    value: "Nam",

    children: [
      { id: "ao-nam", value: "Áo Nam", children: null },
      { id: "quan-nam", value: "Quần Nam", children: null },
      { id: "do-bo-nam", value: "Đồ Bộ Nam", children: null },
      { id: "do-the-thao-nam", value: "Đồ Thể Thao Nam", children: null },
      { id: "do-lot-nam", value: "Đồ Lót Nam", children: null },
      { id: "giay-nam-dep-nam", value: "Giày Nam - Dép Nam", children: null },
      { id: "phu-kien-nam", value: "Phụ Kiện Nam", children: null },
    ],
    image_link:
      "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "nu",
    value: "Nữ",
    children: [
      { id: "ao-nu", value: "Áo Nữ", children: null },
      { id: "quan-nu", value: "Quần Nữ", children: null },
      { id: "do-bo-nu", value: "Đồ Bộ Nữ", children: null },
      { id: "do-the-thao-nu", value: "Đồ Thể Thao Nữ", children: null },
      { id: "do-lot-nu", value: "Đồ Lót Nữ", children: null },
      { id: "chan-vay-nu", value: "Chân Váy Nữ", children: null },
      { id: "dam-vay-nu", value: "Đầm Nữ - Váy Nữ", children: null },
      { id: "phu-kien-nu", value: "Phụ Kiện Nữ", children: null },
      { id: "giay-nu-dep-nu", value: "Giày Nữ - Dép Nữ", children: null },
    ],
    image_link:
      "https://images.pexels.com/photos/5432169/pexels-photo-5432169.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "nam-nu",
    value: "Nam/Nữ",
    children: null,
    image_link:
      "https://images.pexels.com/photos/6342786/pexels-photo-6342786.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "tre-em",
    value: "Trẻ Em",
    children: [
      { id: "ao-tre-em", value: "Áo Trẻ Em", children: null },
      { id: "quan-tre-em", value: "Quần Trẻ Em", children: null },
      { id: "do-bo-tre-em", value: "Đồ Bộ Trẻ Em", children: null },
      { id: "do-the-thao-tre-em", value: "Đồ Thể Thao Trẻ Em", children: null },
      { id: "dam-vay-be-gai", value: "Đầm/Váy Bé Gái", children: null },
      { id: "giay-dep-tre-em", value: "Giày Dép Trẻ Em", children: null },
      { id: "phu-kien-tre-em", value: "Phụ Kiện Trẻ Em", children: null },
    ],
    image_link:
      "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const onChange: CascaderProps<Option>["onChange"] = (value: any) => {
  console.log(value);
};

export default function NavbarMenu(props: NavbarMenuProps) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const categoryItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex  items-center space-x-4">
          <div className="flex pl-6 py-2 grid grid-cols-4 gap-4">
            {options.map((item) => (
              <div className="justify-center mx-auto space-y-2">
                <img
                  src={item.image_link}
                  alt="Product"
                  className="w-1/2 rounded-lg"
                />
                <p className="uppercase font-bold">{item.value}</p>
                <div className="space-y-2">
                  {item.children &&
                    item.children.map((subCategory) => (
                      <div
                        key={subCategory.id}
                        className="hover:text-[#5c6856] hover:font-bold"
                      >
                        {subCategory.value}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={handleVisibleChange}
      menu={{ items: categoryItems }}
      placement="bottomLeft"
      className=""
      trigger={["click"]}
      overlayStyle={{
        maxHeight: 100,
        overflowY: "auto",
        width: "60%",
        minWidth: "500px",
      }}
    >
      <div className="font-bold">
        <MdMenu size={30} />
      </div>
    </Dropdown>
  );
}
