import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  tags: string[];
  updatedAt: string;
}

interface NotesState {
  notes: Note[];
  folders: string[];
  activeNoteId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveNote: (id: string | null) => void;
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addFolder: (name: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [
        {
          id: '1',
          title: 'React Hooks Cheatsheet',
          content: '<h2>useEffect</h2><p>The <code>useEffect</code> Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers.</p><pre><code>useEffect(() => {\n  // code to run on mount and when dependencies change\n  return () => {\n    // cleanup code\n  };\n}, [dependencies]);</code></pre><h2>useState</h2><p><code>useState</code> is a React Hook that lets you add a state variable to your component.</p>',
          folder: 'Interview Prep',
          tags: ['frontend', 'react'],
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'System Design Basics',
          content: '<h2>Load Balancing</h2><p>Load balancing refers to efficiently distributing incoming network traffic across a group of backend servers, also known as a server farm or server pool.</p><h2>Caching</h2><p>A cache is a high-speed data storage layer which stores a subset of data, typically transient in nature, so that future requests for that data are served up faster than is possible by accessing the data\'s primary storage location.</p>',
          folder: 'System Design',
          tags: ['backend', 'architecture'],
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Dynamic Programming Concepts',
          content: '<p>Dynamic Programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.</p><ul><li>Memoization (Top-Down)</li><li>Tabulation (Bottom-Up)</li></ul>',
          folder: 'Algorithms',
          tags: ['algorithms', 'dp'],
          updatedAt: new Date().toISOString(),
        }
      ],
      folders: ['Interview Prep', 'System Design', 'Algorithms'],
      activeNoteId: '1',
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveNote: (id) => set({ activeNoteId: id }),
      addNote: (note) => set((state) => {
        const newNote: Note = {
          ...note,
          id: Date.now().toString(),
          updatedAt: new Date().toISOString(),
        };
        return { 
          notes: [...state.notes, newNote],
          activeNoteId: newNote.id
        };
      }),
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map((n) => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n)
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((n) => n.id !== id),
        activeNoteId: state.activeNoteId === id ? null : state.activeNoteId
      })),
      addFolder: (name) => set((state) => ({
        folders: state.folders.includes(name) ? state.folders : [...state.folders, name]
      })),
    }),
    {
      name: 'notes-storage',
    }
  )
);
