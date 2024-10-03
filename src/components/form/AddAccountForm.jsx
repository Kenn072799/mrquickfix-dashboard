import React, { useState } from "react";
import Button from "../common/Button";
import FormTitle from "../common/FormTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAccountForm = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = formData;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least 1 uppercase letter.");
    } else if (!/[0-9]/.test(password)) {
      setError("Password must contain at least 1 number.");
    } else {
      console.log("Account created:", formData);
      toast.success("Welcome to Mr. Quick Fix!");
      navigate("/welcome");
      setError("");
    }
  };

  return (
    <div className="rounded-md bg-white p-8 shadow-sm md:h-[700px]">
      <FormTitle className="text-center">Create New Account</FormTitle>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              required
              onChange={handleInputChange}
              className="w-full border p-2 outline-none"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="submit" size="sm">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountForm;
