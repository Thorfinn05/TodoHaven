import React from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';

export function StudyPlanner() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-primary-500" />
        Study Planner
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary-500" />
              Today's Schedule
            </h3>
            {/* Add schedule component here */}
          </div>
          
          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary-500" />
              Study Goals
            </h3>
            {/* Add goals component here */}
          </div>
        </div>
      </div>
    </div>
  );
}