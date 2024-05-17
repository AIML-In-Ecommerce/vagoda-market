"use client";
import { CollectionType } from "@/model/CollectionType";
import { Menu, Skeleton } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import AllCollections from "./AllCollections";
import CollectionDetail from "./CollectionDetail";
import { BsHouseHeart } from "react-icons/bs";
import { GET_GetCollectionListByShop } from "@/app/apis/collection/CollectionAPI";

interface CollectionsProps {
  selectedId: string;
}

export default function Collections(props: CollectionsProps) {
  // mock data
  const mockId = "65f1e8bbc4e39014df775166";

  // var
  const [collections, setCollections] = useState<CollectionType[]>();
  const [option, setOption] = useState<string[]>(["0"]);

  useEffect(() => {
    if (props.selectedId && props.selectedId !== "") {
      setOption([props.selectedId]);
    } else setOption(["0"]);
  }, [props.selectedId, props]);

  // call api
  useEffect(() => {
    handleGetCollectionList();
  }, []);

  const handleGetCollectionList = async () => {
    const response = await GET_GetCollectionListByShop(mockId);

    if (response.status === 200) {
      console.log(response.data);
      console.log(response.message);
      if (response.data) setCollections(response.data);
    } else console.log(response.message);
  };

  return (
    <div>
      {(collections && (
        <div className="bg-white flex flex-row">
          <div className="">
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={option}
              style={{ height: "75vh", overflowY: "auto", width: "300px" }}
              className="text-xs overflow-auto custom-scrollbar"
            >
              <Menu.Item
                key={"0"}
                icon={<BsHouseHeart />}
                onClick={() => setOption(["0"])}
              >
                Tất cả bộ sưu tập
              </Menu.Item>

              {collections.map((item) => (
                <React.Fragment key={item._id}>
                  {/* Hiển thị mục menu chính */}
                  <Menu.Item
                    key={item._id}
                    onClick={() => setOption([item._id])}
                  >
                    {item.name}
                  </Menu.Item>
                </React.Fragment>
              ))}
            </Menu>
          </div>
          <div className="p-5">
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
      )) || <Skeleton active style={{ margin: 10 }} />}
    </div>
  );
}
