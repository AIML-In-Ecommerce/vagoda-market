"use client";
import { List, Typography } from "antd";
import ProductItem from "../../ProductItem";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";
import CustomEmpty from "../mini/CustomEmpty";
import { GET_GetCollection } from "@/app/apis/collection/CollectionAPI";
import { POST_GetProductList } from "@/app/apis/product/ProductDetailAPI";
import { CollectionType } from "@/model/CollectionType";
import { useState, useEffect } from "react";

interface ProductGridProps {
  widget: WidgetType;
}

export default function ProductGrid(props: ProductGridProps) {
  // var
  const element = props.widget.element as ProductElement;
  const [collection, setCollection] = useState<CollectionType>();
  const [products, setProducts] = useState<ProductType[]>([]);

  // call api
  useEffect(() => {
    handleGetCollection();
  }, [element]);

  useEffect(() => {
    handleGetProductList();
  }, [collection]);

  const handleGetCollection = async () => {
    const response = await GET_GetCollection(element.collectionId);
    if (response.status == 200) {
      if (response.data) {
        setCollection(response.data);
        // console.log("collection", response.data);
      }
    }
  };

  const handleGetProductList = async () => {
    if (!collection) return;
    const response = await POST_GetProductList(collection.productIdList);
    if (response.status == 200) {
      if (response.data) {
        setProducts(response.data);
        // console.log("product", data);
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
          gutter: 5,
          xs: 0,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={products}
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            <ProductItem
              imageLink={item.imageLink}
              name={item.name}
              rating={item.rating}
              soldAmount={item.soldAmount}
              price={item.price}
              isFlashSale={item.flashSale}
              originalPrice={item.originalPrice}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
