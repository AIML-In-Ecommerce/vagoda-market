"use client";
import { Input } from "antd";
import { useState } from "react";
import { GoSearch } from "react-icons/go";

interface SearchbarProp {
  //   handleSearch: () => void;
}
export default function Searchbar(props: SearchbarProp) {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <Input
        size="middle"
        placeholder="Tìm kiếm"
        suffix={<GoSearch color="#5c6856" />}
        className="rounded-full w-11/12 m-1 "
        onChange={handleSearch}
        value={searchText}
      />
    </div>
  );
}
