import { useState, useEffect } from 'react';
import { StudySession, StudyGoal } from '../types/study';
import { v4 as uuidv4 } from 'uuid';

export function useStudyPlanner() {
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    const saved = localStorage.getItem('studySessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<StudyGoal[]>(() => {
    const saved = localStorage.getItem('studyGoals');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('studyGoals', JSON.stringify(goals));
  }, [goals]);

  const addSession = (session: Omit<StudySession, 'id'>) => {
    const newSession = { ...session, id: uuidv4() };
    setSessions(prev => [...prev, newSession]);
  };

  const addGoal = (goal: Omit<StudyGoal, 'id'>) => {
    const newGoal = { ...goal, id: uuidv4() };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateSessionProgress = (id: string, completed: boolean) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === id ? { ...session, completed } : session
      )
    );
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, progress } : goal
      )
    );
  };

  return {
    sessions,
    goals,
    addSession,
    addGoal,
    updateSessionProgress,
    updateGoalProgress
  };
}