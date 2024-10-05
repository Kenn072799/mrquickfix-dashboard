import { useState, useEffect } from "react";

export const useCompletedData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/SampleData/CompleteData.json"); // Replace with real API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        //
        const months = [];
        for (let i = 0; i < 13; i++) {
          const date = new Date(currentYear, currentMonth - i);
          const monthName = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          months.push(`${monthName} ${year}`);
        }
        months.reverse();

        const dateCountMap = result.reduce((acc, curr) => {
          const date = new Date(curr.completeDate);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          const monthYear = `${month} ${year}`;

          if (acc[monthYear]) {
            acc[monthYear]++;
          } else {
            acc[monthYear] = 1;
          }
          return acc;
        }, {});

        const formattedData = months.map((monthYear) => ({
          date: monthYear,
          completed: dateCountMap[monthYear] || 0,
        }));

        setData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};