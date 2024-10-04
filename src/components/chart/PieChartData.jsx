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
    "#FFC0CB",
    "#115fa6",
    "#94ae0a",
    "#a61120",
    "#ff8809",
    "#ffd13e",
    "#800000",
    "#F25454",
    "#81BEF7",
  ];

  return (
    <div className="h-[400px] w-full">
      <div className="h-full w-full">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip />
            <Pie
              className="text-xs focus:outline-none md:text-base"
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name} (${value})`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
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
