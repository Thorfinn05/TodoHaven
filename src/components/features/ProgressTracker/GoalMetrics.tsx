import React from 'react';
import { Target, CheckCircle, Clock } from 'lucide-react';
import { ProgressEntry } from '../../../types/study';

interface GoalMetricsProps {
  entries: ProgressEntry[];
}

export function GoalMetrics({ entries }: GoalMetricsProps) {
  const totalHours = entries.reduce((sum, entry) => sum + entry.hoursStudied, 0);
  const totalTasks = entries.reduce((sum, entry) => sum + entry.tasksCompleted, 0);
  const avgConfidence = entries.reduce((sum, entry) => sum + entry.confidence, 0) / entries.length || 0;

  const metrics = [
    {
      icon: Clock,
      label: 'Total Study Hours',
      value: `${totalHours.toFixed(1)}h`
    },
    {
      icon: CheckCircle,
      label: 'Tasks Completed',
      value: totalTasks
    },
    {
      icon: Target,
      label: 'Avg. Confidence',
      value: `${avgConfidence.toFixed(1)}/5`
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-primary-500" />
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}