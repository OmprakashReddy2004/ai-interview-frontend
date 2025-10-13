// src/components/ResumeUploadStep.jsx

import { useCallback, useRef, useState } from 'react';
import { FiCheckCircle, FiUploadCloud } from 'react-icons/fi';

export default function ResumeUploadStep({ setResumeFile, resumeFile }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // File handler logic
  const handleFileChange = useCallback((files) => {
    if (files && files.length > 0) {
      const file = files[0];
      // Basic validation: Check file type and size (e.g., max 5MB)
      if (file.type === 'application/pdf' || file.type.includes('word')) {
          setResumeFile(file);
      } else {
          alert("Please upload a PDF or DOCX file.");
          setResumeFile(null);
      }
    }
  }, [setResumeFile]);

  // Drag and Drop handlers
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };
  
  // If a file is successfully uploaded, show the confirmation state
  if (resumeFile) {
    return (
      <div className="w-full p-6 text-center bg-white dark:bg-gray-700 border-2 border-green-500 rounded-lg shadow-inner">
        <FiCheckCircle className="mx-auto w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Resume Uploaded Successfully!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          File: **{resumeFile.name}** ({Math.round(resumeFile.size / 1024)} KB)
        </p>
        <button
          onClick={() => setResumeFile(null)}
          className="mt-4 text-sm text-red-500 hover:text-red-600 font-medium"
        >
          (Change File)
        </button>
      </div>
    );
  }

  // Initial upload state
  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        accept=".pdf,.doc,.docx" // Restrict file types
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          w-full p-10 border-4 border-dashed rounded-xl transition-colors duration-300 cursor-pointer
          ${isDragging 
            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
          }
        `}
      >
        <FiUploadCloud className="mx-auto w-10 h-10 text-indigo-500 mb-3" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {isDragging ? "Drop your file here!" : "Drag & Drop or Click to Upload"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Supported files: PDF, DOCX (Max 5MB)
        </p>
      </div>
    </div>
  );
}