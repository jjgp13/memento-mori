import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { FreshStart } from '@/components/fresh-start';
import { ReachOut } from '@/components/reach-out';
import { SourceLink } from '@/components/source-link';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ThisWeek } from '@/components/this-week';
import { Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { todaysQuestion, todaysQuote } from '@/lib/daily';
import { allLevers } from '@/lib/habit-impact';
import { fmt } from '@/lib/life-views';
import { loveCount, whoToReachOut, type Love } from '@/lib/loves';
import { freshStart } from '@/lib/plans';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';

const MONTH_MS = 30 * 864e5;

/** For them specifically: what seeing people every week is worth in their estimate, or that they already do. */
function connectionLine(profile: Profile, now: number) {
  const lever = allLevers(profile, now).find((l) => l.key === 'connection');
  if (lever) return `For you, seeing the people you love every week could add about ${lever.years.toFixed(1)} years.`;
  if (profile.connection === 'often') return 'Seeing people every week is already part of your estimate. Keep it up.';
  return '';
}

export default function TodayScreen() {
  const profile = useProfile();
  return <Screen>{profile ? <Today profile={profile} /> : null}</Screen>;
}

function Today({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const now = useNow(60_000);
  const quote = todaysQuote(now);
  const loves = profile.loves ?? [];
  // Someone without a plan first; planned people already have their row under This week.
  const person = whoToReachOut(loves.filter((l) => !l.plan)) ?? whoToReachOut(loves);
  // When they were last here, read once before this visit is recorded (for "welcome back").
  const { lastSeen } = usePrefs();
  const [previousVisit] = useState(lastSeen);
  useEffect(() => setPref('lastSeen', Date.now()), []);
  const setLove = (next: Love) => saveProfile({ ...profile, loves: loves.map((l) => (l.id === next.id ? next : l)) });
  const peopleThisMonth = loves.filter((l) => l.kind === 'person' && (l.contacts ?? []).some((t) => now - t < MONTH_MS)).length;

  const enter = (i: number) => FadeInDown.delay(150 + i * 250).duration(700);

  return (
    <>
      <Animated.View entering={enter(0)}>
        <ThemedText type="eyebrow">
          {new Date(now).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </ThemedText>
      </Animated.View>

      <Animated.View entering={enter(1)} style={[styles.quote, { borderLeftColor: theme.accent }]}>
        <ThemedText type="quote">{quote.text}</ThemedText>
        <ThemedText type="eyebrow" themeColor="muted">
          {quote.source}
        </ThemedText>
      </Animated.View>

      <Animated.View entering={enter(2)}>
        <ThemedText type="subtitle" style={styles.question}>
          {todaysQuestion(now)}
        </ThemedText>
      </Animated.View>

      <Animated.View entering={enter(3)}>
        <FreshStart profile={profile} now={now} />
      </Animated.View>

      <Animated.View entering={enter(3)}>
        <ThisWeek profile={profile} now={now} lastSeen={previousVisit} freshToday={!!freshStart(profile.dob, now)} />
      </Animated.View>

      <Animated.View entering={enter(4)} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <ThemedText type="eyebrow" themeColor="muted">
          Reach out today
        </ThemedText>
        {person ? (
          <>
            <ThemedText type="subtitle" style={styles.name}>
              {person.name}
            </ThemedText>
            <ThemedText>
              About{' '}
              <ThemedText themeColor="accent">{fmt(loveCount(person, profile, now).times)}</ThemedText> more visits at your
              current pace. A message takes a minute.
            </ThemedText>
            <ReachOut key={person.id} love={person} onChange={setLove} />
            <ThemedText type="small">
              People who stay close to others live longer: isolation and loneliness are linked to about 26–32% higher
              risk of dying early. {connectionLine(profile, now)}
            </ThemedText>
            <SourceLink of="connection" />
          </>
        ) : (
          <>
            <ThemedText>
              Close relationships are one of the strongest predictors of a long, healthy life. Who would you like to see
              more of?
            </ThemedText>
            <Button title="Add someone who loves you" variant="ghost" onPress={() => router.push('/loves')} />
          </>
        )}
      </Animated.View>

      {person ? (
        <Animated.View entering={enter(5)}>
          <ThemedText type="small">
            {peopleThisMonth === 0
              ? 'No calls or visits logged in the last 30 days yet.'
              : `In the last 30 days you talked with or saw ${peopleThisMonth} of the people you love.`}
          </ThemedText>
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  quote: {
    borderLeftWidth: 2,
    paddingLeft: 18,
    gap: 12,
  },
  question: {
    fontSize: 21,
    lineHeight: 28,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 10,
  },
  name: {
    fontSize: 22,
  },
});
