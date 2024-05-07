"use client";
import { CollectionType } from "@/model/CollectionType";
import { CollectionElement, WidgetType } from "@/model/WidgetType";
import { List } from "antd";
import CollectionItem from "../mini/CollectionItem";
import CustomEmpty from "../mini/CustomEmpty";
import { useState } from "react";

interface CollectionGridProps {
  widget: WidgetType;
  setCollectionId: (id: string) => void;
}

export default function CollectionGrid(props: CollectionGridProps) {
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
  ] as CollectionType[];

  // var
  const [collections, setCollections] =
    useState<CollectionType[]>(collectionsData);

  const element = props.widget.element as CollectionElement;

  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <List
        grid={{
          gutter: 5,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={collections} // TODO: get data from element.collectionIdList
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            <CollectionItem
              collection={item}
              setCollectionId={props.setCollectionId}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
