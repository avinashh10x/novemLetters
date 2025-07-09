
import { createContext, useEffect, useState } from 'react'
import { getAllLetters } from '../services/LetterServices'

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [selectedLetter, setSelectedLetter] = useState(() => {
    const savedLetter = localStorage.getItem("selectedLetter");
    return savedLetter ? JSON.parse(savedLetter) :  null;
  });

  const [letters, setLetters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    if (selectedLetter) {
      localStorage.setItem("selectedLetter", JSON.stringify(selectedLetter));
    }
  }, [selectedLetter]);

  const fetchLetters = async () => {
    try {
      const data = await getAllLetters();
      setLetters(data);
    } catch (error) {
      console.error('Error fetching letters:', error);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);


  return (
    <MyContext.Provider value={{ selectedLetter, setSelectedLetter, fetchLetters, letters, setLetters,name, searchResults, setSearchResults }}>
      {children}
    </MyContext.Provider>
  );
};

