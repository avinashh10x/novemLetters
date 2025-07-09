import React, { useState, useContext } from "react";
import { MyContext } from "../context/LetterContext";
import { getSearchedLetter } from "../services/LetterServices";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const { setSearchResults } = useContext(MyContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setError("Please enter a reference number");
            return;
        }
        setError(null);

        try {
            const data = await getSearchedLetter(searchTerm);
            console.log('Fetched data:', data);
            if (data) {
                await setSearchResults(data);
                navigate("/result", { state: { keyword: searchTerm } });
            } else {
                setError("Letter not found");
            }
        } catch (err) {
            setError("Error fetching letter", err);
        }

    };

    return (
        <div className="flex flex-col items-center w-full max-w-full px-4 my-8">
            <form onSubmit={handleSubmit} className="flex items-center focus:border-2 focus:border-red-400 w-full max-w-3xl mx-auto rounded-2xl bg-gray-300">
                <input
                    type="text"
                    placeholder="Search By any Name, Father Name, Roll No, Reference No (last 3 digits)"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setError(null);
                    }}
                    className="h-12 flex-1 px-4 rounded-l-2xl  font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Search Reference Number"
                />
                <button
                    type="submit"
                    className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-r-2xl focus:outline-none"
                    aria-label="Search"
                >
                    <MagnifyingGlassIcon className="h-6 w-6 text-[#684df4]" />
                </button>
            </form>
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
            

        </div>
    );
}

export default SearchBar;
