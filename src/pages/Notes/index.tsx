import { Search, Plus, Folder, File, Tag, Edit3, Trash2 } from 'lucide-react';
import { useNotesStore } from '../../store/useNotesStore';
import { useState } from 'react';

export default function Notes() {
  const { notes, folders, activeNoteId, searchQuery, setSearchQuery, setActiveNote, addNote, updateNote, addFolder, deleteNote } = useNotesStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const activeNote = notes.find(n => n.id === activeNoteId);
  
  const filteredNotes = notes.filter(n => 
    (activeFolder ? n.folder === activeFolder : true) &&
    (searchQuery ? n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  const handleNewNote = () => {
    addNote({
      title: 'Untitled Note',
      content: '',
      folder: activeFolder || folders[0] || 'Uncategorized',
      tags: [],
    });
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-neutral-200 flex flex-col bg-neutral-50/50">
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2 px-2">
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Folders</div>
                <button onClick={() => {
                  const name = prompt('Folder name:');
                  if (name) addFolder(name);
                }} className="text-neutral-400 hover:text-blue-500"><Plus size={14}/></button>
              </div>
              <button 
                onClick={() => setActiveFolder(null)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md ${!activeFolder ? 'text-blue-600 bg-blue-50' : 'text-neutral-600 hover:bg-neutral-100'}`}
              >
                <Folder size={16} className={!activeFolder ? 'fill-blue-100' : ''} /> All Notes
              </button>
              {folders.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFolder(f)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm font-medium rounded-md ${activeFolder === f ? 'text-blue-600 bg-blue-50' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  <Folder size={16} className={activeFolder === f ? 'fill-blue-100' : ''} /> {f}
                </button>
              ))}
            </div>
            
            <div>
               <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-2">Notes</div>
               <div className="space-y-1">
                 {filteredNotes.map(note => (
                   <div 
                    key={note.id}
                    onClick={() => setActiveNote(note.id)}
                    className={`p-2 rounded-lg cursor-pointer ${activeNoteId === note.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-neutral-100 border border-transparent'}`}
                   >
                     <div className="font-medium text-sm text-neutral-900 truncate">{note.title || 'Untitled Note'}</div>
                     <div className="text-xs text-neutral-500 mt-1 truncate">{new Date(note.updatedAt).toLocaleDateString()}</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeNote ? (
          <>
            <div className="border-b border-neutral-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Folder size={16} /> <span>{activeNote.folder}</span>
                <span className="text-neutral-300">/</span>
                <span className="text-neutral-900 font-medium">{activeNote.title || 'Untitled'}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => deleteNote(activeNote.id)} className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 size={16} />
                </button>
                <button onClick={handleNewNote} className="px-3 py-1.5 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors shadow-sm text-sm flex items-center gap-1.5">
                  <Plus size={16} /> New Note
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
              <input 
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                placeholder="Note Title"
                className="text-4xl font-bold text-neutral-900 mb-4 outline-none w-full bg-transparent placeholder-neutral-300"
              />
              <div className="flex items-center gap-2 mb-8 flex-wrap">
                {activeNote.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs font-medium">
                    <Tag size={12}/> {tag}
                  </span>
                ))}
                <button onClick={() => {
                  const tag = prompt('New tag:');
                  if (tag && !activeNote.tags.includes(tag)) updateNote(activeNote.id, { tags: [...activeNote.tags, tag] });
                }} className="text-xs font-medium text-neutral-400 hover:text-blue-500">+ Add tag</button>
                <span className="text-sm text-neutral-400 ml-auto">Last edited {new Date(activeNote.updatedAt).toLocaleString()}</span>
              </div>
              
              <div className="w-full h-full min-h-[300px]">
                <textarea
                  className="w-full h-full min-h-[500px] outline-none resize-none bg-transparent prose prose-neutral max-w-none text-neutral-800 leading-relaxed"
                  placeholder="Start typing your note here..."
                  value={activeNote.content}
                  onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                />
              </div>
            </div>
          </>
        ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-neutral-400">
             <File size={48} className="mb-4 text-neutral-300" />
             <p className="mb-4">No note selected</p>
             <button onClick={handleNewNote} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm">
               Create Note
             </button>
           </div>
        )}
      </div>
    </div>
  );
}
