import React from "react";
import FormTitle from "../../common/FormTitle";
import { MdOutlineClose } from "react-icons/md";
import Button from "../../common/Button";

const UploadProjectForm = () => {
  return (
    <div className="relative mx-4 bg-white p-8 shadow-lg">
      {/* Close Button */}
      <button type="button" className="absolute right-2 top-2 flex justify-end">
        <MdOutlineClose className="h-8 w-8 rounded-full p-1 hover:bg-secondary-200 active:bg-secondary-200 active:text-secondary-500" />
      </button>
      <FormTitle>Upload Projects</FormTitle>
      <div className="my-4 h-[1px] w-full bg-secondary-500"></div>
      {/* Form */}
      <div className="max-h-[500px] min-w-[290px] overflow-y-auto bg-white md:max-h-[600px] md:min-w-[500px] md:max-w-[500px]">
        <form>
          {/* Project Name */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">
              Project Name:
            </label>
            <input
              type="text"
              name="project"
              required
              className="w-full border p-2 outline-none"
            />
          </div>
          {/* Categories */}
          {/* Add your own categories here */}
          <div className="mt-2">
            <label className="w-full text-sm font-semibold">Categories:</label>
            <input
              type="text"
              name="categories"
              required
              className="w-full border p-2 outline-none"
            />
          </div>
          {/* Submit Button */}
          <div className="mt-4">
            <Button variant="submit" size="sm">
              Upload
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProjectForm;
