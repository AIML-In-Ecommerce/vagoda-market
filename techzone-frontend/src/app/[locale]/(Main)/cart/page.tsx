"use client";
import React, { useState, useEffect, useContext, ReactElement, useMemo } from "react";
import { Input, Image, Skeleton, Radio, Divider, notification, message } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { DiscountType, PromotionType } from "@/model/PromotionType";
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
import { GET_GetPromotionWithSelection } from "@/apis/cart/promotion/PromotionAPI";
import { GET_GetShop } from "@/apis/shop/ShopAPI";
import CartTable from "@/component/customer/cart/CartTable";
import { AuthContext } from "@/context/AuthContext";
import { NotificationPlacement } from "antd/es/notification/interface";
import PromotionListModal from "@/component/customer/cart/PromotionListModal";
import { usePaymentContext } from "@/context/PaymentContext";

const { Search } = Input;

// const formatDate = (date: Date) => {
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();

//     return `${hours}:${minutes} ${day}/${month}/${year}`;
// };

// const parseDateString = (dateString: string) => {
//     const [timePart, datePart] = dateString.split(' ');
//     const [hours, minutes] = timePart.split(':').map(Number);
//     const [day, month, year] = datePart.split('/').map(Number);

//     // JavaScript months are 0-indexed, so we subtract 1 from the month
//     return new Date(year, month - 1, day, hours, minutes);
// };

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

