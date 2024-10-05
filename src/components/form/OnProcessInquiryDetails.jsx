import React, { useState } from "react";
import FormTitle from "../common/FormTitle";
import { MdOutlineClose } from "react-icons/md";
import { jsPDF } from "jspdf";

const downloadPDF = (item) => {
  const doc = new jsPDF({
    format: "a4",
  });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  const CompanyName = "Mr. Quick Fix | Project";
  const title = "Inspection Schedule";

  // Company Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const CompanyNameWidth = doc.getTextWidth(CompanyName);
  doc.text((pageWidth - CompanyNameWidth) / 2, 20, CompanyName);

  // Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  const titleWidth = doc.getTextWidth(title);
  doc.text((pageWidth - titleWidth) / 2, 30, title);

  // Divider line under the title
  doc.setLineWidth(0.5);
  doc.line(20, 40, pageWidth - 20, 40);

  // Status
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(20, 50, "Status:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 55, "On Process");

  // Client Details
  // First Name
  doc.setFont("helvetica", "bold");
  doc.text(20, 65, "First Name:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 70, item.firstName);

  // Last Name
  doc.setFont("helvetica", "bold");
  doc.text(20, 80, "Last Name:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 85, item.lastName);

  // Address
  doc.setFont("helvetica", "bold");
  doc.text(20, 95, "Address:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 100, item.address);

  // Email
  doc.setFont("helvetica", "bold");
  doc.text(20, 110, "Email:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 115, item.email || "None");

  // Phone Number
  doc.setFont("helvetica", "bold");
  doc.text(20, 125, "Phone Number:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 130, item.phoneNumber || "None");

  // Type of Job
  doc.setFont("helvetica", "bold");
  doc.text(20, 140, "Type of Job:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 145, item.jobType);

  // Services
  doc.setFont("helvetica", "bold");
  doc.text(20, 155, "Services:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 160, item.services.join(", "));

  // Inspection Schedule
  doc.setFont("helvetica", "bold");
  doc.text(20, 170, "Inspection Schedule:");
  doc.setFont("helvetica", "normal");
  doc.text(20, 175, new Date(item.inspectionDate).toLocaleDateString());

  // Save the PDF
  doc.save(`${item.firstName}_${item.lastName}_details.pdf`);
};

const OnProcessInquiryDetails = ({ item, onClose }) => {
  const [showMenu, setShowMenu] = useState(false);

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
      <FormTitle>On Process Details</FormTitle>
      <div className="my-4 h-[1px] w-full bg-secondary-500"></div>

      {/* Menu for CSV and PDF Download */}
      <div className="absolute right-8 top-12">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-xs text-blue-500 hover:underline md:text-sm"
        >
          Download details
        </button>

        {showMenu && (
          <div className="absolute right-0 w-32 rounded-md border bg-white shadow-lg">
            <ul className="text-sm text-gray-700">
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => downloadPDF(item)}
              >
                Download PDF
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Inquiry Details */}
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
          {/* Inspection Schedule */}
          <span className="py-1 font-semibold">Inspection Schedule:</span>
          <p className="rounded-md bg-gray-200 p-2">
            {new Date(item.inspectionDate).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnProcessInquiryDetails;
