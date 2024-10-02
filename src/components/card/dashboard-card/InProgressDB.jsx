import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import { GrStatusWarning } from "react-icons/gr";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useInProgressData } from "../../hooks/useDataHooks";

const InProgressDB = () => {
  const { data, loading, error } = useInProgressData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const today = new Date();

  // Check end date
  const isDatePast = (endDate) => {
    const end = new Date(endDate);
    return (
      end.getFullYear() < today.getFullYear() ||
      (end.getFullYear() === today.getFullYear() &&
        end.getMonth() < today.getMonth()) ||
      (end.getFullYear() === today.getFullYear() &&
        end.getMonth() === today.getMonth() &&
        end.getDate() < today.getDate())
    );
  };

  const delayedProjects = data.filter((item) => isDatePast(item.endDate));
  const delayedCount = delayedProjects.length;

  // Filter data for projects expected to complete today
  const expectedCompletionToday = data.filter((item) => {
    return (
      new Date(item.endDate).toLocaleDateString() === today.toLocaleDateString()
    );
  });
  const expectedCount = expectedCompletionToday.length;

  return (
    <Link to="/projects">
      <div className="relative h-[150px] min-w-[300px] rounded-md border-t-8 border-yellow-500 bg-white shadow-md md:w-[300px]">
        {/* Delayed Projects Notification */}
        {delayedCount > 0 && (
          <div
            className="absolute right-14 top-4 flex items-center"
            title={`${delayedCount} delayed project(s)`}
          >
            <GrStatusWarning className="text-2xl" />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {delayedCount}
            </span>
          </div>
        )}

        {/* Expected Completion Notification */}
        {expectedCount > 0 && (
          <div
            className="absolute right-4 top-4 flex items-center"
            title={`${expectedCount} project(s) expected to complete today`}
          >
            <FaRegCalendarCheck className="text-2xl" />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {expectedCount}
            </span>
          </div>
        )}

        <header className="flex items-center border-b py-4 pl-4">
          <TitleCard>In Progress</TitleCard>
        </header>
        <div className="flex items-center pl-4 pt-4">
          <p className="text-5xl font-bold">
            <CountUp
              start={0}
              end={data.length}
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

export default InProgressDB;
