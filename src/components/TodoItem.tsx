import React from 'react';
import { Todo } from '../types/todo';
import { Trash2, Edit, CheckCircle, Circle, Clock } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
    medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
    high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100',
  };

  const categoryColors = {
    work: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100',
    study: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
    personal: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100',
  };

  return (
    <div className={`glass-card p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
      todo.completed ? 'opacity-75' : ''
    } animate-scale-in`}>
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-1 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200 transform hover:scale-110"
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500 animate-pulse" />
          ) : (
            <Circle className="w-6 h-6 hover:text-primary-500 transition-colors" />
          )}
        </button>

        <div className="flex-1">
          <h3 className={`text-xl font-medium text-gray-900 dark:text-white transition-all duration-200 ${
            todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
          }`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{todo.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${priorityColors[todo.priority]}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${categoryColors[todo.category]}`}>
              {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
            </span>
            {todo.dueDate && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-1 transition-all duration-200 transform hover:scale-105">
                <Clock className="w-4 h-4" />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200 transform hover:scale-110 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            aria-label="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              const newTitle = prompt('Edit task title:', todo.title);
              if (newTitle) onEdit(todo.id, { title: newTitle });
            }}
            className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200 transform hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            aria-label="Edit task"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}