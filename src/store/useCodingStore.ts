import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  status: 'Solved' | 'Attempted' | 'Todo';
  dateSolved?: string;
}

interface CodingState {
  problems: Problem[];
  addProblem: (problem: Omit<Problem, 'id'>) => void;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
}

export const useCodingStore = create<CodingState>()(
  persist(
    (set) => ({
      problems: [
        { id: '1', title: 'Two Sum', difficulty: 'Easy', topics: ['Array', 'Hash Table'], status: 'Solved', dateSolved: '2026-07-20' },
        { id: '2', title: 'Valid Parentheses', difficulty: 'Easy', topics: ['String', 'Stack'], status: 'Solved', dateSolved: '2026-07-22' },
        { id: '3', title: 'Merge Intervals', difficulty: 'Medium', topics: ['Array', 'Sorting'], status: 'Solved', dateSolved: '2026-07-25' },
        { id: '4', title: 'LRU Cache', difficulty: 'Medium', topics: ['Hash Table', 'Linked List', 'Design'], status: 'Attempted' },
        { id: '5', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topics: ['Array', 'Binary Search', 'Divide and Conquer'], status: 'Todo' },
        { id: '6', title: 'Longest Palindromic Substring', difficulty: 'Medium', topics: ['String', 'Dynamic Programming'], status: 'Solved', dateSolved: '2026-07-30' },
      ],
      addProblem: (problem) => set((state) => ({
        problems: [{ ...problem, id: Date.now().toString() }, ...state.problems]
      })),
      updateProblem: (id, updates) => set((state) => ({
        problems: state.problems.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
    }),
    {
      name: 'coding-storage',
    }
  )
);
