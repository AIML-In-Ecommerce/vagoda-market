"use client";
import { Input, Modal, Radio, RadioChangeEvent, Space } from "antd";
import React, { useState } from "react";
import AddressInfoItem from "./AddressInfoItem";

interface AddressModalProps {
  isVisible: boolean;
  setIsModalVisible: (show: boolean) => void;
}
export default function AddressModal(props: AddressModalProps) {
  const [value, setValue] = useState(1);
  const addresses = [
    {
      receiver: "John Doe",
      phoneNumber: "123456789",
      address: "123 Main Street, City, Country",
    },
    {
      receiver: "Jane Smith",
      phoneNumber: "987654321",
      address: "456 Elm Street, Town, Country",
    },
    {
      receiver: "Alice Johnson",
      phoneNumber: "555555555",
      address: "789 Oak Street, Village, Country",
    },
  ];
  const [addressList, setAddressList] = useState(addresses);

  const handleOk = () => {
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <Modal
        title="Delivery address"
        open={props.isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className=" justify-center "
        okType={"default"}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {addressList.map((address, index) => (
              <Radio value={index}>
                <AddressInfoItem
                  receiver={address.receiver}
                  phoneNumber={address.phoneNumber}
                  address={address.address}
                />
              </Radio>
            ))}{" "}
            <Radio value={4}>
              More...
              {value === 4 ? (
                <Input style={{ width: 100, marginLeft: 10 }} />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
}
