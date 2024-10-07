import React from "react";
import CompletedReports from "../chart/Report/CompletedReports";
import CancelledReports from "../chart/Report/CancelledReports";
import GeneralComparison from "../chart/Report/GeneralComparison";
import Title from "../common/Title";

const Report = () => {
  return (
    <section className="p-4 bg-slate-100">
      <div className="py-8">
        <Title>Job Order Report</Title>
        <div className="my-4">
          <div className="relative mb-24 w-full rounded-md border-t-8 border-primary-500 bg-white px-2 py-4 shadow-md md:px-8">
            <h2 className="mb-4 text-xl font-semibold">General Job Comparison</h2>
            <GeneralComparison />
          </div>

          <div className="relative mb-24 w-full rounded-md border-t-8 border-green-500 bg-white px-2 py-4 shadow-md md:px-8">
            <h2 className="mb-4 text-xl font-semibold">Completed Job Reports</h2>
            <CompletedReports />
          </div>

          <div className="relative mb-24 w-full rounded-md border-t-8 border-red-500 bg-white px-2 py-4 shadow-md md:px-8">
            <h2 className="mb-4 text-xl font-semibold">Cancelled Job Reports</h2>
            <CancelledReports />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
