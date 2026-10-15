import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { LifeGrid } from '@/components/life-grid';
import { RichText } from '@/components/rich-text';
import { Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { SourceLink } from '@/components/source-link';
import { Stepper } from '@/components/stepper';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { MAX_TOTAL_GAIN, allLevers, combinedGain, habitBreakdown, habitsEffect, type Lever } from '@/lib/habit-impact';
import { ZOOMS, fmt, lifeView, type Zoom } from '@/lib/life-views';
import { DAY_MS, WEEKS_PER_YEAR, YEAR_MS, ageAt, birthTime, estimate, type ModelInput } from '@/lib/model';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';
import { SWAP_HOURS, shareOfWaking, swapSuggestion, yearsLeft, yearsOfHours } from '@/lib/time-use';

export default function LifeScreen() {
  const profile = useProfile();

  // Onboarding guards this screen, so a profile is always here in practice.
  return <Screen>{profile ? <Life profile={profile} /> : null}</Screen>;
}

function Life({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const [zoom, setZoom] = useState<Zoom>('weeks');
  // The grid only needs minute precision; the clock below ticks every second on its own.
  const now = useNow(60_000);
  const est = estimate(profile, now);
  const age = ageAt(profile.dob, now);
  const levers = allLevers(profile, now);
  const gain = combinedGain(profile, now);
  const view = lifeView(zoom, profile.dob, est, now, gain);
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

      <HabitsCard profile={profile} now={now} levers={levers} gain={gain} />
      <PhoneCard profile={profile} now={now} />

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
      <Legend reach={gain > 0} />

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

function Legend({ reach }: { reach: boolean }) {
  const theme = useTheme();
  const items = [
    { label: 'Lived', fill: theme.lived },
    { label: 'Now', fill: theme.accent },
    { label: 'Likely ahead', stroke: theme.remain },
    ...(reach ? [{ label: 'Within reach', fill: theme.accentSoft, stroke: theme.accent }] : []),
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
              r={it.fill && !it.stroke ? 5 : 4.25}
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

/** Daily phone time in time-left terms, and what half an hour of it could become. */
function PhoneCard({ profile, now }: { profile: Profile; now: number }) {
  const theme = useTheme();
  const hours = profile.phoneHours;
  const left = yearsLeft(profile, now);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        Your phone
      </ThemedText>
      {hours != null ? (
        <>
          <RichText
            parts={[
              { text: `${hours} hours a day is about ` },
              { text: `${yearsOfHours(hours, left).toFixed(1)} years`, strong: true },
              { text: ` of the time you likely have left: ${shareOfWaking(hours)} of your waking hours.` },
            ]}
          />
          {hours >= SWAP_HOURS ? (
            <ThemedText type="small">
              Half an hour less a day could become {swapSuggestion(profile, profile.loves ?? [], now)}. In experiments,
              cutting back on social media meant more time with family and friends and less loneliness.
            </ThemedText>
          ) : null}
          <SourceLink of="phone" />
        </>
      ) : (
        <ThemedText>How many hours a day are you on your phone? Your Screen Time or Digital Wellbeing settings show the daily average.</ThemedText>
      )}
      <Stepper
        value={hours ?? 4}
        onChange={(phoneHours) => saveProfile({ ...profile, phoneHours })}
        step={0.5}
        max={16}
        format={(v) => `${v} h`}
        accessibilityLabel="Hours a day on your phone"
      />
    </View>
  );
}

/**
 * What the person's habits do to the estimate, and every change within reach, each linked to its study.
 * The combined gain is what the bronze circles on the calendar show.
 */
function HabitsCard({ profile, now, levers, gain }: { profile: ModelInput; now: number; levers: Lever[]; gain: number }) {
  const theme = useTheme();
  const total = habitsEffect(profile, now);
  const items = habitBreakdown(profile, now);
  const signed = (y: number) => `${y > 0 ? '+' : '−'}${Math.abs(y).toFixed(1)}`;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        Your habits
      </ThemedText>
      <RichText
        parts={
          Math.abs(total) < 0.2
            ? [{ text: 'Your habits keep you close to the baseline estimate.' }]
            : [
                { text: `Your habits ${total > 0 ? 'add' : 'cost'} about ` },
                { text: `${Math.abs(total).toFixed(1)} years`, strong: true },
                { text: '.' },
              ]
        }
      />
      {items.map((it) => (
        <View key={it.key} style={styles.habitRow}>
          <View style={styles.flex}>
            <ThemedText type="small">
              {it.label} · {it.answer}
            </ThemedText>
            <SourceLink of={it.key} prefix="Why" />
          </View>
          <ThemedText type="mono" themeColor={it.years > 0 ? 'accent' : 'muted'}>
            {signed(it.years)} yrs
          </ThemedText>
        </View>
      ))}

      {levers.length ? (
        <View style={[styles.lever, { borderTopColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            Within reach
          </ThemedText>
          {levers.map((l) => (
            <View key={l.key} style={styles.habitRow}>
              <View style={styles.flex}>
                <ThemedText>{l.label}</ThemedText>
                <ThemedText type="small">about {fmt(l.years * WEEKS_PER_YEAR)} more weekends</ThemedText>
                <SourceLink of={l.key} />
              </View>
              <ThemedText type="mono" themeColor="accent">
                {signed(l.years)} yrs
              </ThemedText>
            </View>
          ))}
          <RichText
            parts={[
              { text: levers.length > 1 ? 'Together, about ' : 'That is about ' },
              { text: `${gain.toFixed(1)} more years`, strong: true },
              {
                text: `${gain >= MAX_TOTAL_GAIN ? ' (capped: habit effects overlap)' : ''}. They are the bronze circles below.`,
              },
            ]}
          />
        </View>
      ) : (
        <ThemedText type="small">
          You are already doing the things that add the most time. Keep them, and keep your people close.
        </ThemedText>
      )}
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
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 8,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  lever: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 4,
    gap: 10,
  },
});
