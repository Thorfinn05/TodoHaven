import React from 'react';
import { GraduationCap } from 'lucide-react';

export function ProgressTracker() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <GraduationCap className="w-6 h-6 mr-2 text-primary-500" />
        Progress Tracker
      </h2>
      
      <div className="space-y-6">
        {/* Add progress tracking components here */}
      </div>
    </div>
  );
}