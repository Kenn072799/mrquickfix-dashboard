import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import useOnProcessData from "../../hooks/useOnProcessData";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const OnProcessCardDB = () => {
  const { data, loading, error } = useOnProcessData();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  const dataLength = data.length;
  const today = new Date().toLocaleDateString();
  const scheduledToday = data.filter(
    (item) => new Date(item.inspectionDate).toLocaleDateString() === today,
  );

  const scheduledCount = scheduledToday.length;

  return (
    <Link to="/projects">
      <div className="relative h-[150px] min-w-[300px] border-t-8 border-blue-500 bg-white shadow-md md:w-[300px]">
        {scheduledCount > 0 && (
          <div className="absolute right-2 top-2 flex items-center">
            <FaRegCalendarCheck
              className="relative text-2xl"
              title={`${scheduledCount} inspections scheduled for today`}
            />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {scheduledCount}
            </span>
          </div>
        )}

        <header className="py-2 text-center">
          <TitleCard>On Process</TitleCard>
        </header>
        <div className="flex items-center justify-center pt-4">
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
