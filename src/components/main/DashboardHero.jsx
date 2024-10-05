import React from "react";
import OnProcessCardDB from "../card/dashboard-card/OnProcessCardDB";
import InProgressDB from "../card/dashboard-card/InProgressDB";
import CompletedDB from "../card/dashboard-card/CompletedDB";
import CancelledDB from "../card/dashboard-card/CancelledDB";
import Title from "../common/Title";
import CustomerDB from "../card/dashboard-card/CustomerDB";
import { FaChartLine, FaChartPie } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const DashboardHero = () => {
  return (
    <main className="bg-slate-100 p-4">
      <section className="py-8">
        <Title>Monitoring Job Order</Title>
        <section className="flex flex-wrap justify-center gap-4 py-4">
          <CustomerDB />
          <OnProcessCardDB />
          <InProgressDB />
          <CompletedDB />
          <CancelledDB />
        </section>
        <Title className="pt-8">Analytics</Title>
        <div className="mt-4 flex flex-wrap gap-4 rounded-md bg-white px-4 py-4 shadow-md">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-primary-500 text-white"
                : "rounded-md border border-primary-500 text-primary-500"
            }
            to="dashboard"
          >
            <button className="flex items-center px-4 py-2">
              <FaChartLine className="mr-2 inline md:text-xl" /> Line chart
            </button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-primary-500 text-white"
                : "rounded-md border border-primary-500 text-primary-500"
            }
            to="pie-chart-completed"
          >
            <button className="flex items-center px-4 py-2">
              <FaChartPie className="mr-2 inline md:text-xl" /> Pie Chart
            </button>
          </NavLink>
        </div>
      </section>
      <Outlet />
    </main>
  );
};

export default DashboardHero;
