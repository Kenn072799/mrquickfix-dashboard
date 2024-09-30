import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import useFetchInProgressData from "../../hooks/useFetchInProgressData";
import { Link } from "react-router-dom";

const InProgressDB = () => {
  const { data, loading, error } = useFetchInProgressData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Link to="/projects">
      <div className="h-[150px] min-w-[300px] border-t-8 border-yellow-500 bg-white shadow-md md:w-[300px]">
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
