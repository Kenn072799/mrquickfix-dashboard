import React, { useState } from "react";
import Logo from "../../../assets/Mr.QuickFixLogo.png";
import { NavLink } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineManageAccounts,
  MdOutlineLogout,
} from "react-icons/md";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { BiBookContent } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";

const SideBar = () => {
  const [isMiscOpen, setIsMiscOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMiscellaneous = () => {
    setIsMiscOpen(!isMiscOpen);
  };

  const closeMiscellaneous = () => {
    setIsMiscOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      closeMiscellaneous();
    }
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className="absolute left-2 top-2 z-50 p-4 md:hidden">
        <HiOutlineMenuAlt1 size={30} onClick={toggleSidebar} />
      </div>

      {/* Background Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 transform border-r bg-white md:z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:block md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <img src={Logo} alt="Mr. Quick Fix" className="h-10" />
        </div>
        <nav>
          <ul className="font-roboto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mt-12 flex items-center px-4 py-4 text-lg font-semibold hover:bg-slate-100 ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
              onClick={toggleSidebar}
            >
              <MdOutlineSpaceDashboard size={24} className="mr-2" />
              Dashboard
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center px-4 py-4 text-lg font-semibold hover:bg-slate-100 ${
                  isActive ? "bg-slate-200" : ""
                }`
              }
              onClick={toggleSidebar}
            >
              <LiaProjectDiagramSolid size={24} className="mr-2" />
              Track Job Order
            </NavLink>

            <li
              className="flex cursor-pointer items-center px-4 py-4 text-lg font-semibold hover:bg-slate-100"
              onClick={toggleMiscellaneous}
            >
              <TbSettings size={24} className="mr-2" />
              Miscellaneous
              <IoChevronDownOutline
                size={18}
                className="ml-8 text-secondary-500"
              />
            </li>
            {isMiscOpen && (
              <ul className="bg-slate-200">
                <NavLink to="content">
                  <li className="flex items-center border-t border-slate-300 py-2 pl-6 text-lg font-semibold hover:bg-slate-300">
                    <BiBookContent size={24} className="mr-2" />
                    Content Management
                  </li>
                </NavLink>
                <NavLink to="account">
                  <li className="flex items-center py-2 pl-6 text-lg font-semibold hover:bg-slate-300">
                    <MdOutlineManageAccounts size={24} className="mr-2" />
                    Account Management
                  </li>
                </NavLink>
                <NavLink to="activity">
                  <li className="flex items-center border-b border-slate-300 py-2 pl-6 text-lg font-semibold hover:bg-slate-300">
                    <CgNotes size={24} className="mr-2" />
                    Activity Log
                  </li>
                </NavLink>
              </ul>
            )}

            <div className="absolute bottom-4 w-full">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block px-4 py-4 text-lg font-semibold hover:bg-slate-100 ${
                    isActive ? "bg-slate-200" : ""
                  }`
                }
                onClick={toggleSidebar}
              >
                <li className="flex items-center">
                  <RiAccountCircleLine size={24} className="mr-2" />
                  My Profile
                </li>
              </NavLink>

              <li className="item-center flex px-4 py-4 text-lg font-semibold hover:bg-slate-100">
                <MdOutlineLogout size={24} className="mr-2" />
                Log out
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
