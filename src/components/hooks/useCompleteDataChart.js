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

        const dateCountMap = result.reduce((acc, curr) => {
          const date = new Date(curr.completeDate);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();
          const monthYear = `${month} ${year}`;

          if (acc[monthYear]) {
            acc[monthYear]++;
          } else {
            acc[monthYear] = 1;
          }
          return acc;
        }, {});

        const formattedData = Object.keys(dateCountMap).map((monthYear) => ({
          date: monthYear,
          completed: dateCountMap[monthYear],
        }));

        formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

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
