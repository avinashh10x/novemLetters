import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage'
import LetterLayout from './pages/LetterLayout'
import AllLetters from './pages/AllLetters'
import Navbar from './component/Navbar'
import ResultPage from './pages/ResultPage'
import ShowPdf from './PDF/ShowPdf'
import ExcelUpload from './component/ExcelUpload'
// import FilteredPage from './pages/FilteredPage'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import NotFund from './pages/NotFund';
import LetterSelection from './formatesSelection/LetterSelection';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Navbar />
      </header>
      <SignedIn>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/letter/:RefID' element={<ShowPdf />} />
          <Route path='/allLetter' element={<AllLetters />} />
          
          <Route path='/letterSelection' element={<LetterSelection />} />

          <Route path='/result' element={<ResultPage />} />
          <Route path='/bulk-upload' element={<ExcelUpload />} />
          <Route path='*' element={<NotFund />} />
        </Routes>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome Back!</h1>
          <p className="mb-6 text-gray-600">Please sign in to access the application.</p>
          <SignInButton mode="modal">
            <button className="bg-[#8269ff] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

    </div>
  )
}

export default App
