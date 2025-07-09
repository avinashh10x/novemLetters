import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import React, { useContext, useState, useEffect } from 'react'
import { getSearchedLetter, getCollageNames, getCourseNames } from '../services/LetterServices';
import { MyContext } from '../context/LetterContext';
import { useNavigate } from "react-router-dom";



function FilterBtn() {
    const [showModal, setShowModal] = useState(false);
    const [filterLetter, setFilterLetter] = useState('');
    const [error, setError] = useState(null);
    const [collegeName, setCollegeName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [collegeNames, setCollegeNames] = useState([]);
    const [courseNames, setCourseNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setSearchResults } = useContext(MyContext)

    const navigate = useNavigate();

    // Fetch college and course names when component mounts or modal opens
    useEffect(() => {
        if (showModal) {
            fetchCollegeAndCourseNames();
        }
    }, [showModal]);

    const fetchCollegeAndCourseNames = async () => {
        setLoading(true);
        try {
            // Fetch college names
            const collegeResponse = await getCollageNames();
            if (collegeResponse && collegeResponse.collageNames) {
                setCollegeNames(collegeResponse.collageNames);
            }

            // Fetch course names
            const courseResponse = await getCourseNames();
            if (courseResponse && courseResponse.courseNames) {
                setCourseNames(courseResponse.courseNames);
            }
        } catch (error) {
            console.error("Error fetching filter data:", error);
            setError("Failed to load filter options. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };


    const handleFilterLetter = async (e) => {
        e.preventDefault();
        try {
            const filteredLettersFromApi = await getSearchedLetter(collegeName, courseName);

            if (!filteredLettersFromApi.length) {
                setError("No matching letters found.");
                return;
            }
            await setSearchResults(filteredLettersFromApi);
            navigate("/result", { state: { collegeName, courseName } });


            //    console.log();

        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error(error);
        }
    };


    return (
        <div>
            <button
                className="w-full bg-[#684df4] text-white cursor-pointer flex items-center justify-center gap-2 
             py-2 px-4 text-base 
             sm:py-3 sm:px-6 sm:text-lg
             rounded-lg font-medium hover:bg-blue-600 transition duration-300 shadow-lg"
                onClick={() => setShowModal(true)}
            >
                Filter Letter
                <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
            </button>

            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-10"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Filter Letter</h2>

                        {loading ? (
                            <div className="text-center py-4">Loading filter options...</div>
                        ) : (
                            <form onSubmit={handleFilterLetter} className="flex justify-between space-x-4">
                                <div className="w-1/2" >
                                    <label className="block text-left text-gray-700">College</label>
                                    <select
                                        name="collegeName"
                                        value={collegeName}
                                        onChange={(e) => {
                                            setCollegeName(e.target.value);
                                            setError(null);
                                        }}
                                        className="w-full p-3 border rounded-lg text-lg"
                                    >
                                        <option value="" disabled>Select College</option>
                                        {collegeNames.map((college, index) => (
                                            <option key={index} value={college}>{college}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-1/2">
                                    <label className="block text-left text-gray-700">Course</label>
                                    <select
                                        name="course"
                                        value={courseName}
                                        onChange={(e) => {
                                            setCourseName(e.target.value);
                                            setError(null);
                                        }}
                                        className="w-full p-3 border rounded-lg text-lg"
                                    >
                                        <option value="" disabled>Select Course</option>
                                        {courseNames.map((course, index) => (
                                            <option key={index} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterBtn;
