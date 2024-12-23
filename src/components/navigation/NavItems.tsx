import React from 'react';
import { Brain, Coffee, GraduationCap, BookOpen, Calendar, Target } from 'lucide-react';

interface NavItemsProps {
  activeFeature: string;
  onSelect: (feature: string) => void;
}

export function NavItems({ activeFeature, onSelect }: NavItemsProps) {
  const items = [
    { id: 'tasks', name: 'Tasks', icon: Target },
    { id: 'pomodoro', name: 'Pomodoro Timer', icon: Coffee },
    { id: 'studyPlanner', name: 'Study Planner', icon: Calendar },
    { id: 'flashcards', name: 'Flashcards', icon: Brain },
    { id: 'notes', name: 'Quick Notes', icon: BookOpen },
    { id: 'progress', name: 'Progress Tracker', icon: GraduationCap },
  ];

  return (
    <div className="py-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              activeFeature === item.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {item.name}
          </button>
        );
      })}
    </div>
  );
}