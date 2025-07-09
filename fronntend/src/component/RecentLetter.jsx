import React, { useContext, useEffect, useState } from "react";
import { getAllLetters } from "../services/LetterServices";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/LetterContext";
import Loading from "./Loading";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import EditLetter from "./EditLetter";
import DeleteLetter from "./DeleteLetter";

function RecentLetter() {
  const [letters, setLetters] = useState([]);
  const { setSelectedLetter } = useContext(MyContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const data = await getAllLetters();
        setLetters((data && data.letters) ? data.letters : []); // Fix: default to [] if undefined
      } catch (error) {
        console.error("Error fetching letters:", error);
        setLetters([]); // Also set to [] on error
      }
    };
    fetchLetters();
  }, []);

  const handleClick = (letter) => {
    setSelectedLetter(letter);
    navigate(`/letter/${encodeURIComponent(letter.ReferenceNo)}`);
  };

  const toggleMenu = (letterId) => {
    setMenuOpen(menuOpen === letterId ? null : letterId);
  };

  const handleDeleteSuccess = (referenceNo) => {
    setLetters(letters.filter((letter) => letter.ReferenceNo !== referenceNo));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col gap-5 p-4 text-lg">
      <h1 className="text-2xl font-bold">Recent Letters</h1>

      {letters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
          {letters.map((letter) => (
            <div
              key={letter._id || "N/A"}
              className="relative border border-[#684df4] cursor-pointer text-gray-800 flex flex-col rounded-2xl p-5 shadow-md bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <div className="flex flex-col w-full" onClick={() => handleClick(letter)}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-[#684df4]">{letter.name || "N/A"}</h4>
                  <div className="relative menu-container">
                    <EllipsisVerticalIcon
                      className="h-6 w-6 text-gray-500 cursor-pointer hover:text-[#684df4] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(letter._id);
                      }}
                    />
                    {menuOpen === letter._id && (
                      <div className="absolute right-0 top-8 w-32 bg-white flex flex-col gap-2 p-2 border border-gray-300 rounded-lg shadow-lg z-10">
                        <EditLetter letterData={letter} onUpdateSuccess={() => setMenuOpen(null)} />
                        <DeleteLetter referenceNo={letter.ReferenceNo} onDeleteSuccess={handleDeleteSuccess} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Father's Name:</span> {letter.FatherName || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Ref No:</span> {letter.ReferenceNo || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">College:</span> {letter.collegeName || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Roll No:</span> {letter.rollNo || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Course:</span> {letter.courseName || "N/A"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {letter.createdAt ? new Date(letter.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default RecentLetter;
