"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Card, Modal, Space, Image, Tooltip, Skeleton, Radio, Divider, Spin } from 'antd';
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
import { ShippingAddress } from "@/apis/cart/AddressAPI";
import { useRouter } from "next/navigation";
import { PaymentMethod } from "@/apis/payment/PaymentAPI";
import { POST_createOrder } from "@/apis/order/OrderAPI";
import { GET_GetAllPromotionByShopId, Promotion } from "@/apis/cart/promotion/PromotionAPI";
import { GET_GetShop } from "@/apis/shop/ShopAPI";
import { SearchProps } from "antd/es/input";
import CartTable from "@/component/customer/cart/CartTable";

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
    promotions: Promotion[]
}

export default function CartPage() {
    const [products, setProducts] = useState<CartItem[]>();
    const [shopInfos, setShopInfos] = useState<ShopInfo[]>();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [promotionDisplayList, setPromotionDisplayList] = useState<PromotionDisplay[]>();
    const [currentCode, setCurrentCode] = useState<string>("");
    const [queryPromotionList, setQueryPromotionList] = useState<PromotionDisplay[]>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);
    const [loading, setLoading] = useState(false);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [selectedPromotions, setSelectedPromotions] = useState<PromotionType[]>([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [total, setTotal] = useState(0);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
    const [isSavingAddress, setIsSavingAddress] = useState<boolean>(false);
    const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển"
    const router = useRouter();

    const [currentAddress, setCurrentAddress] = useState<ShippingAddress>({
        _id: 'datn'
    } as ShippingAddress);

    const filterShopName = (shopId: string) => {
        const shopName = shopInfos!.find(shopInfo => shopInfo._id === shopId)!.name;
        return shopName;
    }

    const fetchShopInfos = (products: CartItem[]) => {
        const shopInfosList: ShopInfo[] = [];
        const shopIdList: string[] = [];
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

    useEffect(() => {
        if (products) {
            setLoading(true);
            fetchShopInfos(products);
            setLoading(false);
        }
    }, [products]);

    useEffect(() => {
        console.log('ShopInfos', shopInfos);
        router.refresh();
    }, [shopInfos]);

    const handleShowPromotionModal = () => {
        setShowPromotionModal(true);
    }

    const handleCancelPromotionModal = () => {
        setShowPromotionModal(false);
    }

    //transaction process
    const handleTransaction = async () => {
        console.log('Transaction processing...');

        //Create order, response gateway url and transaction
        const createOrderResponse = await POST_createOrder(
            process.env.NEXT_PUBLIC_USER_ID as string, 
            currentAddress._id, 
            selectedPromotions.map((item => item._id)), 
            selectedRowKeys.map(item => item.toString()), paymentMethod);
        if (createOrderResponse) {
            console.log('Navigating to gateway...', createOrderResponse.data.order_url);
            if (paymentMethod === PaymentMethod.ZALOPAY) {
                router.push(createOrderResponse.data.order_url)
            }
            else { router.push('/payment') }
        }

        //Direct call to transaction api
        // const transactionResponse = await POST_processTransaction(
        //     process.env.NEXT_PUBLIC_USER_ID as string,
        //     products?.filter(item => selectedRowKeys.includes(item.itemId))!,
        //     total,
        //     paymentMethod
        // );
        // if (transactionResponse) {
        //     console.log('Navigating to gateway...', transactionResponse.data);
        //     transactionResponse.data ? router.push(transactionResponse.data) : router.push('/payment');
        // }
        // 
    }

    const fetchPromotions = async (shopInfos: ShopInfo[]) => {
        // const data: PromotionType[] = [
        //     {
        //         _id: '1',
        //         name: "Giảm 50%",
        //         description: "Áp dụng cho thanh toán qua ví điện tử MoMo (tối đa 100k)",
        //         discountType: DiscountType.PERCENTAGE,
        //         discountValue: 50,
        //         quantity: 6,
        //         upperBound: 100000,
        //         expiredDate: formatDate(new Date('2024-05-30T12:30:00')), // 
        //         code: ""
        //     },
        //     {
        //         _id: '2',
        //         name: "Giảm 200k",
        //         description: "Áp dụng cho mọi đối tượng khách hàng (cho đơn tối thiểu 400k)",
        //         discountType: DiscountType.DIRECT_PRICE,
        //         discountValue: 200000,
        //         quantity: 20,
        //         lowerBound: 400000,
        //         expiredDate: formatDate(new Date('2024-07-27T12:30:00')),
        //         code: ""
        //     },
        //     {
        //         _id: '3',
        //         name: "Giảm 20%",
        //         description: "Áp dụng cho tất cả khách hàng (tối đa 50k)",
        //         discountType: DiscountType.PERCENTAGE,
        //         discountValue: 20,
        //         quantity: 15,
        //         upperBound: 50000,
        //         expiredDate: formatDate(new Date('2024-07-22T12:30:00')),
        //         code: ""
        //     },
        //     {
        //         _id: '4',
        //         name: "Giảm 50k",
        //         description: "Chỉ áp dụng cho khách hàng VIP",
        //         discountType: DiscountType.DIRECT_PRICE,
        //         discountValue: 50000,
        //         quantity: 10,
        //         lowerBound: 0,
        //         expiredDate: formatDate(new Date('2024-07-30T12:30:00')),
        //         code: ""
        //     },
        //     {
        //         _id: '5',
        //         name: "Giảm 10%",
        //         description: "Áp dụng cho thanh toán qua thẻ tín dụng (tối đa 50k)",
        //         discountType: DiscountType.PERCENTAGE,
        //         discountValue: 10,
        //         quantity: 8,
        //         upperBound: 50000,
        //         expiredDate: formatDate(new Date('2024-03-25T12:30:00')),
        //         code: ""
        //     }
        // ]
        // // Generate code for each promotion
        // const fixedData: PromotionType[] = data.map((promotion: PromotionType) => { return { ...promotion, code: generatePromotionCode(promotion.description).toUpperCase() } })
        // setTimeout(() => {
        //     setLoading(false);
        // }, 1000);
        // setPromotions(fixedData);

        const promotionList: PromotionDisplay[] = [];
        const promotions: PromotionType[] = [];
        shopInfos.forEach(async (item: ShopInfo) => {
            const response = await GET_GetAllPromotionByShopId(item._id);
            if (response) promotionList.push(
                {
                    shopInfo: item,
                    promotions: response.data
                } as PromotionDisplay
            )
        })
        setPromotionDisplayList(promotionList);
        promotionList.forEach((item: PromotionDisplay) => {
            item.promotions.forEach((promotion: Promotion) => {
                const convertedPromotion = {
                    _id: promotion._id,
                    name: promotion.name,
                    description: promotion.description,
                    discountType: promotion.discountTypeInfo.type as unknown as DiscountType,
                    discountValue: promotion.discountTypeInfo.value,
                    upperBound: promotion.discountTypeInfo?.limitAmountToReduce,
                    lowerBound: promotion.discountTypeInfo.lowerBoundaryForOrder,
                    quantity: promotion.quantity,
                    activeDate: formatDate(new Date(promotion.activeDate)),
                    expiredDate: formatDate(new Date(promotion.expiredDate)),
                    createdAt: formatDate(new Date(promotion.createAt)),
                    code: promotion.code,
                } as PromotionType
                promotions.push(convertedPromotion);
            })
        })
        setPromotions(promotions);
        console.log('promotions', promotionList);

    }

    const handleCodeFilter: SearchProps['onSearch'] = (value, _e, info) => {
        setCurrentCode(value);
        const resultQueryList: PromotionDisplay[] = [];
        promotionDisplayList?.forEach(item => {
            const shopCodeFilterResult = item.promotions.filter(promotion => promotion.code.toUpperCase().includes(value.toUpperCase()));
            resultQueryList.push({
                ...item,
                promotions: shopCodeFilterResult
            } as PromotionDisplay)
        })
        setQueryPromotionList(resultQueryList);
    }

    useEffect(() => {

    }, [currentCode])

    const fetchProducts = async () => {
        await GET_getUserCartProducts(process.env.NEXT_PUBLIC_USER_ID as string)
            .then(response => setProducts(response.data?.products || undefined));
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
        if (selectedPromotions.length === 2) {
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

    const handleProvisional = () => {
        const selectedProducts = products ? products.filter((item: CartItem) => selectedRowKeys.includes(item.itemId)) : [];
        const provisional = selectedProducts ? selectedProducts.reduce((total: number, item: CartItem) => {
            return total + (item.finalPrice * (item.quantity || 1));
        }, 0) : 0;
        console.log('handleProvisional called', provisional, selectedProducts);
        setProvisional(provisional);
        const total = provisional !== 0 ? provisional - discount : 0;
        setTotal(total);
    }

    const calculateDirectPricePromotion = (value: number, lowerBound: number, upperBound: number) => {
        if (!!lowerBound) return (provisional >= lowerBound) ? value : 0;
        else if (!!upperBound !== undefined) return (provisional < upperBound) ? 0 : value;
    }

    const calculatePercentagePromotion = (value: number, upperBound: number) => {
        const discountValue = value * provisional / 100;
        return (!!upperBound && (discountValue <= upperBound)) ? discountValue : upperBound;
    }

    const handleDiscount = () => {
        let totalDiscount = 0;
        selectedPromotions.forEach((item: PromotionType) => {
            if (item.discountType === DiscountType.DIRECT_PRICE) {
                if (item.discountValue)
                    totalDiscount += calculateDirectPricePromotion(item.discountValue, item.lowerBound!, item.upperBound!) ?? 0;
            }
            else if (item.discountType === DiscountType.PERCENTAGE) {
                if (item.discountValue)
                    totalDiscount += calculatePercentagePromotion(item.discountValue, item.upperBound!);
            }
        })
        setDiscount(totalDiscount);
    }

    const handleTotalPrice = () => {
        // console.log('handleTotalPrice called', provisional);
        const total = provisional !== 0 ? provisional - discount : 0;
        setTotal(total);
    }

    useEffect(() => {
        setLoading(true);
        fetchProducts();
        setLoading(false);
    }, [])

    useEffect(() => {
        if (shopInfos)
            fetchPromotions(shopInfos);
    }, [shopInfos])

    useEffect(() => {
        handleProvisional();
        handleDiscount();
        // handleTotalPrice();
        console.log('UPDATE_CART', products);
    }, [products, selectedRowKeys, selectedPromotions])

    useEffect(() => {
        setLoading(false);
        const storedAddress = localStorage.getItem('shippingAddress');
        if (!storedAddress) return;
        const storedAddressObject = JSON.parse(storedAddress) as ShippingAddress;
        setCurrentAddress(storedAddressObject);
        setLoading(true);
        console.log('currentAddress', storedAddressObject);
    }, []);

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
        {
            label: 'Thanh toán qua Paypal',
            description: "Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)",
            value: PaymentMethod.PAYPAL,
            icon: "https://cdn.iconscout.com/icon/free/png-256/free-paypal-58-711793.png"
        },
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
                onCancel={handleCancelPromotionModal}
                title={<span className="text-xl">Các Khuyến Mãi</span>}
                footer={null}
                centered>
                {
                    <div className="flex flex-col">
                        <Space direction="vertical">
                            <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                                <Search placeholder="Nhập để tìm mã"
                                    allowClear
                                    onSearch={handleCodeFilter}></Search>
                                <Button className="bg-blue-500 font-semibold text-white"
                                    onClick={() => handleCodeFilter(currentCode)}>Áp dụng</Button>
                            </div>
                            <div className="overflow-auto h-96">
                                {
                                    loading ? <Spin /> : queryPromotionList?.map((item: PromotionDisplay) => {
                                        return (
                                            <Card key={item.shopInfo._id} title={<div className="font-semibold">{item.shopInfo.name}</div>}>
                                                <div className="flex flex-col gap-5 mx-3">
                                                    {
                                                        item.promotions.sort(
                                                            (a, b) => (a.expiredDate! >= b.expiredDate! ? -1 : 1)
                                                        ).map(item => {
                                                            const convertedPromotion = {
                                                                _id: item._id,
                                                                name: item.name,
                                                                description: item.description,
                                                                discountType: item.discountTypeInfo.type as unknown as DiscountType,
                                                                discountValue: item.discountTypeInfo.value,
                                                                upperBound: item.discountTypeInfo?.limitAmountToReduce,
                                                                lowerBound: item.discountTypeInfo.lowerBoundaryForOrder,
                                                                quantity: item.quantity,
                                                                activeDate: formatDate(new Date(item.activeDate)),
                                                                expiredDate: formatDate(new Date(item.expiredDate)),
                                                                createdAt: formatDate(new Date(item.createAt)),
                                                                code: item.code,
                                                            } as PromotionType

                                                            const isExpiredPromotion = (item: PromotionType) => {
                                                                return parseDateString(item.expiredDate!) <= new Date();
                                                            }
                                                            if (isExpiredPromotion(convertedPromotion)) return;
                                                            return (
                                                                <PromotionCard
                                                                    key={convertedPromotion._id}
                                                                    item={convertedPromotion}
                                                                    isSelected={selectedPromotions.includes(convertedPromotion)}
                                                                    applyDiscount={applyDiscount}
                                                                    removeDiscount={removeDiscount} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Card>
                                        )
                                    })
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
