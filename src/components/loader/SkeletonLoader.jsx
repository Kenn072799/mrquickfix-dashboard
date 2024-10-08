import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="h-[150px] min-w-[300px] animate-pulse rounded-md bg-gray-100 shadow-md md:w-[300px]">
      <div className="h-full w-full rounded-md bg-slate-200 dark:bg-slate-300/50"></div>
    </div>
  );
};

export default SkeletonLoader;
