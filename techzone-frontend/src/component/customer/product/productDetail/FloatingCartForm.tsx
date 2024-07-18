"use client";
import { Button, Image } from "antd";
// import { useTranslations } from "next-intl";
import { priceIndex } from "../ProductDetail";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import { AuthContext } from "@/context/AuthContext";
import { POST_AddToCart } from "@/apis/cart/CartAPI";
import StatisticsService from "@/services/statistics.service";
import { useContext } from "react";
import { CartProductType } from "@/model/ProductType";
import { ProductAccessType } from "@/enum/ProductAccessType";

interface FormProps {
  _id: string;
  shop: string;
  name: string;
  price: number;
  mainImage: string;
  numberOfItem: number;
  updateItemNumber: (value: number) => void;
  // totalPrice: number;
  // handleCartDetail: (isOpen: boolean) => void;
  notify(message: string, content: any): void;
}

const FloatingCartForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  // const totalPrice = useMemo(() => {
  //   return (
  //     formData.numberOfItem * formData.mainProductPrice +
  //     formData.totalComboPrice
  //   );
  // }, [formData.totalComboPrice, formData.numberOfItem]);

  const authContext = useContext(AuthContext);

  const onIncrement = (key: React.Key, value: number) => {
    if (value === 100) return;
    formData.updateItemNumber(value + 1);
  };

  const onDecrement = (key: React.Key, value: number) => {
    if (value === 1) return;
    formData.updateItemNumber(value - 1);
  };

  const onQuantityChange = (key: React.Key, value: number) => {
    // Update the 'amount' field of the product with the specified key
    // if (value) {
    //   formData.updateItemNumber(value);
    // }
  };

  const handleAddToCart = async () => {
    if (!authContext.userInfo || !authContext.userInfo._id) {
      formData.notify("Hãy đăng nhập vào tài khoản nhé!", "");
      return;
    }
    const userId = authContext.userInfo._id;

    let products: CartProductType[] = [
      {
        product: formData._id,
        quantity: formData.numberOfItem,
      },
    ];

    const response = await POST_AddToCart(userId, products);

    // if (response.message === "Update cart successfully") {
    if (response.data) {
      formData.notify(
        "Bạn đã thêm thành công!",
        <div className="flex flex-row gap-6 w-max">
          <img className="m-2 h-20 w-20 object-fill" src={formData.mainImage} />
          <div className="flex flex-col justify-center">
            <div className="text-sm md:text-lg truncate">
              {formData.name.substring(0, 15) + "..."}
            </div>
            <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
              {priceIndex(formData.price)}
            </div>
          </div>
        </div>
      );

      const sessionId =
        authContext.methods && authContext.methods.getSessionId()
          ? authContext.methods.getSessionId()
          : "";
      const accessType = ProductAccessType.ADD_TO_CART;

      StatisticsService.setProductAccess(
        userId,
        sessionId,
        formData._id,
        formData.shop,
        accessType
      );
    } else {
      formData.notify("Thêm sản phẩm thất bại... Hãy thử lại sau!", <></>);
      // console.log(response.message);
    }
  };

  return (
    <div className={`bg-slate-50 h-16 border-2 border-x-0 border-t-0 `}>
      <div className="grid grid-cols-12">
        {/* <img
          className="m-2 h-12 w-12 object-fill"
          src={formData.mainImage}
          alt=""
        /> */}
        <Image
          src={formData.mainImage}
          preview={false}
          width={50}
          alt=""
          className="m-2"
        />

        <div className="col-start-3 md:col-start-2 col-span-4 flex flex-col justify-center">
          <div className="text-sm md:text-lg truncate">{formData.name}</div>
          <div className="text-[9px] md:text-sm text-red-500 font-semibold flex">
            {priceIndex(formData.price)}
            {/* {priceIndex(formData.totalPrice)} */}
            {/* <div
              className="mt-1 ml-2 cursor-pointer"
              onClick={() => formData.handleCartDetail(true)}
            >
              <BsQuestionCircle />
            </div> */}
          </div>
        </div>
        <div className="col-start-9 col-span-2 hidden md:block m-4">
          <QuantityControl
            componentSize={5}
            keyProp={0}
            value={formData.numberOfItem}
            minValue={1}
            maxValue={100}
            defaultValue={1}
            inputWidth={75}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onQuantityChange={onQuantityChange}
          />
        </div>

        <div className="col-start-9 col-span-5 sm:col-start-10 sm:col-span-3 md:col-start-11 md:col-span-2 m-3">
          <Button
            type="primary"
            // href="/cart"
            onClick={handleAddToCart}
            danger
            block
            size="middle"
            style={{ background: "#5c6856" }}
            className="rounded-full mt-1 text-xs md:text-sm"
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCartForm;

// ----------------------------------------------------------------
// REDO
// "use client";
// import { Avatar, Button, Divider, Flex } from "antd";
// // import { useTranslations } from "next-intl";
// import { AntDesignOutlined } from "@ant-design/icons";
// import { priceIndex } from "./ProductDetail";
// import { QuantityControl } from "@/component/user/utils/QuantityControl";

// interface FormProps {
//   numberOfItem: number;
//   updateItemNumber: (value: number) => void;
//   totalPrice: number;
//   handleCartDetail: (isOpen: boolean) => void;
// }

// const FloatingCartForm = (formData: FormProps) => {
//   //   const t = useTranslations("Review");

//   // const totalPrice = useMemo(() => {
//   //   return (
//   //     formData.numberOfItem * formData.mainProductPrice +
//   //     formData.totalComboPrice
//   //   );
//   // }, [formData.totalComboPrice, formData.numberOfItem]);
//   const onIncrement = (key: React.Key, value: number) => {
//     if (value === 100) return;
//     formData.updateItemNumber(value + 1);
//   };

//   const onDecrement = (key: React.Key, value: number) => {
//     if (value === 1) return;
//     formData.updateItemNumber(value - 1);
//   };

//   const onQuantityChange = (key: React.Key, value: number) => {
//     // Update the 'amount' field of the product with the specified key
//     if (value) {
//       formData.updateItemNumber(value);
//     }
//   };

//   return (
//     <div className="sticky top-10 lg:w-72 min-w-40 mr-10 p-3 bg-white rounded-xl border-2 overflow-hidden">
//       <Flex gap="small">
//         <div className="m-1">
//           <Avatar
//             size="large"
//             style={{ backgroundColor: "#1677ff" }}
//             icon={<AntDesignOutlined />}
//           />
//         </div>
//         <div className="m-1">
//           <Flex vertical>
//             <b>TechZone ® </b>
//             <div className="text-gray-600 font-light text-xs">Official</div>
//           </Flex>
//         </div>
//       </Flex>

//       <Divider />

//       <Flex vertical gap="small">
//         <div className="mx-2">
//           {/* test */}
//           {/* <div>{formData.mainProductPrice}</div>
//           <div>{formData.totalComboPrice}</div> */}

//           <div className="mb-2 font-semibold"> Số lượng: </div>

//           <QuantityControl
//             componentSize={5}
//             keyProp={0}
//             value={formData.numberOfItem}
//             minValue={1}
//             maxValue={100}
//             defaultValue={1}
//             inputWidth={75}
//             onIncrement={onIncrement}
//             onDecrement={onDecrement}
//             onQuantityChange={onQuantityChange}
//           />

//           <div className="my-5">
//             <div className="font-semibold">Tạm tính:</div>
//             <div className="text-xl">{priceIndex(formData.totalPrice)}</div>
//           </div>
//         </div>

//         <Button type="primary" href="/cart" danger block size="large">
//           Mua ngay
//         </Button>
//         {/* <Button type="primary" ghost block disabled>
//             Mua trả góp - trả sau
//           </Button> */}
//         <Button type="primary" ghost block>
//           Thêm vào giỏ
//         </Button>
//         <Button
//           type="primary"
//           ghost
//           block
//           onClick={() => formData.handleCartDetail(true)}
//         >
//           Xem chi tiết
//         </Button>
//       </Flex>
//     </div>
//   );
// };

// export default FloatingCartForm;
