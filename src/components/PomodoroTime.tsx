import React from 'react';
import { Play, Pause, RefreshCw, Coffee, Brain } from 'lucide-react';
import { usePomodoro } from '../hooks/usePomodoro';

export function PomodoroTimer() {
  const { timeLeft, status, timerState, sessionsCompleted, actions } = usePomodoro();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          {timerState === 'work' ? (
            <Brain className="w-6 h-6 text-primary-500" />
          ) : (
            <Coffee className="w-6 h-6 text-primary-500" />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {timerState === 'work' ? 'Work Session' : timerState === 'break' ? 'Short Break' : 'Long Break'}
          </h2>
        </div>

        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {status === 'running' ? (
            <button
              onClick={actions.pause}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          ) : (
            <button
              onClick={actions.start}
              className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              {status === 'idle' ? 'Start' : 'Resume'}
            </button>
          )}
          <button
            onClick={actions.reset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Sessions completed: {sessionsCompleted}
        </div>
      </div>
    </div>
  );
}