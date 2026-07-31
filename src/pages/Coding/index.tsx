import { Code2, Play, CheckCircle, Terminal, AlignLeft, List } from 'lucide-react';
import { useState } from 'react';
import { useCodingStore, Problem } from '../../store/useCodingStore';

export default function Coding() {
  const { problems, updateProblem } = useCodingStore();
  const [activeProblem, setActiveProblem] = useState<Problem>(problems[0]);
  const [code, setCode] = useState(`function solution(nums: number[], target: number): number[] {
  // Write your code here
  
};`);
  const [output, setOutput] = useState('Run your code to see output here.');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Compiling and running...');
    setTimeout(() => {
      setOutput(`Output:\n[\n  0,\n  1\n]\n\nExpected:\n[\n  0,\n  1\n]`);
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setOutput('Running test cases...');
    setTimeout(() => {
      setOutput(`Success!\nRuntime: 56ms (Beats 82.5%)\nMemory: 44.2MB (Beats 65.1%)`);
      setIsRunning(false);
      updateProblem(activeProblem.id, { status: 'Solved', dateSolved: new Date().toISOString() });
      setActiveProblem(prev => ({ ...prev, status: 'Solved' }));
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-neutral-900 text-neutral-300">
      <div className="border-b border-neutral-800 p-4 flex justify-between items-center bg-neutral-950">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Code2 size={20} className="text-blue-500" />
            <span>{activeProblem.title}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${activeProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : activeProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
            {activeProblem.difficulty}
          </span>
          {activeProblem.status === 'Solved' && (
            <span className="px-2 py-0.5 rounded text-xs font-medium border bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center gap-1">
              <CheckCircle size={12} /> Solved
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRun} disabled={isRunning} className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded flex items-center gap-2 transition-colors disabled:opacity-50">
            <Play size={14} /> Run
          </button>
          <button onClick={handleSubmit} disabled={isRunning} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded flex items-center gap-2 transition-colors disabled:opacity-50">
            <CheckCircle size={14} /> Submit
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Problem List */}
        <div className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col hidden md:flex">
          <div className="p-3 border-b border-neutral-800 flex items-center gap-2 font-medium text-neutral-400 text-sm">
            <List size={16} /> Problem List
          </div>
          <div className="flex-1 overflow-y-auto">
            {problems.map(p => (
              <div 
                key={p.id} 
                onClick={() => setActiveProblem(p)}
                className={`p-3 border-b border-neutral-800/50 cursor-pointer hover:bg-neutral-900 transition-colors ${activeProblem.id === p.id ? 'bg-neutral-900 border-l-2 border-l-blue-500' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-medium text-neutral-300 truncate pr-2">{p.id}. {p.title}</div>
                  {p.status === 'Solved' && <CheckCircle size={14} className="text-blue-500 shrink-0" />}
                </div>
                <div className={`text-[10px] font-semibold ${p.difficulty === 'Easy' ? 'text-emerald-500' : p.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>
                  {p.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Description */}
        <div className="w-1/3 border-r border-neutral-800 bg-neutral-900 overflow-y-auto">
          <div className="p-4 border-b border-neutral-800 flex items-center gap-2 font-medium text-neutral-200">
            <AlignLeft size={16} /> Description
          </div>
          <div className="p-6 prose prose-invert max-w-none">
            {activeProblem.id === '1' ? (
              <>
                <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                <p>You can return the answer in any order.</p>
                
                <h4 className="mt-6 text-white font-semibold">Example 1:</h4>
                <pre className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-sm mt-2 text-neutral-300">
                  <code>Input: nums = [2,7,11,15], target = 9<br/>Output: [0,1]<br/>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</code>
                </pre>
              </>
            ) : (
              <p>Problem description for {activeProblem.title} goes here. Select Two Sum for the full example.</p>
            )}
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col">
          <div className="h-2/3 border-b border-neutral-800 bg-[#1e1e1e] flex flex-col">
            <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex gap-4 text-sm font-medium shrink-0">
              <span className="text-blue-400 border-b-2 border-blue-400 pb-2 -mb-[9px] cursor-pointer">solution.ts</span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-relaxed text-neutral-300 bg-transparent outline-none resize-none z-10"
                spellCheck="false"
              />
            </div>
          </div>
          
          {/* Terminal / Output */}
          <div className="flex-1 bg-neutral-950 flex flex-col">
            <div className="p-2 border-b border-neutral-800 flex items-center gap-2 font-medium text-neutral-400 text-sm shrink-0">
              <Terminal size={14} /> Output
            </div>
            <div className="p-4 text-neutral-400 font-mono text-sm flex-1 overflow-y-auto whitespace-pre-wrap">
              {output}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
