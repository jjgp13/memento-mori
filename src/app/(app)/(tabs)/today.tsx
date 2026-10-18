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
import { TodaysCount } from '@/components/todays-count';
import { Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { useLang, useT, type Strings } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { localeOf } from '@/i18n/locale';
import { RichText } from '@/components/rich-text';
import { TodaysWords } from '@/components/wisdom-card';
import { todaysImpact } from '@/lib/daily';
import { allLevers } from '@/lib/habit-impact';
import { loveCount, whoToReachOut, type Love } from '@/lib/loves';
import { freshStart } from '@/lib/plans';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';

const MONTH_MS = 30 * 864e5;

/** For them specifically: what seeing people every week is worth in their estimate, or that they already do. */
function connectionLine(profile: Profile, t: Strings, now: number, hide: boolean) {
  const lever = allLevers(profile, now).find((l) => l.key === 'connection');
  if (lever) return hide ? t.gentle.connectionLever : t.today.connectionLever(dec1(lever.years));
  if (profile.connection === 'often') return t.today.connectionOften;
  return '';
}

export default function TodayScreen() {
  const profile = useProfile();
  return <Screen>{profile ? <Today profile={profile} /> : null}</Screen>;
}

function Today({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const now = useNow(60_000);
  const loves = profile.loves ?? [];
  const impact = todaysImpact(profile, t, now);
  // Someone without a plan, and not already today's count, first; planned people have their row under This week.
  const others = loves.filter((l) => l.id !== impact.love?.id);
  const person = whoToReachOut(others.filter((l) => !l.plan)) ?? whoToReachOut(others);
  // Their only person is today's count, which already has Message and Call: no second card for them.
  const hasPeople = loves.some((l) => l.kind === 'person');
  // When they were last here, read once before this visit is recorded (for "welcome back").
  const { lastSeen, hideNumbers: hide } = usePrefs();
  const [previousVisit] = useState(lastSeen);
  useEffect(() => setPref('lastSeen', Date.now()), []);
  const setLove = (next: Love) => saveProfile({ ...profile, loves: loves.map((l) => (l.id === next.id ? next : l)) });
  const peopleThisMonth = loves.filter((l) => l.kind === 'person' && (l.contacts ?? []).some((t) => now - t < MONTH_MS)).length;

  const enter = (i: number) => FadeInDown.delay(150 + i * 250).duration(700);

  return (
    <>
      <Animated.View entering={enter(0)}>
        <ThemedText type="eyebrow">
          {new Date(now).toLocaleDateString(localeOf(lang), { weekday: 'long', month: 'long', day: 'numeric' })}
        </ThemedText>
      </Animated.View>

      <Animated.View entering={enter(1)}>
        <TodaysCount profile={profile} impact={impact} now={now} onChangeLove={setLove} />
      </Animated.View>

      <Animated.View entering={enter(2)}>
        <TodaysWords profile={profile} now={now} love={impact.love} questionType="subtitle" questionStyle={styles.question} />
      </Animated.View>

      <Animated.View entering={enter(3)}>
        <FreshStart profile={profile} now={now} />
      </Animated.View>

      <Animated.View entering={enter(3)}>
        <ThisWeek profile={profile} now={now} lastSeen={previousVisit} freshToday={!!freshStart(profile.dob, now)} />
      </Animated.View>

      {person || !hasPeople ? (
        <Animated.View entering={enter(4)} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            {t.today.reachOut}
          </ThemedText>
          {person ? (
            <>
              <ThemedText type="subtitle" style={styles.name}>
                {person.name}
              </ThemedText>
              {hide ? (
                <ThemedText>{t.gentle.reachOut}</ThemedText>
              ) : (
                <RichText parts={t.today.moreVisits(fmt(loveCount(person, profile, now).times))} />
              )}
              <ReachOut key={person.id} love={person} onChange={setLove} />
              <ThemedText type="small">
                {hide ? t.gentle.isolation : t.today.isolation} {connectionLine(profile, t, now, hide)}
              </ThemedText>
              <SourceLink of="connection" />
            </>
          ) : (
            <>
              <ThemedText>{t.today.noPerson}</ThemedText>
              <Button title={t.today.addSomeone} variant="ghost" onPress={() => router.push('/loves')} />
            </>
          )}
        </Animated.View>
      ) : null}

      {person ? (
        <Animated.View entering={enter(5)}>
          <ThemedText type="small">
            {peopleThisMonth === 0
              ? hide
                ? t.gentle.noneLogged
                : t.today.noneLogged
              : hide
                ? t.gentle.someThisMonth
                : t.today.peopleThisMonth(peopleThisMonth)}
          </ThemedText>
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
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
