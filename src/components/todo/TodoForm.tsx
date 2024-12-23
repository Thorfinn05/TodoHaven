import React, { useState } from 'react';
import { PlusCircle, Calendar, Tag, AlertCircle, AlignLeft } from 'lucide-react';
import { Todo } from '../../types/todo';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
];

const CATEGORY_OPTIONS = [
  { value: 'work', label: 'Work' },
  { value: 'study', label: 'Study' },
  { value: 'personal', label: 'Personal' },
];

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
    <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl shadow-xl animate-slide-in">
      <div className="space-y-6">
        <FormInput
          icon={PlusCircle}
          value={title}
          onChange={setTitle}
          placeholder="What needs to be done?"
          required
          className="text-lg font-medium"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            icon={AlertCircle}
            value={priority}
            onChange={(value) => setPriority(value as Todo['priority'])}
            options={PRIORITY_OPTIONS}
          />

          <FormSelect
            icon={Tag}
            value={category}
            onChange={(value) => setCategory(value as Todo['category'])}
            options={CATEGORY_OPTIONS}
          />

          <FormInput
            icon={Calendar}
            value={dueDate}
            onChange={setDueDate}
            type="datetime-local"
            placeholder="Due date"
          />
        </div>

        <div className="relative">
          <div className="absolute top-3 left-3">
            <AlignLeft className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            className="w-full pl-10 pr-4 py-3 rounded-xl glass-input min-h-[100px] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="premium-button w-full group font-medium text-lg"
        >
          <PlusCircle className="inline-block w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
          Add Task
        </button>
      </div>
    </form>
  );
}