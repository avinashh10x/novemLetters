import { FolderArrowDownIcon } from '@heroicons/react/24/solid'
import { PDFDownloadLink } from '@react-pdf/renderer'
import LetterPDF from './LetterPDF'
import { useContext } from 'react'
import { MyContext } from '../context/LetterContext'
import ShowPdf from '../PDF/ShowPdf'
import MyDocument from '../Formats/Letter/MyDocument'
import ConfirmationLetterFormate from '../PDF/ConfirmationLetterFormate'


function ToolBar() {
  const { selectedLetter } = useContext(MyContext)

  // Extract just the numeric part from the reference number
  const refNumber = selectedLetter.ReferenceNo.split('/').pop();
  const PDF_name = `${selectedLetter?.name || 'ConfirmationLetter'}_${refNumber}.pdf`

  return (
    <div className=' w-full flex bg-[#282828] justify-end items-center p-5'>
      {/* <PDFDownloadLink document={<ShowPdf />} fileName={`${selectedLetter?.name || 'ConfirmationLetter'}.pdf`}> */}
      <PDFDownloadLink document={<ConfirmationLetterFormate selectedLetter={selectedLetter} />} fileName={PDF_name}>
        <FolderArrowDownIcon className='size-10 mx-5 text-white cursor-pointer hover:text-gray-400 duration-300' />
      </PDFDownloadLink>
      

    </div>
  )
}

export default ToolBar