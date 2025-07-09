import React from 'react';
import { Link } from 'react-router-dom';
import { Square3Stack3DIcon } from '@heroicons/react/24/solid';
import CreateBtn from './CreateBtn';
import SearchBar from './Searchbar';

function HomeScreenTools() {
    return (
        <div className="w-full p-4 flex flex-col gap-6 items-center">
            <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Create Button */}
                <div className="w-full sm:w-auto">
                    <CreateBtn />
                </div>

                {/* Search Bar */}
                <div className="w-full flex-1">
                    <SearchBar />
                </div>

                {/* All Letters Button */}
                <div className="w-full sm:w-auto">
                    <Link to="/allLetter">
                        <button className="w-full sm:w-auto bg-[#684df4] hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition duration-300 shadow-md">
                            All Letters
                            <Square3Stack3DIcon className="h-6 w-6" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeScreenTools;
