import React from 'react';
import { ChatBox } from '../../components/mentor/ChatBox';

export default function Mentor() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">AI Mentor</h1>
        <p className="text-neutral-500 mt-2 dark:text-neutral-400">
          Your personal guide for career and technical interview preparation.
        </p>
      </div>
      
      <div className="flex-1 min-h-0">
        <ChatBox />
      </div>
    </div>
  );
}
