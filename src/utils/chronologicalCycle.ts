import { UserProfile } from '../types';

export const CYCLE_DURATION_HOURS = 24;
export const CYCLE_DURATION_MS = CYCLE_DURATION_HOURS * 60 * 60 * 1000;

export interface ChronologicalStatus {
  maxCompletedDay: number;
  nextDayNumber: number;
  isNextDayWaiting: boolean;
  remainingMs: number;
  formattedTime: string; // HH:MM:SS
  hours: number;
  minutes: number;
  seconds: number;
  canRegisterDay: (day: number) => boolean;
  isDayWaiting: (day: number) => boolean;
  isDayCompleted: (day: number) => boolean;
  isDayActive: (day: number) => boolean;
  unlockTimestamp: number | null;
}

/**
 * Formats milliseconds into HH:MM:SS (Horas, minutos y segundos)
 */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Retrieves the recorded completion timestamp for a specific day.
 * If the day is completed but has no timestamp (legacy session or initial check-in),
 * initializes it with a recent timestamp so the 24h countdown is activated immediately.
 */
export function getDayCompletionTimestamp(user: UserProfile | null, day: number): number | null {
  if (!user || day <= 0) return null;

  // 1. From UserProfile object
  if (user.dayCompletedTimestamps && user.dayCompletedTimestamps[day]) {
    return user.dayCompletedTimestamps[day];
  }

  // 2. From LocalStorage
  const localKey = `colifem_day_${day}_completed_timestamp`;
  const stored = localStorage.getItem(localKey);
  if (stored) {
    const val = parseInt(stored, 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // 3. From Check-in record
  const checkIn = user.checkIns?.[day];
  if (checkIn?.registeredAt && checkIn.registeredAt > 0) {
    return checkIn.registeredAt;
  }
  if (checkIn?.date) {
    const parsed = new Date(checkIn.date).getTime();
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }

  // 4. Fallback if day is marked completed but timestamp was omitted:
  // Initialize to Date.now() so the 24h countdown is active right now!
  if (user.completedDays.includes(day)) {
    const now = Date.now();
    try {
      localStorage.setItem(localKey, now.toString());
    } catch (e) {
      // ignore
    }
    return now;
  }

  return null;
}

/**
 * Calculates full chronological cycle status for the user profile
 */
export function getChronologicalStatus(
  user: UserProfile | null,
  demoMode: boolean = false,
  nowMs: number = Date.now()
): ChronologicalStatus {
  if (!user) {
    return {
      maxCompletedDay: 0,
      nextDayNumber: 1,
      isNextDayWaiting: false,
      remainingMs: 0,
      formattedTime: '00:00:00',
      hours: 0,
      minutes: 0,
      seconds: 0,
      canRegisterDay: () => false,
      isDayWaiting: () => false,
      isDayCompleted: () => false,
      isDayActive: () => false,
      unlockTimestamp: null
    };
  }

  const completed = user.completedDays || [];
  const maxCompletedDay = completed.length > 0 ? Math.max(...completed) : 0;
  const nextDayNumber = Math.min(30, maxCompletedDay + 1);

  if (maxCompletedDay === 0) {
    // Day 1 is always unlocked and ready to register
    return {
      maxCompletedDay: 0,
      nextDayNumber: 1,
      isNextDayWaiting: false,
      remainingMs: 0,
      formattedTime: '00:00:00',
      hours: 0,
      minutes: 0,
      seconds: 0,
      canRegisterDay: (day: number) => day === 1,
      isDayWaiting: () => false,
      isDayCompleted: (day: number) => completed.includes(day),
      isDayActive: (day: number) => day === 1,
      unlockTimestamp: null
    };
  }

  if (maxCompletedDay >= 30) {
    // All 30 days completed!
    return {
      maxCompletedDay: 30,
      nextDayNumber: 30,
      isNextDayWaiting: false,
      remainingMs: 0,
      formattedTime: '00:00:00',
      hours: 0,
      minutes: 0,
      seconds: 0,
      canRegisterDay: () => false,
      isDayWaiting: () => false,
      isDayCompleted: (day: number) => completed.includes(day),
      isDayActive: () => false,
      unlockTimestamp: null
    };
  }

  // Calculate 24h countdown based on when maxCompletedDay was finished
  const lastCompletionTimestamp = getDayCompletionTimestamp(user, maxCompletedDay) || nowMs;
  const unlockTimestamp = lastCompletionTimestamp + CYCLE_DURATION_MS;
  const diffMs = unlockTimestamp - nowMs;
  const remainingMs = demoMode ? 0 : Math.max(0, diffMs);
  const isNextDayWaiting = remainingMs > 0;

  const totalSec = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const formattedTime = formatCountdown(remainingMs);

  const isDayCompleted = (day: number) => completed.includes(day);

  const isDayWaiting = (day: number) => {
    if (demoMode) return false;
    return day === nextDayNumber && isNextDayWaiting;
  };

  const isDayActive = (day: number) => {
    if (isDayCompleted(day)) return false;
    if (demoMode) return day === nextDayNumber;
    return day === nextDayNumber && !isNextDayWaiting;
  };

  const canRegisterDay = (day: number) => {
    if (demoMode) return true;
    // You cannot register if already completed or if day is not active
    return isDayActive(day);
  };

  return {
    maxCompletedDay,
    nextDayNumber,
    isNextDayWaiting,
    remainingMs,
    formattedTime,
    hours,
    minutes,
    seconds,
    canRegisterDay,
    isDayWaiting,
    isDayCompleted,
    isDayActive,
    unlockTimestamp
  };
}
