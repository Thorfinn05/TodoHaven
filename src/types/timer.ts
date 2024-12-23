export interface TimerSettings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
}

export type TimerState = 'work' | 'break' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';