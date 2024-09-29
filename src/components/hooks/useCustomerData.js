import { useEffect, useState } from 'react';

const useCustomerData = () => {
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/SampleData/CustomerInquiryData.json'); // Replace with real API
        const data = await response.json();
        setDataLength(data.length);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);

  return dataLength;
};

export default useCustomerData;
