import { useState, useEffect, useCallback } from 'react';
import { TimerSettings, TimerState, TimerStatus } from '../types/timer';

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25 * 60, // 25 minutes in seconds
  breakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  longBreakInterval: 4, // Long break after 4 work sessions
};

export function usePomodoro() {
  const [settings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timerState, setTimerState] = useState<TimerState>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const playAlarm = useCallback(() => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(() => console.log('Audio playback failed'));
    
    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: `${timerState === 'work' ? 'Break time!' : 'Back to work!'}`,
        icon: '/favicon.ico'
      });
    }
  }, [timerState]);

  const switchTimer = useCallback(() => {
    if (timerState === 'work') {
      setSessionsCompleted(prev => prev + 1);
      const isLongBreak = sessionsCompleted > 0 && (sessionsCompleted + 1) % settings.longBreakInterval === 0;
      setTimerState(isLongBreak ? 'longBreak' : 'break');
      setTimeLeft(isLongBreak ? settings.longBreakDuration : settings.breakDuration);
    } else {
      setTimerState('work');
      setTimeLeft(settings.workDuration);
    }
    playAlarm();
  }, [timerState, sessionsCompleted, settings, playAlarm]);

  useEffect(() => {
    let interval: number;

    if (status === 'running') {
      interval = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            switchTimer();
            return prev - 1;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, switchTimer]);

  const start = () => setStatus('running');
  const pause = () => setStatus('paused');
  const reset = () => {
    setStatus('idle');
    setTimerState('work');
    setTimeLeft(settings.workDuration);
    setSessionsCompleted(0);
  };

  return {
    timeLeft,
    status,
    timerState,
    sessionsCompleted,
    actions: { start, pause, reset }
  };
}