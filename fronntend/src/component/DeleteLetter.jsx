import React, { useState } from "react";
import { deleteLetter } from "../services/LetterServices";
import { TrashIcon } from "@heroicons/react/24/solid";

function DeleteLetter({ referenceNo, onDeleteSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteLetter(referenceNo);
      setShowModal(false);
      onDeleteSuccess(referenceNo); 
    } catch (error) {
      console.error("Error deleting letter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 w-full flex justify-between transition duration-300"
      >
        Delete
        <TrashIcon className="h-6 w-6" />
      </button>

      {showModal && (
        <div className="fixed inset-0 cursor-default  bg-black bg-opacity-50 flex justify-center items-center z-50 ixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-2xl">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg border border-[#684df4] text-center">
            <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this letter? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition duration-300"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 cursor-pointer py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteLetter;
