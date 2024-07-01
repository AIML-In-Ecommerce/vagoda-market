import { Typography, Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import CustomEmpty from "../mini/CustomEmpty";
import ProductItem from "../../ProductItem";
import { ProductType } from "@/model/ProductType";
import { POST_GetProductList } from "@/apis/product/ProductDetailAPI";
import { CollectionType } from "@/model/CollectionType";
import { GET_GetCollection } from "@/apis/collection/CollectionAPI";
import Link from "next/link";

interface CollectionDetailProps {
  collectionId: string;
}

export default function CollectionDetail(props: CollectionDetailProps) {
  // var
  const [collection, setCollection] = useState<CollectionType>();
  const [products, setProducts] = useState<ProductType[]>();

  // call api
  useEffect(() => {
    handleGetCollection();
  }, [props.collectionId]);

  useEffect(() => {
    handleGetProductList();
  }, [collection]);

  const handleGetCollection = async () => {
    const response = await GET_GetCollection(props.collectionId);
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
    <div>
      {(products && (
        <div>
          <Typography.Text className="text-xl font-semibold w-full">
            Số sản phẩm: {products.length}
          </Typography.Text>
          <Divider />
          <List
            grid={{
              gutter: 5,
              xs: 1,
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
                <Link href={`/product/${item._id}`}>
                  <div className="text-black">
                    <ProductItem
                      imageLink={item.imageLink}
                      name={item.name}
                      rating={item.rating}
                      soldAmount={item.soldAmount}
                      price={item.price}
                      isFlashSale={item.flashSale}
                      originalPrice={item.originalPrice}
                    />
                  </div>
                </Link>
              </List.Item>
            )}
          />
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
    </div>
  );
}
