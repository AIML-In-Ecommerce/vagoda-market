"use client";
import { CollectionType } from "@/model/CollectionType";
import { Menu, Skeleton } from "antd";
import { ReactElement, useEffect, useState } from "react";
import React from "react";
import AllCollections from "./AllCollections";
import CollectionDetail from "./CollectionDetail";
import { BsHouseHeart } from "react-icons/bs";
import { GET_GetCollectionListByShop } from "@/apis/collection/CollectionAPI";
import { useParams } from "next/navigation";

interface CollectionsProps {
  selectedId: string;
  notify(message: string, content: ReactElement): void;
}

export default function Collections(props: CollectionsProps) {
  // var
  const { shopId } = useParams();

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
    const response = await GET_GetCollectionListByShop(shopId.toString());

    if (response.status === 200) {
      // console.log(response.data);
      // console.log(response.message);
      if (response.data)
        setCollections(response.data.filter((c) => c.isActive === true));
    } else console.log(response.message);
  };

  return (
    <div>
      {(collections && (
        <div className="bg-white flex flex-row rounded-xl">
          <div className="">
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={option}
              style={{ height: "75vh", overflowY: "auto", width: "180px" }}
              className="text-xs overflow-auto custom-scrollbar truncate rounded-xl"
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
            )) || (
              <CollectionDetail
                collectionId={option[0]}
                notify={props.notify}
              />
            )}
          </div>
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
    </div>
  );
}
