import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import InProgressForm from "../form/InProgressForm";
import CancelPopUp from "../common/popup/CancelPopUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompletePopUp from "../common/popup/CompletePopUp";
import { useInProgressData } from "../hooks/useDataHooks";
import { LuEye } from "react-icons/lu";
import InProgressInquiryDetails from "../form/InProgressInquiryDetails";
import SkeletonLoaderTable from "../loader/SkeletonLoaderTable";
import StartPopup from "../common/popup/StartPopup";
import { VscDebugStart } from "react-icons/vsc";
import {
  TbCalendarEvent,
  TbCalendarCheck,
  TbCalendarExclamation,
  TbCalendarClock,
  TbCalendarShare,
} from "react-icons/tb";

const InProgressTable = () => {
  const { data, loading, error } = useInProgressData();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCancelPopUpVisible, setIsCancelPopUpVisible] = useState(false);
  const [customerToCancel, setCustomerToCancel] = useState(null);
  const [isCompletePopUpVisible, setIsCompletePopUpVisible] = useState(false);
  const [isStartPopUpVisible, setIsStartPopUpVisible] = useState(false);
  const [customerToComplete, setCustomerToComplete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewFormVisible, setIsViewFormVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [startedProjects, setStartedProjects] = useState(new Set());
  const rowsPerPage = 10;
  const today = new Date();

  if (loading) {
    return (
      <div>
        <SkeletonLoaderTable />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredData = data.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsFormVisible(true);
    document.body.style.overflow = "hidden";
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  // Handle view click
  const handleViewClick = (item) => {
    setSelectedCustomer(item);
    setIsViewFormVisible(true);
    document.body.style.overflow = "hidden";
  };

  // Close view form
  const closeViewForm = () => {
    setIsViewFormVisible(false);
    setSelectedCustomer(null);
    document.body.style.overflow = "auto";
  };

  const handleCancelClick = (item) => {
    // cancellation logic here
    console.log("Cancellation:", item);
    setCustomerToCancel(item);
    setIsCancelPopUpVisible(true);
  };

  const handleCancellation = (item) => {
    toast.success("Cancellation successful!");
    setIsCancelPopUpVisible(false);
    setCustomerToCancel(null);
  };

  // Handle start click
  const handleStartClick = (item) => {
    console.log("Item to start:", item);
    setCustomerToComplete(item);
    setIsStartPopUpVisible(true);
  };

  // In the StartPopup confirmation handler
  const handleStart = (item) => {
    console.log("Starting item:", item);
    toast.success("Project is now ongoing!");

    setStartedProjects((prev) => {
      const updatedProjects = new Set(prev);
      updatedProjects.add(customerToComplete.id);
      return updatedProjects;
    });

    setIsStartPopUpVisible(false);
  };

  const handleCancelStart = () => {
    setIsStartPopUpVisible(false);
    setCustomerToComplete(null);
  };

  // Handle complete click
  const handleCompleteClick = (item) => {
    // complete logic here
    console.log("Complete:", item);
    setCustomerToComplete(item);
    setIsCompletePopUpVisible(true);
  };

  const handleCompletion = () => {
    toast.success(
      `${customerToComplete.firstName} ${customerToComplete.lastName}'s project has been completed!`,
    );
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

  const isDatePast = (endDate) => {
    const end = new Date(endDate);
    return (
      end.getFullYear() < today.getFullYear() ||
      (end.getFullYear() === today.getFullYear() &&
        end.getMonth() < today.getMonth()) ||
      (end.getFullYear() === today.getFullYear() &&
        end.getMonth() === today.getMonth() &&
        end.getDate() < today.getDate())
    );
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

      {/* Scheduled Today alert section */}
      {data.filter((item) => {
        const startDate = new Date(item.startDate);
        return (
          startDate.toLocaleDateString() === today.toLocaleDateString() &&
          !startedProjects.has(item.id)
        );
      }).length > 0 && (
        <div className="mb-4 flex items-center rounded border border-blue-700 bg-blue-100 p-3 text-blue-700">
          <TbCalendarEvent className="mr-2 text-2xl" />
          <span className="text-xs md:text-base">
            You have{" "}
            {
              data.filter((item) => {
                const startDate = new Date(item.startDate);
                return (
                  startDate.toLocaleDateString() ===
                    today.toLocaleDateString() && !startedProjects.has(item.id)
                );
              }).length
            }{" "}
            project(s) scheduled today.
          </span>
        </div>
      )}

      {/* Ongoing project alert section */}
      {(() => {
        const ongoingProjects = data.filter((item) => {
          return startedProjects.has(item.id);
        });

        return (
          ongoingProjects.length > 0 && (
            <div className="mb-4 flex items-center rounded border border-yellow-700 bg-yellow-100 p-3 text-yellow-700">
              <TbCalendarShare className="mr-2 text-2xl" />
              <span className="text-xs md:text-base">
                You have {ongoingProjects.length} project(s) ongoing.
              </span>
            </div>
          )
        );
      })()}

      {/* Waiting for an update alert section */}
      {(() => {
        const waitingForUpdateProjects = data.filter((item) => {
          const startDate = new Date(item.startDate);
          return (
            startDate < today.setHours(0, 0, 0, 0) &&
            !startedProjects.has(item.id)
          );
        });

        return (
          waitingForUpdateProjects.length > 0 && (
            <div className="mb-4 flex items-center rounded border border-orange-700 bg-orange-100 p-3 text-orange-700">
              <TbCalendarClock className="mr-2 text-2xl" />
              <span className="text-xs md:text-base">
                You have {waitingForUpdateProjects.length} project(s) that were
                supposed to start but haven't been initiated yet.
              </span>
            </div>
          )
        );
      })()}

      {/* Expected completion alert section */}
      {data.filter(
        (item) =>
          new Date(item.endDate).toLocaleDateString() ===
          today.toLocaleDateString(),
      ).length > 0 && (
        <div className="mb-4 flex items-center rounded border border-green-700 bg-green-100 p-3 text-green-700">
          <TbCalendarCheck className="mr-2 text-2xl" />
          <span className="text-xs md:text-base">
            You have{" "}
            {
              data.filter(
                (item) =>
                  new Date(item.endDate).toLocaleDateString() ===
                  today.toLocaleDateString(),
              ).length
            }{" "}
            project(s) expected to complete today.
          </span>
        </div>
      )}
      {/* Delayed alert section */}
      {data.filter((item) => isDatePast(item.endDate)).length > 0 && (
        <div className="mb-4 flex items-center rounded border border-red-700 bg-red-100 p-3 text-red-700">
          <TbCalendarExclamation className="mr-2 text-2xl" />
          <span className="text-xs md:text-base">
            You have {data.filter((item) => isDatePast(item.endDate)).length}{" "}
            delayed project(s). Please check the table for warnings.
          </span>
        </div>
      )}
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
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:min-w-[130px] md:text-base">
                End Date
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-yellow-500 p-2 text-center text-xs text-white md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-yellow-50"}`}
                >
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.firstName}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.lastName}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.jobType}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.services.join(", ")}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.quotation}
                      className="text-blue-600 hover:underline"
                    >
                      View Quotation
                    </a>
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    <div className="flex items-center justify-between">
                      {item.startDate}
                      {/* Display icon based on the project's status */}
                      {(() => {
                        const startDate = new Date(item.startDate);
                        const isStartedToday =
                          startDate.toLocaleDateString() ===
                          today.toLocaleDateString();
                        const isOngoing = startedProjects.has(item.id);
                        const isPastDue =
                          startDate < today.setHours(0, 0, 0, 0);

                        if (isOngoing) {
                          return (
                            <TbCalendarShare
                              className="text-yellow-500 md:text-2xl"
                              title="Ongoing project."
                            />
                          );
                        } else if (isStartedToday) {
                          return (
                            <TbCalendarEvent
                              className="text-blue-500 md:text-2xl"
                              title="Started today."
                            />
                          );
                        } else if (isPastDue && !isOngoing) {
                          return (
                            <TbCalendarClock
                              className="text-orange-500 md:text-2xl"
                              title="Waiting for update."
                            />
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </td>

                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    <div className="flex items-center justify-between">
                      {item.endDate}
                      {/* Display icon if endDate is today or overdue */}
                      {new Date(item.endDate).toLocaleDateString() ===
                      today.toLocaleDateString() ? (
                        <TbCalendarCheck
                          className="text-green-500 md:text-2xl"
                          title="Expected to complete today."
                        />
                      ) : new Date(item.endDate) < today ? (
                        <TbCalendarExclamation
                          className="text-red-500 md:text-2xl"
                          title="Project is delayed!"
                        />
                      ) : null}
                    </div>
                  </td>
                  {/* Action buttons */}
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    <div className="relative flex justify-center gap-2">
                      <div className="group relative">
                        <button
                          onClick={() => handleCompleteClick(item)}
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
                          onClick={() => handleStartClick(item)}
                          className="rounded-md bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                        >
                          <VscDebugStart className="text-lg" />
                        </button>
                        <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                          Start
                        </div>
                      </div>
                      <div className="group relative">
                        <button
                          onClick={() => handleViewClick(item)}
                          className="rounded-md bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
                        >
                          <LuEye className="text-lg md:text-xl" />
                        </button>
                        <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                          View Details
                        </div>
                      </div>
                      <div className="group relative">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
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
                          className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
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
                  colSpan="8"
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
          <InProgressForm item={selectedItem} onClose={closeForm} />
        </div>
      )}
      {/* View Pop-up */}
      {isViewFormVisible && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={closeForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <InProgressInquiryDetails
              item={selectedCustomer}
              onClose={closeViewForm}
            />
          </div>
        </>
      )}
      {/* Cancel Pop-up */}
      {isCancelPopUpVisible && (
        <CancelPopUp
          message={`Are you sure you want to cancel ${customerToCancel.firstName} ${customerToCancel.lastName}'s progress?`}
          onConfirm={handleCancellation}
          onCancel={handleCancelDelete}
        />
      )}
      {/* Complete Pop-up */}
      {isCompletePopUpVisible && (
        <CompletePopUp
          message={`Are you sure you want to complete ${customerToComplete.firstName} ${customerToComplete.lastName}'s project?`}
          onConfirm={handleCompletion}
          onCancel={handleCancelComplete}
        />
      )}
      {/* Start Pop-up */}
      {isStartPopUpVisible && (
        <StartPopup
          message={`Are you sure you want to start ${customerToComplete.firstName} ${customerToComplete.lastName}'s project?`}
          onConfirm={handleStart}
          onCancel={handleCancelStart}
        />
      )}
    </div>
  );
};

export default InProgressTable;
