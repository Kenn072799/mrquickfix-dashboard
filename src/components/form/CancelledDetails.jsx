import React from "react";
import { MdOutlineClose } from "react-icons/md";
import FormTitle from "../common/FormTitle";

const CancelledDetails = ({ item, onClose }) => {
  if (!item) {
    return null;
  }
  return (
    <div className="relative mx-4 bg-white p-8 shadow-lg">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 flex justify-end"
      >
        <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
      </button>
      <FormTitle>Cancelled Details</FormTitle>
      <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
      {/* Completed Details */}
      <div className="max-h-[500px] min-w-[290px] overflow-y-auto bg-white md:max-h-[600px] md:min-w-[500px] md:max-w-[500px]">
        <div className="mb-4 flex flex-col text-sm md:text-base">
          {/* First Name */}
          <span className="py-1 font-semibold">First Name:</span>
          <p className="rounded-md bg-gray-200 p-2">{item.firstName}</p>
          {/* Last Name */}
          <span className="py-1 font-semibold">Last Name:</span>
          <p className="rounded-md bg-gray-200 p-2">{item.lastName}</p>
          {/* Address */}
          <span className="py-1 font-semibold">Home Address:</span>
          <p className="rounded-md bg-gray-200 p-2">{item.address}</p>
          {/* Email */}
          <span className="py-1 font-semibold">Email Address:</span>
          <p className="rounded-md bg-gray-200 p-2">{item.email || "None"}</p>
          {/* Phone Number */}
          <span className="py-1 font-semibold">Phone Number:</span>
          <p className="rounded-md bg-gray-200 p-2">
            {item.phoneNumber || "None"}
          </p>
          {/* Type of Job */}
          <span className="py-1 font-semibold">Type of Job:</span>
          <p className="rounded-md bg-gray-200 p-2">{item.jobType}</p>
          {/* Services */}
          <span className="py-1 font-semibold">Services:</span>
          <p className="rounded-md bg-gray-200 p-2">
            {item.services.join(", ")}
          </p>
          {/* Quotation */}
          <span className="py-1 font-semibold">Quotation:</span>
          <p className="rounded-md bg-gray-200 p-2">
            {item.quotation ? (
              <a
                href={item.quotation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Quotation
              </a>
            ) : (
              "None"
            )}
          </p>

          {/* Cancel Date */}
          <span className="py-1 font-semibold">Cancelled Date:</span>
          <p className="rounded-md bg-gray-200 p-2">
            {new Date(item.cancelDate).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelledDetails;
