import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCompletedData, useCancelData } from "../../hooks/useDataHooks";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import html2canvas from "html2canvas";

const GeneralComparison = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comparisonData, setComparisonData] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);
  const [percentageDifference, setPercentageDifference] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chartRef = useRef();

  const {
    data: completedData,
    loading: loadingCompleted,
    error: errorCompleted,
  } = useCompletedData();
  const {
    data: canceledData,
    loading: loadingCanceled,
    error: errorCanceled,
  } = useCancelData();

  const handleSearch = () => {
    if (!startDate || !endDate) return;

    const filteredCompleted = completedData.filter((item) => {
      const date = new Date(item.completeDate);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    const filteredCanceled = canceledData.filter((item) => {
      const date = new Date(item.cancelDate);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });

    const groupedCompleted = filteredCompleted.reduce((acc, curr) => {
      const dateStr = new Date(curr.completeDate).toLocaleDateString();
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});

    const groupedCanceled = filteredCanceled.reduce((acc, curr) => {
      const dateStr = new Date(curr.cancelDate).toLocaleDateString();
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {});

    const allDates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    let totalCompletedCount = 0;
    let totalCanceledCount = 0;

    while (currentDate <= end) {
      const dateStr = currentDate.toLocaleDateString();
      const completedCount = groupedCompleted[dateStr] || 0;
      const canceledCount = groupedCanceled[dateStr] || 0;

      totalCompletedCount += completedCount;
      totalCanceledCount += canceledCount;

      allDates.push({
        date: dateStr,
        completed: completedCount,
        canceled: canceledCount,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setComparisonData(allDates);
    setTotalCompleted(totalCompletedCount);
    setTotalCanceled(totalCanceledCount);

    if (totalCompletedCount + totalCanceledCount > 0) {
      const percentage =
        ((totalCompletedCount - totalCanceledCount) /
          (totalCompletedCount + totalCanceledCount)) *
        100;
      setPercentageDifference(percentage.toFixed(2));
    } else {
      setPercentageDifference(null);
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setComparisonData([]);
    setTotalCompleted(0);
    setTotalCanceled(0);
    setPercentageDifference(null);
  };

  const handleDownloadPNG = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "general_comparison_chart.png";
      link.click();
    });
  };

  const handleDownloadCSV = () => {
    const csvData = comparisonData.map(
      ({ date, completed, canceled }) => `${date},${completed},${canceled}`,
    );
    const csvContent = `data:text/csv;charset=utf-8,Date,Completed,Canceled\n${csvData.join(
      "\n",
    )}`;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "general_comparison_data.csv";
    link.click();
  };

  useEffect(() => {
    if (errorCompleted) {
      console.error("Error fetching completed data:", errorCompleted);
    }
    if (errorCanceled) {
      console.error("Error fetching canceled data:", errorCanceled);
    }
  }, [errorCompleted, errorCanceled]);

  useEffect(() => {
    if (!startDate && !endDate && completedData && canceledData) {
      const recentCompleted = completedData.reduce((acc, curr) => {
        const dateStr = new Date(curr.completeDate).toLocaleDateString();
        acc[dateStr] = (acc[dateStr] || 0) + 1;
        return acc;
      }, {});

      const recentCanceled = canceledData.reduce((acc, curr) => {
        const dateStr = new Date(curr.cancelDate).toLocaleDateString();
        acc[dateStr] = (acc[dateStr] || 0) + 1;
        return acc;
      }, {});

      const lastSevenDays = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toLocaleDateString();
        const completedCount = recentCompleted[dateStr] || 0;
        const canceledCount = recentCanceled[dateStr] || 0;

        lastSevenDays.push({
          date: dateStr,
          completed: completedCount,
          canceled: canceledCount,
        });
      }

      setComparisonData(lastSevenDays);
    }
  }, [completedData, canceledData, startDate, endDate]);

  if (loadingCompleted || loadingCanceled) return <p>Loading...</p>;

  return (
    <>
      <div className="relative flex pb-4">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <label className="flex w-full flex-col text-xs font-semibold md:text-sm">
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-4 py-2"
              />
            </label>
            <label className="mr-2 flex w-full flex-col text-xs font-semibold md:text-sm">
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border px-4 py-2"
              />
            </label>
          </div>
          <div className="flex gap-2 py-2">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600 active:bg-blue-700 md:text-sm"
              onClick={handleSearch}
            >
              Compare
            </button>
            <button
              onClick={handleReset}
              className="rounded bg-gray-500 px-4 py-2 text-xs text-white hover:bg-gray-600 active:bg-gray-700 md:text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
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

      {percentageDifference !== null && (
        <div className="flex flex-col pb-4 text-sm">
          <p className="mr-1">
            <b>Total Completed:</b> {totalCompleted}
          </p>
          <p className="mr-1">
            <b>Total Canceled:</b> {totalCanceled}
          </p>
          <p className="flex items-center">
            <b className="mr-1">Percentage Difference:</b>{" "}
            {percentageDifference}%
            {percentageDifference > 0 ? (
              <FaAngleDoubleUp className="ml-1 text-green-500" />
            ) : percentageDifference < 0 ? (
              <FaAngleDoubleDown className="ml-1 text-red-500" />
            ) : null}
          </p>
        </div>
      )}

      {comparisonData.length > 0 && (
        <div className="relative h-[400px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#292929" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#8884d8"
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="canceled"
                stroke="#FF0000"
                name="Canceled"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default GeneralComparison;
