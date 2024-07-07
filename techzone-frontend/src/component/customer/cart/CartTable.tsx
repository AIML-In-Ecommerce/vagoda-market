"use client";
import { CartItem, PUT_updateCartProduct } from '@/apis/cart/CartProductAPI';
import { Currency } from '@/component/user/utils/CurrencyDisplay';
import { QuantityControl } from '@/component/user/utils/QuantityControl';
import { AuthContext } from '@/context/AuthContext';
import { Button, Modal, Image, Select, Skeleton, Space, Table, TableColumnsType } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { BsShop } from 'react-icons/bs';
import { FaRegTrashCan } from 'react-icons/fa6';
import styled from 'styled-components';

interface CartTableProps {
    products: any;
    setProducts: (products: any) => void;
    loading: boolean;
    selectedRowKeys: React.Key[];
    setSelectedRowKeys: (keys: React.Key[]) => void;
    selectedKey: React.Key | null;
    setSelectedKey: (key: React.Key | null) => void;
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

export default function CartTable(props: CartTableProps) {
    const context = useContext(AuthContext);
    const router = useRouter();
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteManyModal, setShowDeleteManyModal] = useState(false);
    const selectedRowKeys = useMemo(() => {
        return props.selectedRowKeys;
    }, [props.selectedRowKeys])

    //load userInfo context
    useEffect(() => {
        
    }, [context.userInfo])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        props.setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleShowDeleteOneModal = (key: any) => {
        props.setSelectedKey(key);
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

    const onQuantityChange = (key: React.Key, value: number) => {
        // Update the 'amount' field of the product with the specified key
        if (!value) {
            return;
        }
        if (props.products) {
            const updatedProducts = props.products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, quantity: value };
                }
                return item;
            });
            props.setProducts(updatedProducts);
        }
    }

    const onIncrement = async (key: React.Key, value: number) => {
        if (value === 100) return;
        if (props.products) {
            const updatedProducts = props.products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, quantity: value + 1 };
                }
                return item;
            });
            await PUT_updateCartProduct(context.userInfo?._id as string, updatedProducts);
            props.setProducts(updatedProducts);
        }
    }

    const onDecrement = async (key: React.Key, value: number) => {
        if (value === 1) {
            return handleShowDeleteOneModal(key);
        }

        if (props.products) {
            const updatedProducts = props.products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, quantity: value - 1 };
                }
                return item;
            });
            await PUT_updateCartProduct(context.userInfo?._id as string, updatedProducts);
            props.setProducts(updatedProducts);
        }
    }

    const handleRemoveRow = async (key: React.Key) => {
        if (props.products) {
            const updatedProducts = props.products.filter((item: CartItem) => item.itemId !== key);
            props.setProducts(updatedProducts);
            await PUT_updateCartProduct(context.userInfo?._id as string, updatedProducts);
        }
        const updatedRowKeys = props.selectedRowKeys.filter(beforeKey => beforeKey !== key);
        props.setSelectedRowKeys(updatedRowKeys);

    };

    const handleRemoveSelectedRows = () => {
        console.log('handleRemoveSelectedRows', props.selectedRowKeys)
        const updatedProducts = props.products!.filter((item: CartItem) => !props.selectedRowKeys.includes(item.itemId));
        props.setProducts(updatedProducts);
        props.selectedRowKeys.forEach(async (rowKey: React.Key) =>
            await PUT_updateCartProduct(context.userInfo?._id as string, updatedProducts))
        props.setSelectedRowKeys([]);
    };

    const handleColorChange = async (key: React.Key, colorValue: string) => {
        console.log("ATTRIBUTE_COLOR: ", colorValue);
        if (props.products) {
            const updatedProducts = props.products.map((item: CartItem) => {
                if (item.itemId === key) {
                    const colorAttribute = item.attribute.colors.find(item => item.color.value === colorValue)!;
                    console.log("ATTRIBUTE_COLOR_STRUCTURE: ", colorAttribute);
                    return { ...item, color: colorAttribute };
                }
                return item;
            });
            await PUT_updateCartProduct(context.userInfo?._id as string, updatedProducts);
            props.setProducts(updatedProducts);
        }
    }

    const handleSizeChange = async (key: React.Key, size: string) => {
        console.log("ATTRIBUTE_SIZE: ", size);
        if (props.products) {
            const updatedProducts = props.products.map((item: CartItem) => {
                if (item.itemId === key) {
                    return { ...item, size: size };
                }
                return item;
            });
            await PUT_updateCartProduct(context.userInfo?._id as string, updatedProducts);
            props.setProducts(updatedProducts);
        }
    }

    const navigateToProductDetail = (productId: string) => {
        router.push(`/product/${productId}`)
    }

    const columns: TableColumnsType<CartTableItem> = [
        {
            title: <div className="flex flex-row gap-1 items-center uppercase text-gray-400">
                <div className="text-base">Sản phẩm ({props.selectedRowKeys.length})</div>
                <Button type="text" onClick={() => handleShowDeleteManyModal()}>
                    <FaRegTrashCan />
                </Button>
            </div>,
            dataIndex: 'name',
            render: (text: string, record: CartItem) =>
                <Space align="start" size={12} className="flex flex-row">
                    {
                        props.loading ? <Skeleton.Image active /> :
                            <>
                                {
                                    record.color ? <Image
                                        width={120}
                                        src={record.color.link}
                                        alt={""} /> : <Image.PreviewGroup
                                            items={record.images}>
                                        <Image
                                            width={120}
                                            src={record.images ? record.images[0] : ""}
                                            alt={""} />
                                    </Image.PreviewGroup>
                                }
                            </>

                    }
                    {
                        props.loading ? <Skeleton paragraph={{ rows: 2 }
                        } active /> : (
                            <div className="flex flex-row">
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-bold cursor-pointer hover:text-sky-500 text-ellipsis overflow-hidden"
                                        onClick={() => navigateToProductDetail(record._id)}>{record.name}</div>
                                    {/* <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-1">
                                        <BsShop />
                                        <div>{record.shop}</div>
                                    </div> */}
                                    <div className="text-sm text-gray-500 mb-1">
                                        {record.color?.color.label.toUpperCase() ?? ""} {record.size ? "/" : ""} {record.size ? record.size.toUpperCase() : ""}
                                    </div>
                                    <SelectWrapper className="flex flex-row gap-2 mb-1">
                                        {
                                            (record.attribute.colors && record.attribute.colors.length !== 0) ? (
                                                <Select
                                                    labelInValue
                                                    value={record.color ? record.color.color : record.attribute.colors[0].color }
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
                                                    value={record.size ? record.size : record.attribute.size[0] }
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
                        props.loading ? <Skeleton.Input active /> : (
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
                props.loading ? <Skeleton.Input active /> : (
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

    return (
        <React.Fragment>
            <Table
                tableLayout='auto'
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,

                }}
                columns={columns}
                dataSource={props.products?.map((item: CartItem) => ({ ...item, key: item.itemId } as CartTableItem))}
                // onRow={(record) => ({
                //         onClick: () => handleRowClick(record),
                //       })}
                loading={props.loading}
                pagination={false}
                scroll={{ x: 'min-content' }}
            />
            <Modal
                width={400}
                open={showDeleteModal}
                onCancel={handleCancelOneModal}
                title={<span className="text-xl">Xóa sản phẩm</span>}
                footer={() => (
                    <>
                        <Button key="cancel" onClick={handleCancelOneModal}>Hủy</Button>,
                        <Button key="ok" type="primary" onClick={() => handleDeleteOneModal(props.selectedKey)} danger>Xóa</Button>
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
    )
}
