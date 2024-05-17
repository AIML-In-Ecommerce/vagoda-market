import { Typography, Divider, List } from "antd";
import React from "react";
import CollectionItem from "../mini/CollectionItem";
import CustomEmpty from "../mini/CustomEmpty";
import { CollectionType } from "@/model/CollectionType";

interface AllCollectionsProps {
  collections: CollectionType[];
  setCollectionId: (collectionId: string) => void;
}

export default function AllCollections(props: AllCollectionsProps) {
  return (
    <div>
      <Typography.Text className="text-xl font-semibold w-full">
        Số bộ sưu tập: {props.collections.length}
      </Typography.Text>
      <Divider />
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
        dataSource={props.collections}
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
