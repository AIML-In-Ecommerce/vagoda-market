import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const ORDER_PORT = process.env.NEXT_PUBLIC_ORDER_PORT;
const HTTP_BACKEND_PREFIX = `${BACKEND_PREFIX}:${ORDER_PORT}`;

const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;

export interface Order {
  _id: string;
  user: User;
  shop: Shop;
  products: Product[];
  promotion: any;
  paymentMethod: PaymentMethod;
  shippingFee: number;
  totalPrice: number;
  profit: number;
  shippingAddress: ShippingAddress;
  orderStatus: OrderStatus[];
  createAt: string;
}

export interface OrderStatus {
  status: string;
  complete: Date | null;
  time: Date;
  deadline: Date;
  _id: string;
}

export interface PaymentMethod {
  kind: string;
  name: string;
  zpTransId: number;
  zpUserId: string;
  appTransId: string;
  isPaid: boolean;
  paidAt: Date;
}

export interface Attribute {
  colors: ColorAttribute[];
  size: string[];
  material: string;
}

export interface ColorAttribute {
  _id?: string;
  color: ColorItemAttribute;
  link: string;
}

export interface ColorItemAttribute {
  label: string;
  value: string;
}

export interface Category {
  _id: string;
  name: string;
  subCategories: any[];
  __v: number;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  category: string;
  subCategories: any[];
  subCategoryTypes: any[];
  __v: number;
}

export interface SubCategoryType {
  _id: string;
  name: string;
  subCategory: string;
  __v: number;
}

export interface ShippingAddress {
  receiverName: string;
  street: string;
  idProvince: string;
  idDistrict: string;
  idCommune: string;
  country: string;
  phoneNumber: string;
  label: string;
  isDefault: boolean;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  shop: string;
  description: string;
  originalPrice: number;
  category: Category;
  subCategory: SubCategory;
  subCategoryType: SubCategoryType;
  platformFee: number;
  status: string;
  images: string[];
  avgRating: number;
  soldQuantity: number;
  brand: string;
  isFlashSale: boolean;
  inventoryAmount: number;
  attribute: Attribute;
  purchasedPrice: number;
  color: ColorAttribute;
  size: string;
  quantity: number;
}

export interface Shop {
  _id: string;
  name: string;
  location: string;
}

export interface User {
  _id: string;
  fullName: string;
}

export async function GET_GetAllOrders(userId: string) {
  const url = `${GATEWAY_PREFIX}/order/buyer/orders?userId=${userId}`;
  try {
    const response = await axios.get(url);
    if (userId == null) {
      return {
        isDenied: true,
        message: "Unauthenticated",
        status: 403,
        data: undefined,
      };
    }
    let responseData = response.data;
    if (response.status === 200) {
      let ordersData = responseData.data;
      return {
        isDenied: false,
        message: "Get orders successfully",
        status: response.status,
        data: ordersData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get orders",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to get orders: ", error);
    return {
      isDenied: true,
      message: "Failed to get orders",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetOrderById(orderId: string, userId: string) {
  const url = `${GATEWAY_PREFIX}/order/buyer/order?orderId=${orderId}&userId=${userId}`;
  try {
    const response = await axios.get(url);
    let responseData = response.data;
    if (response.status === 200) {
      let orderData = responseData.data;
      return {
        isDenied: false,
        message: "Get order successfully",
        status: response.status,
        data: orderData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to Get order",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to Get order: ", error);
    return {
      isDenied: true,
      message: "Failed to Get order",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_createOrder(
  userId: string,
  shippingAddressId: string,
  promotionIds: string[],
  itemIds: string[],
  paymentMethodId: string
) {
  const url = `${GATEWAY_PREFIX}/order/buyer/create?userId=${userId}`;
  try {
    const response = await axios.post(url, {
      shippingAddressId: shippingAddressId,
      promotionIds: promotionIds,
      itemIds: itemIds,
      paymentMethodId: paymentMethodId,
      execTime: new Date().getTime(),
    });
    if (userId === null) {
      return {
        isDenied: true,
        message: "Unauthenticated",
        status: 403,
        data: undefined,
      };
    }
    let responseData = response.data;
    if (response.status === 200) {
      let orderData = responseData.data;
      return {
        isDenied: false,
        message: "Create order successfully",
        status: response.status,
        data: orderData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create order",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to create order: ", error);
    return {
      isDenied: true,
      message: "Failed to create order",
      status: 500,
      data: undefined,
    };
  }
}
export async function GET_GetLatestOrder(userId: string) {
  const url = `${GATEWAY_PREFIX}/order/buyer/orders?userId=${userId}`;
  try {
    const response = await axios.get(url);
    if (userId === null) {
      return {
        isDenied: true,
        message: "Unauthenticated",
        status: 403,
        data: undefined,
      };
    }
    let responseData = response.data;
    if (response.status === 200) {
      let ordersData = responseData.data;
      let latestOrder = ordersData[ordersData.length - 1];
      return {
        isDenied: false,
        message: "Get latest order successfully",
        status: response.status,
        data: latestOrder,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get order",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to get orders: ", error);
    return {
      isDenied: true,
      message: "Failed to get orders",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetOrderProduct(orderId: string, itemId: string) {
  const url = `${HTTP_BACKEND_PREFIX}/order/get_item`;
  try {
    const response = await axios.get(url, {
      params: {
        orderId: orderId,
        itemId: itemId,
      },
    });
    let responseData = response.data;
    if (response.status === 200) {
      let item = responseData.data;
      return {
        isDenied: false,
        message: "Get order item successfully",
        status: response.status,
        data: item,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get order item",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to Get order: ", error);
    return {
      isDenied: true,
      message: "Failed to get order item",
      status: 500,
      data: undefined,
    };
  }
}
