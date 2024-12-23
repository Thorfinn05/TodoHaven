import { useState, useEffect } from 'react';
import { ProgressEntry } from '../types/study';
import { v4 as uuidv4 } from 'uuid';

export function useProgress() {
  const [entries, setEntries] = useState<ProgressEntry[]>(() => {
    const saved = localStorage.getItem('progressEntries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('progressEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Omit<ProgressEntry, 'id'>) => {
    const newEntry = { ...entry, id: uuidv4() };
    setEntries(prev => [...prev, newEntry]);
  };

  const getSubjectStats = (subject: string) => {
    const subjectEntries = entries.filter(entry => entry.subject === subject);
    return {
      totalHours: subjectEntries.reduce((sum, entry) => sum + entry.hoursStudied, 0),
      averageConfidence: subjectEntries.reduce((sum, entry) => sum + entry.confidence, 0) / subjectEntries.length || 0,
      tasksCompleted: subjectEntries.reduce((sum, entry) => sum + entry.tasksCompleted, 0)
    };
  };

  const getWeeklyProgress = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return entries.filter(entry => new Date(entry.date) >= oneWeekAgo);
  };

  return {
    entries,
    addEntry,
    getSubjectStats,
    getWeeklyProgress
  };
}