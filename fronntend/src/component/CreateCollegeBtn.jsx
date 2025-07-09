import { PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { saveCollageName } from '../services/LetterServices';
import toast from 'react-hot-toast';

export default function CreateCollegeBtn({ onCollegeAdded }) {
    const [showModal, setShowModal] = React.useState(false);
    const [collegeName, setCollegeName] = React.useState('');
    const [collageLocation, setCollageLocation] = React.useState('');   


    const createCollage = async (e) => {

       

        try {
            const collegeNameTrimmed = collegeName.trim();
            const collageLocationTrimmed = collageLocation.trim();

            const collegeDetails = {
                collegeName: collegeNameTrimmed,
                location: collageLocationTrimmed
            }
            console.log("College Details:", collegeDetails);

            e.preventDefault();
            const response = await saveCollageName(collegeDetails);
            toast.success("College created successfully");
            setCollegeName('');
            setShowModal(false);
            if (onCollegeAdded) {
                onCollegeAdded();
            }
        } catch (error) {
            console.error("Error creating college:", error);
            toast.error("Error creating college");
        }
    };

    function openModal() {
        setShowModal(true);

    }

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={openModal}
                className="flex items-center gap-1 text-white bg-[#684df4]  p-4 rounded-lg text-sm font-medium hover:bg-indigo-600 transition duration-300 shadow-md"
                title="Add College"
            >
                <PlusIcon className="h-6 w-6 text-white" />

            </button>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
                    <div
                        className="bg-gray-100 border-2 border-blue-600 rounded-lg shadow-lg p-8 max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-800 text-2xl">✖</button>
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Add College</h2>
                        <div className="">
                            <input type="text" name="name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} placeholder="College Name" required className="w-full p-3 border text-black text-lg border-blue-600 rounded-lg" />
                            <input type="text" name="name" value={collageLocation} onChange={(e) => setCollageLocation(e.target.value)} placeholder="College Name" required className="w-full p-3 border text-black text-lg border-blue-600 rounded-lg" />
                            <div className="mt-4">
                                <button type="submit" onClick={createCollage} className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300">Add</button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
