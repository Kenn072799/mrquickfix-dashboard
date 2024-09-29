import React, { useState, useRef, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import Button from "../common/Button";
import FormTitle from "../common/FormTitle";
import useCategories from "../hooks/function/useCategories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddJobOrderForm = ({ onClose }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    jobType: "",
    admin: "",
    inspectionDate: "",
    startDate: "",
    endDate: "",
  });
  const [quotationUploaded, setQuotationUploaded] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const { selectedCategories, handleCategorySelect } = useCategories();

  const allCategories = [
    "Fits-outs",
    "Electrical Works",
    "Kitchen and Bath Renovation",
    "Aircon Services",
    "Door and Window Repairs",
    "Outdoor and Landscaping",
    "Household Cleaning Services",
  ];

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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setQuotationUploaded(true);
    } else {
      setQuotationUploaded(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);

    toast.success("Job order submitted successfully!");
  };

  return (
    <div
      ref={formRef}
      className="max-h-[500px] max-w-[350px] overflow-y-auto bg-white p-8 shadow-lg md:max-h-[600px] md:max-w-[500px]"
    >
      <form className="relative" onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-4 -top-5 flex justify-end"
        >
          <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
        </button>
        <FormTitle className="text-xl font-bold">Job Order Form</FormTitle>
        <div className="my-4 h-[1px] w-full bg-secondary-500"></div>

        <div className="flex w-full gap-2">
          <div className="flex w-full flex-col">
            <label className="w-full text-sm font-semibold">
              First Name:<span className="text-red-500">*</span>
            </label>
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
            <label className="w-full text-sm font-semibold">
              Last Name:<span className="text-red-500">*</span>
            </label>
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
          <label className="w-full text-sm font-semibold">
            Home Address:<span className="text-red-500">*</span>
          </label>
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
        {/* Type of Job */}
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
        {/* Category Type of Job */}
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
            className="w-full border p-2 outline-none"
            onChange={handleFileChange}
          />
        </div>

        {/* Start Date && End Date */}
        <div className="flex items-center justify-center gap-2">
          <div className="mt-2 flex w-full flex-col">
            <label className="w-full text-sm font-semibold">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
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
              value={formData.endDate}
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
            value={formData.admin}
            onChange={handleInputChange}
            className="w-full border p-2 outline-none"
          >
            <option value="" disabled>
              Admin
            </option>
            <option value="Kenneth Altes">Kenneth Altes</option>
            <option value="Another Admin">Another Admin</option>
            <option value="Admin 3">Admin 3</option>
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
        <label className="w-full text-sm font-semibold">Inspection Date:</label>
        <input
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleInputChange}
          className="w-full border p-2 outline-none"
        />

        <div className="flex gap-4 py-4">
          <Button variant="submit" size="sm" type="submit">
            Proceed
          </Button>
          <Button variant="cancel" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddJobOrderForm;
