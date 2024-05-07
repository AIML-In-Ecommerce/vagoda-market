"use client";
import { CollectionType } from "@/model/CollectionType";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import AllCollections from "./AllCollections";
import CollectionDetail from "./CollectionDetail";
import { BsHouseHeart } from "react-icons/bs";

interface CollectionsProps {
  selectedId: string;
}

export default function Collections(props: CollectionsProps) {
  // mock data
  const collectionsData = [
    {
      _id: "1",
      name: "collection 1",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "2",
      name: "collection 2",
      imageUrl:
        "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "3",
      name: "collection 3",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "4",
      name: "collection 4",
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "5",
      name: "collection 5",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "6",
      name: "collection 6",
      imageUrl:
        "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "7",
      name: "collection 7",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "8",
      name: "collection 8",
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
  ] as CollectionType[];

  // var
  const [collections, setCollections] =
    useState<CollectionType[]>(collectionsData);
  const [option, setOption] = useState<string[]>(["0"]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (props.selectedId && props.selectedId !== "") {
      setOption([props.selectedId]);
    } else setOption(["0"]);
  }, [props.selectedId, props]);

  return (
    <div className="bg-white grid grid-col-6">
      <div className="col-span-1">
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={option}
          style={{ height: "75vh", overflowY: "auto", width: "100%" }}
          className="text-xs overflow-auto custom-scrollbar"
        >
          <Menu.Item
            key={"0"}
            icon={<BsHouseHeart />}
            onClick={() => setOption(["0"])}
          >
            Tất cả bộ sưu tập
          </Menu.Item>

          {/* Filter menu items based on search text */}
          {collections
            .filter((item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((item) => (
              <React.Fragment key={item._id}>
                {/* Hiển thị mục menu chính */}
                <Menu.Item key={item._id} onClick={() => setOption([item._id])}>
                  {item.name}
                </Menu.Item>
              </React.Fragment>
            ))}
        </Menu>
      </div>
      <div className="col-start-2 col-spans-5 p-5">
        {(option[0] === "0" && (
          <AllCollections
            collections={collections}
            setCollectionId={(id: string) => {
              setOption([id]);
            }}
          />
        )) || <CollectionDetail collectionId={option[0]} />}
      </div>
    </div>
  );
}
