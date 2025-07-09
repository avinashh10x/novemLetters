import React from 'react'
import logoImg from '../assets/novem_controls-removebg-preview.jpg';
import CreateCollegeBtn from './CreateCollegeBtn';
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";


function Navbar() {


    return (
        <>
            <nav className='flex justify-between items-center p-5 bg-[#af9fff] text-white'>
                <div className='h-15 w-50 items-center justify-center flex'>
                    <a href="/">
                        <img className='h-full w-full object-cover' src={logoImg} alt="novem controls" />
                    </a>
                </div>

                {/* <div className='flex h-10 justify-center w-10 border-1 rounded-4xl items-center mr-2  space-x-5'> */}
                {/* <CreateCollegeBtn /> */}
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                    {/* <SignUpButton /> */}
                </SignedOut>
                {/* </div> */}
            </nav>
        </>
    )
}

export default Navbar