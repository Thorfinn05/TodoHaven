import React from 'react';
import { GraduationCap } from 'lucide-react';
import { StudyTimeChart } from './StudyTimeChart';
import { GoalMetrics } from './GoalMetrics';
import { SubjectAnalytics } from './SubjectAnalytics';
import { useProgress } from '../../../hooks/useProgress';

export function ProgressTracker() {
  const { entries, getSubjectStats, getWeeklyProgress } = useProgress();
  const weeklyData = getWeeklyProgress();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <GraduationCap className="w-6 h-6 mr-2 text-primary-500" />
          Progress Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StudyTimeChart weeklyData={weeklyData} />
          <GoalMetrics entries={entries} />
        </div>

        <div className="mt-6">
          <SubjectAnalytics getSubjectStats={getSubjectStats} entries={entries} />
        </div>
      </div>
    </div>
  );
}