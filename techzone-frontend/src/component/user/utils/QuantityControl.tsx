import { Space, Button, InputNumber, ConfigProvider } from "antd";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styled from 'styled-components';

interface QuantityControlProps {
    keyProp: React.Key,
    value: any,
    componentSize?: number, // default: 5
    minValue?: number, // default: 1
    maxValue?: number,  // default: 100
    defaultValue?: number,  // default: 1
    inputWidth?: number // default: 10
    onQuantityChange: (key: any, value: number) => void
    onIncrement: (key: any, value: number) => void
    onDecrement: (key: any, value: number) => void
}

//Using this component when rendering the list of items
//Sample configuration for onQuantityChange
// {
//     const onQuantityChange = (key: React.Key, value: number) => {
//         // Update the 'amount' field of the product with the specified key
//         if (!value) {
//             return;
//         }
//         if (products) {
//             const updatedProducts = products.map((product: { key: React.Key; }) => {
//                 if (product.key === key) {
//                     return { ...product, amount: value };
//                 }
//                 return product;
//             });
//             setProducts(updatedProducts);
//         }
//     }
// }

//Sample configuration for onIncrement
// {
//     const onIncrement = (key: React.Key, value: number) => {
//             console.log(`onIncrement`, key, value);
//             if (value === 100) return;
//             if (products) {
//                 const updatedProducts = products.map((product: { key: React.Key; }) => {
//                     if (product.key === key) {
//                         return { ...product, amount: value + 1 };
//                     }
//                     return product;
//                 });
//                 setProducts(updatedProducts);
//             }
//         }
// }

//Sample configuration for onIncrement
// const onDecrement = (key: React.Key, value: number) => {
//     if (value === 1) return handleShowDeleteOneModal(key)

//     if (products) {
//         const updatedProducts = products.map((product: { key: React.Key; }) => {
//             if (product.key === key) {
//                 return { ...product, amount: value - 1 };
//             }
//             return product;
//         });
//         setProducts(updatedProducts);
//     }
// }

const InputNumberWrapper = styled.div`
    .ant-input-number-input-wrap {
        padding: auto !important;
    }

    .ant-input-number-input-wrap > input.ant-input-number-input {
        text-align: center;
    }`

export const QuantityControl = (props: QuantityControlProps) => {

    return (
        <React.Fragment>
            <div className="relative w-24">
                <InputNumberWrapper>
                    <InputNumber
                        className="border-2 border-black rounded-3xl text-center"
                        min={props.minValue ?? 1}
                        max={props.maxValue ?? 99}
                        defaultValue={props.defaultValue ?? 1}
                        style=
                        {
                            {
                                width: "auto",
                            }
                        }
                        onChange={(value: any) =>
                            props.onQuantityChange(props.keyProp, value)}
                        value={props.value}
                        controls={false}
                        changeOnWheel
                    />
                </InputNumberWrapper>
                <Button type="text" shape="circle" className="absolute left-0 top-0.5" icon={<FaMinus />}
                    onClick={() => props.onDecrement(props.keyProp, props.value)} />
                <Button type="text" shape="circle" className="absolute right-0 top-0.5" icon={<FaPlus />}
                    onClick={() => props.onIncrement(props.keyProp, props.value)} />
            </div>
        </React.Fragment>
    )

}