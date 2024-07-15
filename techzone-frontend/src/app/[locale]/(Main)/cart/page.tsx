"use client";
import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Card, Modal, Space, Image, Tooltip, Skeleton, Radio, Divider, Spin, Empty } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import PromotionCard from "@/component/customer/product/PromotionCard";
import styled from 'styled-components'
import Link from "next/link";
import { RiContactsBookLine } from "react-icons/ri";
import DeliveryInfoForm from "@/component/customer/cart/DeliveryInfoForm";
import TransactionSection from "@/component/customer/cart/TransactionSection";
import PromotionSection from "@/component/customer/cart/PromotionSection";
import { GET_getUserCartProducts, CartItem } from "@/apis/cart/CartProductAPI";
import { POST_addUserShippingAddress, ShippingAddress } from "@/apis/cart/AddressAPI";
import { useRouter } from "next/navigation";
import { PaymentMethod } from "@/apis/payment/PaymentAPI";
import { POST_createOrder } from "@/apis/order/OrderAPI";
import { GET_GetAllPromotionByShopId, GET_GetPromotionWithSelection, Promotion } from "@/apis/cart/promotion/PromotionAPI";
import { GET_GetShop } from "@/apis/shop/ShopAPI";
import CartTable from "@/component/customer/cart/CartTable";
import { AuthContext } from "@/context/AuthContext";

const { Search } = Input;

const formatDate = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const parseDateString = (dateString: string) => {
    const [timePart, datePart] = dateString.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const [day, month, year] = datePart.split('/').map(Number);

    // JavaScript months are 0-indexed, so we subtract 1 from the month
    return new Date(year, month - 1, day, hours, minutes);
};

// const compareDateString = (dateString1: string, dateString2: string) => {
//     return parseDateString(dateString1) <= parseDateString(dateString2) ? 1 : -1;
// };

//Function for testing..
// function generatePromotionCode(promotionName: string): string {
//     // Create a hash object using SHA-256 algorithm
//     const hash = crypto.createHash('sha256');

//     // Update the hash object with the product name
//     hash.update(promotionName);

//     // Get the hexadecimal digest of the hash
//     const hexDigest = hash.digest('hex');

//     // Take the first 8 characters of the hexadecimal digest
//     const hashedName = hexDigest.substring(0, 8);

//     return hashedName;
// }

type ShopInfo = {
    _id: string,
    name: string,
}

type PromotionDisplay = {
    shopInfo: ShopInfo,
    promotions: PromotionType[]
}

