import React from "react";
import TitleCard from "../../common/TitleCard";
import useCustomerData from "../../hooks/useCustomerData";
import CountUp from "react-countup";

const CustomerDB = () => {
  const dataLength = useCustomerData();

  return (
    <div className="h-[150px] min-w-[300px] border-t-8 border-slate-500 bg-white md:w-[300px]">
      <header className="py-2 text-center">
        <TitleCard>Client's Inquiry</TitleCard>
      </header>
      <div className="flex items-center justify-center pt-4">
        <p className="text-5xl font-bold">
          <CountUp
            start={0}
            end={dataLength} // Data from Sample Data
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

export default CustomerDB;
