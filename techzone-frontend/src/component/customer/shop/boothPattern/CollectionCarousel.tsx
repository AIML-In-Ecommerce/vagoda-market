"use client";
import { Carousel, List } from "antd";
import { useEffect, useState } from "react";
import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import { CollectionType } from "@/model/CollectionType";
import { CollectionElement, WidgetType } from "@/model/WidgetType";
import CollectionItem from "../mini/CollectionItem";
import CustomEmpty from "../mini/CustomEmpty";
import { POST_GetCollectionList } from "@/app/apis/collection/CollectionAPI";

interface CollectionCarouselProps {
  widget: WidgetType;
  setCollectionId: (id: string) => void;
}

export default function CollectionCarousel(props: CollectionCarouselProps) {
  // mock data
  // const collectionsData = [
  //   {
  //     _id: "1",
  //     name: "collection 1",
  //     imageUrl:
  //       "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //     productIdList: [],
  //     createDate: "string",
  //     isActive: true,
  //   },
  //   {
  //     _id: "2",
  //     name: "collection 2",
  //     imageUrl:
  //       "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
  //     productIdList: [],
  //     createDate: "string",
  //     isActive: true,
  //   },
  //   {
  //     _id: "3",
  //     name: "collection 3",
  //     imageUrl:
  //       "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //     productIdList: [],
  //     createDate: "string",
  //     isActive: true,
  //   },
  //   {
  //     _id: "4",
  //     name: "collection 4",
  //     imageUrl:
  //       "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
  //     productIdList: [],
  //     createDate: "string",
  //     isActive: true,
  //   },
  // ] as CollectionType[];

  // var
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const autoPlayCarouselSpeed = 5000; //ms
  const element = props.widget.element as CollectionElement;

  // call api
  useEffect(() => {
    handleGetCollectionList(element.collectionIdList);
  }, [element]);

  const handleGetCollectionList = async (ids: string[]) => {
    const response = await POST_GetCollectionList(ids);
    if (response.status == 200) {
      if (response.data) {
        setCollections(response.data.filter((c) => c.isActive === true));
        // console.log("collection", response.data);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl my-5">
      {collections.length === 0 ? (
        <div className="p-10">
          <CustomEmpty />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-full pr-5">
            {collections.length < 4 ? (
              <List
                grid={{
                  gutter: 5,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={collections}
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
                className="px-10"
              />
            ) : (
              <Carousel
                autoplay
                autoplaySpeed={autoPlayCarouselSpeed}
                arrows
                prevArrow={<CarouselArrow direction="left" />}
                nextArrow={<CarouselArrow direction="right" />}
                slidesToShow={4}
                slidesToScroll={1}
                initialSlide={0}
                responsive={[
                  {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      initialSlide: 1,
                    },
                  },
                ]}
              >
                {collections.length > 0 &&
                  collections.map((collection, index) => (
                    <div key={index} className="pl-5">
                      <CollectionItem
                        collection={collection}
                        setCollectionId={props.setCollectionId}
                      />
                    </div>
                  ))}
              </Carousel>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