export default function CartPage() {
    const context = useContext(AuthContext)
    const [products, setProducts] = useState<CartItem[]>();
    const [shopInfos, setShopInfos] = useState<ShopInfo[]>();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [promotionDisplayList, setPromotionDisplayList] = useState<PromotionDisplay[]>();
    const [currentCode, setCurrentCode] = useState<string>("");
    const [queryPromotionList, setQueryPromotionList] = useState<PromotionDisplay[]>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [selectedPromotions, setSelectedPromotions] = useState<PromotionType[]>([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [total, setTotal] = useState(0);
    const [showPromotionModal, setShowPromotionModal] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
    const [isSavingAddress, setIsSavingAddress] = useState<boolean>(false);
    const [loadingPromotion, setLoadingPromotion] = useState<boolean>(true);
    const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm Mỗi Cửa Hàng"
    const router = useRouter();

    const [currentAddress, setCurrentAddress] = useState<ShippingAddress>({
        _id: 'datn'
    } as ShippingAddress);

    const filterShopName = (shopId: string) => {
        const shopName = shopInfos!.find(shopInfo => shopInfo._id === shopId)!.name;
        return shopName;
    }

    const fetchShopInfos = (products: CartItem[]) => {
        const shopInfosList: ShopInfo[] = [] as ShopInfo[];
        const shopIdList: string[] = [] as string[];
        products.forEach(async (product: CartItem) => {
            if (!shopIdList.includes(product.shop)) {
                shopIdList.push(product.shop);
            }
        })
        shopIdList.forEach(async (item: string) => {
            await GET_GetShop(item)
                .then((response) => shopInfosList.push({
                    _id: item,
                    name: response.data?.name,
                } as ShopInfo));
        })
        setShopInfos(shopInfosList);
    }

    const handleShowPromotionModal = async () => {
        setShowPromotionModal(true);
    }

    const handleOKPromotionModal = () => {
        setShowPromotionModal(false);
    }
    const handleCancelPromotionModal = () => {
        setShowPromotionModal(false);
    }

    const handleCreateOrder = async (currentAddress: ShippingAddress) => {
        //Create order, response gateway url and transaction
        const createOrderResponse = await POST_createOrder(
            context.userInfo?._id as string,
            currentAddress._id,
            selectedPromotions.map((item => item._id)),
            selectedRowKeys.map(item => item.toString()), paymentMethod);

        if (createOrderResponse) {
            console.log('Navigating to gateway...', createOrderResponse.data?.order_url);
            if (paymentMethod === PaymentMethod.ZALOPAY) {
                router.push(createOrderResponse.data.order_url)
            }
            else { router.push('/payment') }
        }
    }

    //transaction process
    const handleTransaction = async () => {
        console.log('Transaction processing...');

        //if isSavingAddress checked
        if (isSavingAddress) {
            console.log('currentAddress', currentAddress);
            const response = await POST_addUserShippingAddress(context.userInfo?._id as string, currentAddress);
            if (response.status === 200) {
                if (response.data) {
                    const latestAddress: ShippingAddress = response.data[response.data.length - 1];
                    setCurrentAddress(latestAddress);
                    await handleCreateOrder(latestAddress);
                }
            }
        }
        else {
            await handleCreateOrder(currentAddress);
        }
    }

    const fetchPromotions = async () => {
        const promotionList: PromotionDisplay[] = [];
        const promotions: PromotionType[] = [];
        shopInfos?.forEach(async (item: ShopInfo, key: React.Key) => {
            const response = await GET_GetPromotionWithSelection(
                [item._id],
                provisional,
                products?.map(product => product._id),
                true);
            if (response) promotionList.push(
                {
                    shopInfo: item,
                    promotions: response.data[0]?.promotions ?? []
                } as PromotionDisplay
            )
        })
        promotionList.forEach((item: PromotionDisplay) => {
            item.promotions.forEach((promotion: PromotionType) => {
                promotions.push(promotion);
            })
        })
        setPromotions(promotions);
        setPromotionDisplayList(promotionList);
        handleCodeFilter("");
    }

    const handleCodeFilter = (value: string) => {
        setCurrentCode(value);
        const resultQueryList: PromotionDisplay[] = [] as PromotionDisplay[];
        promotionDisplayList?.forEach(item => {
            const shopCodeFilterResult = (item.promotions && item.promotions.length > 0) ? item.promotions.filter(promotion => {
                return promotion.code.toUpperCase().includes(value.toUpperCase())
            }) : [];
            resultQueryList.push({
                ...item,
                promotions: shopCodeFilterResult
            } as PromotionDisplay)
        });
        setQueryPromotionList(resultQueryList);
    }

    const fetchProducts = async () => {
        if (!context.userInfo) return;
        setLoading(true);
        console.log("current user", context.userInfo._id);
        await GET_getUserCartProducts(context.userInfo._id as string)
            .then(response => {
                setProducts(response.data?.products || undefined);
                setLoading(false);
            })
    }

    // const handleRowClick = (record: any) => {
    //     // Toggle selection for clicked row
    //     const selected = !selectedRowKeys.includes(record.key);
    //     const newSelectedRowKeys = selected
    //         ? [...selectedRowKeys, record.key]
    //         : selectedRowKeys.filter((key) => key !== record.key);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };

    const applyDiscount = (promotion: PromotionType) => {
        if (selectedPromotions.find(item => item.shop === promotion.shop)) {
            // alert("Giới hạn Áp dụng Mã Sản Phẩm!")
            return;
        }
        let updatedDiscounts = selectedPromotions.slice();
        updatedDiscounts.push(promotion);
        setSelectedPromotions(updatedDiscounts);
    }

    const removeDiscount = (promotion: PromotionType) => {
        let updatedDiscounts = selectedPromotions.filter(discount => discount._id !== promotion._id)
        setSelectedPromotions(updatedDiscounts);
    }

    const calculateDirectPricePromotion = (value: number, lowerBound: number, upperBound: number) => {
        if (!!lowerBound) return (provisional >= lowerBound) ? value : 0;
        else if (!!upperBound !== undefined) return (provisional < upperBound) ? 0 : value;
    }

    const calculatePercentagePromotion = (value: number, upperBound: number) => {
        const discountValue = value * provisional / 100;
        return (!!upperBound && (discountValue <= upperBound)) ? discountValue : upperBound;
    }

    // const handleProvisional = async () => {
    //     const selectedProducts = products ? products.filter((item: CartItem) => selectedRowKeys.includes(item.itemId)) : [];
    //     const provisional = selectedProducts ? selectedProducts.reduce((total: number, item: CartItem) => {
    //         return total + (item.finalPrice * (item.quantity || 1));
    //     }, 0) : 0;
    //     console.log('handleProvisional called', provisional, selectedProducts);
    //     setProvisional(provisional);
    // }

    // const handleDiscount = async () => {
    //     let totalDiscount = 0;
    //     selectedPromotions.forEach((item: PromotionType, key: React.Key) => {
    //         console.log("DISCOUNT_TYPE ", key, item.discountTypeInfo.type)
    //         if (item.discountTypeInfo.type === (DiscountType.DIRECT_PRICE as string)) {

    //             if (item.discountTypeInfo.value) {
    //                 totalDiscount += calculateDirectPricePromotion(
    //                     item.discountTypeInfo.value,
    //                     item.discountTypeInfo.lowerBoundaryForOrder,
    //                     item.discountTypeInfo.limitAmountToReduce) ?? 0;

    //             }
    //         }
    //         else if (item.discountTypeInfo.type === (DiscountType.PERCENTAGE as string)) {
    //             if (item.discountTypeInfo.value)
    //                 totalDiscount += calculatePercentagePromotion(
    //                     item.discountTypeInfo.value,
    //                     item.discountTypeInfo.limitAmountToReduce);
    //         }
    //     })
    //     setDiscount(totalDiscount);
    //     console.log('handleDiscount selectedPromotions', selectedPromotions);
    //     console.log('handleDiscount called', discount);
    // }

    // const handleTotalPrice = async () => {
    //     const totalValue = provisional !== 0 ? provisional - discount : 0;
    //     console.log('handleTotalPrice called', totalValue);
    //     setTotal(totalValue);
    // }

    const calculateCartPrices = () => {
        //calc provisional prices
        const selectedProducts = products ? products.filter((item: CartItem) => selectedRowKeys.includes(item.itemId)) : [];
        const currentProvisional = selectedProducts ? selectedProducts.reduce((total: number, item: CartItem) => {
            return total + (item.finalPrice * (item.quantity || 1));
        }, 0) : 0;
        console.log('handleProvisional called', currentProvisional, selectedProducts);
        setProvisional(currentProvisional);

        //calc discount factor
        let totalDiscount = 0;
        selectedPromotions.forEach((item: PromotionType, key: React.Key) => {
            console.log("DISCOUNT_TYPE ", key, item.discountTypeInfo.type)
            if (item.discountTypeInfo.type === (DiscountType.DIRECT_PRICE as string)) {

                if (item.discountTypeInfo.value) {
                    totalDiscount += calculateDirectPricePromotion(
                        item.discountTypeInfo.value,
                        item.discountTypeInfo.lowerBoundaryForOrder,
                        item.discountTypeInfo.limitAmountToReduce) ?? 0;

                }
            }
            else if (item.discountTypeInfo.type === (DiscountType.PERCENTAGE as string)) {
                if (item.discountTypeInfo.value)
                    totalDiscount += calculatePercentagePromotion(
                        item.discountTypeInfo.value,
                        item.discountTypeInfo.limitAmountToReduce);
            }
        })
        setDiscount(totalDiscount);
        console.log('handleDiscount selectedPromotions', selectedPromotions);
        console.log('handleDiscount called', discount);

        const totalValue = currentProvisional !== 0 ? currentProvisional - totalDiscount : 0;
        console.log('handleTotalPrice called', totalValue);
        setTotal(totalValue);

    }

    useEffect(() => {
        if (shopInfos && context.userInfo && showPromotionModal) {
            setLoadingPromotion(true);
            fetchPromotions();
            setLoadingPromotion(false);
        }
    }, [shopInfos, context.userInfo, showPromotionModal])

    useEffect(() => {
        if (context.userInfo) {
            fetchProducts();
        }
    }, [context.userInfo])

    useEffect(() => {
        if (products) {
            setLoading(true);
            fetchShopInfos(products);
            setLoading(false);
        }
    }, [products]);

    // useEffect(() => {
    //     console.log('ShopInfos', shopInfos);
    //     router.refresh();
    // }, [shopInfos]);

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            calculateCartPrices();
        }
    }, [products, selectedRowKeys, selectedPromotions])

    // useEffect(() => {
    //     console.log("calculation cart price updated!");
    //     router.refresh();
    // }, [provisional, discount, total]);

    useEffect(() => {
        const storedAddress = localStorage.getItem('shippingAddress');
        if (!storedAddress) return;
        const storedAddressObject = JSON.parse(storedAddress) as ShippingAddress;
        setCurrentAddress(storedAddressObject);
        console.log('currentAddress', storedAddressObject);
    }, []);

    useEffect(() => {
        console.log("Promotion fetch");
    }, [showPromotionModal, promotions, promotionDisplayList, queryPromotionList])

    const goToShippingAddressPage = () => {
        localStorage.setItem('shippingAddress', JSON.stringify(currentAddress));
    }

    const payment_options = [
        {
            label: 'COD',
            description: 'Thanh toán bằng tiền mặt khi nhận hàng',
            value: PaymentMethod.COD,
            icon: 'https://cdn-icons-png.flaticon.com/512/1554/1554401.png'
        },
        {
            label: 'Thanh toán bằng ví ZaloPay',
            description: "Thẻ ATM / Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)",
            value: PaymentMethod.ZALOPAY,
            icon: "https://web.venusagency.vn/uploads/public/2021/06/03/1622682588188_zalopay.png"
        },
        // {
        //     label: 'Thanh toán qua Paypal',
        //     description: "Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)",
        //     value: PaymentMethod.PAYPAL,
        //     icon: "https://cdn.iconscout.com/icon/free/png-256/free-paypal-58-711793.png"
        // },
    ];

    const onPaymentMethodChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setPaymentMethod(e.target.value);
    };

    const GreyoutWrapper = styled.div`
        .ant-image {
            transition: filter 0.3s; /* Smooth transition for the filter effect */
        }

        /* When the radio not is selected or not hovered over, apply greyscale filter */
        .ant-radio-wrapper:not(.ant-radio-wrapper-checked):not(:hover) .ant-image {
            filter: grayscale(100%);
        }        
    `

    return (
        <React.Fragment>
            <div className="container flex flex-col p-5 mx-auto my-5 overflow-x-hidden">
                <div className="mt-5 flex xs:flex-col sm:flex-col md:flex-col lg:grid lg:grid-cols-12 gap-2 relative">
                    <div className="lg:col-span-6 lg:mb-0 mb-10 p-2 flex flex-col">
                        <div className="w-full">
                            {/* Thông tin vận chuyển section */}
                            <div className="flex flex-row justify-between items-center">
                                <div className="text-3xl font-bold normal-case">Thông tin vận chuyển</div>
                                <Link href="/cart/shipping">
                                    <div className="flex flex-row gap-1 text-blue-700 cursor-pointer hover:text-blue-900 items-center">
                                        <RiContactsBookLine />
                                        <div className="text-base">Chọn từ sổ địa chỉ</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-5">
                                {loading ? <Skeleton /> :
                                    <DeliveryInfoForm currentAddress={currentAddress}
                                        setCurrentAddress={setCurrentAddress}
                                        setIsSavingAddress={setIsSavingAddress} />
                                }
                            </div>
                            {/* Hình thức thanh toán section */}
                            <div className="text-3xl font-bold normal-case my-10">Hình thức thanh toán</div>
                            <Radio.Group onChange={onPaymentMethodChange} value={paymentMethod} size="large" className="w-full">
                                <div className="flex flex-col gap-2">
                                    {
                                        payment_options.map(item => {
                                            return (
                                                <div className={`border-2 rounded-xl cursor-pointer ${paymentMethod === item.value ? "border-[#9bb0e8]" : "border-gray-200"} mt-1 p-2`}>
                                                    <GreyoutWrapper>
                                                        <Radio value={item.value} className="w-full text-gray-400 hover:text-black">
                                                            <div className="flex flex-row items-center">
                                                                <div className="mr-3">
                                                                    <Image src={item.icon} preview={false} width={40}></Image>
                                                                </div>
                                                                <div className="flex flex-col gap-1">
                                                                    <div className={`font-semibold ${paymentMethod === item.value ? "text-black" : ""}`}>{item.label}</div>
                                                                    <div className={`${paymentMethod === item.value ? "text-black" : ""}`}>{item.description}</div>
                                                                </div>

                                                            </div>
                                                        </Radio>
                                                    </GreyoutWrapper>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="lg:col-span-6 lg:w-auto w-full flex flex-col lg:border-l-2 lg:pl-3">
                        <div className="w-full">
                            <div className="text-3xl font-bold normal-case p-2">Giỏ hàng</div>
                            <CartTable products={products}
                                setProducts={setProducts}
                                loading={loading}
                                selectedRowKeys={selectedRowKeys}
                                setSelectedRowKeys={setSelectedRowKeys}
                                selectedKey={selectedKey}
                                setSelectedKey={setSelectedKey} />

                            <Divider style={{ height: "auto", border: "0.25px solid silver" }}></Divider>

                            <PromotionSection
                                loading={loading}
                                showPromotionModal={handleShowPromotionModal}
                                selectedDiscounts={selectedPromotions}
                                allPromotions={promotions}
                                applyDiscount={applyDiscount}
                                removeDiscount={removeDiscount} />

                            <Divider style={{ height: "auto", border: "0.25px solid silver" }}></Divider>

                            <TransactionSection
                                selectedRowKeys={selectedRowKeys}
                                loading={loading}
                                provisional={provisional}
                                discount={discount}
                                shippingFee={shippingFee}
                                total={total}
                                handleTransaction={handleTransaction} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                width={550}
                open={showPromotionModal}
                onOk={() => handleOKPromotionModal()}
                onCancel={() => handleCancelPromotionModal()}
                title={<span className="text-xl">Các Khuyến Mãi</span>}
                footer={null}
                centered>
                {
                    <div className="flex flex-col">
                        <Space direction="vertical">
                            <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                                <Input placeholder="Nhập để tìm mã"
                                    defaultValue={""}
                                    value={currentCode}
                                    onChange={(e) => handleCodeFilter(e.target.value)}></Input>
                                <Button className="bg-blue-500 font-semibold text-white"
                                    onClick={() => handleCodeFilter(currentCode)}>Áp dụng</Button>
                            </div>
                            <div className="overflow-auto h-96">
                                {
                                    loadingPromotion ? <Skeleton active /> : (queryPromotionList) ? queryPromotionList.map((item: PromotionDisplay) => {
                                        return (
                                            <Card key={item.shopInfo._id} title={<div className="font-semibold">{item.shopInfo.name}</div>}>
                                                <div className="flex flex-col gap-5 mx-3">
                                                    {
                                                        item.promotions.length > 0 ? item.promotions.sort(
                                                            (a, b) => (a.expiredDate! >= b.expiredDate! ? -1 : 1)
                                                        ).map(item => {

                                                            const isExpiredPromotion = (item: PromotionType) => {
                                                                return item.expiredDate <= new Date();
                                                            }
                                                            if (isExpiredPromotion(item)) return;

                                                            const isSelected =
                                                                selectedPromotions.find(selected => selected._id === item._id) ? true : false;

                                                            return (
                                                                <PromotionCard
                                                                    key={item._id}
                                                                    item={item}
                                                                    isSelected={isSelected}
                                                                    applyDiscount={applyDiscount}
                                                                    removeDiscount={removeDiscount} />
                                                            )
                                                        }) : <Empty description="Không có promotion khả dụng" />
                                                    }
                                                </div>
                                            </Card>
                                        )
                                    }) : <Empty description="Không có promotion khả dụng" />
                                /* {
                                    promotion.sort(
                                        (a, b) => compareDateString(a.expiredDate!, b.expiredDate!)
                                    ).map(item => {
                                        const isExpiredPromotion = (item: PromotionType) => {
                                            return parseDateString(item.expiredDate!) <= new Date();
                                        }
                                        if (isExpiredPromotion(item)) return;
                                        return (
                                            <PromotionCard
                                                key={item._id}
                                                item={item}
                                                isSelected={selectedPromotions.includes(item)}
                                                applyDiscount={applyDiscount}
                                                removeDiscount={removeDiscount} />
                                        )
                                    })
                                } */}
                            </div>
                            <div className="my-5 flex flex-row justify-center items-center">
                                <div>Bạn đã chọn &nbsp;</div>
                                <div className={`${selectedPromotions.length > 0 ? "text-red-500" : ""} font-bold text-2xl`}>
                                    {selectedPromotions.length}
                                </div>
                                <div>&nbsp; mã giảm giá Sản Phẩm &nbsp;</div>
                                <Tooltip title={promotion_help}>
                                    <div className="text-slate-500"><FaRegCircleQuestion /></div>
                                </Tooltip>
                            </div>
                        </Space>
                    </div>
                }
            </Modal>
        </React.Fragment>
    );
}
