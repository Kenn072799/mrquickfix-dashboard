import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import { useCancelData } from "../../hooks/useDataHooks";
import { Link } from "react-router-dom";

const CancelledDB = () => {
  const { data, loading, error } = useCancelData();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const dataLength = data.length;

  return (
    <Link to="/projects">
      <div className="h-[150px] min-w-[300px] rounded-md border-t-8 border-red-500 bg-white shadow-md md:w-[300px]">
        <header className="flex items-center border-b py-4 pl-4">
          <TitleCard>Cancelled</TitleCard>
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

export default CancelledDB;
