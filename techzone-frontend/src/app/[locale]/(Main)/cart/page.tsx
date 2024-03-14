"use client";
import React, { useState, useEffect } from "react";
import { Affix, Button, Card, Divider, InputNumber, Modal, Radio, Space, Table, Tag, Image } from 'antd';
import type { TableColumnsType } from 'antd';
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

interface DataType {
    key: React.Key;
    image: string;
    name: string;
    unit_price: number;
    amount?: number;
    final_price?: number;
}


export default function Home() {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [products, setProducts] = useState<any>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedKey, setSelectedKey] = useState<React.Key | null>(null)
    const [loading, setLoading] = useState(false);
    const [top, setTop] = React.useState<number>(10);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteManyModal, setShowDeleteManyModal] = useState(false);

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

    const onIncrease = (key: React.Key, value: number) => {
        // Update the 'amount' field of the product
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

    const onDecrease = (key: React.Key, value: number) => {
        // Update the 'amount' field of the produc
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
            title: <span className="text-lg">Sản phẩm ({selectedRowKeys.length})</span>,
            dataIndex: 'name',
            render: (text: string, record: DataType) =>
                <Space size={12} className="flex">
                    <Image
                        width={160}
                        src={record.image}
                        alt={""} />
                    <span className="text-lg font-normal">{text}</span>

                </Space>


        },
        {
            title: <span className="text-lg">Đơn giá</span>,
            dataIndex: 'unit_price',
            render: (value: number) => <a className="text-lg">
                {value.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                })}</a>,
        },
        {
            title: <span className="text-lg">Số lượng</span>,
            dataIndex: 'amount',
            render: (value: number, record: DataType) =>
                <Space size={5} className="flex">
                    <Button onClick={() => onDecrease(record.key, value)}>
                        <FaMinus />
                    </Button>
                    <InputNumber
                        className="w-16 justify-center"
                        controls={false}
                        min={1}
                        max={100}
                        defaultValue={1}
                        width={10}
                        onChange={(value: any) =>
                            onQuantityChange(record.key, value)}
                        value={value} />
                    <Button onClick={() => onIncrease(record.key, value)}>
                        <FaPlus />
                    </Button>
                </Space>

        },
        {
            title: <span className="text-lg">Thành tiền</span>,
            dataIndex: 'final_price',
            render: (value: number, record: DataType) => (
                <span className="text-red-500 font-bold text-lg ">
                    {(record.unit_price * (record.amount || 1)).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                    })}
                </span>
            ),
            width: "16%"
        },
        {
            title:
                <Button onClick={() => handleShowDeleteManyModal()}>
                    <FaRegTrashAlt />
                </Button>,
            dataIndex: 'remove',
            render: (value: number, record: DataType) => (
                <Button onClick={() => handleShowDeleteOneModal(record.key)}><FaRegTrashAlt /></Button>
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
                    <div className="col-start-1 col-span-4">
                        <Table
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }}
                            columns={columns}
                            dataSource={products}
                            loading={loading}

                        />
                    </div>

                    <div className="lg:col-start-5 lg:col-span-2">
                        <Affix offsetTop={top}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Card title="Giao tới" size="small">
                                    <div className="flex flex-row font-bold">
                                        <p>NGUYEN MINH QUANG</p>
                                        <Divider type="vertical"></Divider>
                                        <p className="mx-5">0839994855</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <span><Tag color="#87d068">Home</Tag></span>
                                        <p className="mx-3 text-slate-500">135B Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh</p>
                                    </div>
                                </Card>
                                <Card title="Techzone khuyến mãi" size="small">
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                                <Card size="small">
                                    <div className="flex text-lg justify-between">
                                        <p>Tạm tính</p>
                                        <p>{provisional.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                            minimumFractionDigits: 0,
                                        })}</p>
                                    </div>
                                    <div className="flex text-lg justify-between">
                                        <p>Giảm giá</p>
                                        <p>- {discount.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                            minimumFractionDigits: 0,
                                        })}</p>
                                    </div>
                                    <Divider></Divider>
                                    <div className="flex text-lg justify-between">
                                        <p>Tổng tiền</p>
                                        <p className="flex flex-col space-y-3 grid">
                                            <p className="text-red-400 text-xl font-bold justify-self-end">
                                                {total.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                    minimumFractionDigits: 0,
                                                })}</p>
                                            <p className="text-slate-400 text-lg justify-self-end">(Đã bao gồm VAT nếu có)</p>
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
        </React.Fragment>
    );
}
