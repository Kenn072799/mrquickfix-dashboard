import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useOnProcessData } from "../../hooks/useDataHooks";

const OnProcessCardDB = () => {
  const { data, loading, error } = useOnProcessData();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  const dataLength = data.length;
  const today = new Date();

  // Filter for inspections scheduled for today
  const scheduledToday = data.filter(
    (item) =>
      new Date(item.inspectionDate).toLocaleDateString() ===
      today.toLocaleDateString(),
  );
  const scheduledCount = scheduledToday.length;

  // Filter for waiting quotations (inspections not scheduled for today)
  const waitingQuotations = data.filter((item) => {
    const inspectionDate = new Date(item.inspectionDate);
    return (
      inspectionDate.getFullYear() > today.getFullYear() ||
      (inspectionDate.getFullYear() === today.getFullYear() &&
        inspectionDate.getMonth() > today.getMonth()) ||
      (inspectionDate.getFullYear() === today.getFullYear() &&
        inspectionDate.getMonth() === today.getMonth() &&
        inspectionDate.getDate() <= today.getDate())
    );
  });
  const waitingCount = waitingQuotations.length;

  return (
    <Link to="/projects">
      <div className="relative h-[150px] min-w-[300px] border-t-8 border-blue-500 bg-white shadow-md md:w-[300px]">
        {/* Waiting Quotations Notification */}
        {waitingCount > 0 && (
          <div
            className="absolute right-4 top-4 flex items-center"
            title={`${waitingCount} quotation(s) waiting`}
          >
            <FaClockRotateLeft className="text-2xl" />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {waitingCount}
            </span>
          </div>
        )}

        {/* Scheduled Inspections Notification */}
        {scheduledCount > 0 && (
          <div
            className="absolute right-14 top-4 flex items-center"
            title={`${scheduledCount} inspection(s) scheduled for today`}
          >
            <FaRegCalendarAlt className="relative text-2xl" />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {scheduledCount}
            </span>
          </div>
        )}

        <header className="flex items-center pl-4 py-4 border-b">
          <TitleCard>On Process</TitleCard>
        </header>
        <div className="flex items-center pl-4 pt-4">
          <p className="text-5xl font-bold">
            <CountUp
              start={0}
              end={dataLength}
              duration={2}
              prefix=""
              suffix=""
              redraw={true}
            />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OnProcessCardDB;
