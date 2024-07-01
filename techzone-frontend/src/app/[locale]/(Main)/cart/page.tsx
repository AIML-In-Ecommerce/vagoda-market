"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Modal, Space, Table, Image, Tooltip, Skeleton, Select, Radio, Divider } from 'antd';
import type { RadioChangeEvent, TableColumnsType } from 'antd';
import { FaRegTrashCan, FaRegCircleQuestion } from "react-icons/fa6";
import { Currency } from "@/component/user/utils/CurrencyDisplay";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import { Address, AddressType } from "@/model/AddressType";
import Search from "antd/es/transfer/search";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import PromotionCard from "@/component/customer/product/PromotionCard";
import crypto from 'crypto';
import styled from 'styled-components'
import Link from "next/link";
import { RiContactsBookLine } from "react-icons/ri";
import DeliveryInfoForm from "@/component/customer/cart/DeliveryInfoForm";
import TransactionSection from "@/component/customer/cart/TransactionSection";
import PromotionSection from "@/component/customer/cart/PromotionSection";
import { Product, GET_getUserCartProducts, PUT_updateCartProduct, ColorAttribute, CartItem } from "@/apis/cart/CartProductAPI";
import { ShippingAddress } from "@/apis/cart/AddressAPI";
import { useRouter } from "next/navigation";
import { POST_processTransaction, PaymentMethod } from "@/apis/payment/PaymentAPI";
import { POST_createOrder } from "@/apis/order/OrderAPI";

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

const compareDateString = (dateString1: string, dateString2: string) => {
    return parseDateString(dateString1) <= parseDateString(dateString2) ? 1 : -1;
};

//Function for testing..
function generatePromotionCode(promotionName: string): string {
    // Create a hash object using SHA-256 algorithm
    const hash = crypto.createHash('sha256');

    // Update the hash object with the product name
    hash.update(promotionName);

    // Get the hexadecimal digest of the hash
    const hexDigest = hash.digest('hex');

    // Take the first 8 characters of the hexadecimal digest
    const hashedName = hexDigest.substring(0, 8);

    return hashedName;
}

const SelectWrapper = styled.div`
    .ant-select .ant-select-selector {
        border-radius: 20px;
        border-color: rgba(0, 0, 0);
        border-width: 2px;
    }

    .ant-select-dropdown {
            width: 100% !important;
    }

    .ant-select-dropdown-menu-item {
            width: 100%;
    }
`

interface CartTableItem extends CartItem {
    key: React.Key
}

