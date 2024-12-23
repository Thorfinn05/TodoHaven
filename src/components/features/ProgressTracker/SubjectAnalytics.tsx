import React from 'react';
import { Book } from 'lucide-react';
import { ProgressEntry } from '../../../types/study';

interface SubjectAnalyticsProps {
  entries: ProgressEntry[];
  getSubjectStats: (subject: string) => {
    totalHours: number;
    averageConfidence: number;
    tasksCompleted: number;
  };
}

export function SubjectAnalytics({ entries, getSubjectStats }: SubjectAnalyticsProps) {
  const subjects = [...new Set(entries.map(entry => entry.subject))];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Book className="w-5 h-5 text-primary-500" />
        Subject Performance
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map(subject => {
          const stats = getSubjectStats(subject);
          return (
            <div key={subject} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{subject}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Total Hours:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.totalHours.toFixed(1)}h
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Tasks Completed:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.tasksCompleted}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Confidence:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stats.averageConfidence.toFixed(1)}/5
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}