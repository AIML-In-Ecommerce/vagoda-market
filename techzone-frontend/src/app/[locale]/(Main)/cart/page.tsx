"use client";
import React, { useState, useEffect } from "react";
import { Affix, Button, Card, Divider, InputNumber, Modal, Radio, Space, Table, Tag, Image, Flex, Tooltip } from 'antd';
import type { TableColumnsType } from 'antd';
import { FaRegTrashCan, FaRegCircleQuestion } from "react-icons/fa6";
import { TiTicket } from "react-icons/ti";
import { Currency } from "@/component/user/utils/CurrencyDisplay";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import Link from "next/link";
import { AddressType } from "@/model/AddressType";
import { useRouter } from "next/navigation";
import TICKET_BG from "D:\\STUDY\\ĐỒ_ÁN_TỐT_NGHIỆP\\techzone-market\\techzone-frontend\\public\\asset\\coupon-png-206056.png"
import LOGO from "D:\\STUDY\\ĐỒ_ÁN_TỐT_NGHIỆP\\techzone-market\\techzone-frontend\\public\\asset\\logo.png"

type DataType = {
    key: React.Key;
    image: string;
    name: string;
    unit_price: number;
    amount?: number;
    final_price?: number;
}

enum DiscountType {
    PERCENTAGE,
    DIRECT_PRICE,
}

type Promotion = {
    _id: string,
    name: string,
    description: string
    discountType: DiscountType
    discountValue?: number
    quantity: number
    activeDate?: string
    expiredDate?: string
    // saleCategory: [ObjectId, ...]
    createdAt?: string
}

