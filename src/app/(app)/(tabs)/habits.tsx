import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { SourceLink } from '@/components/source-link';
import { Stepper } from '@/components/stepper';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { HOW_IT_WORKS, WHAT_MATTERS, type Evidence, type Strength } from '@/lib/evidence';
import {
  GOMPERTZ_B,
  HABITS,
  HABIT_KEYS,
  ageAt,
  estimate,
  hazardMultiplier,
  stepsHR,
  survival,
  yearsFromHR,
  type HabitKey,
  type ModelInput,
} from '@/lib/model';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';

export default function HabitsScreen() {
  const profile = useProfile();
  return <Screen>{profile ? <Habits profile={profile} /> : null}</Screen>;
}

function Habits({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const now = useNow(60_000);
  const median = estimate(profile, now).med;
  const update = (patch: Partial<Profile>) => saveProfile({ ...profile, ...patch });

  return (
    <>
      <View style={styles.head}>
        <ThemedText type="eyebrow">What is in your control</ThemedText>
        <ThemedText type="subtitle">Change a habit, change the count</ThemedText>
      </View>

      <View style={styles.est}>
        <Animated.Text key={median.toFixed(1)} entering={FadeIn.duration(400)} style={[styles.big, { color: theme.accent }]}>
          {median.toFixed(1)}
        </Animated.Text>
        <ThemedText type="small" style={styles.flex}>
          median age for someone living like you. Tap an option to see what it would change.
        </ThemedText>
      </View>

      <Steps profile={profile} onChange={update} />

      {HABIT_KEYS.map((k) => (
        <Factor key={k} habit={k} profile={profile} now={now} base={median} onChange={update} />
      ))}

      <View style={styles.section}>
        <ThemedText type="heading">WHAT MATTERS MOST</ThemedText>
        <ThemedText type="small">
          Ranked by size and strength of evidence. Tap one to see the numbers and the source.
        </ThemedText>
        {WHAT_MATTERS.map((e, i) => (
          <EvidenceRow key={e.key} rank={i + 1} item={e} />
        ))}
      </View>

      <HowItWorks />
    </>
  );
}

/** One habit's options, each showing how many years it would add or take compared with now. */
function Factor({
  habit,
  profile,
  now,
  base,
  onChange,
}: {
  habit: HabitKey;
  profile: Profile;
  now: number;
  base: number;
  onChange: (patch: Partial<Profile>) => void;
}) {
  const theme = useTheme();
  const h = HABITS[habit];
  const options: readonly { value: string; label: string }[] = h.options;

  if (habit === 'exercise' && profile.steps) {
    return (
      <View style={[styles.factor, { borderBottomColor: theme.line }]}>
        <ThemedText type="heading">EXERCISE</ThemedText>
        <ThemedText type="small">Replaced by your daily steps above, so nothing is counted twice.</ThemedText>
      </View>
    );
  }

  const age = ageAt(profile.dob, now);
  return (
    <View style={[styles.factor, { borderBottomColor: theme.line }]}>
      <View style={styles.rowBetween}>
        <ThemedText type="heading">{h.short.toUpperCase()}</ThemedText>
        <SourceLink of={habit} prefix="Why" />
      </View>
      <View style={styles.options}>
        {options.map((o) => {
          const on = profile[habit] === o.value;
          const delta = on ? 0 : survival(profile.sex, age, hazardMultiplier({ ...profile, [habit]: o.value } as ModelInput)).med - base;
          const note = on ? 'you now' : Math.abs(delta) < 0.05 ? 'no change' : `${delta > 0 ? '+' : '−'}${Math.abs(delta).toFixed(1)} yrs`;
          return (
            <Pressable
              key={o.value}
              accessibilityRole="radio"
              aria-checked={on}
              accessibilityLabel={`${o.label}: ${note}`}
              onPress={() => onChange({ [habit]: o.value } as Partial<Profile>)}
              style={[
                styles.option,
                { backgroundColor: on ? theme.accentSoft : theme.surface, borderColor: on ? theme.accent : theme.line },
              ]}>
              <ThemedText type="small" themeColor="fg" style={styles.center}>
                {o.label}
              </ThemedText>
              <ThemedText type="mono" themeColor={!on && delta > 0.05 ? 'accent' : 'muted'} style={styles.note}>
                {note}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/** Daily steps with the math shown step by step; replaces the exercise answer when set. */
function Steps({ profile, onChange }: { profile: Profile; onChange: (patch: Partial<Profile>) => void }) {
  const theme = useTheme();
  const steps = profile.steps;
  const hr = stepsHR(steps ?? 6000);
  const years = yearsFromHR(hr);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.rowBetween}>
        <ThemedText type="heading">DAILY STEPS</ThemedText>
        <Badge strength="strong" />
      </View>
      <Stepper
        value={steps ?? 6000}
        onChange={(v) => onChange({ steps: v })}
        step={500}
        min={1000}
        max={20000}
        format={(v) => v.toLocaleString('en-US')}
        accessibilityLabel="Average daily steps"
      />
      {steps ? (
        <View style={styles.math}>
          <ThemedText type="mono">1 · Average: {steps.toLocaleString('en-US')} steps a day</ThemedText>
          <ThemedText type="mono">2 · Risk vs 6,000 steps: × {hr.toFixed(2)}</ThemedText>
          <ThemedText type="mono">
            3 · Years ≈ ln(1 ÷ {hr.toFixed(2)}) ÷ {GOMPERTZ_B} ={' '}
            <ThemedText type="mono" themeColor="accent">
              {years >= 0 ? '+' : '−'}
              {Math.abs(years).toFixed(1)}
            </ThemedText>
          </ThemedText>
          <ThemedText type="mono">4 · Replaces your exercise answer; benefit levels off at 10,000.</ThemedText>
          <SourceLink of="steps" />
          <Button title="Use my exercise answer instead" variant="link" onPress={() => onChange({ steps: undefined })} />
        </View>
      ) : (
        <ThemedText type="small">Tap + or − to use your steps instead of your exercise answer. Your phone&apos;s health app shows your average.</ThemedText>
      )}
    </View>
  );
}

function EvidenceRow({ rank, item }: { rank: number; item: Evidence }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      aria-expanded={open}
      onPress={() => setOpen(!open)}
      style={[styles.evidence, { borderBottomColor: theme.line }]}>
      <View style={styles.rowBetween}>
        <ThemedText type="mono" themeColor="muted" style={styles.rank}>
          {rank}
        </ThemedText>
        <ThemedText style={styles.flex}>{item.title}</ThemedText>
        <Badge strength={item.strength} />
      </View>
      <ThemedText type="small" style={styles.indent}>
        {item.summary}
      </ThemedText>
      {open ? (
        <Animated.View entering={FadeIn.duration(250)} style={[styles.indent, styles.detail]}>
          <ThemedText type="small" themeColor="fg">
            {item.detail}
          </ThemedText>
          <ThemedText type="small">{item.inEstimate ? 'Part of your estimate.' : 'Not in your estimate yet; shown for direction.'}</ThemedText>
          <Pressable accessibilityRole="link" onPress={() => Linking.openURL(item.source.url)}>
            <ThemedText type="small" themeColor="accent" style={styles.link}>
              {item.source.label} ↗
            </ThemedText>
          </Pressable>
        </Animated.View>
      ) : null}
    </Pressable>
  );
}

function Badge({ strength }: { strength: Strength }) {
  const theme = useTheme();
  const strong = strength === 'strong';
  return (
    <View
      style={[
        styles.badge,
        { borderColor: strong ? theme.accent : theme.line, borderStyle: strength === 'emerging' ? 'dashed' : 'solid' },
      ]}>
      <ThemedText type="eyebrow" themeColor={strong ? 'accent' : 'muted'} style={styles.badgeText}>
        {strength}
      </ThemedText>
    </View>
  );
}

function HowItWorks() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <Pressable accessibilityRole="button" aria-expanded={open} onPress={() => setOpen(!open)} style={styles.rowBetween}>
        <ThemedText type="heading">HOW YOUR ESTIMATE WORKS</ThemedText>
        <ThemedText type="mono" themeColor="muted">
          {open ? '−' : '+'}
        </ThemedText>
      </Pressable>
      {open
        ? HOW_IT_WORKS.map((line, i) => (
            <Animated.View key={i} entering={FadeIn.delay(i * 60).duration(300)} style={styles.howRow}>
              <ThemedText type="mono" themeColor="accent">
                {i + 1}
              </ThemedText>
              <ThemedText type="small" themeColor="fg" style={styles.flex}>
                {line}
              </ThemedText>
            </Animated.View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    gap: 8,
  },
  est: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  big: {
    fontFamily: Fonts.monoMedium,
    fontSize: 40,
    lineHeight: 46,
    fontVariant: ['tabular-nums'],
  },
  flex: {
    flex: 1,
  },
  center: {
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  math: {
    gap: 4,
  },
  factor: {
    gap: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  option: {
    flexGrow: 1,
    flexBasis: 90,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 2,
  },
  note: {
    fontSize: 11.5,
  },
  section: {
    gap: 8,
  },
  evidence: {
    gap: 4,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rank: {
    width: 22,
  },
  indent: {
    marginLeft: 32,
  },
  detail: {
    gap: 6,
    paddingTop: 4,
  },
  link: {
    textDecorationLine: 'underline',
  },
  badge: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
  },
  howRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
