import React from "react";

const SkeletonLoaderTable = () => {
  return (
      <div className="h-[350px] w-full animate-pulse rounded-md bg-gray-100 shadow-md">
        <div className="h-full w-full rounded-md bg-slate-200 dark:bg-slate-300/50"></div>
      </div>
  );
};

export default SkeletonLoaderTable;
