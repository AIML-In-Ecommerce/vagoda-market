import React from "react";

interface AddressInfoItemProps {
  receiver: string;
  phoneNumber: string;
  address: string;
}
export default function AddressInfoItem(props: AddressInfoItemProps) {
  return (
    <div className="space-y-1 ">
      <div className="flex space-x-2">
        <p>
          <span className="font-semibold">{props.receiver}</span>
          <span> |</span>{" "}
        </p>
        <p> {props.phoneNumber}</p>
      </div>

      <p> {props.address}</p>
    </div>
  );
}
