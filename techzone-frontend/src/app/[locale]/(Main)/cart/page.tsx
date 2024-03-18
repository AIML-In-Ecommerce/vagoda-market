"use client";
import React, { useState, useEffect } from "react";
import { Affix, Button, Card, Divider, InputNumber, Modal, Radio, Space, Table, Tag, Image, Flex, Tooltip } from 'antd';
import type { TableColumnsType } from 'antd';
import { FaRegTrashCan, FaRegCircleQuestion } from "react-icons/fa6";
import { TiTicket } from "react-icons/ti";
import { Currency } from "@/component/user/utils/CurrencyDisplay";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import Link from "next/link";

interface DataType {
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

export default function CartPage() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [products, setProducts] = useState<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)
    const [loading, setLoading] = useState(false);
    const [top, setTop] = React.useState<number>(50);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteManyModal, setShowDeleteManyModal] = useState(false);
    const [showPromotionModal, setShowPromotionModal] = useState(false);
    const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển"

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

    const handleRowClick = (record: any) => {
        // Toggle selection for clicked row
        const selected = !selectedRowKeys.includes(record.key);
        const newSelectedRowKeys = selected
            ? [...selectedRowKeys, record.key]
            : selectedRowKeys.filter((key) => key !== record.key);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleProvisional = () => {
        const selectedProducts = products ? products.filter((product: { key: React.Key; }) => selectedRowKeys.includes(product.key)) : [];
        const provisional = selectedProducts ? selectedProducts.reduce((total: number, product: { unit_price: number; amount: any; }) => {
            return total + (product.unit_price * (product.amount || 1));
        }, 0) : 0;
        setProvisional(provisional);
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
        handleTotalPrice();
    }, [products, provisional, discount, total, selectedRowKeys])


    const isEmpty = (quantity: number) => {
        return quantity === 0 ? true : false;
    }

    return (
        <React.Fragment>
            <div className="container flex flex-col p-5 mx-auto">
                <div className="text-xl font-bold">GIỎ HÀNG</div>
                <div className="mt-5 flex lg:flex-row lg:grid lg:grid-cols-6 lg:gap-20 sm:flex-col">
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

                    <div className="lg:col-start-5 lg:col-span-2 lg:w-10/12">
                        <Affix offsetTop={top}>
                            <Space direction="vertical" size="middle" className="flex">
                                <Card title={
                                    <div className="flex flex-row justify-between">
                                        <span className="text-slate-400 text-lg">Giao tới</span>
                                        <Link className="text-sky-500 hover:text-blue-700 self-center" href={"/cart/shipping"}>
                                            Thay đổi
                                        </Link>
                                    </div>
                                } size="small">
                                    <div className="flex flex-row font-bold space-x-5">
                                        <p>NGUYỄN MINH QUANG</p>
                                        <Divider type="vertical" style={{ height: "auto", border: "0.25px solid silver" }}></Divider>
                                        <p className="mx-5">0839994855</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <span><Tag color="#87d068">Home</Tag></span>
                                        <p className="mx-3 text-slate-500">135B Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh</p>
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
                
            </Modal>

        </React.Fragment>
    );
}
