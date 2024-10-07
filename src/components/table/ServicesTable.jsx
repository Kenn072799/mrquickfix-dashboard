import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const displayedData = [];

const ServicesTable = () => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(displayedData.length / rowsPerPage);
  const displayedServices = displayedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Title
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Description
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-secondary-950 p-2 text-center text-xs text-white md:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedServices.length > 0 ? (
            displayedServices.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-secondary-50"}`}
              >
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.project}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.services}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.services}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
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
    </div>
  );
};

export default ServicesTable;
