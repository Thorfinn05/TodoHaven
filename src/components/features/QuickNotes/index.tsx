import React, { useState } from 'react';
import { BookOpen, Plus, Search } from 'lucide-react';
import { useNotes } from '../../../hooks/useNotes';
import { NoteEditor } from './NoteEditor';
import { NoteList } from './NoteList';
import { Note } from '../../../types/study';

export function QuickNotes() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (noteData: { title: string; content: string; tags: string[] }) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setEditingNote(null);
    } else {
      addNote(noteData.title, noteData.content, noteData.tags);
    }
    setShowEditor(false);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-500" />
            Quick Notes
          </h2>
          <button
            onClick={() => {
              setEditingNote(null);
              setShowEditor(!showEditor);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {showEditor ? (
          <NoteEditor
            initialTitle={editingNote?.title}
            initialContent={editingNote?.content}
            initialTags={editingNote?.tags}
            onSave={handleSave}
          />
        ) : (
          <NoteList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={deleteNote}
          />
        )}
      </div>
    </div>
  );
}