import React, { useState } from 'react';
import { Calendar, Clock, Target, Plus } from 'lucide-react';
import { useStudyPlanner } from '../../../hooks/useStudyPlanner';
import { SessionForm } from './SessionForm';
import { GoalForm } from './GoalForm';
import { format } from 'date-fns';

export function StudyPlanner() {
  const { sessions, goals, addSession, addGoal, updateSessionProgress, updateGoalProgress } = useStudyPlanner();
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-primary-500" />
            Study Sessions
          </h2>
          <button
            onClick={() => setShowSessionForm(!showSessionForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-5 h-5" />
            Add Session
          </button>
        </div>

        {showSessionForm && (
          <div className="mb-6">
            <SessionForm onSubmit={addSession} />
          </div>
        )}

        <div className="space-y-4">
          {sessions.map(session => (
            <div
              key={session.id}
              className="p-4 border dark:border-gray-700 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{session.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date(session.startTime), 'PPp')} - {session.duration} minutes
                </p>
                <p className="text-sm text-primary-500">{session.subject}</p>
              </div>
              <input
                type="checkbox"
                checked={session.completed}
                onChange={(e) => updateSessionProgress(session.id, e.target.checked)}
                className="w-5 h-5 text-primary-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary-500" />
            Study Goals
          </h2>
          <button
            onClick={() => setShowGoalForm(!showGoalForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <Plus className="w-5 h-5" />
            Add Goal
          </button>
        </div>

        {showGoalForm && (
          <div className="mb-6">
            <GoalForm onSubmit={addGoal} />
          </div>
        )}

        <div className="space-y-4">
          {goals.map(goal => (
            <div
              key={goal.id}
              className="p-4 border dark:border-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {format(new Date(goal.targetDate), 'PP')}
                  </p>
                  <p className="text-sm text-primary-500">{goal.subject}</p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                  {goal.progress}% Complete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}