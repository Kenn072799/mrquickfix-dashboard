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
    <div className="h-[400px] w-full overflow-x-auto">
      <div className="h-full w-[1200px] md:w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#3d3d3d"
              strokeOpacity="0.2"
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#f85f16" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartData;
