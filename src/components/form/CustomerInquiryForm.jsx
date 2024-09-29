import React, { useRef, useEffect } from "react";
import Button from "../common/Button";
import { MdOutlineClose } from "react-icons/md";
import useFormState from "../hooks/function/useFormState";
import useCategoryDropdown from "../hooks/function/useCatetogyDropdown";
import FormTitle from "../common/FormTitle";

const CustomerInquiryForm = ({ existingData, onClose }) => {
  const formRef = useRef(null);

  const { formData, handleInputChange } = useFormState(existingData);
  const {
    selectedCategories,
    showCategoryDropdown,
    toggleCategoryDropdown,
    handleCategorySelect,
  } = useCategoryDropdown(existingData?.categories);

  const allCategories = [
    "Fits-outs",
    "Electrical Works",
    "Kitchen and Bath Renovation",
    "Aircon Services",
    "Door and Window Repairs",
    "Outdoor and Landscaping",
    "Household Cleaning Services",
  ];

  const allAdmins = ["Kenneth Altes", "Admin 2", "Admin 3"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={formRef}
      className="max-h-[500px] max-w-[350px] overflow-y-auto bg-white p-8 shadow-lg md:max-h-[600px] md:max-w-full"
    >
      <form className="relative">
        <button
          onClick={onClose}
          className="absolute -right-4 -top-5 flex justify-end"
        >
          <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
        </button>
        <FormTitle className="text-xl font-bold">
          Client's Inquiry Form
        </FormTitle>
        <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
        <div className="flex w-full gap-2">
          <div className="flex w-full flex-col">
            <label className="w-full text-sm font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              required={true}
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>
          <div className="flex w-full flex-col">
            <label className="w-full text-sm font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              required={true}
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>
        </div>
        <div className="mt-2">
          <label className="w-full text-sm font-semibold">Home Address:</label>
          <input
            type="text"
            name="address"
            required={true}
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          />
        </div>
        <div className="mt-2">
          <label className="w-full text-sm font-semibold">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          />
        </div>
        <div className="mt-2">
          <label className="w-full text-sm font-semibold">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            maxLength={11}
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          />
        </div>
        {/* Category Type of Job */}
        <div className="mt-2">
          <label className="w-full text-sm font-semibold">Type of Job:</label>
          <select
            id="jobtype"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          >
            <option value="" disabled>
              Type of job
            </option>
            <option value="Repair">Repair</option>
            <option value="Preventive Maintenance Services">
              Preventive Maintenance Services (PMS)
            </option>
            <option value="Renovation">Renovation</option>
          </select>
        </div>
        {/* Category Dropdown */}
        <div className="relative mt-2">
          <label className="w-full text-sm font-semibold">Services:</label>
          <div
            className="w-full cursor-pointer border p-2"
            onClick={toggleCategoryDropdown}
          >
            <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedCategories.length > 0
                ? selectedCategories.join(", ")
                : "Select Categories"}
            </span>
          </div>
          {showCategoryDropdown && (
            <div className="absolute z-10 max-h-40 max-w-full overflow-hidden overflow-y-auto border border-t-0 bg-white">
              {allCategories.map((category) => (
                <label key={category} className="flex items-center p-1">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategorySelect(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Admin */}
        <div className="mt-2">
          <label className="w-full text-sm font-semibold">Admin:</label>
          <select
            id="admin"
            name="admin"
            value={formData.admin}
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          >
            <option value="" disabled>
              Admin
            </option>
            {allAdmins.map((admin) => (
              <option key={admin} value={admin}>
                {admin}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
            <label className="w-full text-sm font-semibold">Quoation:</label>
            <input type="file" className="w-full border p-2 outline-none"/>
        </div>

        {/* For not simple job */}
        <div className="mx-auto flex items-center justify-center py-4 text-center">
          <div className="mb-2 mt-4 h-[1px] w-full bg-secondary-500"></div>
          <p className="w-full text-sm px-2 font-semibold text-red-500">
            Schedule Inspection
          </p>
          <div className="mb-2 mt-4 h-[1px] w-full bg-secondary-500"></div>
        </div>
        {/* Date Input */}
        <label className="relative w-full text-sm font-semibold">
          Inspection Date:
        </label>
        <input
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleInputChange}
          className="w-full border p-2 outline-none"
        />
      </form>

      {/* Button */}
      <div className="flex gap-4 py-4">
        <Button variant="submit" size="sm">
          Proceed
        </Button>
        <Button variant="cancel" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CustomerInquiryForm;
