import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";
import { useCompletedData } from "../../hooks/useDataHooks";

const CompletedDB = () => {
  const { data, loading, error } = useCompletedData();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const dataLength = data.length;

  return (
    <div className="h-[150px] min-w-[300px] border-t-8 border-green-500 bg-white shadow-md md:w-[300px]">
      <header className="py-2 text-center">
        <TitleCard>Completed</TitleCard>
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
  );
};

export default CompletedDB;
