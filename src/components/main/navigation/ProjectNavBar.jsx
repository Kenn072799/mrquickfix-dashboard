import React, { useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-scroll";

const ProjectNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="relative">
        {/* Menu icon for mobile view */}
        <div className="rounded-md border p-[2px] active:rounded-full active:bg-slate-100 lg:hidden">
          <HiOutlineMenu size={30} onClick={toggleMenu} />
        </div>

        {/* Menu items for large screens */}
        <ul className="hidden cursor-pointer items-center gap-4 font-bold lg:flex">
          <Link
            to="client"
            spy={true}
            smooth={true}
            className="flex items-center"
          >
            <FaCircle size={5} className="mr-2 text-slate-500" />
            <li className="border-b-2 border-transparent text-lg hover:border-primary-500">
              Client's Inquiry
            </li>
          </Link>
          <Link
            to="onprocess"
            spy={true}
            smooth={true}
            offset={-15}
            className="flex items-center"
          >
            <FaCircle size={5} className="mr-2 text-blue-500" />
            <li className="border-b-2 border-transparent text-lg hover:border-primary-500">
              On Process
            </li>
          </Link>
          <Link
            to="inprogress"
            spy={true}
            smooth={true}
            offset={-15}
            className="flex items-center"
          >
            <FaCircle size={5} className="mr-2 text-yellow-500" />
            <li className="border-b-2 border-transparent text-lg hover:border-primary-500">
              In Progress
            </li>
          </Link>
          <Link
            to="completed"
            spy={true}
            smooth={true}
            offset={-15}
            className="flex items-center"
          >
            <FaCircle size={5} className="mr-2 text-green-500" />
            <li className="border-b-2 border-transparent text-lg hover:border-primary-500">
              Completed
            </li>
          </Link>
          <Link
            to="cancelled"
            spy={true}
            smooth={true}
            className="flex items-center"
          >
            <FaCircle size={5} className="mr-2 text-red-500" />
            <li className="border-b-2 border-transparent text-lg hover:border-primary-500">
              Cancelled
            </li>
          </Link>
        </ul>

        {/* Dropdown menu for mobile view */}
        {isMenuOpen && (
          <ul className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-lg lg:hidden">
            <Link to="client" spy={true} smooth={true} onClick={toggleMenu}>
              <li className="flex items-center px-4 py-2 text-sm active:bg-gray-200">
                <FaCircle size={5} className="mr-2 text-slate-500" />
                Client's Inquiry
              </li>
            </Link>
            <Link
              to="onprocess"
              spy={true}
              smooth={true}
              offset={-15}
              onClick={toggleMenu}
            >
              <li className="flex items-center px-4 py-2 text-sm active:bg-gray-200">
                <FaCircle size={5} className="mr-2 text-blue-500" />
                On Process
              </li>
            </Link>
            <Link
              to="inprogress"
              spy={true}
              smooth={true}
              offset={-15}
              onClick={toggleMenu}
            >
              <li className="flex items-center px-4 py-2 text-sm active:bg-gray-200">
                <FaCircle size={5} className="mr-2 text-yellow-500" />
                In Progress
              </li>
            </Link>
            <Link
              to="completed"
              spy={true}
              smooth={true}
              offset={-15}
              onClick={toggleMenu}
            >
              <li className="flex items-center px-4 py-2 text-sm active:bg-gray-200">
                <FaCircle size={5} className="mr-2 text-green-500" />
                Completed
              </li>
            </Link>
            <Link
              to="cancelled"
              spy={true}
              smooth={true}
              offset={-15}
              onClick={toggleMenu}
            >
              <li className="flex items-center px-4 py-2 text-sm active:bg-gray-200">
                <FaCircle size={5} className="mr-2 text-red-500" />
                Cancelled
              </li>
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default ProjectNavBar;
