import { useEffect } from 'react';
import { getCollageNames } from '../services/LetterServices';
import { useState } from 'react';
import CreateCollegeBtn from './CreateCollegeBtn';

function SelectCollege({ collegeName, setFormData, fetchCollegeNames }) {
    const [collegeNames, setCollegeNames] = useState([]);

    async function fetchCollegeNames() {
        const collegeNameResult = await getCollageNames();
        console.log("this is from select component... ", collegeNameResult.collageNames);
        setCollegeNames(collegeNameResult.collageNames);
    }

    useEffect(() => {
        fetchCollegeNames();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;

        setFormData((prev) => ({ ...prev, collegeName: selectedValue }));

    };


    return (
        <>
            {/* <CreateCollegeBtn onCollegeCreated={fetchCollegeNames} /> */}
            <select
                name="collegeName"
                value={collegeName}
                required
                className="w-full p-3 border rounded-lg"
                onChange={handleSelectChange}
            >
                <option value="" disabled>Select College</option>
                {collegeNames.map((college,index) => (
                    <option key={index} value={college}>{college}</option>
                ))}
            </select>
        </>
    );
}

export default SelectCollege;