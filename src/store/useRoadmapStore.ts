import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Milestone {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  progress: number;
  description: string;
  topics: string[];
}

interface RoadmapState {
  milestones: Milestone[];
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      milestones: [
        { 
          id: '1', 
          title: 'Frontend Foundations', 
          status: 'Completed', 
          progress: 100, 
          description: 'React, Tailwind CSS, State Management',
          topics: ['React Basics', 'Hooks', 'Tailwind']
        },
        { 
          id: '2', 
          title: 'Backend Engineering', 
          status: 'In Progress', 
          progress: 45, 
          description: 'Node.js, Express, RESTful APIs, Middleware',
          topics: ['Node.js Basics', 'Express.js', 'REST APIs', 'Middleware']
        },
        { 
          id: '3', 
          title: 'Database & DevOps', 
          status: 'Locked', 
          progress: 0, 
          description: 'PostgreSQL, Redis, Docker, CI/CD',
          topics: ['Postgres', 'Docker', 'GitHub Actions']
        },
      ],
      updateMilestone: (id, updates) => set((state) => ({
        milestones: state.milestones.map(m => m.id === id ? { ...m, ...updates } : m)
      })),
    }),
    {
      name: 'roadmap-storage',
    }
  )
);
