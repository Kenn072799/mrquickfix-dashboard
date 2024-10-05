import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useCompletedData } from "../hooks/useCompleteDataChart";

const PieChartData = () => {
  const { data, loading, error } = useCompletedData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const pieData = data.map((entry) => ({
    name: entry.date,
    value: entry.completed,
  }));

  const colors = [
    "#115fa6",
    "#94ae0a",
    "#a61120",
    "#ff8809",
    "#ffd13e",
    "#800000",
    "#F25454",
    "#81BEF7",
    "#7D4B8B",
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#955251",
    "#B6B23E",
  ];

  return (
    <div className="h-[400px] w-full">
      <div className="h-full w-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #eaeaea",
                borderRadius: "5px",
              }}
              itemStyle={{
                color: "#000",
                fontWeight: "bold",
              }}
            />
            <Pie
              className="text-xs focus:outline-none md:text-base"
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name} (${value})`}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartData;
