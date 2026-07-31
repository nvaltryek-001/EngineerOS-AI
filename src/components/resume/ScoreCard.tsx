import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScoreCardProps {
  score: number;
  title: string;
  description: string;
}

export function ScoreCard({ score, title, description }: ScoreCardProps) {
  let colorClass = "text-green-500";
  let bgClass = "bg-green-50 dark:bg-green-500/10";
  let ringClass = "ring-green-500/20";
  
  if (score < 60) {
    colorClass = "text-red-500";
    bgClass = "bg-red-50 dark:bg-red-500/10";
    ringClass = "ring-red-500/20";
  } else if (score < 80) {
    colorClass = "text-yellow-500";
    bgClass = "bg-yellow-50 dark:bg-yellow-500/10";
    ringClass = "ring-yellow-500/20";
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
      <div className={cn(
        "flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ring-4",
        bgClass, colorClass, ringClass
      )}>
        {score}
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{title}</h3>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
