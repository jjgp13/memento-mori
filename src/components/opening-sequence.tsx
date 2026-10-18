import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { CountUp } from '@/components/onboarding/count-up';
import { Stagger } from '@/components/onboarding/stagger';
import { RichText } from '@/components/rich-text';
import { SourceLink } from '@/components/source-link';
import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { TodaysWords } from '@/components/wisdom-card';
import { impactAgency, todaysImpact } from '@/lib/daily';
import { gentleCount } from '@/components/todays-count';
import { usePrefs } from '@/lib/prefs';
import type { Profile } from '@/lib/profile';

/**
 * Every open: today's count (often someone they love), then words from someone who lived before us
 * and a question (src/lib/wisdom.ts), then the
 * calendar. One tap moves on; Skip closes it.
 */
export function OpeningSequence({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  const theme = useTheme();
  const t = useT();
  const [now] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const { hideNumbers: hide } = usePrefs();

  const impact = todaysImpact(profile, t, now);
  const agency = impactAgency(profile, impact, now);

  const cards = [
    <Stagger key="impact">
      <ThemedText type="eyebrow">{impact.back ? t.opening.lookBack : t.opening.todaysCount}</ThemedText>
      {hide ? null : <CountUp to={impact.n} style={styles.huge} themeColor="accent" />}
      <ThemedText style={styles.what}>{impact.what}</ThemedText>
      {hide ? <ThemedText>{gentleCount(impact, t)}</ThemedText> : null}
      <ThemedText type="small">{hide && impact.love ? t.gentle.loveSub : impact.sub}</ThemedText>
      {agency ? (
        <View style={[styles.agency, { borderTopColor: theme.line }]}>
          {hide ? (
            <ThemedText>{t.gentle.agency(t.levers[agency.key])}</ThemedText>
          ) : (
            <RichText parts={t.opening.agency(t.levers[agency.key], dec1(agency.years), fmt(agency.more), impact.what)} />
          )}
          <SourceLink of={agency.key} />
        </View>
      ) : null}
    </Stagger>,
    <Stagger key="quote">
      <ThemedText type="eyebrow">{t.opening.today}</ThemedText>
      <TodaysWords profile={profile} now={now} love={impact.love} questionStyle={styles.question} />
      <ThemedText type="eyebrow" themeColor="muted">
        {t.opening.tapToSee}
      </ThemedText>
    </Stagger>,
  ];
  const last = index === cards.length - 1;

  return (
    <Animated.View exiting={FadeOut.duration(400)} style={[StyleSheet.absoluteFill, styles.overlay, { backgroundColor: theme.bg }]}>
      <SafeAreaView style={styles.root}>
        <View style={styles.top}>
          <View style={styles.dots} accessibilityLabel={t.opening.cardOf(index + 1, cards.length)}>
            {cards.map((_, k) => (
              <View
                key={k}
                style={[styles.dot, k === index && styles.dotOn, { backgroundColor: k === index ? theme.accent : theme.line }]}
              />
            ))}
          </View>
          <Button title={t.common.skip} variant="link" onPress={onClose} />
        </View>
        <Pressable
          style={styles.root}
          accessibilityRole="button"
          accessibilityLabel={last ? t.opening.seeLife : t.opening.next}
          onPress={() => (last ? onClose() : setIndex(index + 1))}>
          <Animated.View key={index} exiting={FadeOut.duration(200)} style={[StyleSheet.absoluteFill, styles.stage]}>
            {cards[index]}
          </Animated.View>
        </Pressable>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 30,
  },
  root: {
    flex: 1,
  },
  top: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotOn: {
    width: 18,
  },
  stage: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: 40,
    gap: 16,
  },
  huge: {
    fontFamily: Fonts.monoMedium,
    fontSize: 72,
    lineHeight: 80,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  what: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 1,
  },
  agency: {
    borderTopWidth: 1,
    paddingTop: 14,
    gap: 6,
  },
  question: {
    fontFamily: Fonts.display,
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: 0.6,
  },
});
