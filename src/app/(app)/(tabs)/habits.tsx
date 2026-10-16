import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { ScreenLink } from '@/components/disclaimer';
import { Screen } from '@/components/screen';
import { SourceLink } from '@/components/source-link';
import { Stepper } from '@/components/stepper';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { dec1, num } from '@/i18n/format';
import { habitOptions } from '@/i18n/labels';
import { countryName } from '@/lib/country';
import { WHAT_MATTERS, type Evidence, type Strength } from '@/lib/evidence';
import {
  GOMPERTZ_B,
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
  const t = useT();
  const h = t.habitsScreen;
  const now = useNow(60_000);
  const median = estimate(profile, now).med;
  const update = (patch: Partial<Profile>) => saveProfile({ ...profile, ...patch });

  return (
    <>
      <View style={styles.head}>
        <ThemedText type="eyebrow">{h.eyebrow}</ThemedText>
        <ThemedText type="subtitle">{h.title}</ThemedText>
      </View>

      <View style={styles.est}>
        <Animated.Text key={median.toFixed(1)} entering={FadeIn.duration(400)} style={[styles.big, { color: theme.accent }]}>
          {dec1(median)}
        </Animated.Text>
        <ThemedText type="small" style={styles.flex}>
          {h.median(countryName(profile.country) ?? null)}
        </ThemedText>
      </View>

      <Steps profile={profile} onChange={update} />

      {HABIT_KEYS.map((k) => (
        <Factor key={k} habit={k} profile={profile} now={now} base={median} onChange={update} />
      ))}

      <View style={styles.section}>
        <ThemedText type="heading">{h.whatMatters}</ThemedText>
        <ThemedText type="small">{h.ranked}</ThemedText>
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
  const t = useT();
  const title = t.habits[habit].short.toLocaleUpperCase();
  const options: readonly { value: string; label: string }[] = habitOptions(t, habit);

  if (habit === 'exercise' && profile.steps) {
    return (
      <View style={[styles.factor, { borderBottomColor: theme.line }]}>
        <ThemedText type="heading">{title}</ThemedText>
        <ThemedText type="small">{t.habitsScreen.exerciseReplaced}</ThemedText>
      </View>
    );
  }

  const age = ageAt(profile.dob, now);
  return (
    <View style={[styles.factor, { borderBottomColor: theme.line }]}>
      <View style={styles.rowBetween}>
        <ThemedText type="heading">{title}</ThemedText>
        <SourceLink of={habit} prefix={t.common.why} />
      </View>
      <View style={styles.options}>
        {options.map((o) => {
          const on = profile[habit] === o.value;
          const delta = on ? 0 : survival(profile.sex, age, hazardMultiplier({ ...profile, [habit]: o.value } as ModelInput), profile.country).med - base;
          const note = on
            ? t.habitsScreen.youNow
            : Math.abs(delta) < 0.05
              ? t.habitsScreen.noChange
              : t.common.yrs(`${delta > 0 ? '+' : '−'}${dec1(Math.abs(delta))}`);
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
  const t = useT();
  const h = t.habitsScreen;
  const steps = profile.steps;
  const hr = stepsHR(steps ?? 6000);
  const years = yearsFromHR(hr);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.rowBetween}>
        <ThemedText type="heading">{h.stepsHeading}</ThemedText>
        <Badge strength="strong" />
      </View>
      <Stepper
        value={steps ?? 6000}
        onChange={(v) => onChange({ steps: v })}
        step={500}
        min={1000}
        max={20000}
        format={num}
        accessibilityLabel={h.stepsA11y}
      />
      {steps ? (
        <View style={styles.math}>
          <ThemedText type="mono">{h.math1(num(steps))}</ThemedText>
          <ThemedText type="mono">{h.math2(num(Number(hr.toFixed(2))))}</ThemedText>
          <ThemedText type="mono">
            {h.math3(num(Number(hr.toFixed(2))), num(GOMPERTZ_B))}
            <ThemedText type="mono" themeColor="accent">
              {years >= 0 ? '+' : '−'}
              {dec1(Math.abs(years))}
            </ThemedText>
          </ThemedText>
          <ThemedText type="mono">{h.math4}</ThemedText>
          <SourceLink of="steps" />
          <Button title={h.useExercise} variant="link" onPress={() => onChange({ steps: undefined })} />
        </View>
      ) : (
        <ThemedText type="small">{h.stepsHint}</ThemedText>
      )}
    </View>
  );
}

function EvidenceRow({ rank, item }: { rank: number; item: Evidence }) {
  const theme = useTheme();
  const t = useT();
  const text = t.evidence[item.key];
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
        <ThemedText style={styles.flex}>{text.title}</ThemedText>
        <Badge strength={item.strength} />
      </View>
      <ThemedText type="small" style={styles.indent}>
        {text.summary}
      </ThemedText>
      {open ? (
        <Animated.View entering={FadeIn.duration(250)} style={[styles.indent, styles.detail]}>
          <ThemedText type="small" themeColor="fg">
            {text.detail}
          </ThemedText>
          <ThemedText type="small">{item.inEstimate ? t.habitsScreen.inEstimate : t.habitsScreen.notInEstimate}</ThemedText>
          {[item.source, ...(item.also ?? [])].map((s) => (
            <Pressable key={s.url} accessibilityRole="link" onPress={() => Linking.openURL(s.url)}>
              <ThemedText type="small" themeColor="accent" style={styles.link}>
                {s.label} ↗
              </ThemedText>
            </Pressable>
          ))}
        </Animated.View>
      ) : null}
    </Pressable>
  );
}

function Badge({ strength }: { strength: Strength }) {
  const theme = useTheme();
  const t = useT();
  const strong = strength === 'strong';
  return (
    <View
      style={[
        styles.badge,
        { borderColor: strong ? theme.accent : theme.line, borderStyle: strength === 'emerging' ? 'dashed' : 'solid' },
      ]}>
      <ThemedText type="eyebrow" themeColor={strong ? 'accent' : 'muted'} style={styles.badgeText}>
        {t.habitsScreen.strength[strength]}
      </ThemedText>
    </View>
  );
}

function HowItWorks() {
  const theme = useTheme();
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <Pressable accessibilityRole="button" aria-expanded={open} onPress={() => setOpen(!open)} style={styles.rowBetween}>
        <ThemedText type="heading">{t.habitsScreen.howItWorks}</ThemedText>
        <ThemedText type="mono" themeColor="muted">
          {open ? '−' : '+'}
        </ThemedText>
      </Pressable>
      {open
        ? t.howItWorks.map((line, i) => (
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
      <ScreenLink href="/how-it-works" title={t.methods.everyStep} />
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
