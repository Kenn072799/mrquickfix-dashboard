import React, { useState, useRef } from "react";
import LineChartData from "../LineChart";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Title from "../../common/Title";
import { useCompletedData } from "../../hooks/useCompleteDataChart";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import html2canvas from "html2canvas";
import SkeletonLoaderTable from "../../loader/SkeletonLoaderTable";

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

const downloadChartAsPNG = (chartRef) => {
  html2canvas(chartRef.current).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "completed_projects_chart.png";
    link.click();
  });
};

const LineCompletedCard = () => {
  const { data, loading, error } = useCompletedData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chartRef = useRef();

  if (loading)
    return (
      <div>
        <SkeletonLoaderTable />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const highestValueEntry = data.reduce((prev, current) =>
    prev.completed > current.completed ? prev : current,
  );
  const lowestValueEntry = data.reduce((prev, current) =>
    prev.completed < current.completed ? prev : current,
  );

  const firstEntry = data[0];
  const lastEntry = data[data.length - 1];

  const firstMonthCompleted = firstEntry ? firstEntry.completed : 0;
  const lastMonthCompleted = lastEntry ? lastEntry.completed : 0;

  // Formula for calculating percentage change
  // (last month completed - first month completed) / first month completed
  const percentageChange =
    firstMonthCompleted === 0
      ? lastMonthCompleted > 0
        ? 100
        : 0
      : (lastMonthCompleted - firstMonthCompleted) / firstMonthCompleted;

  return (
    <div className="relative mb-24 w-full rounded-md border-t-8 border-primary-500 bg-white px-2 py-4 shadow-md md:px-8">
      <Title className="pb-2 text-sm md:text-center md:text-xl">
        Completed Projects Data (Year over Year)
      </Title>
      <div className="mb-4 flex justify-end">
        <button
          className="absolute right-2 top-4"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <BiDotsVerticalRounded className="cursor-pointer text-2xl text-primary-500" />
          {isMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border bg-white shadow-lg">
              <button
                onClick={() => downloadCSV(data, "completed_projects_data.csv")}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Download CSV
              </button>
              <button
                onClick={() => downloadChartAsPNG(chartRef)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Download PNG
              </button>
            </div>
          )}
        </button>
      </div>
      <strong className="text-sm md:text-base">Comparison</strong>
      <div className="mb-4 text-sm md:text-base">
        <strong className="mr-1">{firstEntry?.date}:</strong>
        {firstMonthCompleted} completed.
        <br />
        <strong className="mr-1">{lastEntry?.date}:</strong>
        {lastMonthCompleted} completed.
        <br />
        <div className="flex items-center">
          <strong className="mr-1">Percentage Change:</strong>
          {percentageChange.toFixed(2)}%
          {percentageChange >= 0 ? (
            <FaAngleDoubleUp className="ml-2 text-green-500" />
          ) : (
            <FaAngleDoubleDown className="ml-2 text-red-500" />
          )}
        </div>
      </div>
      <div className="mb-4">
        {highestValueEntry && (
          <div className="text-sm md:text-base">
            <p className="mr-2 inline font-bold">All Time High:</p>
            {highestValueEntry.date}
            <span className="ml-1">
              ({highestValueEntry.completed} completed)
            </span>
          </div>
        )}
        {lowestValueEntry && (
          <div className="mr-1 text-sm md:text-base">
            <p className="mr-2 inline font-bold">Recent Low:</p>
            {lowestValueEntry.date}
            <span className="ml-1">
              ({lowestValueEntry.completed} completed)
            </span>
          </div>
        )}
      </div>
      <div className="rounded-md border bg-slate-100 p-4" ref={chartRef}>
        <LineChartData />
      </div>
    </div>
  );
};

export default LineCompletedCard;
