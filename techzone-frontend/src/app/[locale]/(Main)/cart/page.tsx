"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Modal, Space, Table, Image, Tooltip, Skeleton, Select } from 'antd';
import type { TableColumnsType } from 'antd';
import { FaRegTrashCan, FaRegCircleQuestion } from "react-icons/fa6";
import { Currency } from "@/component/user/utils/CurrencyDisplay";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import { AddressType } from "@/model/AddressType";
import Search from "antd/es/transfer/search";
import FloatingCartSummary from "@/component/customer/product/FloatingCartSummary";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import PromotionCard from "@/component/customer/product/PromotionCard";
import crypto from 'crypto';
import styled from 'styled-components'

type CartPageType = {
    key: React.Key;
    image: string;
    name: string;
    unit_price: number;

    amount?: number;
    final_price?: number;
}

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
`

export default function CartPage() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [products, setProducts] = useState<any>(null);
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)
    const [loading, setLoading] = useState(false);
    const [top, setTop] = React.useState<number>(50);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discounts, setDiscounts] = useState<PromotionType[]>([]);
    const [total, setTotal] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteManyModal, setShowDeleteManyModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển"

    const [currentAddress, setCurrentAddress] = useState<AddressType>({
        _id: '1',
        receiverName: 'Nguyễn Minh Quang',
        address: "135B Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Việt Nam",
        phoneNumber: "0839994856",
        addressType: "residential",
        selectedAsDefault: true
    });

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
                expiredDate: formatDate(new Date('2024-03-24T12:30:00')), // 
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
                expiredDate: formatDate(new Date('2024-03-27T12:30:00')),
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
        const data: CartPageType[] = [
            {
                key: '1',
                image: 'https://akko.vn/wp-content/uploads/2023/07/3098-RF-Dracula-Castle-01.png',
                name: 'Bàn phím AKKO 3098 RF Dracula Castle Akko Switch V3 Cream Yellow',
                unit_price: 1690000,
                amount: 1

            },
            {
                key: '2',
                image: 'https://product.hstatic.net/200000722513/product/gearvn-man-hinh-e-dra-egm25f100-25-ips-100hz-1_1ac2962172cc4030a2a09485eac87191_1024x1024.jpg',
                name: 'Màn hình E-DRA EGM25F100 25" IPS 100Hz',
                unit_price: 2190000,
                amount: 1
            },
            {
                key: '3',
                image: 'https://product.hstatic.net/200000722513/product/g502x-plus-gallery-2-white_69229c9ba5534ad5bfae7d827037a28f_365394a31b6342e4949249099adb755e_1024x1024.png',
                name: 'Chuột Logitech G502 X Plus LightSpeed White',
                unit_price: 309000,
                amount: 1
            },
            {
                key: '4',
                image: 'https://product.hstatic.net/200000722513/product/54078_ghe_cong_thai_hoc_edra_eec219_black_4_e9645318c0814037b24162c5d2d767b9_1024x1024.jpg',
                name: 'Ghế công thái học E-Dra EEC219',
                unit_price: 2590000,
                amount: 1
            },
            {
                key: '5',
                image: 'https://product.hstatic.net/200000722513/product/hinh-1_2735fbceb0a14ddb955bdf64b63e45b7_ac360205755f44648b50ec4bcf0a7fcd_1024x1024.gif',
                name: 'Tai nghe Corsair HS55 Wireless Core Black (CA-9011290-AP)',
                unit_price: 1540000,
                amount: 1
            },

        ];
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        setProducts(data);
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
            const updatedProducts = products.map((product: { key: React.Key; }) => {
                if (product.key === key) {
                    return { ...product, amount: value };
                }
                return product;
            });
            setProducts(updatedProducts);
        }
    }

    const onIncrement = (key: React.Key, value: number) => {
        if (value === 100) return;
        if (products) {
            const updatedProducts = products.map((product: { key: React.Key; }) => {
                if (product.key === key) {
                    return { ...product, amount: value + 1 };
                }
                return product;
            });
            setProducts(updatedProducts);
        }
    }

    const onDecrement = (key: React.Key, value: number) => {
        if (value === 1) return handleShowDeleteOneModal(key)

        if (products) {
            const updatedProducts = products.map((product: { key: React.Key; }) => {
                if (product.key === key) {
                    return { ...product, amount: value - 1 };
                }
                return product;
            });
            setProducts(updatedProducts);
        }
    }

    const handleRemoveRow = (key: React.Key) => {
        if (products) {
            const updatedProducts = products.filter((product: { key: React.Key; }) => product.key !== key);
            setProducts(updatedProducts);
        }
        const updatedRowKeys = selectedRowKeys.filter(beforeKey => beforeKey !== key);
        setSelectedRowKeys(updatedRowKeys);

    };

    const handleRemoveSelectedRows = () => {
        console.log('handleRemoveSelectedRows', selectedRowKeys)
        const updatedProducts = products.filter((product: { key: React.Key; }) => !selectedRowKeys.includes(product.key));
        setProducts(updatedProducts);
        setSelectedRowKeys([]);
    };

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
        const selectedProducts = products ? products.filter((product: { key: React.Key; }) => selectedRowKeys.includes(product.key)) : [];
        const provisional = selectedProducts ? selectedProducts.reduce((total: number, product: { unit_price: number; amount: any; }) => {
            return total + (product.unit_price * (product.amount || 1));
        }, 0) : 0;
        setProvisional(provisional);
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
        const total = provisional !== 0 ? provisional - discount : 0;
        setTotal(total);
    }

    const columns: TableColumnsType<CartPageType> = [
        {
            title: <div className="flex flex-row gap-1 items-center uppercase text-gray-400">
                <div className="text-base">Sản phẩm ({selectedRowKeys.length})</div>
                <Button type="text" onClick={() => handleShowDeleteManyModal()}>
                    <FaRegTrashCan />
                </Button>
            </div>,
            dataIndex: ['name'],
            render: (text: string, record: CartPageType, index: number) =>
                <Space align="start" size={12} className="flex flex-row">
                    {
                        loading ? <Skeleton.Image active /> :
                            <Image
                                width={120}
                                src={record.image}
                                alt={""} />
                    }
                    {
                        loading ? <Skeleton paragraph={{ rows: 2 }
                        } active /> : (
                            <div className="flex flex-row">
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-bold text-ellipsis overflow-hidden">{record.name}</div>
                                    <div className="text-sm text-gray-500 mb-1">Category1 / Category2</div>
                                    <SelectWrapper className="flex flex-row gap-2 mb-1">
                                        <Select
                                            defaultValue="yellow"
                                            style={{ width: 75 }}
                                            // onChange={handleChange}
                                            options={[
                                                { value: 'red', label: 'Đỏ' },
                                                { value: 'green', label: 'Xanh' },
                                                { value: 'yellow', label: 'Vàng' },
                                            ]}
                                        />
                                        <Select
                                            defaultValue="red"
                                            style={{ width: 75 }}
                                            // onChange={handleChange}
                                            options={[
                                                { value: 'red', label: 'Đỏ' },
                                                { value: 'green', label: 'Xanh' },
                                                { value: 'yellow', label: 'Vàng' },
                                            ]}
                                        />
                                    </SelectWrapper>
                                    <div style={{ width: 75 }} onClick={() => handleShowDeleteOneModal(record.key)}>
                                        <div className="flex flex-row items-center gap-1 hover:font-semibold">
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
            dataIndex: 'amount',
            render: (value: number, record: CartPageType) =>
                <div className="flex justify-center">
                    {
                        loading ? <Skeleton.Input active /> : (
                            <QuantityControl
                                keyProp={record.key} value={value}
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
            dataIndex: 'final_price',
            render: (value: number, record: CartPageType) => (
                loading ? <Skeleton.Input active /> : (
                    <span className="text-red-500 font-bold text-base ">
                        <Currency value={(record.unit_price * (record.amount || 1))}
                            locales={"vi-VN"}
                            currency={"VND"}
                            minimumFractionDigits={0} />
                    </span>)
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
        handleTotalPrice();
    }, [products, provisional, discount, total, selectedRowKeys, discounts])

    useEffect(() => {
        const storedAddress = localStorage.getItem('shippingAddress');
        if (!storedAddress) return;
        setCurrentAddress(JSON.parse(storedAddress) as AddressType);
    }, []);



    const goToShippingAddressPage = () => {
        localStorage.setItem('shippingAddress', JSON.stringify(currentAddress));
    }

    return (
        <React.Fragment>
            <div className="container flex flex-col p-5 mx-auto my-5">
                <div className="mt-5 flex xs:flex-col sm:flex-col md:flex-col lg:grid lg:grid-cols-6 gap-2 relative">
                    <div className="lg:col-start-1 lg:col-span-3 lg:mb-0 mb-10">
                        <div className="text-2xl font-bold normal-case p-2">Thông tin vận chuyển</div>
                    </div>

                    <div className="lg:col-start-4 lg:col-span-3 lg:w-auto w-full flex flex-col border-l-2 pl-3">
                        {/* <FloatingCartSummary
                            goToShippingAddressPage={goToShippingAddressPage}
                            loading={loading} selectedRowKeys={selectedRowKeys}
                            provisional={provisional} discount={discount} total={total}
                            currentAddress={currentAddress}
                            showPromotionModal={handleShowPromotionModal}
                        /> */}
                        
                        <div className="text-2xl font-bold normal-case p-2">Giỏ hàng</div>
                        <Table
                            tableLayout='auto'
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,

                            }}
                            columns={columns}
                            dataSource={products}
                            // onRow={(record) => ({
                            //         onClick: () => handleRowClick(record),
                            //       })}
                            loading={loading}
                            pagination={{ pageSize: 4 }}
                            scroll={{ x: 'min-content' }}

                        />
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
                                        return (
                                            <PromotionCard
                                                key={item._id}
                                                item={item}
                                                promotions={discounts}
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
