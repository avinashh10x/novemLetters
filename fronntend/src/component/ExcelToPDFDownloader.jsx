import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "../Formats/Letter/MyDocument";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import NewLetterLayout from "../Formats/Letter/NewLetterLayout";
import ConfirmationLetterFormate from "../PDF/ConfirmationLetterFormate";

function ExcelToPDFDownloader({ letters }) {
    const [progress, setProgress] = useState(0);
    const [zipBlob, setZipBlob] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [currentLetter, setCurrentLetter] = useState("");

    const generateZip = async () => {
        setGenerating(true);
        setProgress(0);
        const zip = new JSZip();

        // Extract reference numbers to determine range for the zip filename only
        const refNumbers = letters.map(letter => {
            // Extract the numeric part after the last slash
            const parts = letter.ReferenceNo.split('/');
            return parseInt(parts[parts.length - 1]);
        });

        // Find min and max reference numbers
        const minRef = Math.min(...refNumbers);
        const maxRef = Math.max(...refNumbers);

        for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            setCurrentLetter(letter.name);
            // const doc = <NewLetterLayout selectedLetter={letter} />;
            const doc = <ConfirmationLetterFormate selectedLetter={letter} />;
            const asPdf = pdf([]); // create a new PDF instance
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();

            // Extract just the reference number from the full reference string
            const refParts = letter.ReferenceNo.split('/');
            const refNumber = refParts[refParts.length - 1];

            // Add file directly to the root of the zip with student name and reference number
            zip.file(`${letter.name}_${refNumber}.pdf`, blob);
            setProgress(Math.round(((i + 1) / letters.length) * 100));
        }

        const zipContent = await zip.generateAsync({ type: "blob" });
        setZipBlob(zipContent);
        setGenerating(false);
        setCurrentLetter("");
    };

    return (
        <div className="flex flex-col items-center w-full">
            {!zipBlob && (
                <button
                    onClick={generateZip}
                    disabled={generating}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed w-full max-w-xs"
                >
                    {generating ? "Generating PDFs..." : "Make PDFs"}
                </button>
            )}
            {generating && (
                <div className="w-full mt-4 max-w-md">
                    <div className="mb-2 text-sm text-gray-600 text-center">
                        Processing: {currentLetter}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div
                            className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="text-center text-sm font-medium">{progress}% Complete</div>
                </div>
            )}
            {zipBlob && (
                <button
                    onClick={() => saveAs(zipBlob, "confirmation_letters.zip")}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 w-full max-w-xs mt-4"
                >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Download All PDFs (ZIP)
                </button>
            )}
        </div>
    );
}

export default ExcelToPDFDownloader;