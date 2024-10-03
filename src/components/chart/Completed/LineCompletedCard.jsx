import React from "react";
import LineChartData from "../LineChart";
import { FaMinus } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import Title from "../../common/Title";
import { useCompletedData } from "../../hooks/useCompleteDataChart";

const convertToCSV = (data) => {
  const header = "Date,Completed\n";
  const rows = data
    .map((entry) => `${entry.date},${entry.completed}`)
    .join("\n");
  return header + rows;
};

const downloadCSV = (data, filename) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const LineCompletedCard = () => {
  const { data, loading, error } = useCompletedData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const highestValueEntry = data.reduce((prev, current) =>
    prev.completed > current.completed ? prev : current,
  );
  const lowestValueEntry = data.reduce((prev, current) =>
    prev.completed < current.completed ? prev : current,
  );

  return (
    <div className="relative mb-24 w-full rounded-md border-t-8 border-primary-500 bg-white px-2 py-4 shadow-md md:px-8">
      <Title className="pb-8 md:text-center md:text-3xl">
        Completed Projects Data
      </Title>
      <div className="mb-4 flex justify-end">
        <button
          title="Download as CSV"
          onClick={() => downloadCSV(data, "completed_projects_data.csv")}
          className="absolute right-2 top-2 rounded-md border border-primary-500 px-3 py-2 text-primary-500 hover:bg-primary-600 hover:text-white active:bg-primary-500 active:text-white md:px-4"
        >
          <IoMdDownload className="text-sm md:text-lg" />
        </button>
      </div>
      <div className="mb-4">
        {highestValueEntry && (
          <div className="pb-2 text-sm text-secondary-900 md:text-lg">
            <FaMinus className="mr-2 inline text-green-500 md:text-xl" />
            <strong>{highestValueEntry.date}</strong> -{" "}
            {highestValueEntry.completed} completed project(s).
          </div>
        )}
        {lowestValueEntry && (
          <div className="mr-1 text-sm text-secondary-900 md:text-lg">
            <FaMinus className="mr-2 inline text-red-500 md:text-xl" />
            <strong>{lowestValueEntry.date}</strong> -{" "}
            {lowestValueEntry.completed} completed project(s).
          </div>
        )}
      </div>
      <div className="rounded-md border bg-slate-100 p-4">
        <LineChartData />
      </div>
    </div>
  );
};

export default LineCompletedCard;
