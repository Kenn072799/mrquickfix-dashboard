import React from "react";
import TitleCard from "../../common/TitleCard";
import CountUp from "react-countup";

const CancelledDB = () => {
  return (
    <div className="h-[150px] min-w-[300px] border-t-8 border-red-500 bg-white md:w-[300px]">
      <header className="py-2 text-center">
        <TitleCard>Cancelled</TitleCard>
      </header>
      <div className="flex items-center justify-center pt-4">
        <p className="text-5xl font-bold">
          <CountUp
            start={0}
            end={2} // Replace with actual lenght of data
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

export default CancelledDB;
