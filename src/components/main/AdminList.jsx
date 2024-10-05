import React, { useState } from "react";
import AdminCard from "../card/admin-profile/adminCard";
import { useAdminData } from "../hooks/useDataHooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeletePopUp from "../common/popup/DeletePopUp";

const AdminList = () => {
  const { data: admins, loading, error } = useAdminData();
  const [isDeletePopUpVisible, setIsDeletePopUpVisible] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleDelete = (admin) => {
    setCustomerToDelete(admin);
    setIsDeletePopUpVisible(true);
  };

  const handleConfirmDelete = () => {
    // Add logic to delete here
    setIsDeletePopUpVisible(false);
    setCustomerToDelete(null);

    console.log("Deleting admin:", customerToDelete.adminName);
    toast.success(`${customerToDelete.adminName}'s account has been deleted successfully!`);
  };

  const handleCancelDelete = () => {
    setIsDeletePopUpVisible(false);
    setCustomerToDelete(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="bg-slate-100 p-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {admins.map((admin, index) => (
          <AdminCard
            key={index}
            adminProfile={admin.adminProfile}
            adminName={admin.adminName}
            adminRole={admin.adminRole}
            adminEmail={admin.adminEmail}
            onDelete={() => handleDelete(admin)}
          />
        ))}
      </div>

      {/* Delete Pop-up */}
      {isDeletePopUpVisible && (
        <DeletePopUp
          message={`This action cannot be undone. Are you sure you want to delete ${customerToDelete?.adminName}'s account?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </section>
  );
};

export default AdminList;
