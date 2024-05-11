"use client";
import { Badge, Dropdown, MenuProps } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GrPinterest } from "react-icons/gr";
import { PiShoppingCart } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import logo from "../../../public/asset/logo.png";
import Searchbar from "../Searchbar";
import LanguageOption from "./LanguageOption";
import NavbarCategory from "./NavbarCategory";
import NavbarMenu from "./NavbarMenu";

export default function MainNavbar() {
  const router = useRouter();
  const [menuMode, setMenuMode] = useState("");
  const [menuVisible, setMenuVisible] = useState();
  const [countItemsCart, setCountItemsCart] = useState(0);
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

  const checkWindowSize = () => {
    if (window.innerWidth > 999) {
      setMenuMode("desktopMode");
    } else {
      setMenuMode("mobileMode");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  return (
    <div>
      <div
        className={`flex text-[10px]  justify-between bg-[#5c6856]  items-center ${
          menuMode == "mobileMode" ? "px-2" : "px-24"
        }  `}
      >
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
      </div>
      {menuMode == "mobileMode" ? (
        <header
          className="navbar  items-center relative space-x-8 w-full px-2  justify-center "
          style={{ backgroundColor: "rgba(151, 151, 151, 0.8)" }}
        >
          <div className="flex items-center justify-between ">
            <Image
              src={logo}
              width={120}
              height={60}
              alt="Logo"
              onClick={() => router.push("/")}
            />
            <div className="flex space-x-2 items-center">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Dropdown
                  menu={{ items }}
                  placement="bottomLeft"
                  className="xs:hidden"
                >
                  <div className="flex items-center text-white hover:text-sky  p-2 rounded-lg bg-[#5c6856] text-sm">
                    <RxPerson className="" size={20} />
                    <p className="ml-4">Account</p>
                  </div>
                </Dropdown>
              </motion.div>
              <div className="flex items-center text-white   p-2 rounded-lg hover:text-[#5c6856]">
                <Badge
                  size="small"
                  className="site-badge-count-109"
                  count={countItemsCart > 100 ? 109 : 5}
                  style={{ backgroundColor: "#f32c2c" }}
                >
                  <PiShoppingCart
                    className="text-white hover:text-[#5c6856]"
                    size={20}
                  />
                </Badge>
              </div>
              <NavbarMenu
                name="Nam"
                image_link="https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </div>
          </div>
          <div
            className="rounded-full"
            style={{ width: `${window.innerWidth * 0.6}` }}
          >
            <Searchbar />
          </div>
        </header>
      ) : (
        <header
          className="navbar  items-center relative space-x-8 w-full px-24  to-transparent "
          style={{ backgroundColor: "rgba(151, 151, 151, 0.8)" }}
        >
          <header className="flex   items-center justify-between relative h-30 xs:space-x-4 md:space-x-8 ">
            <NavbarMenu
              name="Nam"
              image_link="https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="mb-0 p-1">
              <Image
                src={logo}
                width={120}
                height={60}
                alt="Logo"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="">
              {" "}
              {/* <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={550}
              style={{ width: 550 }}
              options={options}
              size="large"
            > */}
              <div className="rounded-full " style={{ width: 550 }}>
                <Searchbar />
              </div>
              {/* </AutoComplete> */}
              <div className="flex space-x-10 text-sm  items-center justify-center text-[#5c6856] pr-8">
                <NavbarCategory
                  name="Nam"
                  image_link="https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
                <Link className="uppercase font-semibold" href={`/category/nu`}>
                  Nữ
                </Link>
                <Link
                  className="uppercase font-semibold"
                  href={`/category/nam-nu`}
                >
                  Nam/Nữ
                </Link>
                <Link
                  className="uppercase font-semibold"
                  href={`/category/tre-em`}
                >
                  Trẻ em{" "}
                </Link>
              </div>
            </div>

            <div className="">
              <div className="right-0 justify-end flex space-x-4 text-sm">
                <div className="flex items-center text-white   p-4 rounded-lg hover:text-[#5c6856]">
                  <Badge
                    size="small"
                    className="site-badge-count-109"
                    count={countItemsCart > 100 ? 109 : 5}
                    style={{ backgroundColor: "#f32c2c" }}
                  >
                    <PiShoppingCart
                      className="text-white hover:text-[#5c6856]"
                      size={20}
                    />
                  </Badge>
                </div>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Dropdown
                    menu={{ items }}
                    placement="bottomLeft"
                    className="xs:hidden"
                  >
                    <div className="flex items-center text-white hover:text-sky  p-4 rounded-lg bg-[#5c6856] text-sm">
                      <RxPerson className="" size={20} />
                      <p className="ml-4">Account</p>
                    </div>
                  </Dropdown>
                </motion.div>
              </div>
            </div>
          </header>
        </header>
      )}
    </div>
  );
}