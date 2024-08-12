"use client";
import { AuthContext } from "@/context/AuthContext";
import { _CategoryType } from "@/model/CategoryType";
import { _ProductType } from "@/model/ProductType";
import { CategoryService } from "@/services/Category";
import { ProductService } from "@/services/Product";
import StatisticsService from "@/services/statistics.service";
import { Drawer, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import logo from "../../../public/asset/vagoda.png";

interface SearchDrawerProp {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSearchText: (value: string) => void;
}

const hotKeywords = ["áo thun", "polo", "quần jean", "đồ thể thao", "sơ mi"];

const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export default function SearchDrawer(props: SearchDrawerProp) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);
  const [allCategoryNames, setAllCategoryNames] = useState<string[]>([]);
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<_ProductType[]>(
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const extractCategoryNames = (categories: _CategoryType[]): string[] => {
    let names: string[] = [];
    categories.forEach((category) => {
      names.push(category.name);
      if (category.subCategories && category.subCategories.length > 0) {
        names = names.concat(extractCategoryNames(category.subCategories));
      }
    });
    return names;
  };

  const handleSearch = (text: string) => {
    if (text.length > 0) {
      props.setSearchText(text);
      props.setIsOpen(false);
    }
  };

  useEffect(() => {
    const getSuggestedProducts = async () => {
      if (!props.isOpen) {
        return;
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }

      setSearchText("");
      let subCategoryList: string[] = [];
      if (authContext.userInfo) {
        console.log("HERE");
        const recentProduct: _ProductType[] =
          await StatisticsService.getRecentProducts(
            authContext.userInfo._id ?? ""
          );

        console.log("RECENT PRODUCTS", recentProduct);

        subCategoryList = recentProduct.map(
          (product) => product.subCategory._id
        );
      }

      console.log("RECENT CATEGORY", subCategoryList);

      const products: _ProductType[] =
        await ProductService.get4SuggestedProducts({
          subCategories: subCategoryList,
        });

      setSuggestedProducts(products.slice(0, 4));
      console.log("Product", products);
    };

    getSuggestedProducts();
  }, [props.isOpen]);

  useEffect(() => {
    const loadAllCategories = async () => {
      const data: _CategoryType[] = await CategoryService.getAllCategories();
      setAllCategories(data);
      console.log("hello:");
      if (data.length > 0) {
        const categoryNames = extractCategoryNames(data);
        setAllCategoryNames(categoryNames);
      }
    };

    loadAllCategories();
  }, []);

  useEffect(() => {
    const updateSuggestedKeywords = () => {
      const updatedData = allCategoryNames.filter((category) =>
        category.toLowerCase().includes(searchText.toLowerCase())
      );
      const uniqueUpdatedData = Array.from(new Set(updatedData));
      setSuggestedKeywords(uniqueUpdatedData);
      console.log("Updated", uniqueUpdatedData);
    };
    updateSuggestedKeywords();
  }, [searchText]);
  return (
    <Drawer
      placement="top"
      size={"large"}
      onClose={() => props.setIsOpen(false)}
      open={props.isOpen}
      destroyOnClose={true}
      closable={false}
    >
      <Image
        src={logo}
        alt="Logo"
        className="w-auto h-[45px] flex mx-auto justify-center"
        onClick={() => {
          props.setIsOpen(false);
          router.push(`/`);
        }}
      />

      <div className="flex my-4">
        <div className="flex mx-auto justify-center">
          {allCategories.map((category, index) => (
            <div className="flex items-center mx-auto" key={index}>
              {/* {index != 0 && <hr className="font-light  ">|</hr>} */}
              <Link
                onClick={() => props.setIsOpen(false)}
                href={`/product-list?category=${category._id}`}
                key={category._id}
                className={`hover:text-[#5c6856] hover:font-bold block text-gray-600 mx-4 text-[17px] ${
                  index != 0 ? "pl-4 border-l border-slate-300" : ""
                }`}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
        <div
          className=" absolute flex flex-row-reverse right-24 cursor-pointer"
          onClick={() => props.setIsOpen(false)}
        >
          <IoClose size={30} color="#d5d7db" />
        </div>
      </div>
      <Input
        ref={inputRef}
        placeholder="Bạn đang tìm kiếm sản phẩm nào ?"
        variant="borderless"
        size="middle"
        prefix={
          <div
            onClick={() => {
              handleSearch(searchText);
              router.push(`/product-list?keyword=${searchText}`);
            }}
          >
            <LuSearch className="font-bold" size={24} />
          </div>
        }
        className="w-full mt-6"
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={() => {
          handleSearch(searchText);
          router.push(`/product-list?keyword=${searchText}`);
        }}
      />
      <hr className="mx-6 bg-slate-700 font-bold" />
      {searchText.length > 0 && suggestedKeywords.length > 0 ? (
        <div>
          <p className="mt-10 uppercase text-center text-[#898888] font-bold text-md font-condensed h-30">
            Từ khóa gợi ý
          </p>
          <div className="grid grid-cols-2 gap-y-4 mt-6 mx-10">
            {suggestedKeywords.map((text) => (
              <Link
                onClick={() => handleSearch(text)}
                href={`/product-list?keyword=${text}`}
                key={text}
                // className="hover:font-bold hover:underline hover:text-black"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 my-10">
          {/* {suggestedKeywords.length == 0 && searchText.length > 0 ? (
            <div className="flex flex-col mx-auto items-center ">
              <PiCoatHanger size={36} />
              <p className="uppercase mt-6 mb-2 text-[18px]">
                KHÔNG CÓ KẾT QUẢ TÌM KIẾM
              </p>
              <p>
                Không tìm thấy kết quả cho tìm kiếm "
                <span className="font-bold">{searchText}</span>"
              </p>
            </div>
          ) : ( */}
          <div className="flex flex-col items-center mx-auto">
            <p className="uppercase text-center text-[#898888] font-bold text-md font-condensed h-30">
              Được tìm kiếm nhiều
            </p>
            <div className="flex mt-4 space-x-4">
              {hotKeywords.map((keyword, index) => (
                <Link
                  onClick={() => handleSearch(keyword)}
                  href={`/product-list?keyword=${keyword}`}
                  key={index}
                  className="hover:underline hover:font-semibold block text-white px-4 py-1 bg-[#898888] rounded-xl text-[13px]"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
          {/* )} */}
          <div className="flex flex-col items-center mx-auto">
            <p className="uppercase text-center text-[#898888] font-bold text-md font-condensed h-30">
              Gợi ý cho bạn
            </p>
            <div className="grid grid-cols-4 gap-1 mt-4">
              {suggestedProducts.length > 0 &&
                suggestedProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="space-y-4 cursor-pointer"
                    onClick={() => {
                      props.setIsOpen(false);
                      router.push(`/product/${product._id}`);
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={product.images[0]}
                      alt={`product-${index}`}
                      className="w-auto  flex mx-auto justify-center rounded-lg"
                    />
                    <div className="mx-4 space-y-2">
                      <p
                        className="line-clamp-2 text-xs hover:underline"
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        {product.name}
                      </p>
                      <p className="font-bold text-[13px]">
                        {formatPrice(product.finalPrice)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
