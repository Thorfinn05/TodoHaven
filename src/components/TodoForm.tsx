import React, { useState } from 'react';
import { PlusCircle, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState<Todo['category']>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      category,
      completed: false,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('personal');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-2xl shadow-xl animate-slide-in">
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 rounded-xl glass-input text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-purple-500" />
            </div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo['priority'])}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-primary-500" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Todo['category'])}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input"
            >
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-primary-500" />
            </div>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input"
            />
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          className="w-full px-4 py-3 rounded-xl glass-input"
          rows={3}
        />

        <button type="submit" className="w-full bg-green-600 hover:bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl">
          <PlusCircle className="inline-block w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
          Add Task
        </button>
      </div>
    </form>
  );
}