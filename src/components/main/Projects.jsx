import React from "react";
import { FaCircle, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Title from "../common/Title";
import Button from "../common/Button";
import CustomerTable from "../table/CustomerTable";

const Projects = () => {
  return (
    <main className="bg-slate-100 p-4">
      <section className="flex flex-wrap gap-4 py-4">
        <div className="flex">
          <input
            placeholder="Search"
            className="w-full border border-slate-300 px-2 outline-none md:p-2"
            type="text"
          />
          <Button size="sm" variant="primary">
            <IoIosSearch size={16} className="mr-2" />
            Search
          </Button>
        </div>
        <Button size="sm" variant="primary">
          <FaPlus size={16} className="mr-2" />
          Add Job Order
        </Button>
      </section>
      <section className="py-8">
        <Title className="flex items-center">
          <FaCircle size={10} className="mr-2 text-slate-500" />
          Client's Inquiry
        </Title>
        <section className="py-4">
          <CustomerTable />
        </section>
        <Title className="flex items-center">
          <FaCircle size={10} className="mr-2 text-blue-500" />
          On Process
        </Title>
      </section>
    </main>
  );
};

export default Projects;
