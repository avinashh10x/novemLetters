import React, { useContext, useState } from 'react'
import { MyContext } from '../context/LetterContext'
import Loading from '../component/Loading';
import { useNavigate } from 'react-router-dom';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import EditLetter from '../component/EditLetter';
import DeleteLetter from '../component/DeleteLetter';
import { useLocation } from "react-router-dom";
import SearchBar from '../component/Searchbar';

function ResultPage() {
    const { setSelectedLetter, searchResults } = useContext(MyContext)
    const [menuOpen, setMenuOpen] = useState(null);

    // console.log("selectedLetter from result page", selectedLetter);
    const location = useLocation();
    const { keyword, collegeName, courseName } = location.state || {};


    const navigate = useNavigate();

    console.log("search results in ResultPage", searchResults);


    const handleClick = (letter) => {
        setSelectedLetter(letter);
        navigate(`/letter/${encodeURIComponent(letter.ReferenceNo)}`);
    }

    const toggleMenu = (letterId) => {
        setMenuOpen(menuOpen === letterId ? null : letterId);
    };


    return (
        <div className="container mx-auto p-6">
            {/* <SearchBar/> */}
            {keyword && <h2 className="text-2xl text-center mb-6" >Search Results for: <span className='font-bold'> {keyword}</span></h2>}
            {collegeName || courseName && <h2 className="text-2xl text-center mb-6">Filtered by: <span className='font-bold'>{collegeName || ""} {courseName || ""}</span> </h2>}

            {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 min-h-[calc(100vh-268px)] rounded-2xl p-4 gap-4">
                    {searchResults.map((letter) => (
                        <div
                            key={letter._id}
                            onClick={() => handleClick(letter)}
                            className="relative bg-white h-48  shadow-lg cursor-pointer rounded-lg p-6 border border-gray-300 hover:shadow-xl transition duration-200"
                        >
                            <h3 className="text-lg font-semibold text-indigo-600">{letter.name || "N/A"}</h3>
                            <p className="text-gray-700 text-sm">Father&apos;s Name: <b>{letter.FatherName || "N/A"}</b></p>
                            <p className="text-gray-700 text-sm">Ref No: {letter.ReferenceNo || "N/A"}</p>
                            <p className="text-gray-700 text-sm">Roll No: {letter.rollNo || "N/A"}</p>
                            <p className="text-gray-700 text-sm">Course: {letter.courseName || "N/A"}</p>
                            <p className="text-gray-600 text-sm mt-2">Date: {letter.createdAt ? new Date(letter.createdAt).toLocaleDateString() : "N/A"}</p>

                            <div className="absolute top-3 right-3">
                                <EllipsisVerticalIcon
                                    className="h-5 w-5 text-gray-500 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMenu(letter._id);
                                    }}
                                />
                                {menuOpen === letter._id && (
                                    <div
                                        className="absolute cursor-pointer right-0 top-6 bg-white shadow-md rounded-lg p-2 border border-gray-300 w-32"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <EditLetter letterData={letter} />
                                        <DeleteLetter referenceNo={letter.ReferenceNo} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className=' w-full h-[calc(100vh-268px)] flex items-center justify-center rounded-2xl'>
                    <Loading />
                </div>
            )}
        </div>
    );



}

export default ResultPage