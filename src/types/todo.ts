export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'study' | 'personal';
  completed: boolean;
  createdAt: Date;
}