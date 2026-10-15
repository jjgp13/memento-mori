import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

import { CountUp } from '@/components/onboarding/count-up';
import { SoundToggle } from '@/components/sound-toggle';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useClockTick } from '@/hooks/use-clock-tick';
import { useNow } from '@/hooks/use-now';
import { fmt } from '@/lib/life-views';
import { DAY_MS, WEEK_MS, YEAR_MS, birthTime } from '@/lib/model';
import { setPref, usePrefs } from '@/lib/prefs';

const UNITS: { label: string; ms: number }[] = [
  { label: 'seconds', ms: 1000 },
  { label: 'minutes', ms: 60_000 },
  { label: 'hours', ms: 3_600_000 },
  { label: 'days', ms: DAY_MS },
  { label: 'weeks', ms: WEEK_MS },
  { label: 'months', ms: YEAR_MS / 12 },
  { label: 'years', ms: YEAR_MS },
];

const ease = Easing.bezier(0.2, 0.7, 0.2, 1);
const FIRST = 250;
const EACH = 420;
const COUNT_UP = 900;
/** Long enough to feel the seconds passing, short enough not to become noise. */
const TICKS = 15;

/**
 * "You have been alive for…" in seconds (still ticking, with an old clock's tick-tock), then minutes,
 * hours, days, weeks, months and years, each fading in and counting up one after another.
 * Replays when the birth date changes.
 */
export function AliveTimeline({ dob }: { dob: string }) {
  if (!dob) return null;
  return <Timeline key={dob} dob={dob} />;
}

function Timeline({ dob }: { dob: string }) {
  const now = useNow(1000);
  const { tickOnboarding } = usePrefs();
  // The clock starts ticking once the seconds have finished counting up and begin to move on their own.
  const [ticking, setTicking] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTicking(true), FIRST + COUNT_UP);
    return () => clearTimeout(t);
  }, []);
  useClockTick(ticking && tickOnboarding, TICKS);

  const lived = now - birthTime(dob);
  const summary = `You have been alive for ${fmt(lived / DAY_MS)} days, about ${Math.floor(lived / YEAR_MS)} years.`;

  return (
    <View style={styles.wrap}>
      <Animated.View entering={FadeInDown.delay(FIRST - 150).duration(500).easing(ease)} style={styles.head}>
        <ThemedText type="eyebrow" themeColor="muted" accessible accessibilityLabel={summary}>
          You have been alive for
        </ThemedText>
        <SoundToggle on={tickOnboarding} onChange={(on) => setPref('tickOnboarding', on)} label="Clock ticking" />
      </Animated.View>
      {UNITS.map((u, i) => {
        const delay = FIRST + i * EACH;
        return (
          <Animated.View
            key={u.label}
            entering={FadeInDown.delay(delay).duration(550).easing(ease)}
            style={styles.row}>
            <CountUp
              to={Math.floor(lived / u.ms)}
              delay={delay}
              duration={COUNT_UP}
              themeColor="accent"
              style={[styles.num, i === 0 && styles.first]}
            />
            <ThemedText style={styles.unit}>{u.label}</ThemedText>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 4,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  num: {
    fontFamily: Fonts.monoMedium,
    fontSize: 20,
    lineHeight: 28,
    fontVariant: ['tabular-nums'],
  },
  first: {
    fontSize: 24,
    lineHeight: 32,
  },
  unit: {
    fontSize: 16,
  },
});
