import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";
import EditProjectForm from "../form/ContentManagementForms/EditProjectForm";
import DeletePopUp from "../common/popup/DeletePopUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sample Data
const displayedData = [
  {
    id: 1,
    name: "Project 1",
    categories: "Description 1",
    thumbnail: "thumbnail1.jpg",
    images: ["image1.jpg", "image2.jpg"],
  },
  {
    id: 2,
    name: "Project 2",
    categories: "Description 2",
    thumbnail: "thumbnail2.jpg",
    images: ["image3.jpg", "image4.jpg"],
  },
  {
    id: 3,
    name: "Project 3",
    categories: "Description 3",
    thumbnail: "thumbnail3.jpg",
    images: ["image5.jpg", "image6.jpg"],
  },
];

const ContentTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeletePopUpVisible, setIsDeletePopUpVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(displayedData.length / rowsPerPage);
  const displayedProjects = displayedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  // Handle edit click
  const handleEditClick = (project) => {
    setSelectedItem(project);
    setIsFormVisible(true);
  };

  // Handle delete click
  const handleDeleteClick = (project) => {
    setSelectedItem(project);
    setIsDeletePopUpVisible(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete action
    console.log("Deleting project:", selectedItem);

    toast.success("Deleted successfully");
    setIsDeletePopUpVisible(false);
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setIsDeletePopUpVisible(false);
  };

  // Handle cancel form
  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Project Name
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Categories
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Thumbnail
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              images
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project, index) => (
              <tr
                key={project.id}
                className={index % 2 === 0 ? "bg-white" : "bg-secondary-50"}
              >
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {project.name}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {project.categories}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.thumbnail}
                    className="text-blue-600 hover:underline"
                  >
                    View Thumbnail
                  </a>
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {Array.isArray(project.images) ? (
                    project.images.map((image, index) => (
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={image}
                        className="block text-blue-600 hover:underline"
                      >
                        View Image {index + 1}
                      </a>
                    ))
                  ) : (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.images}
                      className="text-blue-600 hover:underline"
                    >
                      View Images
                    </a>
                  )}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  <div className="relative flex justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    >
                      <LiaEdit className="text-lg md:text-xl" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(project)}
                      className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    >
                      <RiDeleteBin2Line className="text-lg md:text-xl" />
                    </button>
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
          <EditProjectForm project={selectedItem} closeForm={closeForm} />
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopUpVisible && (
        <DeletePopUp
          message="This action cannot be undone. Are you sure you want to delete this project?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ContentTable;
