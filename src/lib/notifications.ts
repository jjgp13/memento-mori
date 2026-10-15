/**
 * Web build: no reminders. Browsers can't schedule a notification for next Sunday without a server, and
 * the app has none. The native version (`notifications.native.ts`) schedules them on the phone.
 * Keep the exports in step with it.
 */
import type { Reminder } from '@/lib/reminders';

export type Permission = 'granted' | 'denied' | 'undetermined';

export const remindersSupported = false;

export async function reminderPermission(): Promise<Permission> {
  return 'denied';
}

export async function askReminderPermission(): Promise<boolean> {
  return false;
}

export async function scheduleReminders(_reminders: Reminder[]) {}

export async function cancelReminders() {}

export async function sendTestReminder(_reminder: Reminder) {}

/** Calls `onPerson` with the person's id when a reminder about them is tapped. */
export function useReminderTap(_onPerson: (personId: string) => void) {}
