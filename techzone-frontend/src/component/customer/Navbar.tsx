"use client";
import { Input, MenuProps } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import MainNavbar from "./MainNavbar";

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
    <div className="">
      {/* <div className="flex text-[10px]  justify-between bg-[#5c6856]  items-center px-24  ">
        <div className="flex  items-center text-white space-x-2">
          <TfiHeadphoneAlt />
          <p>24/7</p>
          <p>037-2324-9816</p>
        </div>
        <div className="flex space-x-8 items-center ">
          <div className="flex space-x-1">
            {" "}
            <FaFacebook color="white" />
            <BsInstagram color="white" />
            <GrPinterest color="white" />
            <TbBrandYoutubeFilled color="white" />
          </div>

          <div className="">
            <LanguageOption />{" "}
          </div>
        </div>
      </div> */}

      <MainNavbar />
    </div>
  );
}
