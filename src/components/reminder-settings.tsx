import { useEffect, useState } from 'react';
import { AppState, Linking, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Segmented } from '@/components/segmented';
import { SlotPicker } from '@/components/slot-picker';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { askReminderPermission, reminderPermission, sendTestReminder, type Permission } from '@/lib/notifications';
import { setPref, usePrefs } from '@/lib/prefs';
import type { Profile } from '@/lib/profile';
import { planReminders, timeLabel, type ReminderPrefs, type Slot } from '@/lib/reminders';

const ON_OFF = [
  { key: 'on', label: 'On' },
  { key: 'off', label: 'Off' },
] as const;
const PER_WEEK = [
  { key: '1', label: 'Once a week' },
  { key: '2', label: 'Twice a week' },
] as const;

/** Reminders on the You screen: on/off, once or twice a week, which day and time. Native only. */
export function ReminderSettings({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const { reminders } = usePrefs();
  const [permission, setPermission] = useState<Permission | null>(null);
  const [tested, setTested] = useState(false);
  const update = (patch: Partial<ReminderPrefs>) => setPref('reminders', { ...reminders, ...patch });

  // Re-checked on return from system settings.
  useEffect(() => {
    const check = () => reminderPermission().then(setPermission, () => setPermission('denied'));
    check();
    const sub = AppState.addEventListener('change', (s) => s === 'active' && check());
    return () => sub.remove();
  }, []);

  async function turnOn() {
    const granted = permission === 'granted' || (await askReminderPermission().catch(() => false));
    setPermission(granted ? 'granted' : await reminderPermission().catch(() => 'denied' as const));
    if (granted) update({ on: true });
  }

  const blocked = permission !== null && permission !== 'granted';
  const on = reminders.on && permission === 'granted';
  const next = planReminders(profile, reminders)[0];
  const setSlot = (i: 0 | 1, s: Slot) =>
    update({ slots: (i === 0 ? [s, reminders.slots[1]] : [reminders.slots[0], s]) as ReminderPrefs['slots'] });

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="heading">REMINDERS</ThemedText>
      <ThemedText type="small" themeColor="fg">
        One or two a week, each naming one person to reach out to (or one small thing to do). Tapping one opens them
        here with Call and Message ready. Scheduled on this phone only.
      </ThemedText>

      <Segmented
        options={[...ON_OFF]}
        value={on ? 'on' : 'off'}
        onChange={(k) => (k === 'on' ? turnOn() : update({ on: false }))}
        accessibilityLabel="Reminders"
      />

      {reminders.on && blocked ? (
        <View style={styles.group}>
          <ThemedText type="small" themeColor="danger">
            Notifications are turned off for Memento Mori in your phone&apos;s settings.
          </ThemedText>
          <Button title="Open settings" variant="ghost" onPress={() => Linking.openSettings()} />
        </View>
      ) : null}

      {on ? (
        <>
          <Segmented
            options={[...PER_WEEK]}
            value={String(reminders.perWeek) as '1' | '2'}
            onChange={(k) => update({ perWeek: k === '2' ? 2 : 1 })}
            accessibilityLabel="How many a week"
          />
          <View style={styles.group}>
            <ThemedText type="small">{reminders.perWeek === 2 ? 'First' : 'When'}</ThemedText>
            <SlotPicker value={reminders.slots[0]} onChange={(s) => setSlot(0, s)} label="First reminder" />
          </View>
          {reminders.perWeek === 2 ? (
            <View style={styles.group}>
              <ThemedText type="small">Second</ThemedText>
              <SlotPicker value={reminders.slots[1]} onChange={(s) => setSlot(1, s)} label="Second reminder" />
            </View>
          ) : null}
          <ThemedText type="small">
            Someone with a plan on the Loves tab (&quot;when will you reach out?&quot;) gets their reminder at that time
            instead.
          </ThemedText>
          {next ? (
            <ThemedText type="small" themeColor="fg">
              Next: {next.at.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })},{' '}
              {timeLabel({ hour: next.at.getHours(), minute: next.at.getMinutes() })} · {next.title}
            </ThemedText>
          ) : null}
          <Button
            title={tested ? 'Sent: it arrives in a few seconds' : 'Send a test reminder'}
            variant="ghost"
            disabled={tested || !next}
            onPress={() => {
              if (!next) return;
              setTested(true);
              sendTestReminder(next).catch(() => setTested(false));
            }}
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 12,
  },
  group: {
    gap: 8,
  },
});
