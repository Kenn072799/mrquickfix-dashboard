import React from "react";

const displayedData = [
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
  { project: "Sample Project", services: "Sample Service" },
];

const ContentTable = () => {
  return (
    <div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="min-w-[100px] border border-gray-300 bg-primary-500 p-2 text-center text-xs text-white md:text-base">
              Project Name
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-primary-500 p-2 text-center text-xs text-white md:text-base">
              Categories
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-primary-500 p-2 text-center text-xs text-white md:text-base">
              Date
            </th>
            <th className="min-w-[100px] border border-gray-300 bg-primary-500 p-2 text-center text-xs text-white md:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? (
            displayedData.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-primary-50"}`}
              >
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.project}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.services}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.services}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-base">
                  {item.services}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="p-4 text-center text-xs sm:text-sm md:text-base"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
