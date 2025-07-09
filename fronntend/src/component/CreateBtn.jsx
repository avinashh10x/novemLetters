import React, { useState, useContext, useEffect } from 'react';
import { createLetter, getAllLetters } from '../services/LetterServices';
import { data, Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/LetterContext';
import { PlusIcon } from '@heroicons/react/24/solid';
import SelectCollege from './SelectCollege';
import toast from 'react-hot-toast';
import CreateCollegeBtn from './CreateCollegeBtn';
import { getCollageNames } from '../services/LetterServices'; // Import getCollageNames

function CreateBtn() {
    const [showModal, setShowModal] = useState(false);
    const { setSelectedLetter, setLetters } = useContext(MyContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        FatherName: '',
        rollNo: '',
        gender: '',
        courseName: '',
        collegeName: '',
        enrollmentDate: '',
        trainingPeriod: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newLetter = await createLetter(formData);

            setSelectedLetter(newLetter);


            toast.success("Letter created successfully");
            setShowModal(false);

            
            navigate(`/letter/${encodeURIComponent(newLetter.ReferenceNo)}`);
        } catch (error) {
            console.error('Error creating letter:', error);
            toast.error("Error creating letter");
        }
    };

    const [collegeNames, setCollegeNames] = useState([]); // State to hold college names

    const fetchCollegeNames = async () => {
        try {
            const collegeNameResult = await getCollageNames();
            setCollegeNames(collegeNameResult.collageNames);
        } catch (error) {
            console.error("Error fetching college names:", error);
        }
    };

    useEffect(() => {
        fetchCollegeNames();
    }, []);

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="w-full bg-[#684df4] text-white cursor-pointer flex items-center justify-center gap-2 
             py-2 px-4 text-base 
             sm:py-3 sm:px-6 sm:text-lg
             rounded-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg"
            >
                Create Letter
                <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </button>


            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
                    <div
                        className="bg-gray-100 border-2 border-[#684df4] rounded-lg shadow-lg p-8 max-w-3xl w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-800 text-2xl">✖</button>

                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Create Letter</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                            {/* <label htmlFor="name">name</label> */}
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-3 border rounded-lg" />

                            <input type="text" name="FatherName" value={formData.FatherName} onChange={handleChange} placeholder="Father's Name" required className="w-full p-3 border rounded-lg" />

                            <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll No" required className="w-full p-3 border rounded-lg" />

                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border rounded-lg">

                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                            <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Course Name" required className="w-full p-3 border rounded-lg" />

                            <div className="flex w-full items-center gap-2">

                                <div className="flex-1">
                                    <SelectCollege
                                        collegeName={formData.collegeName}
                                        setFormData={setFormData}
                                        collegeNames={collegeNames}
                                        fetchCollegeNames={fetchCollegeNames}
                                    />
                                </div>
                                <div className="">
                                    <CreateCollegeBtn onCollegeAdded={fetchCollegeNames} />
                                </div>
                                </div>



                                <input type="date" min={"2025-01-01"} max={new Date().toISOString().split("T")[0]} name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} required className="w-full p-3 border rounded-lg" />

                                <select name="trainingPeriod" value={formData.trainingPeriod} onChange={handleChange} className="w-full p-3 border rounded-lg">
                                    <option value="" disabled>Select Training Period</option>
                                    <option value="6 months">6 months</option>
                                    <option value="45 days">45 days</option>
                                    <option value="21 days">21 days</option>
                                    <option value="30 days">30 days</option>
                                    {/* '21 days', '30 days */}
                                </select>

                                {/* <input type="text" name="ReferenceNo" value={formData.ReferenceNo} onChange={handleChange} placeholder="Reference No" required className="w-full p-3 border rounded-lg" /> */}

                                <div className="col-span-2 mt-4">
                                    <button type="submit" className="w-full bg-[#684df4] text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300">Submit</button>
                                </div>

                                <div className="col-span-2 text-center mt-4">
                                    <p className="text-gray-600">
                                        Want to create in <span className="font-semibold text-gray-800">bulk</span>?{" "}
                                        <Link to="/bulk-upload" className="text-[#684df4] font-medium hover:underline">
                                            Click here
                                        </Link>
                                    </p>
                                </div>


                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}


export default CreateBtn;

