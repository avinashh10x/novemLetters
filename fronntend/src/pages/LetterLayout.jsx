
import Loading from '../component/Loading';
import ToolBar from '../component/ToolBar';
import { useContext } from 'react';
import { MyContext } from '../context/LetterContext';
import LetterPDF from '../component/LetterPDF';
import { PDFViewer } from '@react-pdf/renderer';


function LetterLayout() {
  const { selectedLetter } = useContext(MyContext);



  if (!selectedLetter) {
    return <Loading />;
  }

  return (

    <div className="min-h-screen bg-black">
      <ToolBar />
      <PDFViewer className="custom-pdf-viewer" width="100%" height="1200px" showToolbar={false}>
        {/* <LetterPDF selectedLetter={selectedLetter} /> */}
        <LetterPDF />
      </PDFViewer>

    
    </div>


  );
}

export default LetterLayout;
