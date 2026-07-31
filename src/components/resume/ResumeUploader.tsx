import React, { useCallback, useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResumeUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function ResumeUploader({ onFileSelect, isLoading }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcessFile = (file: File) => {
    setError(null);
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.doc') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all duration-200 ease-in-out text-center cursor-pointer relative",
          isDragging
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
            : "border-neutral-300 hover:border-indigo-400 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-indigo-500",
          isLoading && "opacity-50 pointer-events-none"
        )}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={cn(
            "p-4 rounded-full",
            isDragging ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
          )}>
            {selectedFile && !error ? (
               <FileText className="w-8 h-8" />
            ) : (
               <UploadCloud className="w-8 h-8" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              {selectedFile && !error ? selectedFile.name : "Drag & drop your resume here"}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              or click to browse (PDF, DOC, DOCX up to 5MB)
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {selectedFile && !error && !isLoading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span>File ready for analysis</span>
        </div>
      )}
    </div>
  );
}
