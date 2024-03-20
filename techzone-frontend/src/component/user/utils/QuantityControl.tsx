import { Space, Button, InputNumber, ConfigProvider } from "antd";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

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



export const QuantityControl = (props: QuantityControlProps) => {

    return (
        <React.Fragment>
            <Space size={props.componentSize ?? 5} className="flex">
                <Button onClick={() => props.onDecrement(props.keyProp, props.value)}>
                    <FaMinus />
                </Button>
                <InputNumber
                    min={props.minValue ?? 1}
                    max={props.maxValue ?? 100}
                    defaultValue={props.defaultValue ?? 1}
                    style=
                    {
                        {
                            width: props.inputWidth ? `${props.inputWidth}px` : `auto`,
                            justifyContent: 'center',
                            textAlign: 'center',
                        }
                    }
                    onChange={(value: any) =>
                        props.onQuantityChange(props.keyProp, value)}
                    value={props.value}
                    controls={false}
                    changeOnWheel
                />
                <Button onClick={() => props.onIncrement(props.keyProp, props.value)}>
                    <FaPlus />
                </Button>
            </Space>
        </React.Fragment>
    )

}