import { useEffect, useState } from "react";

// Customer Data
export const useCustomerData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/SampleData/CustomerInquiryData.json'); // Replace with real API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
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

// Customers in table
export const useFetchCustomers = () => {
  const [data, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/SampleData/CustomerInquiryData.json"); // Replace with real API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
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

  const addCustomer = (newCustomer) => {
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  return { data, loading, error, addCustomer };
};

// In Progress
export const useInProgressData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/SampleData/InProgressData.json"); // Replace with real API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const sortedData = jsonData.sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
        setData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/SampleData/CustomerInquiryData.json"); // Replace with real API
        const data = await response.json();
        const readNotifications = JSON.parse(localStorage.getItem("readNotifications")) || [];
        const updatedNotifications = data.map(notification => ({
          ...notification,
          isNew: !readNotifications.includes(notification.id),
        }));

        const sortedNotifications = updatedNotifications.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setNotifications(sortedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isNew: false } : notification
      )
    );

    const readNotifications = JSON.parse(localStorage.getItem("readNotifications")) || [];
    if (!readNotifications.includes(id)) {
      readNotifications.push(id);
      localStorage.setItem("readNotifications", JSON.stringify(readNotifications));
    }
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return {
    notifications,
    markAsRead,
    visibleCount,
    loadMore,
  };
};

// On Process Data
export const useOnProcessData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/SampleData/OnProcessData.json"); // Replace with real API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const sortedData = jsonData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(sortedData);
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

// Completed Data
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
          setData(result);
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

// Cancelled Data
export const useCancelData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/SampleData/CancelData.json"); // Replace with real API
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  

  
    return { data, loading, error };
}