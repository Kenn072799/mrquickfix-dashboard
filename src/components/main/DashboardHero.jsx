import React from "react";
import OnProcessCardDB from "../card/dashboard-card/OnProcessCardDB";
import InProgressDB from "../card/dashboard-card/InProgressDB";
import CompletedDB from "../card/dashboard-card/CompletedDB";
import CancelledDB from "../card/dashboard-card/CancelledDB";
import Title from "../common/Title";
import CustomerDB from "../card/dashboard-card/CustomerDB";

const DashboardHero = () => {
  return (
    <main className="bg-slate-100 p-4">
      <section className="py-8">
        <Title>Monitoring</Title>
        <section className="flex flex-wrap justify-center gap-4 py-4">
          <CustomerDB />
          <OnProcessCardDB />
          <InProgressDB />
          <CompletedDB />
          <CancelledDB />
        </section>
        <Title>Analytics</Title>
        <section className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
          <div className="flex h-[300px] w-full items-center justify-center border border-red-500">
            Pie Chart
          </div>
          <div className="flex h-[300px] w-full items-center justify-center border border-red-500">
            Line Chart
          </div>
        </section>
      </section>
    </main>
  );
};

export default DashboardHero;
