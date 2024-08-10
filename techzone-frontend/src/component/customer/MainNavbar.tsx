"use client";
import { _CategoryType } from "@/model/CategoryType";
import { CategoryService } from "@/services/Category";
import { Badge, Dropdown, MenuProps } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { GrPinterest } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import logo from "../../../public/asset/vagoda_1.png";
import Searchbar from "../Searchbar";
import LanguageOption from "./LanguageOption";
import NavbarMenu from "./NavbarMenu";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { GET_getUserCartProducts } from "@/apis/cart/CartProductAPI";

export default function MainNavbar() {
  const router = useRouter();
  const [menuMode, setMenuMode] = useState("");
  const [countItemsCart, setCountItemsCart] = useState(0);
  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);

  const authContext = useContext(AuthContext);

  const unauthItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/auth?type=signin" prefetch={false}>
          Đăng nhập
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/auth?type=signup" prefetch={false}>
          Đăng ký
        </Link>
      ),
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            router.push("/");
          }}
        >
          Tài khoản
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            router.push("/virtual-try-on/welcome");
          }}
        >
          Phòng thử đồ
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            router.push("/order");
          }}
        >
          Đơn hàng
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Cài đặt
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="#"
          prefetch={false}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            authContext.methods?.logoutAndBackHomepage();
          }}
        >
          Đăng xuất
        </Link>
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

  useEffect(() => {
    const loadAllCategories = async () => {
      const data: _CategoryType[] = await CategoryService.getAllCategories();
      setAllCategories(data);
    };

    loadAllCategories();
    
  }, [authContext.userInfo]);

  //separate categories calling
  //UPDATE: not interval calling any more.
  useEffect(() => {
    if (authContext.userInfo) {
      // Load cart size on badge
      const loadCartSize = async () => {
        const data = await GET_getUserCartProducts(
          authContext.userInfo?._id as string,
        );
        if (data.data) {
          // console.log('Loading Cart Size', data);
          setCountItemsCart(data.data.products.length);
        }
      };
      // const intervalId = setInterval(() => {
      //   loadCartSize();
      // }, 1000 * 5); // in milliseconds
      // return () => clearInterval(intervalId);
      loadCartSize();
    }
  }, [authContext.userInfo]);

  return (
    <div>
      <div
        className={`flex text-xs  justify-end bg-[#5c6856]  items-center ${
          menuMode == "mobileMode" ? "px-2" : "px-24"
        }  `}
      >
        {/* <div className="flex  items-center text-white space-x-2">
          <TfiHeadphoneAlt />
          <p>24/7</p>
          <p>037-2324-9816</p>
        </div> */}
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
          className="navbar items-center relative space-x-8 w-full px-2 py-2  justify-center "
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
            {/* <img
              src={logo}
              alt="Logo"
              onClick={() => router.push("/")}
              className="w-200 h-100"
            /> */}

            <div className="flex space-x-2 items-center">
              <motion.div whileTap={{ scale: 0.9 }}>
                {authContext.userInfo ? (
                  <Dropdown
                    menu={{ items }}
                    placement="bottomLeft"
                    className="xs:hidden"
                  >
                    <div className="flex space-x-2 items-center text-white hover:text-sky lg:max-w-[140px] p-[12px] rounded-lg bg-[#5c6856] text-sm">
                      <>
                        {authContext.userInfo?.avatar ? (
                          <Image
                            className="lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] rounded-full"
                            width={16}
                            height={16}
                            src={authContext.userInfo.avatar}
                            alt="avatar"
                          />
                        ) : (
                          // <RxPerson className="" size={20} />
                          <FaUser className="" size={26} />
                        )}
                        {authContext.userInfo ? (
                          <p className="truncate">
                            {authContext.userInfo?.fullName}
                          </p>
                        ) : (
                          <p className="truncate">Account</p>
                        )}
                      </>
                    </div>
                  </Dropdown>
                ) : (
                  <Dropdown
                    menu={{ items: unauthItems }}
                    placement="bottomLeft"
                    className="xs:hidden"
                  >
                    <div className="flex space-x-2 items-center text-white hover:text-sky  p-2 rounded-lg bg-[#5c6856] text-sm">
                      <>
                        <FaUser className="" size={26} />
                        <p className="truncate">Tài khoản</p>
                      </>
                    </div>
                  </Dropdown>
                )}
              </motion.div>
              <Link href={`/cart`}>
                <div className="flex items-center cursor-pointer text-white p-2 rounded-lg hover:text-[#5c6856]">
                  <Badge
                    size="small"
                    className="site-badge-count-109"
                    count={countItemsCart > 100 ? 109 : 5}
                    style={{ backgroundColor: "#f32c2c" }}
                  >
                    <FaCartShopping
                      className="text-white hover:text-[#5c6856]"
                      size={20}
                    />
                  </Badge>
                </div>
              </Link>
              <NavbarMenu options={allCategories} />
            </div>
          </div>
          <div
            className="rounded-full"
            style={{ width: `${window.innerWidth * 0.4}` }}
          >
            <Searchbar />
          </div>
        </header>
      ) : (
        <header
          className="navbar  items-center relative space-x-8 w-full px-24 py-2 to-transparent"
          style={{ backgroundColor: "rgba(151, 151, 151, 0.8)" }}
        >
          <header className="flex   items-center justify-between relative h-30 xs:space-x-4 md:space-x-8 ">
            <div className="flex space-x-4 items-center">
              <NavbarMenu options={allCategories} />
              <div className="mb-0 p-1 cursor-pointer">
                <div className="flex justify-center items-center">
                  {/* <Image
                    src={logo2}
                    width={50}
                    height={50}
                    alt="Logo"
                    className="rounded-lg"
                    onClick={() => router.push("/")}
                  /> */}
                  <Image
                    src={logo}
                    alt="Logo"
                    className="w-auto h-[60px] "
                    onClick={() => router.push("/")}
                  />
                </div>
              </div>
            </div>
            <div className="">
              {" "}
              <div className="rounded-full " style={{ width: 550 }}>
                <Searchbar />
              </div>
              {/* <div className="flex space-x-10 text-sm  items-center justify-center text-[#5c6856] pr-8">
                {allCategories.map((category, index) => (
                  <NavbarCategory category={category} key={index} />
                ))}
              </div> */}
            </div>

            <div className="">
              <div className="right-0 justify-end flex space-x-4 text-sm items-center">
                <Link href={`/cart`}>
                  <div className="flex items-center cursor-pointer text-white p-4 rounded-lg hover:text-[#5c6856]">
                    <Badge
                      size="small"
                      className="site-badge-count-109"
                      count={countItemsCart ?? 0}
                      style={{ backgroundColor: "#f32c2c" }}
                    >
                      <FaCartShopping
                        className="text-white hover:text-[#5c6856]"
                        size={26}
                      />
                    </Badge>
                  </div>
                </Link>
                <motion.div whileTap={{ scale: 0.9 }}>
                  {authContext.userInfo ? (
                    <Dropdown
                      menu={{ items }}
                      placement="bottomLeft"
                      className="xs:hidden"
                    >
                      <div className="flex space-x-2 items-center text-white hover:text-sky lg:max-w-[140px] p-[12px] rounded-lg bg-[#5c6856] text-sm">
                        <>
                          {authContext.userInfo?.avatar ? (
                            <Image
                              className="lg:h-[30px] lg:w-[30px] h-[20px] w-[20px] rounded-full"
                              width={16}
                              height={16}
                              src={authContext.userInfo.avatar}
                              alt="avatar"
                            />
                          ) : (
                            // <RxPerson className="" size={20} />
                            <FaUser className="" size={26} />
                          )}
                          {authContext.userInfo ? (
                            <p className="truncate">
                              {authContext.userInfo?.fullName}
                            </p>
                          ) : (
                            <p className="truncate">Tài khoản</p>
                          )}
                        </>
                      </div>
                    </Dropdown>
                  ) : (
                    <Dropdown
                      menu={{ items: unauthItems }}
                      placement="bottomLeft"
                      className="xs:hidden"
                    >
                      <div className="flex space-x-2 items-center text-white hover:text-sky  p-2 rounded-lg bg-[#5c6856] text-sm">
                        <>
                          <FaUser className="" size={26} />
                          <p className="truncate">Tài khoản</p>
                        </>
                      </div>
                    </Dropdown>
                  )}
                </motion.div>
              </div>
            </div>
          </header>
        </header>
      )}
    </div>
  );
}
