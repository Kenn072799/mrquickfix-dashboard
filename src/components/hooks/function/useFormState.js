import { useState, useEffect } from "react";

const useFormState = (existingData) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobType: "",
    inspectionDate: "",
    admin: "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        firstName: existingData.firstName,
        lastName: existingData.lastName,
        email: existingData.email,
        phoneNumber: existingData.phoneNumber,
        jobType: existingData.jobType,
        inspectionDate: existingData.inspectionDate || "",
        admin: existingData.admin || "",
      });
    }
  }, [existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
  };
};

export default useFormState;
