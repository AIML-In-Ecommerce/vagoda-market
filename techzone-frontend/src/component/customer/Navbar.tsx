"use client";
import Image from "next/image";
import logo from "../../../../public/asset/logo.png";
import { GoSearch } from "react-icons/go";
import {
  AutoComplete,
  Badge,
  Button,
  ConfigProvider,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { RxPerson } from "react-icons/rx";
import { HiOutlineHeart } from "react-icons/hi2";
import { PiShoppingCart } from "react-icons/pi";
import { useState } from "react";
import type { SearchProps } from "antd/es/input/Search";
import { PiMapPinLine } from "react-icons/pi";
import { GrLanguage } from "react-icons/gr";
import AddressModal from "@/component/customer/AddressModal";

const { Search } = Input;

export default function Navbar() {
  const [countItemsCart, setCountItemsCart] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openAddressModal = () => {
    setIsModalVisible(true);
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

  const languageOptions: MenuProps["items"] = [
    {
      key: "1",
      label: <p>English</p>,
    },
    {
      key: "2",
      label: <p>Vietnamese</p>,
    },
    {
      key: "3",
      label: <p>French</p>,
    },
    {
      key: "4",
      label: <p>German</p>,
    },
    {
      key: "5",
      label: <p>Spanish</p>,
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
      label: renderTitle("Libraries"),
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
      <header className="navbar bg-sky-950 justify-between items-center relative">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="ml-4">
            <Image src={logo} width={100} height={100} alt="Logo" />
          </div>

          {/* Search, Account, Wishlist, Cart */}
          <div className="flex-grow flex justify-center items-center space-x-4 relative">
            {/* Search */}
            <div className="flex-grow flex justify-center items-center space-x-4 relative">
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                popupMatchSelectWidth={600}
                style={{ width: 600 }}
                options={options}
                size="large"
              >
                <Search
                  style={{ background: "#2776a4", borderRadius: "5px" }}
                  placeholder="Search for items..."
                  onSearch={onSearch}
                  enterButton
                />
              </AutoComplete>
            </div>

            {/* Account */}
            <div className="right-0 flex">
              <Dropdown menu={{ items }} placement="bottomLeft">
                <div className="flex items-center text-white hover:text-sky-600 hover:bg-slate-700 p-4">
                  <RxPerson className="" size={25} />
                  <p className="ml-4">Account</p>
                </div>
              </Dropdown>

              {/* Wishlist */}
              <div className="flex items-center text-white hover:text-sky-600  hover:bg-slate-700 p-4">
                <Badge
                  className="site-badge-count-109"
                  count={countItemsCart > 100 ? 109 : 10}
                  style={{ backgroundColor: "#2776a4" }}
                >
                  <HiOutlineHeart
                    className=" text-white  hover:text-sky-600"
                    size={25}
                  />
                </Badge>
                <p className="ml-4">Wishlist</p>
              </div>

              {/* Cart */}
              <div className="flex items-center text-white hover:text-sky-600  hover:bg-slate-700 p-4">
                <Badge
                  className="site-badge-count-109"
                  count={countItemsCart > 100 ? 109 : 10}
                  style={{ backgroundColor: "#2776a4" }}
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
        </div>

        <div className="flex-grow flex items-center space-x-4 justify-end pb-2 pl-10 ">
          <div className="flex">
            {/* Multi language and Delivery Address */}
            <div className="mr-4 flex items-center">
              {/* Multi language */}
              <Dropdown
                menu={{ items: languageOptions }}
                placement="bottomLeft"
              >
                <div className="flex items-center text-white hover:text-sky-600 ml-4 flex-2">
                  <GrLanguage className="" size={25} />
                </div>
              </Dropdown>

              {/* Delivery Address */}
              <div className="flex text-white ml-8 flex-1">
                <PiMapPinLine className="hover:text-sky-600" size={25} />
                <p
                  className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs "
                  onClick={openAddressModal}
                >
                  Delivered to: District 1, Ben Nghe Ward, Ho Chi Minh City
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AddressModal
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}
