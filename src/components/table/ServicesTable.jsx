import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";
import DeletePopUp from "../common/popup/DeletePopUp";
import EditServicesForm from "../form/ContentManagementForms/EditServicesForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sample Data
const displayedData = [
  {
    id: 1,
    name: "Service 1",
    description: "Description 1",
    image: "image1.jpg",
  },
  {
    id: 2,
    name: "Service 2",
    description: "Description 2",
    image: "image2.jpg",
  },
  {
    id: 3,
    name: "Service 3",
    description: "Description 3",
    image: "image3.jpg",
  },
];

const ServicesTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(displayedData.length / rowsPerPage);
  const displayedServices = displayedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeletePopUpVisible, setIsDeletePopUpVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (service) => {
    setSelectedItem(service);
    setIsFormVisible(true);
  };

  const handleDeleteClick = (service) => {
    setSelectedItem(service);
    setIsDeletePopUpVisible(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete action
    console.log("Deleting Service:", selectedItem);

    toast.success("Deleted successfully");
    setIsDeletePopUpVisible(false);
    setSelectedItem(null);
  };

  const handleCancelDelete = () => {
    setIsDeletePopUpVisible(false);
    setSelectedItem(null);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Services Name
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Description
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Image
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedServices.length > 0 ? (
            displayedServices.map((service, index) => (
              <tr
                key={service.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-secondary-50"}`}
              >
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {service.name || "No name"}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {service.description || "No description"}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={service.image}
                    className="text-blue-600 hover:underline"
                  >
                    View image
                  </a>
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  <div className="relative flex justify-center gap-2">
                    <div className="group relative">
                      <button
                        onClick={() => handleEditClick(service)}
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
                        onClick={() => handleDeleteClick(service)}
                        className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                      >
                        <RiDeleteBin2Line className="text-lg md:text-xl" />
                      </button>
                      <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                        Delete
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="p-4 text-center text-xs sm:text-sm md:text-base"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

      {/* Edit Form Popup */}
      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <EditServicesForm service={selectedItem} closeForm={closeForm} />
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopUpVisible && (
        <DeletePopUp
          message="This action cannot be undone. Are you sure you want to delete this service?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ServicesTable;
