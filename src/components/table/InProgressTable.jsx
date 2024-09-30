import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import useFetchInProgressData from "../hooks/useFetchInProgressData";
import InProgressForm from "../form/InProgressForm";
import CancelPopUp from "../common/CancelPopUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompletePopUp from "../common/CompletePopUp";

const InProgressTable = () => {
  const { data, loading, error } = useFetchInProgressData();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCancelPopUpVisible, setIsCancelPopUpVisible] = useState(false);
  const [customerToCancel, setCustomerToCancel] = useState(null);
  const [isCompletePopUpVisible, setIsCompletePopUpVisible] = useState(false);
  const [customerToComplete, setCustomerToComplete] = useState(null);
  const rowsPerPage = 10;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const displayedData = data.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedItem(null);
  };

  const handleCancelClick = (entry) => {
    setCustomerToCancel(entry);
    setIsCancelPopUpVisible(true);
  };

  const handleCancellation = () => {
    //Put cancel logic here
    console.log("Cancelling transaction:", customerToCancel);

    toast.success("Cancellation successfully!");

    setIsCancelPopUpVisible(false);
    setCustomerToCancel(null);
  };

  const handleCompleteClick = (entry) => {
    setCustomerToComplete(entry);
    setIsCompletePopUpVisible(true);
  };

  const handleCompletion = () => {
    //Put complete logic here
    console.log("Complete transaction:", customerToComplete);

    toast.success("Completed transaction successfully!");

    setIsCompletePopUpVisible(false);
    setCustomerToComplete(null);
  };

  const handleCancelDelete = () => {
    setIsCancelPopUpVisible(false);
    setCustomerToCancel(null);
  };

  const handleCancelComplete = () => {
    setIsCompletePopUpVisible(false);
    setCustomerToCancel(null);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {/* Table headers */}
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                First Name
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                Last Name
              </th>
              <th className="min-w-[200px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:min-w-[230px] md:text-base">
                Home Address
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                Email Address
              </th>
              <th className="min-w-[110px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:min-w-[140px] md:text-base">
                Phone Number
              </th>
              <th className="min-w-[120px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:min-w-[100px] md:text-base">
                Type of Job
              </th>
              <th className="min-w-[150px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:min-w-[200px] md:text-base">
                Services
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:min-w-[130px] md:text-base">
                Quotation
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                Start Date
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                End Date
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((entry, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-yellow-50"}`}
              >
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.firstName}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.lastName}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.address}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.email}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.phoneNumber}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.jobType}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.services.join(", ")}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={entry.quotation}
                    className="text-blue-600 hover:underline"
                  >
                    View Quotation
                  </a>
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.startDate}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {entry.endDate}
                </td>
                {/* Action buttons */}
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  <div className="flex justify-evenly">
                    <div className="group relative">
                      <button
                        onClick={() => handleCompleteClick(entry)}
                        className="rounded-md bg-green-500 px-2 py-1 text-white hover:bg-green-600"
                      >
                        <FaRegCheckCircle className="text-lg" />
                      </button>
                      <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                        Complete
                      </div>
                    </div>
                    <div className="group relative">
                      <button
                        onClick={() => handleEditClick(entry)}
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
                        onClick={() => handleCancelClick(entry)}
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
            ))}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <InProgressForm item={selectedItem} onClose={closeForm} />
        </div>
      )}
      {/* Cancel Pop-up */}
      {isCancelPopUpVisible && (
        <CancelPopUp
          message={`Are you sure you want to cancel ${customerToCancel.firstName} ${customerToCancel.lastName} transaction?`}
          onConfirm={handleCancellation}
          onCancel={handleCancelDelete}
        />
      )}
      {/* Complete Pop-up */}
      {isCompletePopUpVisible && (
        <CompletePopUp
          message={`Are you sure you want to complete ${customerToComplete.firstName} ${customerToComplete.lastName} project?`}
          onConfirm={handleCompletion}
          onCancel={handleCancelComplete}
        />
      )}
    </div>
  );
};

export default InProgressTable;