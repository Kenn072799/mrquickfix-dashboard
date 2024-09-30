import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import useFetchInProgressData from "../../hooks/useFetchInProgressData";
import { GrStatusWarning } from "react-icons/gr";
import { FaRegCalendarCheck } from "react-icons/fa"; // Import for expected completion icon
import { Link } from "react-router-dom";

const InProgressDB = () => {
  const { data, loading, error } = useFetchInProgressData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const today = new Date().toLocaleDateString();

  const delayedProjects = data.filter((item) => {
    const endDate = new Date(item.endDate);
    return endDate < new Date();
  });

  const expectedCompletionToday = data.filter((item) => {
    return new Date(item.endDate).toLocaleDateString() === today;
  });

  const delayedCount = delayedProjects.length;
  const expectedCount = expectedCompletionToday.length;

  return (
    <Link to="/projects">
      <div className="relative h-[150px] min-w-[300px] border-t-8 border-yellow-500 bg-white shadow-md md:w-[300px]">
        {/* Delayed Projects Notification */}
        {delayedCount > 0 && (
          <div className="absolute right-2 top-2 flex items-center">
            <GrStatusWarning
              className="text-2xl"
              title={`${delayedCount} delayed project(s)`}
            />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {delayedCount}
            </span>
          </div>
        )}

        {/* Expected Completion Notification */}
        {expectedCount > 0 && (
          <div className="absolute right-2 top-10 flex items-center">
            <FaRegCalendarCheck
              className="text-2xl"
              title={`${expectedCount} project(s) expected to complete today`}
            />
            <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {expectedCount}
            </span>
          </div>
        )}

        <header className="py-2 text-center">
          <TitleCard>In Progress</TitleCard>
        </header>
        <div className="flex items-center justify-center pt-4">
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
