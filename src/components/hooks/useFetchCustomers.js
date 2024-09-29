import { useState, useEffect } from "react";

const useFetchCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/SampleData/CustomerInquiryData.json");
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        const uniqueIds = new Set();
        const uniqueCustomers = data.filter(customer => {
          if (uniqueIds.has(customer.id)) {
            return false;
          }
          uniqueIds.add(customer.id);
          return true;
        });
        const sortedData = uniqueCustomers.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setCustomers(sortedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { customers, loading, error };
};

export default useFetchCustomers;