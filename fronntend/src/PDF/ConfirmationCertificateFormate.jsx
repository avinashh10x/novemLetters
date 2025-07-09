import React from 'react'
import NewLetterLayout from '../Formats/Letter/NewLetterLayout'
import MyDocument from '../Formats/Letter/MyDocument'

function ConfirmationLetterFormate({ selectedLetter }) {
    return (
        <>
            <NewLetterLayout selectedLetter={selectedLetter} />
            {/* <MyDocument selectedLetter={selectedLetter} /> */}

        </>
    )
}

export default ConfirmationLetterFormate