export default function CartPage() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [products, setProducts] = useState<CartItem[]>();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)
    const [loading, setLoading] = useState(false);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shippingFee, setShippingFee] = useState(0);
    const [discounts, setDiscounts] = useState<PromotionType[]>([]);
    const [total, setTotal] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteManyModal, setShowDeleteManyModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.COD);
    const [isSavingAddress, setIsSavingAddress] = useState<boolean>(false);
    const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển"
    const router = useRouter();

    const initialAddress = {
        _id: "datn1",

    } as ShippingAddress;

    const [currentAddress, setCurrentAddress] = useState<ShippingAddress>(initialAddress);

    const handleShowDeleteOneModal = (key: any) => {
        setSelectedKey(key);
        setShowDeleteModal(true);
    }
    const handleDeleteOneModal = (key: any) => {
        handleRemoveRow(key);
        setShowDeleteModal(false);
    }
    const handleCancelOneModal = () => {
        setShowDeleteModal(false);
    }

    const handleShowDeleteManyModal = () => {
        setShowDeleteManyModal(true);
    }
    const handleDeleteManyModal = () => {
        handleRemoveSelectedRows();
        setShowDeleteManyModal(false);
    }
    const handleCancelManyModal = () => {
        setShowDeleteManyModal(false);
    }

    const handleShowPromotionModal = () => {
        setShowPromotionModal(true);
    }

    const handleCancelPromotionModal = () => {
        setShowPromotionModal(false);
    }

    //transaction process
    const handleTransaction = async () => {
        console.log('Transaction processing...');

        //Create order
        const createOrderResponse = await POST_createOrder(
            process.env.NEXT_PUBLIC_USER_ID as string, currentAddress._id, "", paymentMethod);

        //Direct call to transaction api
        const transactionResponse = await POST_processTransaction(
            process.env.NEXT_PUBLIC_USER_ID as string,
            products?.filter(item => selectedRowKeys.includes(item.itemId))!,
            total,
            paymentMethod
        );
        if (transactionResponse) {
            console.log('Navigating to gateway...', transactionResponse.data);
            transactionResponse.data ? router.push(transactionResponse.data) : router.push('/payment');
        }
    }

    const fetchPromotions = async () => {
        const data: PromotionType[] = [
            {
                _id: '1',
                name: "Giảm 50%",
                description: "Áp dụng cho thanh toán qua ví điện tử MoMo (tối đa 100k)",
                discountType: DiscountType.PERCENTAGE,
                discountValue: 50,
                quantity: 6,
                upperBound: 100000,
                expiredDate: formatDate(new Date('2024-05-30T12:30:00')), // 
                code: ""
            },
            {
                _id: '2',
                name: "Giảm 200k",
                description: "Áp dụng cho mọi đối tượng khách hàng (cho đơn tối thiểu 400k)",
                discountType: DiscountType.DIRECT_PRICE,
                discountValue: 200000,
                quantity: 20,
                lowerBound: 400000,
                expiredDate: formatDate(new Date('2024-06-27T12:30:00')),
                code: ""
            },
            {
                _id: '3',
                name: "Giảm 20%",
                description: "Áp dụng cho tất cả khách hàng (tối đa 50k)",
                discountType: DiscountType.PERCENTAGE,
                discountValue: 20,
                quantity: 15,
                upperBound: 50000,
                expiredDate: formatDate(new Date('2024-03-22T12:30:00')),
                code: ""
            },
            {
                _id: '4',
                name: "Giảm 50k",
                description: "Chỉ áp dụng cho khách hàng VIP",
                discountType: DiscountType.DIRECT_PRICE,
                discountValue: 50000,
                quantity: 10,
                lowerBound: 0,
                expiredDate: formatDate(new Date('2024-04-30T12:30:00')),
                code: ""
            },
            {
                _id: '5',
                name: "Giảm 10%",
                description: "Áp dụng cho thanh toán qua thẻ tín dụng (tối đa 50k)",
                discountType: DiscountType.PERCENTAGE,
                discountValue: 10,
                quantity: 8,
                upperBound: 50000,
                expiredDate: formatDate(new Date('2024-03-25T12:30:00')),
                code: ""
            }
        ]
        // Generate code for each promotion
        const fixedData: PromotionType[] = data.map((promotion: PromotionType) => { return { ...promotion, code: generatePromotionCode(promotion.description).toUpperCase() } })
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        setPromotions(fixedData);
    }

    const fetchProducts = async () => {
        await GET_getUserCartProducts(process.env.NEXT_PUBLIC_USER_ID as string)
            .then(response => setProducts(response.data?.products || undefined));
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        ;
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onQuantityChange = (key: React.Key, value: number) => {
        // Update the 'amount' field of the product with the specified key
        if (!value) {
            return;
        }
        if (products) {
            const updatedProducts = products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, quantity: value };
                }
                return item;
            });
            setProducts(updatedProducts);
        }
    }

    const onIncrement = async (key: React.Key, value: number) => {
        if (value === 100) return;
        if (products) {
            const updatedProducts = products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, quantity: value + 1 };
                }
                return item;
            });
            await PUT_updateCartProduct(process.env.NEXT_PUBLIC_USER_ID as string, updatedProducts);
            setProducts(updatedProducts);
        }
    }

    const onDecrement = async (key: React.Key, value: number) => {
        if (value === 1) {
            return handleShowDeleteOneModal(key);
        }

        if (products) {
            const updatedProducts = products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, quantity: value - 1 };
                }
                return item;
            });
            await PUT_updateCartProduct(process.env.NEXT_PUBLIC_USER_ID as string, updatedProducts);
            setProducts(updatedProducts);
        }
    }

    const handleRemoveRow = async (key: React.Key) => {
        if (products) {
            const updatedProducts = products.filter((item: CartItem) => item.itemId !== key);
            setProducts(updatedProducts);
            await PUT_updateCartProduct(process.env.NEXT_PUBLIC_USER_ID as string, updatedProducts);
        }
        const updatedRowKeys = selectedRowKeys.filter(beforeKey => beforeKey !== key);
        setSelectedRowKeys(updatedRowKeys);

    };

    const handleRemoveSelectedRows = () => {
        console.log('handleRemoveSelectedRows', selectedRowKeys)
        const updatedProducts = products!.filter((item: CartItem) => !selectedRowKeys.includes(item.itemId));
        setProducts(updatedProducts);
        selectedRowKeys.forEach(async (rowKey: React.Key) =>
            await PUT_updateCartProduct(process.env.NEXT_PUBLIC_USER_ID as string, updatedProducts))
        setSelectedRowKeys([]);
    };

    const handleColorChange = async (key: React.Key, colorValue: string) => {
        console.log("ATTRIBUTE_COLOR: ", colorValue);
        if (products) {
            const updatedProducts = products.map((item: CartItem) => {
                if (item.itemId === key) {
                    const colorAttribute = item.attribute.colors.find(item => item.color.value === colorValue)!;
                    console.log("ATTRIBUTE_COLOR_STRUCTURE: ", colorAttribute);
                    return { ...item, color: colorAttribute };
                }
                return item;
            });
            await PUT_updateCartProduct(process.env.NEXT_PUBLIC_USER_ID as string, updatedProducts);
            setProducts(updatedProducts);
        }
    }

    const handleSizeChange = async (key: React.Key, size: string) => {
        console.log("ATTRIBUTE_SIZE: ", size);
        if (products) {
            const updatedProducts = products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, size: size };
                }
                return item;
            });
            await PUT_updateCartProduct(process.env.NEXT_PUBLIC_USER_ID as string, updatedProducts);
            setProducts(updatedProducts);
        }
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
        if (discounts.length === 1) {
            alert("Giới hạn Áp dụng Mã Sản Phẩm!")
            return;
        }
        let updatedDiscounts = discounts.slice();
        updatedDiscounts.push(promotion);
        setDiscounts(updatedDiscounts);
    }

    const removeDiscount = (promotion: PromotionType) => {
        let updatedDiscounts = discounts.filter(discount => discount._id !== promotion._id)
        setDiscounts(updatedDiscounts);
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
        discounts.forEach((item: PromotionType) => {
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

    const columns: TableColumnsType<CartTableItem> = [
        {
            title: <div className="flex flex-row gap-1 items-center uppercase text-gray-400">
                <div className="text-base">Sản phẩm ({selectedRowKeys.length})</div>
                <Button type="text" onClick={() => handleShowDeleteManyModal()}>
                    <FaRegTrashCan />
                </Button>
            </div>,
            dataIndex: 'name',
            render: (text: string, record: CartItem) =>
                <Space align="start" size={12} className="flex flex-row">
                    {
                        loading ? <Skeleton.Image active /> :
                            <Image.PreviewGroup
                                items={record.images}>
                                <Image
                                    width={120}
                                    src={record.images ? record.images[0] : ""}
                                    alt={""} />
                            </Image.PreviewGroup>
                    }
                    {
                        loading ? <Skeleton paragraph={{ rows: 2 }
                        } active /> : (
                            <div className="flex flex-row">
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-bold text-ellipsis overflow-hidden">{record.name}</div>
                                    <div className="text-sm text-gray-500 mb-1">{record.color.color.label.toUpperCase()} / {record.size.toUpperCase()}</div>
                                    <SelectWrapper className="flex flex-row gap-2 mb-1">
                                        {
                                            (record.attribute.colors && record.attribute.colors.length !== 0) ? (
                                                <Select
                                                    labelInValue
                                                    value={record.color.color}
                                                    style={{ width: 100 }}
                                                    onChange={(e) => handleColorChange(record.itemId, e.value)}
                                                    options={record.attribute.colors.map((item) => {
                                                        return { value: item.color.value, label: item.color.label }
                                                    })}
                                                />
                                            ) : <></>
                                        }
                                        {
                                            (record.attribute.size && record.attribute.size.length !== 0) ? (
                                                <Select
                                                    value={record.size}
                                                    style={{ width: 75 }}
                                                    onChange={(e) => handleSizeChange(record.itemId, e)}
                                                    options={record.attribute.size.map((item) => {
                                                        return { value: item, label: item.toUpperCase() }
                                                    })}
                                                />
                                            ) : <></>

                                        }


                                    </SelectWrapper>
                                    <div style={{ width: 75 }} onClick={() => handleShowDeleteOneModal(record.itemId)}>
                                        <div className="flex flex-row cursor-pointer items-center gap-1 hover:font-semibold">
                                            <FaRegTrashCan /> Xóa
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </Space >,
            width: '65%',
            align: 'start' as const,
        },
        {
            title: <span className="text-base uppercase text-gray-400">Số lượng</span>,
            dataIndex: 'quantity',
            render: (value: number, record: CartItem) =>
                <div className="flex justify-center">
                    {
                        loading ? <Skeleton.Input active /> : (
                            <QuantityControl
                                keyProp={record.itemId} value={record.quantity}
                                minValue={1} maxValue={100} defaultValue={1}
                                inputWidth={75}
                                onIncrement={onIncrement}
                                onDecrement={onDecrement}
                                onQuantityChange={onQuantityChange}
                            />)
                    }
                </div>,
            width: '10%',
            align: 'center' as const,

        },
        {
            title: <span className="text-base uppercase text-gray-400">Thành tiền</span>,
            dataIndex: ['finalPrice', 'originalPrice'],
            render: (value: number, record: CartItem) => (
                loading ? <Skeleton.Input active /> : (
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-base line-through">
                            <Currency value={(record.originalPrice * (record.quantity || 1))}
                                locales={"vi-VN"}
                                currency={"VND"}
                                minimumFractionDigits={0} />
                        </span>
                        <span className="text-red-500 font-bold text-base">
                            <Currency value={(record.finalPrice * (record.quantity || 1))}
                                locales={"vi-VN"}
                                currency={"VND"}
                                minimumFractionDigits={0} />
                        </span>
                    </div>

                )
            ),
            width: '25%',
            align: 'center' as const,
        },
    ];

    useEffect(() => {
        setLoading(true);
        fetchProducts();
        fetchPromotions();
    }, [])

    useEffect(() => {
        handleProvisional();
        handleDiscount();
        // handleTotalPrice();
        console.log('UPDATE_CART', products);
    }, [products, selectedRowKeys, discounts])

    useEffect(() => {
        const storedAddress = localStorage.getItem('shippingAddress');
        if (!storedAddress) return;
        const storedAddressObject = JSON.parse(storedAddress) as ShippingAddress;
        setCurrentAddress(storedAddressObject);
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
                    <div className="lg:col-span-6 lg:w-auto w-full flex flex-col border-l-2 pl-3">
                        <div className="w-full">
                            <div className="text-3xl font-bold normal-case p-2">Giỏ hàng</div>
                            <Table
                                tableLayout='auto'
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,

                                }}
                                columns={columns}
                                dataSource={products?.map((item: CartItem) => ({ ...item, key: item.itemId } as CartTableItem))}
                                // onRow={(record) => ({
                                //         onClick: () => handleRowClick(record),
                                //       })}
                                loading={loading}
                                pagination={false}
                                scroll={{ x: 'min-content' }}
                            />
                            <Divider style={{ height: "auto", border: "0.25px solid silver" }}></Divider>

                            <PromotionSection
                                loading={loading}
                                showPromotionModal={handleShowPromotionModal}
                                selectedDiscounts={discounts}
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
                width={400}
                open={showDeleteModal}
                onCancel={handleCancelOneModal}
                title={<span className="text-xl">Xóa sản phẩm</span>}
                footer={() => (
                    <>
                        <Button key="cancel" onClick={handleCancelOneModal}>Hủy</Button>,
                        <Button key="ok" type="primary" onClick={() => handleDeleteOneModal(selectedKey)} danger>Xóa</Button>
                    </>
                )}
                centered
            >
                Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?
            </Modal>
            <Modal
                width={400}
                open={showDeleteManyModal}
                onCancel={handleCancelManyModal}
                title={<span className="text-xl">Xóa sản phẩm</span>}
                footer={() => (
                    <>
                        <Button key="cancel" onClick={handleCancelManyModal}>Hủy</Button>,
                        <Button key="ok" type="primary" onClick={handleDeleteManyModal} danger>Xóa</Button>
                    </>
                )}
                centered
            >
                Bạn có muốn xóa các sản phẩm đã chọn khỏi giỏ hàng không?
            </Modal>
            <Modal
                width={550}
                open={showPromotionModal}
                onCancel={handleCancelPromotionModal}
                title={<span className="text-xl">Techzone Khuyến Mãi</span>}
                footer={null}
                centered>
                {
                    <div className="flex flex-col">
                        <Space direction="vertical">
                            <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                                <Search placeholder="Nhập để tìm mã"></Search>
                                <Button className="bg-blue-500 font-semibold text-white">Áp dụng</Button>
                            </div>
                            <Card className="overflow-auto h-96">
                                {
                                    promotions.sort(
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
                                                isSelected={discounts.includes(item)}
                                                applyDiscount={applyDiscount}
                                                removeDiscount={removeDiscount} />
                                        )
                                    })
                                }
                            </Card>
                            <div className="my-5 flex flex-row justify-center items-center">
                                <div>Bạn đã chọn &nbsp;</div>
                                <div className={`${discounts.length > 0 ? "text-red-500" : ""} font-bold text-2xl`}>
                                    {discounts.length}
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
