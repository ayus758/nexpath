import React, { useState } from 'react';
import { PenTool, Save, Trash2, Plus, Clock } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Sliding Window Pattern', content: 'Variable size window: usually mapped with a while loop expanding right, while conditionally shrinking left if invalid...', date: 'Oct 23, 2025' },
    { id: 2, title: 'CAP Theorem', content: 'Consistency, Availability, Partition Tolerance. You can only pick 2 over a distributed network.', date: 'Oct 20, 2025' }
  ]);
  const [activeNote, setActiveNote] = useState(notes[0]);

  const handleUpdate = (field, value) => {
    setActiveNote({ ...activeNote, [field]: value });
    setNotes(notes.map(n => n.id === activeNote.id ? { ...activeNote, [field]: value } : n));
  };

  const createNewNote = () => {
    const newNote = { id: Date.now(), title: 'Untitled Note', content: '', date: 'Just now' };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const deleteNote = (id) => {
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if(activeNote.id === id) setActiveNote(filtered[0] || null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">My Notes</h1>
           <p className="text-[var(--muted-foreground)]">Jot down flashcards, code snippets, and review concepts.</p>
        </div>
        <button onClick={createNewNote} className="flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-5 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
          <Plus size={18} /> New Note
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-0">
        
        {/* Notes Sidebar */}
        <div className="glass rounded-2xl border border-[var(--border)] overflow-y-auto flex flex-col p-4 hide-scrollbar">
           <div className="space-y-3">
             {notes.length === 0 ? <p className="text-center text-[var(--muted-foreground)] mt-10">No notes yet.</p> :
               notes.map(n => (
                 <div 
                   key={n.id} 
                   onClick={() => setActiveNote(n)}
                   className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 group
                     ${activeNote?.id === n.id ? 'bg-[var(--foreground)] border-[var(--foreground)]' : 'bg-[var(--secondary)] border-transparent hover:border-[var(--border)]'}`}
                 >
                   <h4 className={`font-bold truncate mb-1 ${activeNote?.id === n.id ? 'text-[var(--background)]' : 'text-[var(--foreground)]'}`}>
                     {n.title}
                   </h4>
                   <p className={`text-xs flex items-center gap-1 ${activeNote?.id === n.id ? 'text-[var(--background)]/70' : 'text-[var(--muted-foreground)]'}`}>
                     <Clock size={12} /> {n.date}
                   </p>
                   <button 
                     onClick={(e) => { e.stopPropagation(); deleteNote(n.id); }}
                     className={`absolute right-4 mt-[-30px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                       ${activeNote?.id === n.id ? 'text-[var(--background)] hover:bg-black/20' : 'text-red-400 hover:bg-red-400/20'}`}
                   >
                     <Trash2 size={14} />
                   </button>
                 </div>
               ))
             }
           </div>
        </div>

        {/* Editor */}
        <div className="md:col-span-3 glass rounded-2xl border border-[var(--border)] p-6 flex flex-col">
           {activeNote ? (
             <>
               <input 
                 type="text" 
                 value={activeNote.title}
                 onChange={(e) => handleUpdate('title', e.target.value)}
                 className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 mb-4 w-full"
                 placeholder="Note Title"
               />
               <textarea 
                 value={activeNote.content}
                 onChange={(e) => handleUpdate('content', e.target.value)}
                 className="flex-1 w-full resize-none bg-transparent border-none focus:outline-none focus:ring-0 text-[var(--muted-foreground)] leading-relaxed"
                 placeholder="Start typing your awesome brain-dump here..."
               />
             </>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-[var(--muted-foreground)]">
               <PenTool size={48} className="mb-4 opacity-50" />
               <p>Select a note or create a new one.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Notes;
