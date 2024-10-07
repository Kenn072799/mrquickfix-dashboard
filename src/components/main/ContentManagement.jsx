import React, { useState } from "react";
import Title from "../common/Title";
import Button from "../common/Button";
import ContentTable from "../table/ContentTable";
import { MdFileUpload } from "react-icons/md";
import ServicesTable from "../table/ServicesTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContentManagement = () => {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Handle the form submission logic here
    if (headline && description) {
      console.log("Headline:", headline);
      console.log("Description:", description);

      toast.success("Project added successfully!");
      setHeadline("");
      setDescription("");
    } else {
      setError("Please fill out both the headline and description.");
    }
  };

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>Content Management</Title>
        <div className="my-4 flex w-full flex-col items-center justify-center rounded-md bg-white px-4 py-8 shadow-md">
          <div className="flex w-full flex-col items-center md:w-1/2 md:min-w-[900px]">
            {/* Headline */}
            <input
              type="text"
              placeholder="Headline:"
              className="w-full border border-gray-300 bg-gray-50 px-4 py-2 outline-none md:w-1/2"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            {/* Description */}
            <textarea
              placeholder="Description:"
              className="mt-4 w-full border border-gray-300 bg-gray-50 px-4 py-2 outline-none md:w-1/2"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* Error message */}
            {error && <p className="pt-1 text-sm text-red-500">{error}</p>}
            {/* Button */}
            <div className="mt-4 w-full md:w-1/2">
              <Button variant="submit" size="sm" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>

          <div className="my-12 h-[1px] w-full bg-gray-300 md:my-12"></div>

          <div className="flex w-full justify-end">
            <Button variant="primary" size="sm">
              <MdFileUpload size={20} className="mr-2" /> Upload Project
            </Button>
          </div>

          {/* Project Table */}
          <div className="mt-8 w-full">
            <ContentTable />
          </div>
          {/* Service Table */}
          <div className="mt-8 w-full">
            <ServicesTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentManagement;
