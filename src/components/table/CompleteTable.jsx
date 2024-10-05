import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useCompletedData } from "../hooks/useDataHooks";
import { LuEye } from "react-icons/lu";
import CompletedDetails from "../form/CompletedDetails";

const CompleteTable = () => {
  const { data, loading, error } = useCompletedData();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewFormVisible, setIsViewFormVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(b.completeDate) - new Date(a.completeDate),
    );
    setSortedData(sorted);
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
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

  const filteredData = sortedData.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="mb-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="min-w-[100px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:text-base">
                First Name
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:text-base">
                Last Name
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:text-base">
                Email Address
              </th>
              <th className="min-w-[120px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:min-w-[100px] md:text-base">
                Job Type
              </th>
              <th className="min-w-[150px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:min-w-[200px] md:text-base">
                Services
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:min-w-[130px] md:text-base">
                Quotation
              </th>
              <th className="min-w-[130px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:min-w-[150px] md:text-base">
                Completion Date
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-green-50"}`}
                >
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.firstName}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.lastName}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs text-blue-500 hover:underline md:text-base">
                    <a href={`mailto:${item.email}`}>{item.email || "None"}</a>
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
                    {item.completeDate}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    <div className="relative flex justify-center">
                      <div className="group relative">
                        <button
                          onClick={() => handleViewClick(item)}
                          className="ml-2 rounded-md bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
                        >
                          <LuEye className="text-lg md:text-xl" />
                        </button>
                        <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                          View Details
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
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

      {/* View Pop-up */}
      {isViewFormVisible && (
        <>
          <div className="fixed inset-0 z-50 flex items-center bg-black/20 justify-center">
            <CompletedDetails item={selectedCustomer} onClose={closeViewForm} />
          </div>
        </>
      )}
    </div>
  );
};

export default CompleteTable;
