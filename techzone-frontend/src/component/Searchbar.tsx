"use client";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiHistoryFill } from "react-icons/ri";

interface SearchbarProp {}

export default function Searchbar(props: SearchbarProp) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
    setShowHistory(true);
    setHighlightedIndex(-1);
  };

  const handleSearch = (text: string) => {
    if (text.trim() === "") return;
    // Update search history
    const updatedHistory = [
      text,
      ...searchHistory.filter((item) => item !== text),
    ];
    setSearchHistory(updatedHistory.slice(0, 5));
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(updatedHistory.slice(0, 5)),
    );

    setTimeout(() => {
      router.push(`/product-list?keyword=${text}`);
      setSearchText("");
      setShowHistory(false);
    }, 500);
  };

  const handleFocus = () => {
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
    }, 200);
  };

  const handleHistoryClick = (keyword: string) => {
    setSearchText(keyword);
    handleSearch(keyword);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < searchHistory.length - 1 ? prevIndex + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : searchHistory.length - 1,
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        const keyword = searchHistory[highlightedIndex];
        setSearchText(keyword);
        handleSearch(keyword);
      } else {
        handleSearch(searchText);
      }
    }
  };

  return (
    <div className="relative">
      <Input
        size="middle"
        placeholder="Tìm kiếm sản phẩm"
        suffix={<GoSearch color="#5c6856" />}
        className="rounded-full w-11/12 m-1 "
        onChange={handleChange}
        value={searchText}
        onPressEnter={() => handleSearch(searchText)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{ height: "36px" }}
        ref={inputRef}
      />
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute z-10 w-11/12 bg-white shadow-lg rounded-lg mt-1">
          {searchHistory.map((keyword, index) => (
            <div
              key={index}
              className={`flex p-2 cursor-pointer hover:bg-gray-200 space-x-2 items-center ${
                highlightedIndex === index ? "bg-gray-200" : ""
              }`}
              onMouseDown={() => handleHistoryClick(keyword)}
            >
              <RiHistoryFill /> <p>{keyword}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
