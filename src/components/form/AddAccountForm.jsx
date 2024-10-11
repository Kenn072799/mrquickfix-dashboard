import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md"; // Import the camera icon
import Button from "../common/Button";
import FormTitle from "../common/FormTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Woman from "../../assets/woman.png";
import Man from "./../../assets/profile.png";

const AddAccountForm = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageSelection = (image) => {
    setSelectedImage(image);
    setFormData((prevData) => ({ ...prevData, profileImage: image }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { profileImage, firstName, lastName, email, password } = formData;

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

        <FormTitle className="text-center">Profile Picture</FormTitle>

        {/* Profile Image Selection */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border bg-slate-50 p-2">
          <div
            onClick={() => handleImageSelection(Man)}
            className={`cursor-pointer rounded ${selectedImage === Man ? "border-2 border-blue-500" : ""}`}
          >
            <img
              src={Man}
              alt="Man"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          <div
            onClick={() => handleImageSelection(Woman)}
            className={`cursor-pointer rounded ${selectedImage === Woman ? "border-2 border-blue-500" : ""}`}
          >
            <img
              src={Woman}
              alt="Woman"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Custom Image Upload */}
        <div className="group relative cursor-pointer">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer p-2">
            <div
              className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-primary-500 bg-gray-200 text-gray-400 ${selectedImage ? "" : "border-2 border-dashed"}`}
              style={{
                backgroundImage: selectedImage
                  ? `url(${selectedImage})`
                  : "none",
                backgroundSize: "cover",
              }}
            >
              {/* Overlay with Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-50">
                <MdCameraAlt
                  className="text-white opacity-0 group-hover:opacity-100"
                  size={20}
                />
              </div>
            </div>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 pt-4">
            <div>
              <label className="w-full text-sm font-semibold">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                required
                onChange={handleInputChange}
                className="w-full border p-2 outline-none"
              />
            </div>
            <div>
              <label className="w-full text-sm font-semibold">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                required
                onChange={handleInputChange}
                className="w-full border p-2 outline-none"
              />
            </div>
          </div>
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
