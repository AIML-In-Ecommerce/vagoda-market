"use client";
import { CategoryElement, WidgetType } from "@/model/WidgetType";
import { List, Typography } from "antd";
import Link from "next/link";
import CustomEmpty from "../mini/CustomEmpty";
import { CategoryType } from "@/model/CategoryType";
import { useEffect, useState } from "react";
import { POST_GetCategoryList } from "@/app/apis/category/CategoryAPI";

interface CategoryGridProps {
  widget: WidgetType;
}

export default function CategoryGrid(props: CategoryGridProps) {
  // mock data
  // const categoryData: CategoryType[] = [
  //   {
  //     _id: "id1",
  //     key: "1",
  //     urlKey: "string",
  //     name: "Laptop",
  //     image: "string",
  //     subCategoryType: [],
  //   },
  //   {
  //     _id: "id2",
  //     key: "2",
  //     urlKey: "string",
  //     name: "Màn hình máy tính",
  //     image: "string",
  //     subCategoryType: [],
  //   },
  //   {
  //     _id: "id3",
  //     key: "3",
  //     urlKey: "string",
  //     name: "Ổ cứng",
  //     image: "string",
  //     subCategoryType: [],
  //   },
  // ];

  // var
  const [categories, setCategories] = useState<CategoryType[]>();
  const element = props.widget.element as CategoryElement;

  // call api
  useEffect(() => {
    handleGetCategoryList(element.categoryIdList);
  }, [element]);

  const handleGetCategoryList = async (ids: string[]) => {
    const response = await POST_GetCategoryList(ids);
    if (response.status == 200) {
      if (response.data) {
        setCategories(response.data);
        // console.log("category", response.data);
      }
    }
  };

  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <Typography.Text className="text-2xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <div className="invisible h-5">hidden block</div>
      <List
        grid={{
          gutter: 16,
          xs: 0,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={categories}
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            {/* TODO: revise url key to see if it redirects correctly */}
            <Link href={`/${item.urlKey}`}>
              <div className="text-center text-xl text-semibold line-clamp-2">
                {item.name}
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