const promotions: Promotion[] = [
    {
        _id: '1',
        name: "Giảm 50% tối đa 100k",
        description: "Áp dụng cho thanh toán qua ví điện tử MoMo",
        discountType: DiscountType.PERCENTAGE,
        discountValue: 50,
        quantity: 6,
        expiredDate: new Date().toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) // 
    },
    {
        _id: '2',
        name: "Giảm 200k cho sản phẩm Màn hình",
        description: "Áp dụng cho mọi đối tượng khách hàng",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 200000,
        quantity: 20,
        expiredDate: new Date().toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
    {
        _id: '3',
        name: "Giảm 20% cho sản phẩm Điện thoại",
        description: "Áp dụng cho tất cả khách hàng",
        discountType: DiscountType.PERCENTAGE,
        discountValue: 20,
        quantity: 15,
        expiredDate: new Date().toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
    {
        _id: '4',
        name: "Giảm 50k cho sản phẩm Tai nghe",
        description: "Chỉ áp dụng cho khách hàng VIP",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 50000,
        quantity: 10,
        expiredDate: new Date().toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
    {
        _id: '5',
        name: "Giảm 10% tối đa 300k cho sản phẩm Laptop",
        description: "Áp dụng cho thanh toán qua thẻ tín dụng",
        discountType: DiscountType.PERCENTAGE,
        discountValue: 10,
        quantity: 8,
        expiredDate: new Date().toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

]


export default function CartPage() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [products, setProducts] = useState<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)
    const [loading, setLoading] = useState(false);
    const [top, setTop] = React.useState<number>(50);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discounts, setDiscounts] = useState<Promotion[]>([]);
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

    const fetchProducts = async () => {
        const data: DataType[] = [
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
                unit_price: 3090000,
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
            setSelectedRowKeys([]);
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

    const applyDiscount = (promotion: Promotion) => {
        let updatedDiscounts = discounts.slice();
        updatedDiscounts.push(promotion);
        setDiscounts(updatedDiscounts);
    }


    const handleProvisional = () => {
        const selectedProducts = products ? products.filter((product: { key: React.Key; }) => selectedRowKeys.includes(product.key)) : [];
        const provisional = selectedProducts ? selectedProducts.reduce((total: number, product: { unit_price: number; amount: any; }) => {
            return total + (product.unit_price * (product.amount || 1));
        }, 0) : 0;
        setProvisional(provisional);
    }

    const handleDiscount = () => {
        let totalDiscount = 0;
        discounts.forEach((item: Promotion) => {
            if (item.discountType === DiscountType.DIRECT_PRICE) {
                totalDiscount += item.discountValue ?? 0;
            }
            else if (item.discountType === DiscountType.PERCENTAGE) {
                totalDiscount += (item.discountValue ? item.discountValue * provisional / 100 : 0);
            }
        })
        setDiscount(totalDiscount);
    }

    const handleTotalPrice = () => {
        const total = provisional - discount;
        setTotal(total);
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: <span className="text-base">Sản phẩm ({selectedRowKeys.length})</span>,
            dataIndex: 'name',
            render: (text: string, record: DataType) =>
                <Space size={12} className="flex lg:flex-row flex-col lg:text-start text-center">
                    <Image
                        width={120}
                        src={record.image}
                        alt={""} />
                    <span className="text-sm font-normal">{text}</span>
                </Space>
        },
        {
            title: <span className="text-base">Đơn giá</span>,
            dataIndex: 'unit_price',
            render: (value: number) => <a className="text-base">
                <Currency value={value} />
            </a>,
        },
        {
            title: <span className="text-base">Số lượng</span>,
            dataIndex: 'amount',
            render: (value: number, record: DataType) =>
                <QuantityControl componentSize={5} keyProp={record.key} value={value}
                    minValue={1} maxValue={100} defaultValue={1}
                    inputWidth={75}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onQuantityChange={onQuantityChange}
                />

        },
        {
            title: <span className="text-base">Thành tiền</span>,
            dataIndex: 'final_price',
            render: (value: number, record: DataType) => (
                <span className="text-red-500 font-bold text-base ">
                    <Currency value={(record.unit_price * (record.amount || 1))}
                        locales={"vi-VN"}
                        currency={"VND"}
                        minimumFractionDigits={0} />
                </span>
            ),
            width: "16%"
        },
        {
            title:
                <Button onClick={() => handleShowDeleteManyModal()}>
                    <FaRegTrashCan />
                </Button>,
            dataIndex: 'remove',
            render: (value: number, record: DataType) => (
                <Button onClick={() => handleShowDeleteOneModal(record.key)}><FaRegTrashCan /></Button>
            ),
            fixed: 'right'
        },
    ];

    useEffect(() => {
        setLoading(true);
        fetchProducts();
    }, [])

    useEffect(() => {
        handleProvisional();
        handleDiscount();
        handleTotalPrice();
    }, [products, provisional, discount, total, selectedRowKeys])

    useEffect(() => {
        const storedAddress = localStorage.getItem('shippingAddress');
        if (!storedAddress) return;
        setCurrentAddress(JSON.parse(storedAddress) as AddressType);
    }, []);

    const isEmpty = (quantity: number) => {
        return quantity === 0 ? true : false;
    }

    const goToShippingAddressPage = () => {
        localStorage.setItem('shippingAddress', JSON.stringify(currentAddress));
    }

    return (
        <React.Fragment>
            <div className="container flex flex-col p-5 mx-auto">
                <div className="text-xl font-bold">GIỎ HÀNG</div>
                <div className="mt-5 flex xs:flex-col sm:flex-col md:flex-col lg:flex-row lg:grid lg:grid-cols-6 space-x-20">
                    <div className="col-start-1 col-span-4 border rounded-lg lg:mb-0 mb-10">
                        <Table
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

                        />
                    </div>

                    <div className="col-start-1 lg:col-start-5 lg:col-span-2 lg:w-10/12">
                        <Affix offsetTop={top}>
                            <Space direction="vertical" size="middle" className="flex">
                                <Card title={
                                    <div className="flex flex-row justify-between">
                                        <span className="text-slate-400 text-lg">Giao tới</span>
                                        <Link className="text-sky-500 hover:text-blue-700 self-center" href={"/cart/shipping"}
                                            onClick={goToShippingAddressPage}>
                                            Thay đổi
                                        </Link>
                                    </div>
                                } size="small">
                                    <div className="flex flex-row font-bold space-x-5">
                                        <p className="lg:text-base text-sm uppercase">{currentAddress.receiverName}</p>
                                        <Divider type="vertical" style={{ height: "auto", border: "0.25px solid silver" }}></Divider>
                                        <p className="lg:text-base text-sm lg:mx-5">{currentAddress.phoneNumber}</p>
                                    </div>
                                    <div>
                                        {currentAddress.addressType === "residential" ?
                                            <span><Tag color="#87d068">Nhà</Tag></span> :
                                            <span><Tag color="#b168d0">Văn phòng</Tag></span>
                                        }
                                        <span className="mx-2 text-slate-500">{currentAddress.address}</span>
                                    </div>
                                </Card>
                                <Card size="small">
                                    <div className="flex flex-col">
                                        <div className="flex flex-row justify-between">
                                            <div className="font-semibold">Techzone Khuyến Mãi</div>
                                            <div className="flex flex-row space-x-2">
                                                <div className="text-slate-500">Có thể chọn 2</div>
                                                <Tooltip placement="bottom" title={promotion_help}>
                                                    <div className="text-slate-500"><FaRegCircleQuestion /></div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="mt-10 flex gap-2 text-sky-500 hover:text-blue-700 font-semibold"
                                            onClick={() => handleShowPromotionModal()}>
                                            <TiTicket className="text-lg self-center" />
                                            <div>Chọn hoặc nhập Khuyến mãi khác</div>
                                        </div>
                                    </div>
                                </Card>
                                <Card size="small">
                                    <div className="flex justify-between">
                                        <p>Tạm tính</p>
                                        <Currency value={provisional}
                                            locales={"vi-VN"}
                                            currency={"VND"}
                                            minimumFractionDigits={0} />
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Giảm giá</p>
                                        <p>- <Currency value={discount}
                                            locales={"vi-VN"}
                                            currency={"VND"}
                                            minimumFractionDigits={0} /></p>
                                    </div>
                                    <Divider></Divider>
                                    <div className="flex justify-between">
                                        <p>Tổng tiền</p>
                                        <p className="flex flex-col space-y-3 grid">
                                            <p className="text-red-400 text-lg font-bold justify-self-end">
                                                <Currency value={total}
                                                    locales={"vi-VN"}
                                                    currency={"VND"}
                                                    minimumFractionDigits={0} /></p>
                                            <p className="text-slate-400 text-base justify-self-end">(Đã bao gồm VAT nếu có)</p>
                                        </p>

                                    </div>
                                </Card>
                                <Button type="primary" size="large" danger block
                                    disabled={isEmpty(selectedRowKeys.length)}>
                                    Mua Hàng ({selectedRowKeys.length})
                                </Button>
                            </Space>
                        </Affix>
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
                width={600}
                open={showPromotionModal}
                onCancel={handleCancelPromotionModal}
                title={<span className="text-xl">Techzone Khuyến Mãi</span>}
                footer={null}
                centered
            >
                {
                    <div className="flex flex-col mt-2">
                        <Space direction="vertical">
                            {
                                promotions.map(item => {
                                    return <Card className="my-5 w-full h-full bg-[#F0F8FF]"
                                        
                                        style={{
                                            backgroundImage: `url(${TICKET_BG.src})`,
                                            backgroundSize: "100% 100%"
                                        }}>
                                        <div className="grid grid-cols-10">
                                            <img className="z-10 row-span-3 col-span-2" alt="logo" src={LOGO.src}></img>
                                            <div className="z-10 col-start-4 col-span-7 text-2xl font-semibold">{item.name}</div>
                                            {/* <div className="z-10 col-start-1 col-span-2 text-center font-bold">TechZone</div> */}
                                            <div className="z-10 col-start-4 col-span-7 text-base">&nbsp;</div>
                                            <div className="z-10 col-start-4 col-span-7 text-lg">{item.description}</div>
                                            <div className="z-10 col-start-4 col-span-7 text-base">&nbsp;</div>
                                            <div className="z-10 col-start-4 col-span-5 text-base">HSD: {item.expiredDate}</div>
                                            <div className="z-10 col-start-9 col-span-2 text-base">
                                                <Button className="w-full bg-sky-500 text-white font-semibold" onClick={() => applyDiscount(item)}>
                                                    Áp dụng
                                                </Button>
                                            </div>
                                        </div>

                                    </Card>
                                })
                            }
                        </Space>
                    </div>
                }
            </Modal>

        </React.Fragment>
    );
}
