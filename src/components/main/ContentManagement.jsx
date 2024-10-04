import React from "react";
import Title from "../common/Title";
import Button from "../common/Button";
import ContentTable from "../table/ContentTable";

const email = "kenneth@mr.quickfix.com";

const ContentManagement = () => {
  return (
    <section className="p-4">
      <div className="py-8">
        <Title>Content Management</Title>
        <div className="my-4 flex w-full flex-col items-center justify-center rounded-md bg-white px-4 py-8 shadow-md">
          <div className="flex w-full flex-col md:w-1/2 md:min-w-[900px]">
            {/* Headline */}
            <input
              type="text"
              placeholder="Headline:"
              className="border border-gray-300 bg-gray-50 p-4 outline-none"
            />
            {/* Description */}
            <textarea
              placeholder="Description:"
              className="mt-4 w-full border border-gray-300 bg-gray-50 p-4 outline-none"
              rows="5"
            ></textarea>
            {/* Button */}
            <div className="mt-4 w-1/2">
              <Button variant="submit" size="sm">
                Submit
              </Button>
            </div>
          </div>

          <div className="my-12 h-[1px] w-full bg-slate-100 md:my-24"></div>

          {/* Table */}
          <div className="mt-8 w-full">
            <ContentTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentManagement;
