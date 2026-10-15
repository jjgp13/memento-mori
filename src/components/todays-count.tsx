import { StyleSheet, View } from 'react-native';

import { CountUp } from '@/components/onboarding/count-up';
import { ReachOut } from '@/components/reach-out';
import { SourceLink } from '@/components/source-link';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { impactAgency, type Impact } from '@/lib/daily';
import { PLANS } from '@/lib/evidence';
import { fmt } from '@/lib/life-views';
import type { Love } from '@/lib/loves';
import type { Profile } from '@/lib/profile';

/**
 * One count a day, most often someone or something they love, with the next step right under it: a
 * count alone is a death reminder, and those help only when paired with something doable (docs/nudges.md
 * §1g). One rotating count rather than a list, so it stays fresh (§1b).
 */
export function TodaysCount({
  profile,
  impact,
  now,
  onChangeLove,
}: {
  profile: Profile;
  impact: Impact;
  now: number;
  onChangeLove: (next: Love) => void;
}) {
  const theme = useTheme();
  const agency = impactAgency(profile, impact, now);
  const love = impact.love;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {impact.back ? 'Look back' : "Today's count"}
      </ThemedText>
      <CountUp to={impact.n} style={styles.big} themeColor="accent" />
      <ThemedText style={styles.what}>{impact.what}</ThemedText>
      <ThemedText type="small">{impact.sub}</ThemedText>

      {love?.kind === 'person' ? (
        <ReachOut love={love} onChange={onChangeLove} compact />
      ) : love?.kind === 'pet' ? (
        <ThemedText>A walk or some quiet time together today?</ThemedText>
      ) : love ? (
        <>
          <ThemedText>Could you pick a day for the next one? Deciding when makes it more likely.</ThemedText>
          <SourceLink source={PLANS.source} prefix="Why" />
        </>
      ) : agency ? (
        <>
          <ThemedText>
            {agency.label} could add about{' '}
            <ThemedText themeColor="accent" style={styles.num}>
              {agency.years.toFixed(1)} years
            </ThemedText>
            : about{' '}
            <ThemedText themeColor="accent" style={styles.num}>
              {fmt(agency.more)}
            </ThemedText>{' '}
            {impact.what}. You can try it on the Life calendar.
          </ThemedText>
          <SourceLink of={agency.key} />
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
    gap: 8,
  },
  big: {
    fontFamily: Fonts.monoMedium,
    fontSize: 52,
    lineHeight: 60,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  what: {
    fontFamily: Fonts.display,
    fontSize: 21,
    lineHeight: 27,
    letterSpacing: 1,
  },
  num: {
    fontFamily: Fonts.monoMedium,
  },
});
