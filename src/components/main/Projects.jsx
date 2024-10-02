import React, { useState } from "react";
import { FaCircle, FaPlus } from "react-icons/fa6";
import Title from "../common/Title";
import Button from "../common/Button";
import CustomerTable from "../table/CustomerTable";
import AddJobOrderForm from "../form/AddJobOrderForm";
import OnProcessTable from "../table/OnProcessTable";
import InProgressTable from "../table/InProgressTable";
import CompleteTable from "../table/CompleteTable";
import CancelTable from "../table/CancelTable";
import ProjectNavBar from "./navigation/ProjectNavBar";
import {
  useCancelData,
  useCompletedData,
  useCustomerData,
  useInProgressData,
  useOnProcessData,
} from "../hooks/useDataHooks";

const Projects = () => {
  const { data: customerData } = useCustomerData();
  const { data: onProcessData } = useOnProcessData();
  const { data: onProgressData } = useInProgressData();
  const { data: completeData } = useCompletedData();
  const { data: cancelData } = useCancelData();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <main className="bg-slate-100 p-4">
      <section className="flex justify-between rounded-md bg-white p-4 shadow-sm lg:flex-col xl:flex-row xl:items-center">
        <div className="lg:pb-5 xl:pb-0">
          <Button size="sm" variant="primary" onClick={openForm}>
            <FaPlus size={16} className="mr-2" />
            Add Job Order
          </Button>
        </div>
        <div className="flex justify-center">
          <ProjectNavBar />
        </div>
      </section>

      {/* Client's Inquiry Section */}
      <section id="client" className="py-8">
        <Title className="flex items-center">
          <FaCircle size={10} className="mr-2 text-slate-500" />
          Client's Inquiry <span className="ml-2 cursor-default" title="total"> - {customerData?.length || 0}</span>
        </Title>
        <section className="py-4">
          <CustomerTable />
        </section>

        {/* On Process Section */}
        <header id="onprocess">
          <Title className="flex items-center">
            <FaCircle size={10} className="mr-2 text-blue-500" />
            On Process <span className="ml-2 cursor-default" title="total"> - {onProcessData?.length || 0}</span>
          </Title>
        </header>
        <section className="py-4">
          <OnProcessTable />
        </section>

        {/* In Progress Section */}
        <header id="inprogress">
          <Title className="flex items-center">
            <FaCircle size={10} className="mr-2 text-yellow-500" />
            In Progress <span className="ml-2 cursor-default" title="total"> - {onProgressData?.length || 0}</span>
          </Title>
        </header>
        <section className="py-4">
          <InProgressTable />
        </section>

        {/* Complete Section */}
        <header id="completed">
          <Title className="flex items-center">
            <FaCircle size={10} className="mr-2 text-green-500" />
            Completed <span className="ml-2 cursor-default" title="total"> - {completeData?.length || 0}</span>
          </Title>
        </header>
        <section className="py-4">
          <CompleteTable />
        </section>

        {/* Cancel Section */}
        <header id="cancelled">
          <Title className="flex items-center">
            <FaCircle size={10} className="mr-2 text-red-500" />
            Cancelled <span className="ml-2 cursor-default" title="total"> - {cancelData?.length || 0}</span>
          </Title>
        </header>
        <section className="py-4">
          <CancelTable />
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
