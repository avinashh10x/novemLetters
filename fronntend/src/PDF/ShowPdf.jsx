import { PDFViewer } from '@react-pdf/renderer'
import React, { useContext } from 'react'
import MyDocument from '../Formats/Letter/MyDocument'
import { MyContext } from '../context/LetterContext';
import ToolBar from '../component/ToolBar';
import NewLetterLayout from '../Formats/Letter/NewLetterLayout';
import ConfirmationLetterFormate from './ConfirmationLetterFormate';

function ShowPdf() {
    const { selectedLetter } = useContext(MyContext);
    console.log("Selected Letter in ShowPdf:", selectedLetter);



    return (
        <>
            <ToolBar />
            <PDFViewer width="100%" height="1200px" showToolbar={false}>
                <ConfirmationLetterFormate selectedLetter={selectedLetter} />
            </PDFViewer>
        </>
    )
}

export default ShowPdf