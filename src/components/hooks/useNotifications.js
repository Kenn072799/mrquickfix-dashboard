import { useState, useEffect } from "react";

const useNotifications = () => {
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

export default useNotifications;