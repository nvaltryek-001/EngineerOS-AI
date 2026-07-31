import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Application {
  id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  date: string;
  logo: string;
}

interface PlacementState {
  applications: Application[];
  addApplication: (app: Omit<Application, 'id'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
}

export const usePlacementStore = create<PlacementState>()(
  persist(
    (set) => ({
      applications: [
        { id: '1', company: 'Google', role: 'Software Engineer', status: 'Interview', date: '2026-08-15', logo: 'G' },
        { id: '2', company: 'Stripe', role: 'Frontend Developer', status: 'Applied', date: '2026-07-28', logo: 'S' },
        { id: '3', company: 'Vercel', role: 'Full Stack Engineer', status: 'Rejected', date: '2026-07-10', logo: 'V' },
        { id: '4', company: 'Meta', role: 'Frontend Engineer', status: 'Interview', date: '2026-08-20', logo: 'M' },
        { id: '5', company: 'Netflix', role: 'UI Engineer', status: 'Offer', date: '2026-07-25', logo: 'N' },
        { id: '6', company: 'Amazon', role: 'SDE II', status: 'Applied', date: '2026-07-29', logo: 'A' },
        { id: '7', company: 'Apple', role: 'Software Engineer', status: 'Rejected', date: '2026-07-05', logo: 'A' },
      ],
      addApplication: (app) => set((state) => ({
        applications: [{ ...app, id: Date.now().toString() }, ...state.applications]
      })),
      updateApplication: (id, updates) => set((state) => ({
        applications: state.applications.map(a => a.id === id ? { ...a, ...updates } : a)
      })),
      deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter(a => a.id !== id)
      })),
    }),
    {
      name: 'placement-storage',
    }
  )
);
