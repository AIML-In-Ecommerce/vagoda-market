"use client";
import { _CategoryType } from "@/model/CategoryType";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

import { useState } from "react";
import { MdMenu } from "react-icons/md";

interface NavbarMenuProps {
  options: _CategoryType[];
}

interface Option {
  id: string;
  value: string;
  children: Option[] | null;
  image_link?: string;
}

export default function NavbarMenu(props: NavbarMenuProps) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const categoryItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex items-center space-x-4">
          <div className="p-6 py-2 grid grid-cols-3 gap-2 0 w-fit">
            {props.options.length > 0 &&
              props.options.map((item, index) => (
                <div className="justify-center mx-auto space-y-2" key={index}>
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-44 rounded-lg"
                  />
                  <p className="uppercase font-bold text-gray-600 cursor-default">
                    {item.name}
                  </p>
                  <div className="space-y-2">
                    {item.subCategories &&
                      item.subCategories.map((subCategory) => (
                        <Link
                          href={"/product-list?"}
                          key={subCategory._id}
                          className="hover:text-[#5c6856] hover:font-bold block text-gray-600"
                        >
                          {subCategory.name}
                        </Link>
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
      open={visible}
      onOpenChange={handleVisibleChange}
      menu={{ items: categoryItems }}
      placement="bottomLeft"
      className="cursor-pointer"
      trigger={["click"]}
      overlayStyle={{
        maxHeight: 100,
        overflowY: "auto",
        width: "60%",
        minWidth: "200px",
        maxWidth: "700px",
      }}
    >
      <div className="font-bold">
        <MdMenu size={30} />
      </div>
    </Dropdown>
  );
}
