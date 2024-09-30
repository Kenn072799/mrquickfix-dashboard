import { useState } from "react";

const useFormState = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    jobType: "",
    services: [],
    quotation: "",
    startDate: "",
    endDate: "",
    admin: "",
    inspectionDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleInputChange };
};

export default useFormState;