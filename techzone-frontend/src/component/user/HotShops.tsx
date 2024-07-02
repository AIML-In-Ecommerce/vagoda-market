"use client";

import { SimpleShopInfoType } from "@/model/ShopInfoType";
import { Col, Flex, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import CenterTitle from "./utils/CenterTitle";
import ShopItem from "./utils/ShopItem";
import Link from "next/link";
// import { GET_GetShopList } from "@/apis/shop/ShopAPI";
import { ShopType } from "@/model/ShopType";
import StatisticsService from "@/services/statistics.service";

interface HotShopsProps {}

// const MockData: SimpleShopInfoType[] = [
//   {
//     _id: "sh-01",
//     name: "Yode",
//     location: "Tp Hồ Chí Minh",
//     description: "",
//     design: [],
//     shopInfoDesign: {
//       color: "white",
//       avatarUrl:
//         "https://img.freepik.com/free-photo/3d-rendering-cartoon-like-woman-shopping_23-2150797754.jpg?t=st=1716353651~exp=1716357251~hmac=778e94e806b4da6dbc6b67dfb6828a0bd829e0eeee5ab639b13fd0880116a62c&w=996",
//       banner: "",
//       _id: "sid-01",
//     },
//   },
//   {
//     _id: "sh-02",
//     name: "Yame",
//     location: "Tp Hồ Chí Minh",
//     description: "",
//     design: [],
//     shopInfoDesign: {
//       color: "white",
//       avatarUrl:
//         "https://img.freepik.com/free-vector/hand-drawn-dance-school-logo_23-2149432275.jpg?t=st=1716353755~exp=1716357355~hmac=c664484b9cda4d2b4ab4c84811c4bcc684c20034c890ba422a0dfb8f55918579&w=740",
//       banner: "",
//       _id: "sid-01",
//     },
//   },
//   {
//     _id: "sh-03",
//     name: "Flatimate",
//     location: "Tp Hồ Chí Minh",
//     description: "",
//     design: [],
//     shopInfoDesign: {
//       color: "white",
//       avatarUrl:
//         "https://img.freepik.com/free-vector/flat-design-clothing-logo-template_23-2149489910.jpg?t=st=1716353825~exp=1716357425~hmac=0b5e59ada1f90f1c180214530b7814cb62189f8c429e4749e824336aca6e4d1f&w=740",
//       banner: "",
//       _id: "sid-01",
//     },
//   },
//   {
//     _id: "65f1e8bbc4e39014df775166",
//     name: "TenTen",
//     location: "Tp Hồ Chí Minh",
//     description: "",
//     design: [],
//     shopInfoDesign: {
//       color: "white",
//       avatarUrl:
//         "https://img.freepik.com/free-photo/3d-rendering-cartoon-like-woman-shopping_23-2150797754.jpg?t=st=1716353651~exp=1716357251~hmac=778e94e806b4da6dbc6b67dfb6828a0bd829e0eeee5ab639b13fd0880116a62c&w=996",
//       banner: "",
//       _id: "sid-01",
//     },
//   },
//   {
//     _id: "sh-05",
//     name: "Shiba Sahara",
//     location: "Tp Hồ Chí Minh",
//     description: "",
//     design: [],
//     shopInfoDesign: {
//       color: "white",
//       avatarUrl:
//         "https://img.freepik.com/free-vector/clothing-logo-template_23-2149505761.jpg?t=st=1716353951~exp=1716357551~hmac=4333883c69eb319025e3353c3d4bc805962e14257b5189805c3172a6f0f5d842&w=740",
//       banner: "",
//       _id: "sid-01",
//     },
//   },
//   {
//     _id: "sh-06",
//     name: "Oh pleaseee",
//     location: "Tp Hồ Chí Minh",
//     description: "",
//     design: [],
//     shopInfoDesign: {
//       color: "white",
//       avatarUrl:
//         "https://img.freepik.com/free-vector/oramental-fashion-logo_23-2147521044.jpg?t=st=1716354029~exp=1716357629~hmac=c0502fca13b699800dc6ae598b966ea757633f76ae6823497f1691caac124b22&w=740",
//       banner: "",
//       _id: "sid-01",
//     },
//   },
// ];

function HotShops({}: HotShopsProps) {
  const titleValue = "Cửa hàng phổ biến";
  const subTitleValue = "Các cửa hàng có lượt mua cao trong tuần";

  const maxItemLength = 6;
  const [shops, setShops] = useState<SimpleShopInfoType[]>([]);
  // const [shops, setShops] = useState<ShopType[]>([]);
  const [mainDisplay, setMainDisplay] = useState<JSX.Element>(
    <Skeleton active />
  );

  const handleGetShopList = async () => {
    const response: ShopType[] = await StatisticsService.getHotShops();
    // if (response.status == 200) {
    //   // console.log(response.data);
    //   if (response.data) {
    //     setShops(response.data);
    //   }
    // }

    if (response && response.length > 0) {
      console.log("hot shop", response);
      let newList: SimpleShopInfoType[] = [];

      response.forEach((shop: any) => {
        newList.push({
          _id: shop.shopId,
          name: shop.shopInfo.name,
          location: shop.shopInfo.location,
          description: shop.shopInfo.description,
          shopInfoDesign: {
            color: shop.shopInfo.shopInfoDesign.color,
            avatarUrl: shop.shopInfo.shopInfoDesign.avatarUrl,
            bannerUrl: shop.shopInfo.shopInfoDesign.bannerUrl,
          },
        });
      });
      console.log("hot shop 2", newList);

      setShops(newList);
    }
  };

  useEffect(() => {
    //fetch data here
    handleGetShopList();

    // setShops(MockData);
  }, []);

  function get6Display(shops: SimpleShopInfoType[]) {
    if (shops.length == 0) {
      <Row>
        <Col span={8}>
          <Row align={"top"} justify={"end"}>
            <Skeleton active />
          </Row>
          <Row align={"top"} justify={"center"}>
            <Skeleton active />
          </Row>
        </Col>
        <Col span={8}>
          <Row align={"bottom"} justify={"center"}>
            <Skeleton active />
          </Row>
          <Row align={"bottom"} justify={"center"}>
            <Skeleton active />
          </Row>
        </Col>
        <Col span={8}>
          <Row align={"top"} justify={"end"}>
            <Skeleton active />
          </Row>
          <Row align={"top"} justify={"center"}>
            <Skeleton active />
          </Row>
        </Col>
      </Row>;
    }

    return (
      <Row className="w-full">
        <Col className="flex flex-col justify-start items-end" span={8}>
          <Row>
            <Col span={24}>
              {shops.length > 1 && (
                <Link href={`/seller/${shops[3]._id}`}>
                  <ShopItem
                    imageWidth="220px"
                    imageHeight="220px"
                    shopInfo={shops[3]}
                  />
                </Link>
              )}
            </Col>
          </Row>
          <div className="h-8 invisible"></div>
          <Row align={"top"} justify={"center"}>
            <Col span={24}>
              {shops.length > 2 && (
                <Link href={`/seller/${shops[1]._id}`}>
                  <ShopItem
                    imageWidth="320px"
                    imageHeight="320px"
                    shopInfo={shops[1]}
                  />
                </Link>
              )}
            </Col>
          </Row>
        </Col>
        <Col className="flex justify-end flex-col items-center" span={8}>
          <div className="h-10 invisible"></div>
          <Row>
            <Col span={24}>
              {shops.length > 0 && (
                <Link href={`/seller/${shops[0]._id}`}>
                  <ShopItem
                    imageWidth="360px"
                    imageHeight="360px"
                    shopInfo={shops[0]}
                  />
                </Link>
              )}
            </Col>
          </Row>
          <div className="h-8 invisible"></div>
          <Row align={"bottom"} justify={"center"}>
            <Col span={24}>
              {shops.length > 4 && (
                <Link href={`/seller/${shops[5]._id}`}>
                  <ShopItem
                    imageWidth="300px"
                    imageHeight="300px"
                    shopInfo={shops[5]}
                  />
                </Link>
              )}
            </Col>
          </Row>
        </Col>
        <Col className="flex justify-start flex-col items-start" span={8}>
          <Flex vertical justify="start" align="end">
            <Row align={"top"} justify={"end"}>
              <Col span={24}>
                {shops.length > 5 && (
                  <Link href={`/seller/${shops[4]._id}`}>
                    <ShopItem
                      imageWidth="260px"
                      imageHeight="260px"
                      shopInfo={shops[4]}
                    />
                  </Link>
                )}
              </Col>
            </Row>
            <div className="h-8 invisible"></div>
            <Row align={"top"} justify={"center"}>
              <Col span={24}>
                {shops.length > 3 && (
                  <Link href={`/seller/${shops[2]._id}`}>
                    <ShopItem
                      imageWidth="280px"
                      imageHeight="280px"
                      shopInfo={shops[2]}
                    />
                  </Link>
                )}
              </Col>
            </Row>
          </Flex>
        </Col>
      </Row>
    );
  }

  useEffect(() => {
    let newDisplay = <></>;
    // if (shops.length <= maxItemLength) {
    newDisplay = get6Display(shops);
    // }

    setMainDisplay(newDisplay);
  }, [shops]);

  return (
    <>
      <Flex
        className="constain w-full"
        vertical
        justify="center"
        align="center"
      >
        <CenterTitle
          title={titleValue}
          isUppercase={true}
          subTitle={subTitleValue}
          background="bg-[#F2F2F2]"
        />
        <div className="invisible h-4 w-full"></div>
        <Flex className="container w-full py-4" vertical>
          {mainDisplay}
        </Flex>
        <div className="invisible h-10 w-full"></div>
      </Flex>
    </>
  );
}

export default HotShops;
