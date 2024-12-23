import { useState, useEffect } from 'react';
import { Note } from '../types/study';
import { v4 as uuidv4 } from 'uuid';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string, tags: string[] = []) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      tags,
      createdAt: now,
      updatedAt: now
    };
    setNotes(prev => [...prev, newNote]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  };
}