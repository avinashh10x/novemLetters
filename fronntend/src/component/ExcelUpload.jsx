import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { FolderArrowDownIcon } from '@heroicons/react/24/solid';
import ExcelToPDFDownloader from './ExcelToPDFDownloader';
import { uploadExcelFile } from '../services/LetterServices';

const ExcelUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [generatedLetters, setGeneratedLetters] = useState(null);
    const [showPdfGenerator, setShowPdfGenerator] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (!file.name.match(/\.(xlsx|xls)$/)) {
            toast.error('Please upload an Excel file (.xlsx or .xls)');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            setShowPdfGenerator(false);
            const response = await uploadExcelFile(formData);

            if (response.success) {
                setGeneratedLetters(response.certificates);
                setShowPdfGenerator(true);
                toast.success(`Successfully generated ${response.certificates.length} letters!`);
            } else {
                toast.error(response.message || 'Error generating letters');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error(error.response?.data?.message || 'Error generating letters');
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        multiple: false
    });

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#6b46c1] mb-3">📄 Bulk Certificate Generator</h2>
                <p className="text-gray-700 leading-relaxed text-sm">
                    Upload an Excel file with these columns:
                    <ul className="list-disc list-inside mt-2">
                        <li><strong>name</strong></li>
                        <li><strong>FatherName</strong></li>
                        <li><strong>rollNo</strong></li>
                        <li><strong>gender</strong></li>
                        <li><strong>courseName</strong></li>
                        <li><strong>collegeName</strong></li>
                        <li><strong>enrollmentDate</strong></li>
                        <li><strong>trainingPeriod</strong></li>
                    </ul>
                </p>
            </div>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition duration-300
                ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}`}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <div className="text-gray-600 font-medium animate-pulse">⏳ Generating certificates...</div>
                ) : isDragActive ? (
                    <div className="text-purple-600 font-semibold">📥 Drop the Excel file here...</div>
                ) : (
                    <div className="flex flex-col items-center">
                        <FolderArrowDownIcon className="w-12 h-12 text-purple-400 mb-2" />
                        <p className="text-gray-700 font-medium">Drag & drop an Excel file, or click to browse</p>
                        <p className="text-sm text-gray-500 mt-1">Accepted formats: .xlsx, .xls</p>
                    </div>
                )}
            </div>

            {showPdfGenerator && generatedLetters && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">✅ Letters Generated</h3>

                    <div className="mb-6">
                        <ExcelToPDFDownloader letters={generatedLetters} />
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2">
                        {generatedLetters.map((letter, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-3 rounded-md border border-gray-200 shadow-sm"
                            >
                                <p className="font-semibold text-gray-800">{letter.name}</p>
                                <p className="text-sm text-gray-600">Ref: {letter.ReferenceNo}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExcelUpload;
