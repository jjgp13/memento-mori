import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { SourceLink } from '@/components/source-link';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { FRESH_START } from '@/lib/evidence';
import { bestLever } from '@/lib/habit-impact';
import { fmt } from '@/lib/life-views';
import { whoToReachOut } from '@/lib/loves';
import { WEEKS_PER_YEAR, ageAt } from '@/lib/model';
import { capitalize, defaultHabitPlan, focusIsCurrent, freshStart, freshStartLabel, nameInSentence, type FreshStartKind } from '@/lib/plans';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, type Profile } from '@/lib/profile';

const EYEBROW: Record<FreshStartKind, string> = {
  week: 'Monday · a fresh start',
  month: 'The 1st · a fresh start',
  birthday: 'Your birthday · a fresh start',
};

const sameDay = (a: number, b: number) => new Date(a).toDateString() === new Date(b).toDateString();

/** A few concrete "one things" from what they told us: a person, their best habit change, something they love. */
function ideas(profile: Profile, now: number) {
  const loves = profile.loves ?? [];
  const person = whoToReachOut(loves);
  const lever = bestLever(profile, now);
  const activity = loves.find((l) => l.kind === 'activity');
  const plan = lever ? defaultHabitPlan(lever.key, now) : null;
  return [
    person ? `Call ${nameInSentence(person.name)}` : null,
    plan ? capitalize(`${plan.action}${plan.anchor && plan.anchor.startsWith('after') ? ` ${plan.anchor}` : ''}`) : null,
    activity ? activity.name : null,
    'Write to someone I am grateful for',
  ].filter((x): x is string => !!x).slice(0, 3);
}

/**
 * On Mondays, the 1st and their birthday: "one thing for this week / month / your new year". One tap to
 * pick, one to wave off for today. What they pick shows under This week until the period ends.
 */
export function FreshStart({ profile, now }: { profile: Profile; now: number }) {
  const theme = useTheme();
  const { freshStartDismissedAt } = usePrefs();
  const [text, setText] = useState('');
  const kind = freshStart(profile.dob, now);
  if (!kind || sameDay(freshStartDismissedAt, now)) return null;
  if (focusIsCurrent(profile.focus, profile.dob, now) && profile.focus.period === kind) return null;

  const label = freshStartLabel(kind, now);
  const choose = (t: string) => saveProfile({ ...profile, focus: { text: t.trim(), period: kind, setAt: Date.now() } });

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.accent }]}>
      <ThemedText type="eyebrow">{EYEBROW[kind]}</ThemedText>
      <ThemedText type="subtitle" style={styles.title}>
        One thing for {label}?
      </ThemedText>
      <ThemedText>
        {kind === 'birthday'
          ? `Happy birthday${profile.name ? `, ${profile.name}` : ''}. You have lived about ${fmt(ageAt(profile.dob, now) * WEEKS_PER_YEAR)} weeks, some of them wonderful. What is one thing you could do with the year ahead?`
          : `What is one thing you could do ${kind === 'week' ? 'this week' : `in ${label}`} that you would be glad you did?`}
      </ThemedText>
      <View style={styles.chips}>
        {ideas(profile, now).map((idea) => (
          <Pressable
            key={idea}
            accessibilityRole="button"
            accessibilityLabel={`Use idea: ${idea}`}
            onPress={() => setText(idea)}
            style={[styles.chip, { backgroundColor: text === idea ? theme.accentSoft : theme.bg, borderColor: text === idea ? theme.accent : theme.line }]}>
            <ThemedText type="small" themeColor="fg">
              {idea}
            </ThemedText>
          </Pressable>
        ))}
      </View>
      <TextField value={text} onChangeText={setText} placeholder="or your own" accessibilityLabel={`One thing for ${label}`} />
      <Button title="Make it my one thing" disabled={!text.trim()} onPress={() => choose(text)} />
      <ThemedText type="small">{FRESH_START.claim}</ThemedText>
      <SourceLink source={FRESH_START.source} />
      <Button title="Not today" variant="link" onPress={() => setPref('freshStartDismissedAt', Date.now())} style={styles.start} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 21,
    lineHeight: 27,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  start: {
    alignSelf: 'flex-start',
  },
});
