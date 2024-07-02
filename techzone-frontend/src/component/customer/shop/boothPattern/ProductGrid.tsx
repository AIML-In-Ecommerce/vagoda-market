"use client";
import { Divider, List } from "antd";
import ProductItem from "../../ProductItem";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";
import CustomEmpty from "../mini/CustomEmpty";
import { GET_GetCollection } from "@/apis/collection/CollectionAPI";
import { POST_GetProductList } from "@/apis/product/ProductDetailAPI";
import { CollectionType } from "@/model/CollectionType";
import { useState, useEffect, ReactElement } from "react";

interface ProductGridProps {
  widget: WidgetType;
  notify(message: string, content: ReactElement): void;
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
    <div className="bg-white my-5 py-5 px-10 rounded-xl">
      {/* <Typography.Text className="text-2xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <div className="invisible h-5">hidden block</div> */}

      {element.title && (
        <div className="w-full flex align-middle justify-center items-center">
          <div className="w-1/2">
            <Divider
              style={{
                border: "2px solid silver",
                borderTop: 0,
                borderBottom: 0,
                borderLeft: 0,
                borderRight: 0,
                paddingBottom: 0,
                marginBottom: 40,
              }}
            >
              <div className="px-5 text-lg uppercase">{element.title}</div>
            </Divider>
          </div>
        </div>
      )}

      <List
        grid={{
          gutter: 5,
          xs: 0,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 5,
          xxl: 5,
        }}
        dataSource={products}
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            <div className="text-black">
              <ProductItem
                _id={item._id}
                imageLink={item.imageLink}
                name={item.name}
                rating={item.rating}
                soldAmount={item.soldAmount}
                price={item.price}
                isFlashSale={item.flashSale}
                originalPrice={item.originalPrice}
                shop={item.shop}
                notify={props.notify}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
