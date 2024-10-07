import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCompletedData } from "../hooks/useCompleteDataChart";

const LineChartData = () => {
  const { data, loading, error } = useCompletedData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-[400px] w-full">
      <div className="h-full w-full md:w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              stroke="#3d3d3d"
              vertical={false}
              strokeOpacity="0.2"
              strokeWidth={0.5}
            />
            <XAxis
              dataKey="date"
              stroke="#292929"
              tickFormatter={(tick) => tick}
              tick={{ fontSize: 12, fill: "#292929" }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={50}
            />
            <YAxis
              dataKey="completed"
              stroke="#292929"
              tick={{ fontSize: 12, fill: "#292929" }}
              width={30}
            />
            <Tooltip cursor={{ stroke: "#f85f16" }} />
            <Line
              dataKey="completed"
              stroke="#f85f16"
              activeDot={{
                r: 5,
                fill: "#f85f16",
                stroke: "#f85f16",
              }}
              dot={{
                r: 2,
                fill: "#292929",
                stroke: "#292929",
              }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartData;
