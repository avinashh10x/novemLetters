import React, { useContext, useState } from "react";
import { updateLetter } from "../services/LetterServices";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { MyContext } from "../context/LetterContext";
import toast from "react-hot-toast";

function EditLetter({ letterData, onUpdateSuccess }) {
    const { fetchLetters } = useContext(MyContext);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ ...letterData });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLetter(formData);
            await fetchLetters();
            toast.success("Letter updated successfully!");
            setShowModal(false);
            onUpdateSuccess(formData);
        } catch (error) {
            console.log("Error updating letter.", error);
            toast.error("Error updating letter.");
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-[#684df4] cursor-pointer mb-2  text-white px-4 py-2 rounded-lg w-full flex justify-between hover:bg-blue-600 transition duration-300"
            >
                Edit
                <PencilSquareIcon className="h-6 w-6" />
            </button>

            {showModal && (
                <div
                    className="fixed inset-0 flex z-50 items-center justify-center bg-black/50 backdrop-blur-md"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-xl border border-[#684df4] w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Edit Letter</h2>

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="text"
                                name="FatherName"
                                value={formData.FatherName}
                                onChange={handleChange}
                                placeholder="Father's Name"
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleChange}
                                placeholder="Roll No"
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input
                                type="text"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                placeholder="Course Name"
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="text"
                                name="collegeName"
                                value={formData.collegeName}
                                onChange={handleChange}
                                placeholder="college Name"
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <input
                                type="date"
                                name="enrollmentDate"
                                value={
                                    formData.enrollmentDate
                                        ? new Date(formData.enrollmentDate).toISOString().split('T')[0]
                                        : ""
                                }
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                            <select
                                name="trainingPeriod"
                                value={formData.trainingPeriod}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            >
                                <option value="6 months">6 months</option>
                                <option value="45 days">45 days</option>
                            </select>

                            <input
                                type="text"
                                name="ReferenceNo"
                                value={formData.ReferenceNo}
                                disabled
                                className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed"
                            />


                            <div className="col-span-2 mt-4 flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-[#684df4]  text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditLetter;
