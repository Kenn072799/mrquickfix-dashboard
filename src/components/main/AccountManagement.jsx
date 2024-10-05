import React from "react";
import Title from "../common/Title";
import { NavLink, Outlet } from "react-router-dom";

const AccountManagement = () => {
  return (
    <section className="bg-slate-100 p-4">
      <div className="py-8">
        <Title>Account Management</Title>
        <div className="my-4 rounded-md bg-white p-4 shadow-sm">
          <ul className="flex items-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary-500"
                  : "border-b-2 border-transparent hover:border-primary-200"
              }
              to="create-account"
            >
              <li className="font-bold md:text-lg">Create Account</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary-500"
                  : "border-b-2 border-transparent hover:border-primary-200"
              }
              to="admin-list"
            >
              <li className="font-bold md:text-lg">Admin List</li>
            </NavLink>
          </ul>
        </div>
      </div>

      <Outlet />
    </section>
  );
};

export default AccountManagement;