const isShippingAddressComplete = (address: ShippingAddress) => {
    const requiredFields: (keyof ShippingAddress)[] = [
        'street',
        'idProvince',
        'idDistrict',
        'idCommune',
        'receiverName',
        'phoneNumber',
    ];

    return requiredFields.every(field => {
        const value = address[field];
        return typeof value === 'string' && value.trim() !== '' && value.trim() !== '0';
    });
}

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
    const paymentContext = usePaymentContext();
    const [products, setProducts] = useState<CartItem[]>();
    const [shopInfos, setShopInfos] = useState<ShopInfo[]>();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [promotionDisplayList, setPromotionDisplayList] = useState<PromotionDisplay[]>([]);
    const [currentCode, setCurrentCode] = useState<string>("");
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
    const router = useRouter();

    const queryPromotionList = useMemo<PromotionDisplay[]>(() => {
        console.log('queryPromotionList triggered');
        if (promotionDisplayList === undefined || promotionDisplayList.length === 0) return [] as PromotionDisplay[];

        const resultQueryList: PromotionDisplay[] = [] as PromotionDisplay[];
        promotionDisplayList.forEach(item => {
            const shopCodeFilterResult = (item.promotions && item.promotions.length > 0) ? item.promotions.filter(promotion => {
                return promotion.code.toUpperCase().includes(currentCode.toUpperCase())
            }) : [];
            resultQueryList.push({
                ...item,
                promotions: shopCodeFilterResult
            } as PromotionDisplay)
        });
        return resultQueryList;
    }, [currentCode, promotionDisplayList]);

    const [currentAddress, setCurrentAddress] = useState<ShippingAddress>({
        _id: '@NEW_ADDRESS_FROM_USER',
        street: '',
        idProvince: '',
        idDistrict: '',
        idCommune: '',
        receiverName: '',
        phoneNumber: '',

    } as ShippingAddress);
    const [api, contextHolder] = notification.useNotification();
    const durationInMiliseconds: number = 4000;

    const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
    const openWarningNotification = (title: string, content: ReactElement) => {
        api.warning({
            message: `${title}`,
            description: content,
            placement,
            duration: durationInMiliseconds / 1000
        });
    };
    const openSuccessNotification = (title: string, content: ReactElement) => {
        api.success({
            message: `${title}`,
            description: content,
            placement,
            duration: durationInMiliseconds / 1000
        });
    };


    // const filterShopName = (shopId: string) => {
    //     const shopName = shopInfos!.find(shopInfo => shopInfo._id === shopId)!.name;
    //     return shopName;
    // }

    const fetchShopInfos = async (products: CartItem[]) => {
        const shopInfosList: ShopInfo[] = [] as ShopInfo[];
        const shopIdList: string[] = [] as string[];
        for (const product of products) {
            if (!shopIdList.includes(product.shop)) {
                shopIdList.push(product.shop);
            }
        }
        for (const item of shopIdList) {
            await GET_GetShop(item)
                .then((response) => shopInfosList.push({
                    _id: item,
                    name: response.data?.name,
                } as ShopInfo));
        }
        setShopInfos(shopInfosList);
    }

    const calculateShopProductsProvisional = (shopId: string) => {
        if (!products || !selectedRowKeys) return 0;

        const filteredShopProducts = products.filter(item =>
            item.shop === shopId && selectedRowKeys.includes(item.itemId));
        const provisionalResult = filteredShopProducts.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
        return provisionalResult;
    }

    const handleShowPromotionModal = async () => {
        setShowPromotionModal(true);
        setLoadingPromotion(true);
        const result = await fetchPromotions();
        setPromotions(result.promotions);
        setPromotionDisplayList(result.promotionDisplayList);
        setLoadingPromotion(false);
        // console.log('after fetchPromotions');
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
            console.log("createOrderResponse", createOrderResponse.data);

            // When order next time, the access to payment page will be available
            paymentContext.setHasAccessedPaymentPage(false);

            if (paymentMethod === PaymentMethod.ZALOPAY) {
                paymentContext.setOrderIds(createOrderResponse.data.orderIds);
                router.push(createOrderResponse.data.order_url)
            }
            else {
                paymentContext.setOrderIds(createOrderResponse.data);
                router.push('/payment');
            }
        }
    }

    //transaction process
    const handleTransaction = async () => {
        console.log('Transaction processing...');

        //legacy
        // //if isSavingAddress checked
        // if (isSavingAddress) {
        //     console.log('currentAddress', currentAddress);
        //     const response = await POST_addUserShippingAddress(context.userInfo?._id as string, currentAddress);
        //     if (response.status === 200) {
        //         if (response.data) {
        //             const latestAddress: ShippingAddress = response.data[response.data.length - 1];
        //             setCurrentAddress(latestAddress);
        //             await handleCreateOrder(latestAddress);
        //         }
        //     }
        // }
        // else {
        //     await handleCreateOrder(currentAddress);
        // }

        const isNewShippingInfo = currentAddress._id === '@NEW_ADDRESS_FROM_USER'
        // if (isNewShippingInfo) {
        //     console.log('New shipping info, saving..');
        // }

        // console.log('currentAddress', currentAddress);
        const isCompleteFillingShippingInfo = isShippingAddressComplete(currentAddress);
        if (!isCompleteFillingShippingInfo) {
            message.error("Vui lòng kiểm tra Thông tin vận chuyển, hoặc chọn tử Sổ địa chỉ");
            return;
        }

        
        if (isNewShippingInfo) {
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
        console.log('fetch promotions function #start');
        const promotionList: PromotionDisplay[] = [];
        const promotions: PromotionType[] = [];
        for (const item of shopInfos!) {
            // Get selected products list
            const selectedProducts = products?.filter(product => selectedRowKeys.includes(product.itemId)) ?? [] as CartItem[]
            const selectedProductIds = new Set<string>();
            selectedProducts.forEach(item => selectedProductIds.add(item._id))

            const shopProductsProvisional = calculateShopProductsProvisional(item._id);
            const response = await GET_GetPromotionWithSelection(
                item._id,
                shopProductsProvisional,
                Array.from(selectedProductIds),
                true);
            if (response) promotionList.push(
                {
                    shopInfo: item,
                    promotions: response.data ?? []
                } as PromotionDisplay
            )
        }
        promotionList.forEach((item: PromotionDisplay) => {
            item.promotions.forEach((promotion: PromotionType) => {
                promotions.push(promotion);
            })
        })
        console.log('fetch promotions function #end', promotionList);
        return {
            promotions: promotions,
            promotionDisplayList: promotionList
        }
        // setPromotions(promotions);
        // setPromotionDisplayList(promotionList);
        // handleCodeFilter("");
        // setLoadingPromotion(false);
    }

    const handleCodeFilter = (value: string) => {
        setCurrentCode(value);
    }

    const fetchProducts = async () => {
        if (!context.userInfo) return;
        setLoading(true);
        console.log("current user", context.userInfo._id);
        await GET_getUserCartProducts(context.userInfo._id as string)
            .then(response => {
                let productsTimeSorted = response.data?.products;
                productsTimeSorted = productsTimeSorted?.reverse();
                
                setProducts(productsTimeSorted);
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
        const isInTheSameShop = selectedPromotions.find((item: PromotionType) => item.shop?._id === promotion.shop?._id);
        if (isInTheSameShop) {
            openWarningNotification("Giới hạn Áp dụng Mã sản phẩm cùng Cửa Hàng!", <></>);
        }
        else {
            openSuccessNotification("Áp dụng Mã giảm giá thành công!", <></>);
            let updatedDiscounts = [...selectedPromotions];
            updatedDiscounts.push(promotion);
            setSelectedPromotions(updatedDiscounts);

        }
    }

    const removeDiscount = (promotion: PromotionType) => {
        let updatedDiscounts = selectedPromotions.filter(discount => discount._id !== promotion._id)
        setSelectedPromotions(updatedDiscounts);
    }

    const calculateDirectPricePromotion = (provisional: number, value: number, lowerBound: number, upperBound: number) => {
        if (!!lowerBound) return (provisional >= lowerBound) ? value : 0;
        else if (!!upperBound !== undefined) return (provisional < upperBound) ? 0 : value;
    }

    const calculatePercentagePromotion = (provisional: number, value: number, upperBound: number) => {
        const discountValue = value * provisional / 100;
        if (upperBound === 0) return discountValue;
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
        // console.log('handleProvisional called', currentProvisional, selectedProducts);
        setProvisional(currentProvisional);

        //calc discount factor
        let totalDiscount = 0;
        selectedPromotions.forEach((item: PromotionType, key: React.Key) => {
            const shopProductsProvisional = calculateShopProductsProvisional(item.shop?._id as string);
            if (item.discountTypeInfo.type === (DiscountType.DIRECT_PRICE as string)) {

                if (item.discountTypeInfo.value) {
                    totalDiscount += calculateDirectPricePromotion(
                        shopProductsProvisional,
                        item.discountTypeInfo.value,
                        item.discountTypeInfo.lowerBoundaryForOrder,
                        item.discountTypeInfo.limitAmountToReduce) ?? 0;

                }
            }
            else if (item.discountTypeInfo.type === (DiscountType.PERCENTAGE as string)) {
                if (item.discountTypeInfo.value)
                    totalDiscount += calculatePercentagePromotion(
                        shopProductsProvisional,
                        item.discountTypeInfo.value,
                        item.discountTypeInfo.limitAmountToReduce);
            }
        })
        setDiscount(totalDiscount);
        // console.log('handleDiscount selectedPromotions', selectedPromotions);
        // console.log('handleDiscount called', discount);

        const totalValue = currentProvisional !== 0 ? currentProvisional - totalDiscount : 0;
        // console.log('handleTotalPrice called', totalValue);
        setTotal(totalValue);

    }

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
    }, [context.userInfo, products]);

    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            calculateCartPrices();
        }
    }, [context.userInfo, products, selectedRowKeys, selectedPromotions])

    useEffect(() => {
        const fetchRefreshPromotions = () => {
            setPromotions([]);
            setPromotionDisplayList([]);
        }
        fetchRefreshPromotions();
    }, [selectedRowKeys])

    useEffect(() => {
        const storedAddress = localStorage.getItem('shippingAddress');
        if (!storedAddress) return;
        const storedAddressObject = JSON.parse(storedAddress) as ShippingAddress;
        setCurrentAddress(storedAddressObject);
        console.log('currentAddress', storedAddressObject);
    }, []);

    // const goToShippingAddressPage = () => {
    //     localStorage.setItem('shippingAddress', JSON.stringify(currentAddress));
    // }

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
            {contextHolder}
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
                                                <div key={item.value} className={`border-2 rounded-xl cursor-pointer ${paymentMethod === item.value ? "border-[#9bb0e8]" : "border-gray-200"} mt-1 p-2`}>
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
                            <div className="text-3xl font-bold normal-case p-2">Giỏ hàng ({products?.length ?? 0})</div>
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
                                selectedProducts={selectedRowKeys}
                                openNotification={openWarningNotification}
                                showPromotionModal={handleShowPromotionModal}
                                selectedDiscounts={selectedPromotions}
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
            <PromotionListModal
                loading={loadingPromotion}
                open={showPromotionModal}
                currentCode={currentCode}
                handleCodeFilter={handleCodeFilter}
                handleOKPromotionModal={handleOKPromotionModal}
                handleCancelPromotionModal={handleCancelPromotionModal}
                queryPromotionList={queryPromotionList}
                selectedPromotions={selectedPromotions}
                applyDiscount={applyDiscount}
                removeDiscount={removeDiscount} />
        </React.Fragment>
    );
}
