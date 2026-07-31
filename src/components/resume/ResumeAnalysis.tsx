import React from 'react';
import { ScoreCard } from './ScoreCard';
import { SkillChart } from './SkillChart';
import { ResumeAnalysisResult } from '../../services/resume/resumeService';
import { AlertTriangle, CheckCircle2, ListChecks, Zap } from 'lucide-react';

interface ResumeAnalysisProps {
  data: ResumeAnalysisResult;
}

export function ResumeAnalysis({ data }: ResumeAnalysisProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard 
          score={data.atsScore} 
          title="ATS Compatibility Score" 
          description="This score indicates how well your resume matches standard applicant tracking systems parsing logic." 
        />
        
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">Top Soft Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full border border-indigo-100 dark:border-indigo-500/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ListChecks className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">Technical Expertise</h3>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Analyzed proficiency based on resume context.</p>
          <SkillChart skills={data.technicalSkills} />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">Missing Keywords</h3>
            </div>
            <ul className="space-y-2">
              {data.missingKeywords.map((kw, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  {kw}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg">Improvement Suggestions</h3>
            </div>
            <ul className="space-y-3">
              {data.improvementSuggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-lg">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono font-medium">{i + 1}.</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
