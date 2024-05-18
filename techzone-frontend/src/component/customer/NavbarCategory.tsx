"use client";
import { CascaderProps, Dropdown, MenuProps } from "antd";

import { useState } from "react";

interface NavbarCategoryProps {
  name: string;
  //   options: string[];
  image_link: string;
}

interface Option {
  id: string;
  value: string;
  children: Option[] | null;
}

const options: Option[] = [
  {
    id: "ao-nu",
    value: "Áo Nữ",
    children: [
      { id: "ao-polo", value: "Áo Polo" },
      { id: "ao-thun", value: "Áo Thun" },
      { id: "ao-chong-nang", value: "Áo Chống Nắng" },
      { id: "ao-so-mi", value: "Áo Sơ Mi" },
      { id: "ao-khoac", value: "Áo Khoác" },
      { id: "ao-ni", value: "Áo Nỉ" },
      { id: "ao-giu-nhiet", value: "Áo Giữ Nhiệt" },
      { id: "ao-len", value: "Áo Len" },
    ],
  },
  {
    id: "quan-nu",
    value: "Quần Nữ",
    children: [
      { id: "quan-jeans", value: "Quần Jeans" },
      { id: "quan-short", value: "Quần Short" },
      { id: "quan-au", value: "Quần Âu" },
      { id: "quan-kaki", value: "Quần Kaki" },
      { id: "quan-ni", value: "Quần Nỉ" },
    ],
  },
  {
    id: "do-bo-nu",
    value: "Đồ Bộ Nữ",
    children: [{ id: "do-bo-nu-mac-nha", value: "Đồ Bộ Nữ Mặc Nhà" }],
  },
  {
    id: "do-lot-nu",
    value: "Đồ Lót Nữ",
    children: [
      { id: "ao-lot", value: "Áo lót" },
      { id: "quan-lot", value: "Quần lót" },
    ],
  },
  {
    id: "do-the-thao-nu",
    value: "Đồ Thể Thao Nữ",
    children: [
      { id: "bo-the-thao", value: "Bộ Thể Thao" },
      { id: "ao-thun-the-thao", value: "Áo Thun Thể Thao" },
      { id: "quan-the-thao", value: "Quần Thể Thao" },
    ],
  },
  {
    id: "giay-nu-dep-nu",
    value: "Giày Nữ - Dép Nữ",
    children: [
      { id: "giay-the-thao", value: "Giày Thể Thao" },
      { id: "giay-cao-got", value: "Giày Cao Gót" },
      { id: "sandal", value: "Sandal" },
      { id: "dep-kep", value: "Dép kẹp" },
    ],
  },
];

const onChange: CascaderProps<Option>["onChange"] = (value: any) => {
  console.log(value);
};

export default function NavbarCategory(props: NavbarCategoryProps) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const categoryItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex  items-center space-x-4">
          <div className="w-1/6">
            <img src={props.image_link} alt="Product" className="w-full h-52" />
          </div>
          <div className="flex grid grid-cols-6 gap-6">
            {options.map((item) => (
              <div>
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
      placement="bottom"
      className=""
      trigger={["click"]}
      overlayStyle={{
        maxHeight: 100,
        overflowY: "auto",
        width: "auto",
        paddingLeft: "60px",
      }}
    >
      <div className="uppercase font-semibold">{props.name}</div>
    </Dropdown>
  );
}
