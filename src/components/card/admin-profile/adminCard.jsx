import React, { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";

const AdminCard = ({
  adminProfile,
  adminName,
  adminRole,
  adminEmail,
  onDelete,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-[300px] rounded-md bg-white shadow-lg">
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <img
          className="h-24 w-24 rounded-full border-4 border-primary-500"
          src={adminProfile}
          alt="Admin Profile"
        />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-900">{adminName}</h3>
          <p className="text-gray-600">{adminRole}</p>
          <p className="text-gray-500">{adminEmail}</p>
        </div>

        {/* Dropdown for delete action */}
        <div className="absolute right-0 top-0">
          <button
            onClick={toggleDropdown}
            className="rounded-ful m-2 rounded-full text-slate-700 active:bg-gray-200"
          >
            <TbSettings size={24} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 min-w-[160px] rounded-md border border-slate-200 bg-white shadow-lg">
              <button
                onClick={handleDeleteClick}
                className="flex w-full items-center justify-center gap-2 p-2 text-sm text-red-500 active:bg-slate-100"
              >
                <RiDeleteBin2Line size={16} />
                Delete Account?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
