export interface StudySession {
  id: string;
  title: string;
  startTime: string;
  duration: number;
  subject: string;
  completed: boolean;
}

export interface StudyGoal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  subject: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  lastReviewed?: string;
  confidence: 1 | 2 | 3 | 4 | 5;
}

export interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgressEntry {
  id: string;
  date: string;
  subject: string;
  hoursStudied: number;
  tasksCompleted: number;
  confidence: number;
}