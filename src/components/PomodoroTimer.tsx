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
    <div className="glass-card p-8 rounded-2xl shadow-xl mb-8 animate-slide-up">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          {timerState === 'work' ? (
            <Brain className="w-8 h-8 text-primary-500 animate-glow" />
          ) : (
            <Coffee className="w-8 h-8 text-orange-500 animate-float" />
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {timerState === 'work' ? 'Work Session' : timerState === 'break' ? 'Short Break' : 'Long Break'}
          </h2>
        </div>

        <div className={`text-7xl font-bold mb-8 transition-all duration-300 ${
          status === 'running' ? 'text-primary-500 animate-glow' : 'text-gray-900 dark:text-white'
        }`}>
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {status === 'running' ? (
            <button
              onClick={actions.pause}
              className="premium-button !bg-gradient-to-r !from-yellow-500 !to-orange-500 hover:!from-yellow-600 hover:!to-orange-600 group"
            >
              <Pause className="w-5 h-5 transition-transform group-hover:scale-110" />
              Pause
            </button>
          ) : (
            <button
              onClick={actions.start}
              className="premium-button group"
            >
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              {status === 'idle' ? 'Start' : 'Resume'}
            </button>
          )}
          <button
            onClick={actions.reset}
            className="px-6 py-3 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm hover:bg-gray-300/80 dark:hover:bg-gray-600/80 text-gray-700 dark:text-gray-200 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>
        </div>

        <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
          Sessions completed: <span className="text-primary-500 font-bold">{sessionsCompleted}</span>
        </div>
      </div>
    </div>
  );
}