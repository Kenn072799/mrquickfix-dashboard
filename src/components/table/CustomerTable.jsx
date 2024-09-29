import React, { useState } from "react";
import useFetchCustomers from "../hooks/useFetchCustomers";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";
import CustomerInquiryForm from "../form/CustomerInquiryForm";

const CustomerTable = () => {
  const { customers, loading, error } = useFetchCustomers();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const rowsPerPage = 10;

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  const uniqueCustomers = Array.from(
    new Set(customers.map((customer) => customer.id)),
  ).map((id) => {
    return customers.find((customer) => customer.id === id);
  });

  const totalPages = Math.ceil(uniqueCustomers.length / rowsPerPage);
  const displayedCustomers = uniqueCustomers.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage,
  );

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="overflow-x-auto">
        <table className="min-w-[800px] border-collapse border border-gray-200 md:min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="min-w-[150px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                First Name
              </th>
              <th className="min-w-[150px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                Last Name
              </th>
              <th className="min-w-[150px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                Email Address
              </th>
              <th className="min-w-[150px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                Phone Number
              </th>
              <th className="min-w-[350px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                Message
              </th>
              <th className="min-w-[150px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                Date & Time
              </th>
              <th className="min-w-[100px] border border-gray-200 bg-slate-500 p-2 text-center text-xs text-white sm:text-sm md:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCustomers.length > 0 ? (
              displayedCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    {customer.firstName}
                  </td>
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    {customer.lastName}
                  </td>
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    {customer.email}
                  </td>
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    {customer.phoneNumber}
                  </td>
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    {customer.message}
                  </td>
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    {new Date(customer.date).toLocaleString()}
                  </td>
                  <td className="border border-gray-200 p-2 text-xs sm:text-sm md:text-base">
                    <div className="relative flex justify-evenly">
                      <div className="group relative">
                        <button
                          onClick={() => handleEditClick(customer)}
                          className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                        >
                          <LiaEdit className="text-lg md:text-xl" />
                        </button>
                        <div className="absolute bottom-9 left-1/2 z-10 hidden w-max -translate-x-1/2 translate-y-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 group-hover:block group-hover:opacity-100">
                          Edit
                        </div>
                      </div>
                      <div className="group relative">
                        <button className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600">
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
                  colSpan="7"
                  className="p-4 text-center text-xs sm:text-sm md:text-base"
                >
                  No customer data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal and Backdrop */}
        {isFormVisible && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={closeForm}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <CustomerInquiryForm
                existingData={selectedCustomer}
                onClose={closeForm}
              />
            </div>
          </>
        )}
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

export default CustomerTable;
