import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { ReachOut } from '@/components/reach-out';
import { SourceLink } from '@/components/source-link';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { useLang, useT, type Strings } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { localeOf } from '@/i18n/locale';
import { RichText } from '@/components/rich-text';
import { todaysQuestion, todaysQuote } from '@/lib/daily';
import { allLevers } from '@/lib/habit-impact';
import { loveCount, whoToReachOut, type Love } from '@/lib/loves';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';

const MONTH_MS = 30 * 864e5;

/** For them specifically: what seeing people every week is worth in their estimate, or that they already do. */
function connectionLine(profile: Profile, t: Strings, now: number) {
  const lever = allLevers(profile, now).find((l) => l.key === 'connection');
  if (lever) return t.today.connectionLever(dec1(lever.years));
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
  const quote = todaysQuote(t, now);
  const loves = profile.loves ?? [];
  const person = whoToReachOut(loves);
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

      <Animated.View entering={enter(1)} style={[styles.quote, { borderLeftColor: theme.accent }]}>
        <ThemedText type="quote">{quote.text}</ThemedText>
        <ThemedText type="eyebrow" themeColor="muted">
          {quote.source}
        </ThemedText>
      </Animated.View>

      <Animated.View entering={enter(2)}>
        <ThemedText type="subtitle" style={styles.question}>
          {todaysQuestion(t, now)}
        </ThemedText>
      </Animated.View>

      <Animated.View entering={enter(3)} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <ThemedText type="eyebrow" themeColor="muted">
          {t.today.reachOut}
        </ThemedText>
        {person ? (
          <>
            <ThemedText type="subtitle" style={styles.name}>
              {person.name}
            </ThemedText>
            <RichText parts={t.today.moreVisits(fmt(loveCount(person, profile, now).times))} />
            <ReachOut key={person.id} love={person} onChange={setLove} />
            <ThemedText type="small">
              {t.today.isolation} {connectionLine(profile, t, now)}
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

      {person ? (
        <Animated.View entering={enter(4)}>
          <ThemedText type="small">
            {peopleThisMonth === 0 ? t.today.noneLogged : t.today.peopleThisMonth(peopleThisMonth)}
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
