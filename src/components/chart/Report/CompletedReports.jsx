import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCompletedData } from "../../hooks/useDataHooks";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaArrowDownWideShort, FaArrowUpWideShort } from "react-icons/fa6";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import html2canvas from "html2canvas";
import { BiDotsVerticalRounded } from "react-icons/bi";

const CompletedReports = () => {
  const { data, loading, error } = useCompletedData();
  const [timeframe, setTimeframe] = useState("weekly");
  const [formattedData, setFormattedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [dateSortOrder, setDateSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [selectedYear, setSelectedYear] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chartRef = useRef();
  const [inputYear, setInputYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (error) {
      console.error("Error fetching completed data:", error);
    }
  }, [error]);

  // Format data for chart
  useEffect(() => {
    const formatData = () => {
      const acc = [];
      let totalCompleted = 0;
      data.forEach((curr) => {
        const date = new Date(curr.completeDate);
        const year = date.getFullYear();

        // Filter based on selectedYear if it is set
        if (selectedYear && year !== selectedYear) return;

        let key;
        if (timeframe === "weekly") {
          const weekStart = new Date(
            date.setDate(date.getDate() - date.getDay()),
          ).toLocaleDateString();
          key = weekStart;
        } else if (timeframe === "monthly") {
          key = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
        } else if (timeframe === "yearly") {
          key = date.getFullYear();
        }
        const existingEntry = acc.find((entry) => entry.date === key);
        if (existingEntry) {
          existingEntry.count += 1;
        } else {
          acc.push({ date: key, count: 1 });
        }
      });
      totalCompleted = acc.reduce((total, entry) => total + entry.count, 0);
      const dataWithPercentage = acc.map((entry) => ({
        date: entry.date,
        count: entry.count,
        percentage: ((entry.count / totalCompleted) * 100).toFixed(2),
      }));
      if (timeframe === "weekly") {
        dataWithPercentage.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (timeframe === "monthly" || timeframe === "yearly") {
        dataWithPercentage.sort((a, b) =>
          timeframe === "monthly"
            ? new Date(a.date) - new Date(b.date)
            : a.date - b.date,
        );
      }
      setFormattedData(dataWithPercentage);
    };
    formatData();
  }, [data, timeframe, selectedYear]);

  const handleSearchYear = () => {
    setSelectedYear(inputYear);
  };

  const handleViewAllYears = () => {
    setSelectedYear(null);
  };

  // Sort data
  const handleSort = () => {
    const sortedData = [...formattedData].sort((a, b) =>
      sortOrder === "asc" ? a.count - b.count : b.count - a.count,
    );
    setFormattedData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Download PNG
  const handleDownloadPNG = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "completed_projects_chart.png";
      link.click();
    });
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const csvData = formattedData.map(
      ({ date, count, percentage }) => `${date},${count},${percentage}`,
    );
    const csvContent = `data:text/csv;charset=utf-8,Date,Count,Percentage\n${csvData.join(
      "\n",
    )}`;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "completed_projects_chart.csv";
    link.click();
  };

  // Date Sort
  const handleDateSort = () => {
    const sortedData = [...formattedData].sort((a, b) =>
      dateSortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date),
    );
    setFormattedData(sortedData);
    setDateSortOrder(dateSortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination
  const totalPages = Math.ceil(formattedData.length / itemsPerPage);
  const paginatedData = formattedData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  // Get the highest and lowest counts
  const highestCount = formattedData.reduce(
    (max, entry) => Math.max(max, entry.count),
    0,
  );
  const lowestCount = formattedData.reduce(
    (min, entry) => Math.min(min, entry.count),
    Infinity,
  );
  const highestEntry = formattedData.find(
    (entry) => entry.count === highestCount,
  );
  const lowestEntry = formattedData.find(
    (entry) => entry.count === lowestCount,
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="absolute right-2 top-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <BiDotsVerticalRounded className="cursor-pointer text-2xl text-primary-500" />
        </button>
        {isMenuOpen && (
          <div className="absolute right-4 top-7 z-10 mt-2 w-40 rounded-md border bg-white shadow-lg">
            <button
              onClick={handleDownloadPNG}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Download PNG
            </button>
            <button
              onClick={handleDownloadCSV}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Download CSV
            </button>
          </div>
        )}
      </div>
      {/* Timeframe Selection */}
      <div className="mb-4 text-sm">
        <label>
          <input
            type="radio"
            value="weekly"
            checked={timeframe === "weekly"}
            onChange={() => setTimeframe("weekly")}
          />{" "}
          Weekly
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="monthly"
            checked={timeframe === "monthly"}
            onChange={() => setTimeframe("monthly")}
          />{" "}
          Monthly
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="yearly"
            checked={timeframe === "yearly"}
            onChange={() => setTimeframe("yearly")}
          />{" "}
          Yearly
        </label>
      </div>

      <div className="my-4 flex flex-col gap-2 text-xs md:flex-row md:text-sm">
        <label htmlFor="year-input">
          Enter Year:
          <input
            type="number"
            id="year-input"
            value={inputYear}
            onChange={(e) => setInputYear(Number(e.target.value))}
            min={2000}
            max={new Date().getFullYear()}
            className="ml-2 rounded border border-gray-300 p-2"
          />
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleSearchYear}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700"
          >
            Search Year
          </button>
          <button
            onClick={handleViewAllYears}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 active:bg-gray-700"
          >
            View All Years
          </button>
        </div>
      </div>
      {/* Highest and Lowest Counts */}
      <div className="my-4 text-sm">
        <h3 className="font-bold">Highest and Lowest Counts</h3>
        <div>
          <p className="flex items-center">
            <b className="mr-1">Highest:</b>
            {highestEntry
              ? `${highestEntry.date} - ${highestEntry.count} (${highestEntry.percentage}%)`
              : "N/A"}
            <FaAngleDoubleUp className="ml-1 inline-block text-green-600" />
          </p>
          <p className="flex items-center">
            <b className="mr-1">Lowest:</b>
            {lowestEntry
              ? `${lowestEntry.date} - ${lowestEntry.count} (${lowestEntry.percentage}%)`
              : "N/A"}
            <FaAngleDoubleDown className="ml-1 inline-block text-red-600" />
          </p>
        </div>
      </div>
      {/* Bar Chart */}
      <div className="h-[400px] w-full">
        <div className="h-full w-full" ref={chartRef}>
          <ResponsiveContainer>
            <BarChart width={600} height={300} data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => tick}
                stroke="#292929"
                tick={{ fontSize: 12, fill: "#292929" }}
                angle={-45}
                textAnchor="end"
                height={60}
                width={30}
              />
              <YAxis tick={{ fontSize: 12, fill: "#292929" }} width={30} />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                }}
                formatter={(value, name, props) => [
                  `Count: ${value}`,
                  `Percentage: ${props.payload.percentage}%`,
                ]}
              />
              <Legend />
              <Bar dataKey="count" fill="#ff6347" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Sorting Options */}
      <div className="my-4 flex gap-4">
        <button
          onClick={handleSort}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-xs text-white md:text-sm"
        >
          Sort by Count:{" "}
          {sortOrder === "asc" ? (
            <FaArrowUpWideShort />
          ) : (
            <FaArrowDownWideShort />
          )}
        </button>
        <button
          onClick={handleDateSort}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-xs text-white md:text-sm"
        >
          Sort by Date:{" "}
          {dateSortOrder === "asc" ? (
            <FaArrowUpWideShort />
          ) : (
            <FaArrowDownWideShort />
          )}
        </button>
      </div>
      {/* Data Table and Pagination */}
      <div className="mt-4">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Count</th>
              <th className="border border-gray-300 p-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr
                key={entry.date}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="border border-gray-300 p-2">{entry.date}</td>
                <td className="border border-gray-300 p-2">{entry.count}</td>
                <td className="border border-gray-300 p-2">
                  {entry.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default CompletedReports;
