import React from "react";
import PieChartData from "../PieChartData";
import Title from "../../common/Title";

const PieCompletedCard = () => {
  return (
    <div className="mb-24 w-full rounded-md border-t-8 border-primary-500 bg-white px-2 py-4 shadow-md md:px-8">
      <Title className="pb-8 md:text-center md:text-3xl">
        Completed Projects Data
      </Title>
      <div className="mb-4">
        <PieChartData />
      </div>
    </div>
  );
};

export default PieCompletedCard;
