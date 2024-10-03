import React, { useRef, useEffect, useState } from "react";
import Button from "../common/Button";
import { MdOutlineClose } from "react-icons/md";
import FormTitle from "../common/FormTitle";
import useCategories from "../hooks/function/useCategories";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormState from "../hooks/function/useFormState";

const CustomerInquiryForm = ({ onClose }) => {
  const formRef = useRef(null);
  const { formData, handleInputChange } = useFormState();
  const [quotationUploaded, setQuotationUploaded] = useState(false);

  const handleFileChange = (e) => {
    setQuotationUploaded(e.target.files.length > 0);
  };

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

  const allCategories = [
    "Fits-outs",
    "Electrical Works",
    "Kitchen and Bath Renovation",
    "Aircon Services",
    "Door and Window Repairs",
    "Outdoor and Landscaping",
    "Household Cleaning Services",
  ];

  const {
    selectedCategories,
    showCategoryDropdown,
    toggleCategoryDropdown,
    handleCategorySelect,
  } = useCategories();

  const allAdmins = ["Kenneth Altes", "Admin 2", "Admin 3"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileInput = document.querySelector('input[type="file"]');
    fileInput?.files[0];

    console.log("Form Data Submitted:", formData);

    toast.success("Submitted successfully!");
    onClose();
  };

  return (
    <div className="relative mx-4 bg-white p-8 shadow-lg">
      <button
        onClick={onClose}
        className="absolute right-4 top-5 flex justify-end"
      >
        <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
      </button>
      <FormTitle>Client's Inquiry Form</FormTitle>
      <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
      <div
        ref={formRef}
        className="max-h-[500px] max-w-[350px] overflow-y-auto bg-white md:max-h-[600px] md:max-w-[500px]"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex w-full gap-2">
            {/* First Name */}
            <div className="flex w-full flex-col">
              <label className="w-full text-sm font-semibold">
                First Name:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                onChange={handleInputChange}
                className="w-full border p-2 outline-none"
              />
            </div>
            {/* Last Name */}
            <div className="flex w-full flex-col">
              <label className="w-full text-sm font-semibold">
                Last Name:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                onChange={handleInputChange}
                className="w-full border p-2 outline-none"
              />
            </div>
          </div>

          {/* Home Address */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Home Address:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              required
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>

          {/* Email Address */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phoneNumber"
              maxLength={11}
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>

          {/* Type of Job */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Type of Job:</label>
            <select
              name="jobType"
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Type of Job
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

          {/* Quotation */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Quotation:</label>
            <input
              type="file"
              name="quotation"
              accept=".pdf"
              className="w-full border p-2 outline-none"
              onChange={handleFileChange}
            />
          </div>

          {/* Start Date && End Date */}
          <div className="flex items-center justify-center gap-2">
            <div className="mt-2 flex w-full flex-col">
              <label className="w-full text-sm font-semibold">
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleInputChange}
                className="w-full border p-2 outline-none"
                disabled={!quotationUploaded}
              />
            </div>
            <div className="mt-2 flex w-full flex-col">
              <label className="w-full text-sm font-semibold">End Date:</label>
              <input
                type="date"
                name="endDate"
                onChange={handleInputChange}
                className="w-full border p-2 outline-none"
                disabled={!quotationUploaded}
              />
            </div>
          </div>

          {/* Admin */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Admin:</label>
            <select
              id="admin"
              name="admin"
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

          {/* Schedule Inspection */}
          <div className="mx-auto flex items-center justify-center py-4 text-center">
            <div className="mb-2 mt-4 h-[1px] w-full bg-secondary-500"></div>
            <p className="w-full px-2 text-sm font-semibold text-red-500">
              Schedule Inspection
            </p>
            <div className="mb-2 mt-4 h-[1px] w-full bg-secondary-500"></div>
          </div>

          <label className="w-full text-sm font-semibold">
            Inspection Date:
          </label>
          <input
            type="date"
            name="inspectionDate"
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          />

          {/* Buttons */}
          <div className="py-4">
            <Button variant="submit" size="sm" type="submit">
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInquiryForm;
