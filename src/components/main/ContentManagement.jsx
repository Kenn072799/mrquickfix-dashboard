import React, { useState } from "react";
import Title from "../common/Title";
import Button from "../common/Button";
import ContentTable from "../table/ContentTable";
import { MdFileUpload } from "react-icons/md";
import ServicesTable from "../table/ServicesTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadProjectForm from "../form/ContentManagementForms/UploadProjectForm";
import AddServicesForm from "../form/ContentManagementForms/AddServicesForm";

const ContentManagement = () => {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const handleSubmit = () => {
    if (headline && description) {
      console.log("Headline:", headline);
      console.log("Description:", description);

      toast.success("Submitted successfully!");
      setError("");
      setHeadline("");
      setDescription("");
    } else {
      setError("Please fill out both the headline and description.");
    }
  };

  const toggleFormVisibility = (formType) => {
    setIsFormVisible(!isFormVisible);
    setActiveForm(formType);
  };

  return (
    <section className="p-4">
      <div className="py-8">
        <Title>Content Management</Title>
        <div className="my-4 flex w-full flex-col items-center justify-center rounded-md bg-white px-4 py-8 shadow-md">
          <div className="flex w-full flex-col items-center md:w-1/2">
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

          {/* Upload Button */}
          <div className="flex w-full justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => toggleFormVisibility("upload")}
            >
              <MdFileUpload size={20} className="mr-2" /> Upload Projects
            </Button>
          </div>

          {/* Project Table */}
          <div className="mt-8 w-full">
            <ContentTable />
          </div>

          {/* Services Button */}
          <div className="mt-12 flex w-full justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => toggleFormVisibility("addService")}
            >
              <MdFileUpload size={20} className="mr-2" /> Add Services
            </Button>
          </div>

          {/* Service Table */}
          <div className="mt-8 w-full">
            <ServicesTable />
          </div>
        </div>

        {/* Popup Form for Upload Projects */}
        {isFormVisible && activeForm === "upload" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <UploadProjectForm closeForm={() => setIsFormVisible(false)} />
          </div>
        )}

        {/* Popup Form for Add Services */}
        {isFormVisible && activeForm === "addService" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <AddServicesForm closeForm={() => setIsFormVisible(false)} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentManagement;
