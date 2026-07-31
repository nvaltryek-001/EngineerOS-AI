import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SuggestionCardProps {
  text: string;
  onClick: (text: string) => void;
}

export function SuggestionCard({ text, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={() => onClick(text)}
      className="flex items-start gap-3 p-3 text-left bg-white border border-neutral-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-indigo-700 dark:hover:bg-neutral-700/50 group"
    >
      <Lightbulb className="w-5 h-5 text-indigo-500 flex-shrink-0 group-hover:text-indigo-600 dark:text-indigo-400" />
      <span className="text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 font-medium">
        {text}
      </span>
    </button>
  );
}
