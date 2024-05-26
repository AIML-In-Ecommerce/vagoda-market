"use client";
import { _CategoryType } from "@/model/CategoryType";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";

import { useState } from "react";

interface NavbarCategoryProps {
  category: _CategoryType;
}

interface Option {
  id: string;
  value: string;
  children: Option[] | null;
}

export default function NavbarCategory(props: NavbarCategoryProps) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const categoryItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex  space-x-4">
          <div className="w-1/6">
            <img
              src={props.category.image}
              alt="Product"
              className="w-full h-52"
            />
          </div>
          <div className="flex grid grid-cols-6 gap-6">
            {props.category.subCategories.map((item) => (
              <div>
                <Link
                  href={`/product-list?category=${item._id}`}
                  key={item._id}
                  className=" uppercase font-bold hover:text-[#683a25] block"
                >
                  {item.name}
                </Link>

                <div className="space-y-2">
                  {item.subCategories &&
                    item.subCategories.map((subCategory) => (
                      <Link
                        href={`/product-list?category=${subCategory._id}`}
                        key={subCategory._id}
                        className="hover:text-[#5c6856] hover:font-bold block"
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
      <div className="uppercase font-semibold">{props.category.name}</div>
    </Dropdown>
  );
}
