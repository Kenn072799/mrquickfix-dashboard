import React, { useState, useRef } from "react";
import FormTitle from "../../common/FormTitle";
import { MdOutlineClose } from "react-icons/md";
import Button from "../../common/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddServicesForm = ({ closeForm }) => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceName || !description) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!image) {
      setError("Please upload an image.");
      return;
    }
    setError(null);

    console.log("Service Name:", serviceName);
    console.log("Description:", description);
    console.log("Image:", image);

    toast.success("Service added successfully!");
    closeForm();
  };

  return (
    <div className="relative mx-4 bg-white p-8 shadow-lg">
      {/* Close Button */}
      <button
        type="button"
        className="absolute right-2 top-2 flex justify-end"
        onClick={closeForm}
      >
        <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
      </button>
      <FormTitle>Add Services</FormTitle>
      <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
      <div className="max-h-[500px] overflow-y-auto bg-white md:max-h-[600px] md:max-w-[500px]">
        <form>
          {error && (
            <div className="rounded-md border border-red-700 bg-red-100 p-2 text-center text-xs text-red-700">
              {error}
            </div>
          )}
          {/* Service Name */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Service Name:
            </label>
            <input
              type="text"
              name="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
              className="w-full border p-2 outline-none"
            />
          </div>
          {/* Description */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Description:</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border p-2 outline-none"
            />
          </div>
          {/* Image Upload */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Image:</label>
            <input
              type="file"
              name="image"
              ref={imageInputRef}
              onChange={handleImageChange}
              className="w-full border p-2 outline-none"
              accept="image/*"
            />
            {image && (
              <div className="relative mt-2 h-24 w-24">
                <img
                  src={image}
                  alt="Image Preview"
                  className="h-full w-full object-cover"
                />
                <MdOutlineClose
                  onClick={removeImage}
                  className="absolute right-1 top-1 h-6 w-6 cursor-pointer rounded-full bg-white text-red-500 hover:bg-gray-200"
                />
              </div>
            )}
          </div>
          {/* Submit Button */}
          <div className="mt-4">
            <Button variant="submit" size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServicesForm;
