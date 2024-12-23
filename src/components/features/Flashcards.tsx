import React from 'react';
import { Brain } from 'lucide-react';

export function Flashcards() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-primary-500" />
        Flashcards
      </h2>
      
      <div className="space-y-6">
        {/* Add flashcard components here */}
      </div>
    </div>
  );
}