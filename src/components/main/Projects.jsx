import React, { useState } from "react";
import { FaCircle, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Title from "../common/Title";
import Button from "../common/Button";
import CustomerTable from "../table/CustomerTable";
import AddJobOrderForm from "../form/AddJobOrderForm";
import OnProcessTable from "../table/OnProcessTable";
import InProgressTable from "../table/InProgressTable";

const Projects = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

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
        <Button size="sm" variant="primary" onClick={openForm}>
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
        <section className="py-4">
          <OnProcessTable />
        </section>
        <Title className="flex items-center">
          <FaCircle size={10} className="mr-2 text-yellow-500" />
          In Progress
        </Title>
        <section className="py-4">
          <InProgressTable />
        </section>
      </section>

      {isFormOpen && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/20"
            onClick={closeForm}
          ></div>

          {/* Form Popup */}
          <div className="fixed inset-0 z-30 flex items-center justify-center">
            <AddJobOrderForm onClose={closeForm} />
          </div>
        </>
      )}
    </main>
  );
};

export default Projects;
