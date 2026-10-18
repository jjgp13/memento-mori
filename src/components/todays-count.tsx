import { StyleSheet, View } from 'react-native';

import { CountUp } from '@/components/onboarding/count-up';
import { ReachOut } from '@/components/reach-out';
import { RichText } from '@/components/rich-text';
import { SourceLink } from '@/components/source-link';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT, type Strings } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { impactAgency, type Impact } from '@/lib/daily';
import { PLANS } from '@/lib/evidence';
import type { Love } from '@/lib/loves';
import { usePrefs } from '@/lib/prefs';
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
  const t = useT();
  const { hideNumbers: hide } = usePrefs();
  const agency = impactAgency(profile, impact, now);
  const love = impact.love;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {impact.back ? t.opening.lookBack : t.opening.todaysCount}
      </ThemedText>
      {hide ? null : <CountUp to={impact.n} style={styles.big} themeColor="accent" />}
      <ThemedText style={styles.what}>{impact.what}</ThemedText>
      {hide ? <ThemedText>{gentleCount(impact, t)}</ThemedText> : null}
      <ThemedText type="small">{hide && impact.love ? t.gentle.loveSub : impact.sub}</ThemedText>

      {love?.kind === 'person' ? (
        <ReachOut love={love} onChange={onChangeLove} compact />
      ) : love?.kind === 'pet' ? (
        <ThemedText>{t.todaysCount.pet}</ThemedText>
      ) : love ? (
        <>
          <ThemedText>{t.todaysCount.activity}</ThemedText>
          <SourceLink source={PLANS.source} prefix={t.common.why} />
        </>
      ) : agency ? (
        <>
          {hide ? (
            <ThemedText>{t.gentle.agency(t.levers[agency.key])}</ThemedText>
          ) : (
            <RichText parts={t.todaysCount.agency(t.levers[agency.key], dec1(agency.years), fmt(agency.more), impact.what)} />
          )}
          <SourceLink of={agency.key} />
        </>
      ) : null}
    </View>
  );
}

/** A count in words for "Hide numbers": a little or a lot. A look back needs none. */
export function gentleCount(impact: Impact, t: Strings) {
  return impact.back ? '' : t.gentle.howMany[impact.n < 100 ? 'few' : 'many'];
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
