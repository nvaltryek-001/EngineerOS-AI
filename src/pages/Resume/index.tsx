import React, { useState } from 'react';
import { ResumeUploader } from '../../components/resume/ResumeUploader';
import { ResumeAnalysis } from '../../components/resume/ResumeAnalysis';
import { analyzeResume, ResumeAnalysisResult } from '../../services/resume/resumeService';
import { Loader2 } from 'lucide-react';

export default function Resume() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeResume(file);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while analyzing the resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-full min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
      <div className="mb-10 text-center max-w-2xl mx-auto pt-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Resume Analyzer</h1>
        <p className="text-neutral-500 mt-3 text-lg dark:text-neutral-400">
          Upload your resume to get instant feedback on ATS compatibility, technical skills, and actionable improvement suggestions.
        </p>
      </div>

      <ResumeUploader onFileSelect={handleFileSelect} isLoading={isAnalyzing} />

      {isAnalyzing && (
        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-neutral-500 dark:text-neutral-400 animate-in fade-in">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <p>Analyzing your resume with AI...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-xl max-w-2xl mx-auto text-center border border-red-100 dark:border-red-800">
          {error}
        </div>
      )}

      {analysisResult && !isAnalyzing && (
        <ResumeAnalysis data={analysisResult} />
      )}
    </div>
  );
}
