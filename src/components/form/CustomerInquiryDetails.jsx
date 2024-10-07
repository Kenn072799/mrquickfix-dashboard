import React from "react";
import FormTitle from "../common/FormTitle";
import { MdOutlineClose } from "react-icons/md";

const CustomerInquiryDetails = ({ customer, onClose }) => {
  if (!customer) {
    return null;
  }

  return (
    <div className="relative mx-4 bg-white p-8 shadow-lg">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-5 flex justify-end"
      >
        <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
      </button>
      <div className="max-h-[500px] min-w-[290px] bg-white md:max-h-[600px] md:min-w-[500px] md:max-w-[500px]">
        <FormTitle>Client's Inquiry Details</FormTitle>
        <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
        <div className="mb-4 flex flex-col text-sm md:text-base">
          {/* First Name */}
          <span className="py-1 font-semibold">First Name:</span>
          <p className="bg-gray-200 p-2">{customer.firstName}</p>
          {/* Last Name */}
          <span className="py-1 font-semibold">Last Name: </span>
          <p className="bg-gray-200 p-2">{customer.lastName}</p>
          {/* Email */}
          <span className="py-1 font-semibold">Email:</span>
          <p className="bg-gray-200 p-2">{customer.email}</p>
          {/* Phone Number */}
          <span className="py-1 font-semibold">Phone Number:</span>
          <p className="bg-gray-200 p-2">{customer.phoneNumber}</p>
          {/* Message */}
          <span className="font-semibold">Message:</span>
          <p className="bg-gray-200 p-2">{customer.message}</p>
          {/* Date */}
          <span className="py-1 font-semibold">Date:</span>
          <p className="bg-gray-200 p-2">
            {new Date(customer.date).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInquiryDetails;
