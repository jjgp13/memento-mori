/**
 * Local reminders on iOS and Android with expo-notifications. Everything is scheduled on the phone:
 * no push server, no token, no account. The web build gets `notifications.ts` instead.
 */
import * as Notifications from 'expo-notifications';
import { useEffect, useEffectEvent } from 'react';
import { Platform } from 'react-native';

import type { Reminder } from '@/lib/reminders';

export type Permission = 'granted' | 'denied' | 'undetermined';

export const remindersSupported = true;

const CHANNEL = 'reminders';

// Shown even while the app is open, but quietly: no sound, no badge.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/** Android 13+ only shows the permission prompt once a channel exists. */
async function ensureChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL, {
    name: 'Reminders',
    description: 'One or two gentle nudges a week to reach out to someone you love.',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

const allowed = (s: Notifications.NotificationPermissionsStatus) =>
  s.granted || s.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

export async function reminderPermission(): Promise<Permission> {
  const s = await Notifications.getPermissionsAsync();
  if (allowed(s)) return 'granted';
  return s.canAskAgain ? 'undetermined' : 'denied';
}

export async function askReminderPermission() {
  await ensureChannel();
  const s = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowSound: false, allowBadge: false },
  });
  return allowed(s);
}

const content = (r: Reminder): Notifications.NotificationContentInput => ({
  title: r.title,
  body: r.body,
  data: r.personId ? { personId: r.personId } : {},
});

/** Replaces every scheduled reminder with these. */
export async function scheduleReminders(reminders: Reminder[]) {
  await ensureChannel();
  await Notifications.cancelAllScheduledNotificationsAsync();
  for (const r of reminders) {
    await Notifications.scheduleNotificationAsync({
      content: content(r),
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: r.at, channelId: CHANNEL },
    });
  }
}

export async function cancelReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/** The next reminder, in a few seconds, so they can see what one looks like. */
export async function sendTestReminder(r: Reminder) {
  await ensureChannel();
  await Notifications.scheduleNotificationAsync({
    content: content(r),
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5, channelId: CHANNEL },
  });
}

/** Taps already acted on, so a remount doesn't open the same person twice. */
const handled = new Set<string>();

/** Calls `onPerson` with the person's id when a reminder about them is tapped, including from a cold start. */
export function useReminderTap(onPerson: (personId: string) => void) {
  const response = Notifications.useLastNotificationResponse();
  const open = useEffectEvent(onPerson);

  useEffect(() => {
    if (!response || response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) return;
    const { request, date } = response.notification;
    const key = `${request.identifier}:${date}`;
    if (handled.has(key)) return;
    handled.add(key);
    const personId = request.content.data?.personId;
    if (typeof personId === 'string') open(personId);
    Notifications.clearLastNotificationResponseAsync().catch(() => {});
  }, [response]);
}
