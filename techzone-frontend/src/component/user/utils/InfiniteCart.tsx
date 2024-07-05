import { CartItem, GET_getUserCartProducts } from "@/apis/cart/CartProductAPI";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import CartTable from "@/component/customer/cart/CartTable";

const InfiniteCart = () => {
  const [products, setProducts] = useState<CartItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const authContext = useContext(AuthContext);

  console.log("User Id: ", authContext.userInfo?._id);

  const fetchProducts = async () => {
    await GET_getUserCartProducts(
      process.env.NEXT_PUBLIC_USER_ID as string,
    ).then((response) => {
      console.log("Cart: ", response.data?.products);
      setProducts(response.data?.products || undefined);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3">
      {" "}
      <div className="text-3xl font-bold normal-case ">Giỏ hàng của bạn</div>
      <CartTable
        products={products}
        setProducts={setProducts}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
    </div>
  );
};

export default InfiniteCart;
