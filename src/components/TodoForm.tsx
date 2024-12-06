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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-slide-in">
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Todo['priority'])}
            className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Tag className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Todo['category'])}
            className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          >
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
      >
        <PlusCircle className="w-5 h-5" />
        Add Task
      </button>
    </form>
  );
}