import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { Button } from '@/components/button';
import { LifeGrid } from '@/components/life-grid';
import { RichText } from '@/components/rich-text';
import { Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { ZOOMS, lifeView, type Zoom } from '@/lib/life-views';
import { DAY_MS, YEAR_MS, ageAt, birthTime, estimate } from '@/lib/model';
import { useProfile, type Profile } from '@/lib/profile';

export default function LifeScreen() {
  const profile = useProfile();

  return <Screen>{profile ? <Life profile={profile} /> : <Empty />}</Screen>;
}

function Life({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const [zoom, setZoom] = useState<Zoom>('weeks');
  // The grid only needs minute precision; the clock below ticks every second on its own.
  const now = useNow(60_000);
  const est = estimate(profile, now);
  const age = ageAt(profile.dob, now);
  const view = lifeView(zoom, profile.dob, est, now);
  // The median is found in monthly steps from the current age, so re-estimating every tick would
  // pin "time left" to a constant. Anchor it to when the screen opened so the clock really counts down.
  const [anchor] = useState(() => Date.now());
  const end = birthTime(profile.dob) + estimate(profile, anchor).med * YEAR_MS;

  return (
    <>
      <View style={styles.head}>
        <ThemedText type="eyebrow">{profile.name ? `${profile.name}, today` : 'Today'}</ThemedText>
        <RichText
          style={styles.verdict}
          parts={[
            { text: 'You are ' },
            { text: age.toFixed(1), strong: true },
            { text: '. Half of people living like you reach ' },
            { text: String(Math.round(est.med)), strong: true },
            { text: '. That leaves about ' },
            { text: `${Math.round(est.med - age)} years`, strong: true },
            { text: '.' },
          ]}
        />
        <ThemedText type="small">
          Likely range {Math.round(est.q25)}–{Math.round(est.q75)} · {Math.round(est.p80 * 100)}% chance of reaching 80
        </ThemedText>
      </View>

      <View>
        <ThemedText type="eyebrow" themeColor="muted">
          Likely time left
        </ThemedText>
        <Clock end={end} />
      </View>

      <Segmented options={ZOOMS} value={zoom} onChange={setZoom} accessibilityLabel="Zoom" />

      <View style={[styles.board, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <Animated.View key={zoom} entering={FadeIn.duration(300)}>
          <LifeGrid view={view} />
        </Animated.View>
      </View>

      <RichText style={styles.caption} parts={view.caption} />
      <Legend />

      <ThemedText type="small">
        Estimates come from population averages and broad risk ratios. They show direction and rough size, not a
        promise, and are not medical advice.
      </ThemedText>
    </>
  );
}

function Clock({ end }: { end: number }) {
  const now = useNow(1000);
  const ms = Math.max(0, end - now);
  const y = Math.floor(ms / YEAR_MS);
  const rem = ms - y * YEAR_MS;
  const d = Math.floor(rem / DAY_MS);
  const s = Math.floor((rem - d * DAY_MS) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <ThemedText style={styles.clock} accessibilityLabel={`About ${y} years and ${d} days`}>
      {`${y}y ${d}d ${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:`}
      <ThemedText style={styles.clock} themeColor="accent">
        {pad(s % 60)}
      </ThemedText>
    </ThemedText>
  );
}

function Legend() {
  const theme = useTheme();
  const items = [
    { label: 'Lived', fill: theme.lived },
    { label: 'Now', fill: theme.accent },
    { label: 'Likely ahead', stroke: theme.remain },
    { label: 'If fortune allows', stroke: theme.remain, dashed: true },
  ];

  return (
    <View style={styles.legend} accessible={false} importantForAccessibility="no-hide-descendants">
      {items.map((it) => (
        <View key={it.label} style={styles.legendItem}>
          <Svg width={10} height={10}>
            <Circle
              cx={5}
              cy={5}
              r={it.fill ? 5 : 4.25}
              fill={it.fill ?? 'none'}
              stroke={it.stroke}
              strokeWidth={1.5}
              strokeDasharray={it.dashed ? [1.5, 1.5] : undefined}
            />
          </Svg>
          <ThemedText type="mono" themeColor="muted" style={styles.legendText}>
            {it.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

function Empty() {
  return (
    <View style={styles.empty}>
      <ThemedText type="eyebrow">Your time</ThemedText>
      <ThemedText type="subtitle">How much life is likely ahead?</ThemedText>
      <ThemedText>
        A few questions about you (birth date, sex at birth and a handful of habits) turn into a count of your weeks.
        Your answers stay on this device.
      </ThemedText>
      <Button title="Begin" onPress={() => router.push('/details')} />
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    gap: 8,
  },
  verdict: {
    fontSize: 21,
    lineHeight: 29,
  },
  clock: {
    fontFamily: Fonts.mono,
    fontVariant: ['tabular-nums'],
    fontSize: 20,
    lineHeight: 28,
  },
  board: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 14,
  },
  caption: {
    fontSize: 16,
    lineHeight: 24,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    rowGap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendText: {
    fontSize: 11.5,
  },
  empty: {
    gap: 14,
  },
});
