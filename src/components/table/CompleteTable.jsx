import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useCompletedData } from "../hooks/useDataHooks";

const CompleteTable = () => {
  const { data, loading, error } = useCompletedData();
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(b.completeDate) - new Date(a.completeDate),
    );
    setSortedData(sorted);
  }, [data]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const displayedData = sortedData.slice(
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
              <th className="min-w-[200px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:min-w-[230px] md:text-base">
                Address
              </th>
              <th className="min-w-[100px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:text-base">
                Email
              </th>
              <th className="min-w-[110px] border border-gray-300 bg-green-500 p-2 text-center text-xs text-white md:min-w-[140px] md:text-base">
                Phone Number
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
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.address}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 p-2 text-xs md:text-base">
                    {item.phoneNumber}
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
                    {new Date(item.completeDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
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
    </div>
  );
};

export default CompleteTable;