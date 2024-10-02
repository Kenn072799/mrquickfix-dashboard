import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaClockRotateLeft } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import OnProcessForm from "../form/OnProcessForm";
import CancelPopUp from "../common/popup/CancelPopUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOnProcessData } from "../hooks/useDataHooks";

const OnProcessTable = () => {
  const { data, loading, error } = useOnProcessData();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCancelPopUpVisible, setIsCancelPopUpVisible] = useState(false);
  const [customerToCancel, setCustomerToCancel] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.inspectionDate);
    const dateB = new Date(b.inspectionDate);
    return dateA - dateB;
  });

  const filteredData = sortedData.filter((item) =>
    `${item.firstName} ${item.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  // Filter for inspections today
  const today = new Date().toLocaleDateString();
  const scheduledToday = filteredData.filter(
    (item) => new Date(item.inspectionDate).toLocaleDateString() === today,
  );

  // Filter for inspections in the past (waiting for quotation)
  const waitingForQuotation = filteredData.filter(
    (item) =>
      new Date(item.inspectionDate) < new Date() &&
      new Date(item.inspectionDate).toLocaleDateString() !== today,
  );

  // Handle edit click
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsFormVisible(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle cancel click
  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };
  const handleCancelClick = (item) => {
    setCustomerToCancel(item);
    setIsCancelPopUpVisible(true);
  };

  // Handle cancellation
  const handleCancellation = () => {
    // Cancellation logic here
    console.log("Cancellation:", customerToCancel);
    toast.success("Cancellation successfully!");
    setIsCancelPopUpVisible(false);
    setCustomerToCancel(null);
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setIsCancelPopUpVisible(false);
    setCustomerToCancel(null);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      {/* Scheduled today alert */}
      {scheduledToday.length > 0 && (
        <div className="mb-4 rounded border border-green-700 bg-green-100 p-3 text-green-700">
          <FaRegCalendarAlt className="mr-2 inline text-xl" />
          <span className="text-xs md:text-base">
            You have {scheduledToday.length} inspection(s) scheduled for today.
          </span>
        </div>
      )}

      {/* Waiting for quotation alert */}
      {waitingForQuotation.length > 0 && (
        <div className="mb-4 rounded border border-yellow-700 bg-yellow-100 p-3 text-yellow-700">
          <FaClockRotateLeft className="mr-2 inline text-xl" />
          <span className="text-xs md:text-base">
            You have {waitingForQuotation.length} project(s) waiting for
            quotation.
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-[800px] border-collapse border border-gray-300 md:min-w-full">
          <thead>
            <tr>
              <th className="min-w-[100px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[150px] md:text-base">
                First Name
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[150px] md:text-base">
                Last Name
              </th>
              <th className="min-w-[250px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[150px] md:text-base">
                Home Address
              </th>
              <th className="min-w-[150px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[200px] md:text-base">
                Email Address
              </th>
              <th className="min-w-[130px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[200px] md:text-base">
                Phone Number
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[150px] md:text-base">
                Type of Job
              </th>
              <th className="min-w-[150px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[200px] md:text-base">
                Services
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[200px] md:text-base">
                Inspection Schedule
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-blue-500 p-2 text-center text-xs text-white sm:text-sm md:min-w-[100px] md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
                >
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.firstName}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.lastName}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.address}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.email || "None"}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.phoneNumber || "None"}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.jobType}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    {item.services.join(", ")}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    <div className="flex items-center justify-between">
                      {item.inspectionDate}
                      {new Date(item.inspectionDate).toLocaleDateString() ===
                      today ? (
                        <FaRegCalendarAlt
                          className="ml-2 text-green-500 md:text-2xl"
                          title="Inspection scheduled for today!"
                        />
                      ) : (
                        new Date(item.inspectionDate) < new Date() && (
                          <FaClockRotateLeft
                            className="ml-2 text-yellow-500 md:text-2xl"
                            title="Waiting for quotation!"
                          />
                        )
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 text-xs sm:text-sm md:text-base">
                    <div className="flex justify-evenly">
                      <div className="group relative">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="ml-2 rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                        >
                          <LiaEdit className="text-lg md:text-xl" />
                        </button>
                        <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                          Edit
                        </div>
                      </div>
                      <div className="group relative">
                        <button
                          onClick={() => handleCancelClick(item)}
                          className="ml-2 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                        >
                          <MdOutlineCancel className="text-lg" />
                        </button>
                        <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                          Cancel
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="p-4 text-center text-xs sm:text-sm md:text-base"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="rounded bg-gray-800 px-2 py-2 text-white disabled:opacity-50"
          aria-label="Previous Page"
        >
          <FaAngleLeft />
        </button>
        <span className="text-sm md:text-base">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className="rounded bg-gray-800 px-2 py-2 text-white disabled:opacity-50"
          aria-label="Next Page"
        >
          <FaAngleRight />
        </button>
      </div>

      {/* Popup Form */}
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <OnProcessForm item={selectedItem} onClose={closeForm} />
        </div>
      )}

      {/* Cancel Pop-up */}
      {isCancelPopUpVisible && (
        <CancelPopUp
          message={`Are you sure you want to cancel ${customerToCancel.firstName} ${customerToCancel.lastName}'s process?`}
          onConfirm={handleCancellation}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default OnProcessTable;
