import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '../../services/gemini/gemini';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAi = message.sender === 'ai';

  return (
    <div
      className={cn(
        'flex w-full gap-4 mb-6',
        isAi ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isAi ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
        )}
      >
        {isAi ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div
        className={cn(
          'flex flex-col max-w-[80%] md:max-w-[70%]',
          isAi ? 'items-start' : 'items-end'
        )}
      >
        <div
          className={cn(
            'px-4 py-3 rounded-2xl whitespace-pre-wrap',
            isAi
              ? 'bg-white border border-neutral-200 text-neutral-800 rounded-tl-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200'
              : 'bg-indigo-600 text-white rounded-tr-none'
          )}
        >
          {message.text}
        </div>
        <span className="text-xs text-neutral-400 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
