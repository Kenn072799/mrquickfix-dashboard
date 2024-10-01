import React from "react";

const CompletePopUp = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-[90vw] max-w-md rounded-lg bg-white p-6 shadow-lg md:w-full">
        <h2 className="mb-4 text-xl font-bold">Complete Transaction</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletePopUp;
