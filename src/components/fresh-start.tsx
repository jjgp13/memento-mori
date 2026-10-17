import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { SourceLink } from '@/components/source-link';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT, type Strings } from '@/i18n';
import { fmt } from '@/i18n/format';
import { FRESH_START } from '@/lib/evidence';
import { bestLever } from '@/lib/habit-impact';
import { whoToReachOut } from '@/lib/loves';
import { WEEKS_PER_YEAR, ageAt } from '@/lib/model';
import { capitalize, defaultHabitPlan, focusIsCurrent, freshStart, freshStartLabel, isAfterAnchor, nameInSentence } from '@/lib/plans';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, type Profile } from '@/lib/profile';

const sameDay = (a: number, b: number) => new Date(a).toDateString() === new Date(b).toDateString();

/** A few concrete "one things" from what they told us: a person, their best habit change, something they love. */
function ideas(profile: Profile, t: Strings, now: number) {
  const loves = profile.loves ?? [];
  const person = whoToReachOut(loves);
  const lever = bestLever(profile, now);
  const activity = loves.find((l) => l.kind === 'activity');
  const plan = lever ? defaultHabitPlan(lever.key, t, now) : null;
  return [
    person ? t.freshStart.callIdea(nameInSentence(person.name, t)) : null,
    plan ? capitalize(plan.anchor && isAfterAnchor(t, plan.anchor) ? t.plans.withAnchor(plan.action, plan.anchor) : plan.action) : null,
    activity ? activity.name : null,
    t.freshStart.gratitudeIdea,
  ].filter((x): x is string => !!x).slice(0, 3);
}

/**
 * On Mondays, the 1st and their birthday: "one thing for this week / month / your new year". One tap to
 * pick, one to wave off for today. What they pick shows under This week until the period ends.
 */
export function FreshStart({ profile, now }: { profile: Profile; now: number }) {
  const theme = useTheme();
  const t = useT();
  const f = t.freshStart;
  const { freshStartDismissedAt } = usePrefs();
  const [text, setText] = useState('');
  const kind = freshStart(profile.dob, now);
  if (!kind || sameDay(freshStartDismissedAt, now)) return null;
  if (focusIsCurrent(profile.focus, profile.dob, now) && profile.focus.period === kind) return null;

  const label = freshStartLabel(kind, t, now);
  const choose = (thing: string, at: number) => saveProfile({ ...profile, focus: { text: thing.trim(), period: kind, setAt: at } });

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.accent }]}>
      <ThemedText type="eyebrow">{f.eyebrow[kind]}</ThemedText>
      <ThemedText type="subtitle" style={styles.title}>
        {f.title(label)}
      </ThemedText>
      <ThemedText>
        {kind === 'birthday'
          ? f.birthday(profile.name, fmt(ageAt(profile.dob, now) * WEEKS_PER_YEAR))
          : f.prompt(kind === 'week', label)}
      </ThemedText>
      <View style={styles.chips}>
        {ideas(profile, t, now).map((idea) => (
          <Pressable
            key={idea}
            accessibilityRole="button"
            accessibilityLabel={f.useIdea(idea)}
            onPress={() => setText(idea)}
            style={[styles.chip, { backgroundColor: text === idea ? theme.accentSoft : theme.bg, borderColor: text === idea ? theme.accent : theme.line }]}>
            <ThemedText type="small" themeColor="fg">
              {idea}
            </ThemedText>
          </Pressable>
        ))}
      </View>
      <TextField value={text} onChangeText={setText} placeholder={f.ownPlaceholder} accessibilityLabel={f.a11y(label)} />
      <Button title={f.choose} disabled={!text.trim()} onPress={() => choose(text, Date.now())} />
      <ThemedText type="small">{t.claims.freshStart}</ThemedText>
      <SourceLink source={FRESH_START.source} />
      <Button title={f.notToday} variant="link" onPress={() => setPref('freshStartDismissedAt', Date.now())} style={styles.start} />
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
