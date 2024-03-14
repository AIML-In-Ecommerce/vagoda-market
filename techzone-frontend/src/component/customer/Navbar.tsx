"use client";
import Image from "next/image";
import logo from "../../../../public/asset/logo.png";
import { GoSearch } from "react-icons/go";
import {
  AutoComplete,
  Avatar,
  Badge,
  Dropdown,
  Input,
  MenuProps,
  Select,
} from "antd";
import { RxPerson } from "react-icons/rx";
import { PiShoppingCart } from "react-icons/pi";
import { useState } from "react";
import type { SearchProps } from "antd/es/input/Search";
import { GrLanguage } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import { AntDesignOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function Navbar() {
  const [countItemsCart, setCountItemsCart] = useState(0);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          My Account
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Setting
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Logout
        </a>
      ),
    },
  ];

  const languageOptions = [
    { value: "vi", label: "Vietnamese" },
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "ge", label: "German" },
    { value: "sp", label: "Spanish" },
  ];

  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>
          <GoSearch /> {count}
        </span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle("Tìm kiếm phổ biến"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];
  return (
    <>
      <header className="navbar bg-[#1677ff]  items-center relative space-x-8">
        <div className="flex justify-between text-white ">
          <div className="flex space-x-4 items-center text-white text-xs ">
            {" "}
            <div className="hover:bg-sky-200 mx-4">Sell Center</div>
            <div className="hover:bg-sky-200 mx-4 flex items-center space-x-1">
              <IoCallOutline />
              <div className=""> +(84) 123 456 7890</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 m-1">
            <GrLanguage className="" size={13} />
            <Select
              defaultValue="Vietnamese"
              style={{ width: 120 }}
              onChange={handleChange}
              options={languageOptions}
              size="small"
            />
          </div>
        </div>
        <header className="flex   items-center relative h-30 space-x-8">
          <div className="mb-2">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 54, xl: 60, xxl: 80 }}
              style={{ backgroundColor: "transparent" }}
              icon={<AntDesignOutlined />}
            />
          </div>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            popupMatchSelectWidth={800}
            style={{ width: 800 }}
            options={options}
            size="large"
          >
            <Search
              size="large"
              style={{
                background: "#365486",
                borderRadius: "10px",
                width: 800,
              }}
              placeholder="Search for items..."
              onSearch={onSearch}
              enterButton
              className="text-sm"
            />
          </AutoComplete>

          <div className="">
            <div className="right-0 justify-end flex space-x-8">
              <Dropdown menu={{ items }} placement="bottomLeft">
                <div className="flex items-center text-white hover:text-sky-600 hover:bg-sky-200 p-4 rounded-lg">
                  <RxPerson className="" size={25} />
                  <p className="ml-4">Account</p>
                </div>
              </Dropdown>

              {/* Cart */}
              <div className="flex items-center text-white hover:text-sky-600  hover:bg-sky-200 p-4 rounded-lg">
                <Badge
                  className="site-badge-count-109"
                  count={countItemsCart > 100 ? 109 : 10}
                  style={{ backgroundColor: "#f32c2c" }}
                >
                  <PiShoppingCart
                    className="text-white hover:text-sky-600"
                    size={25}
                  />
                </Badge>
                <p className="ml-4 ">Cart</p>
              </div>
            </div>
          </div>
        </header>
      </header>
    </>
  );
}
