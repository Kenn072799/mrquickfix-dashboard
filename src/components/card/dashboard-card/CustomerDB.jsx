import React from "react";
import TitleCard from "../../common/TitleCard";
import useCustomerData from "../../hooks/useCustomerData";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const CustomerDB = () => {
  const { data, loading, error } = useCustomerData();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const dataLength = data.length;

  return (
    <Link to="/projects">
      <div className="h-[150px] min-w-[300px] border-t-8 border-slate-500 bg-white shadow-md md:w-[300px]">
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
    </Link>
  );
};

export default CustomerDB;
