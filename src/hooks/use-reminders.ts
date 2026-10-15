import { useEffect } from 'react';
import { AppState } from 'react-native';

import { cancelReminders, reminderPermission, remindersSupported, scheduleReminders } from '@/lib/notifications';
import { usePrefs } from '@/lib/prefs';
import type { Profile } from '@/lib/profile';
import { planReminders } from '@/lib/reminders';

/** One sync at a time: two overlapping "cancel all, then schedule" runs could leave duplicates. */
let running: Promise<void> = Promise.resolve();

/**
 * Keeps the phone's scheduled reminders in step with the person's loves, plans and settings: re-planned
 * whenever those change and each time the app comes to the foreground (so the window keeps rolling and a
 * permission turned off in system settings is respected).
 */
export function useReminderSync(profile: Profile | null) {
  const { reminders } = usePrefs();

  useEffect(() => {
    if (!remindersSupported) return;
    const sync = () => (running = running.then(run));
    const run = async () => {
      try {
        if (profile && reminders.on && (await reminderPermission()) === 'granted') {
          await scheduleReminders(planReminders(profile, reminders));
        } else {
          await cancelReminders();
        }
      } catch {
        // Scheduling is best-effort; the app works the same without it.
      }
    };
    sync();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') sync();
    });
    return () => sub.remove();
  }, [profile, reminders]);
}
