import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Choices } from '@/components/choices';
import { DatePicker } from '@/components/date-picker';
import { LanguagePicker } from '@/components/language-picker';
import { AliveTimeline } from '@/components/onboarding/alive-timeline';
import { CountUp } from '@/components/onboarding/count-up';
import { LoveEditor } from '@/components/onboarding/love-editor';
import { Stagger } from '@/components/onboarding/stagger';
import { RichText } from '@/components/rich-text';
import { SourceLink } from '@/components/source-link';
import { Stepper } from '@/components/stepper';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT, type Strings } from '@/i18n';
import { dec1, fmt, num } from '@/i18n/format';
import { habitOptions } from '@/i18n/labels';
import { s as plain } from '@/i18n/rich';
import { bestLever, habitsEffect } from '@/lib/habit-impact';
import { markIntroSeen } from '@/lib/intro';
import { loveCount, loveCountLabel, type Love } from '@/lib/loves';
import {
  HABIT_KEYS,
  WEEKS_PER_YEAR,
  ageAt,
  estimate,
  type HabitKey,
  type ModelInput,
  type Sex,
} from '@/lib/model';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';
import { shareOfWaking, swapSuggestion, yearsLeft, yearsOfHours } from '@/lib/time-use';
import { MAX_VALUES, VALUES, type ValueKey } from '@/lib/values';

type StepKey =
  | 'welcome'
  | 'name'
  | 'dob'
  | 'sex'
  | HabitKey
  | 'phone'
  | 'values'
  | 'people'
  | 'activities'
  | 'compute'
  | 'reveal';

const FIRST_RUN: StepKey[] = [
  'welcome',
  'name',
  'dob',
  'sex',
  ...HABIT_KEYS,
  'phone',
  'values',
  'people',
  'activities',
  'compute',
  'reveal',
];
/** Editing skips the welcome and the reveal, and saves after the last question. */
const EDIT: StepKey[] = ['name', 'dob', 'sex', ...HABIT_KEYS, 'phone', 'values', 'people', 'activities'];

type Draft = Partial<Profile> & { name: string; dob: string; values: ValueKey[]; loves: Love[] };

const sexOptions = (t: Strings) => [
  { value: 'm' as const, label: t.onboarding.sex.m },
  { value: 'f' as const, label: t.onboarding.sex.f },
];

const ease = Easing.bezier(0.2, 0.7, 0.2, 1);
/** Starting point for the phone question: roughly the US adult average. */
const DEFAULT_PHONE_HOURS = 4;

/** Model inputs once every answer the model needs is in. */
function modelInput(d: Draft): ModelInput | null {
  if (!d.dob || !d.sex || HABIT_KEYS.some((k) => !d[k])) return null;
  return d as ModelInput;
}

/** One question per screen: name, birth, body, habits, what matters, who and what they love. */
export default function OnboardingScreen() {
  const theme = useTheme();
  const t = useT();
  const o = t.onboarding;
  const reduced = useReducedMotion();
  const existing = useProfile();
  const editing = useLocalSearchParams<{ edit?: string }>().edit === '1';
  const steps = editing ? EDIT : FIRST_RUN;

  const [draft, setDraft] = useState<Draft>(() => ({
    name: '',
    dob: '',
    ...existing,
    values: existing?.values ?? [],
    loves: existing?.loves ?? [],
  }));
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const step = steps[index];
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const go = (delta: 1 | -1) => {
    setDirection(delta);
    setIndex((i) => Math.min(steps.length - 1, Math.max(0, i + delta)));
  };
  const next = () => go(1);
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));
  const finish = () => {
    // They just saw the reveal; don't follow it with the opening sequence.
    markIntroSeen();
    saveProfile({ ...draft } as Profile);
    if (editing) close();
    else router.replace('/');
  };

  // Single-choice answers move on by themselves after a beat, so the choice registers.
  const advanceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(advanceTimer.current), []);
  const answerAndAdvance = (patch: Partial<Draft>) => {
    set(patch);
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(next, reduced ? 0 : 320);
  };

  // "Counting your weeks" plays for a moment, then the reveal.
  useEffect(() => {
    if (step !== 'compute') return;
    const t = setTimeout(() => {
      setDirection(1);
      setIndex((i) => i + 1);
    }, reduced ? 200 : 1900);
    return () => clearTimeout(t);
  }, [step, reduced]);

  // Progress bar.
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.set(withTiming((index / (steps.length - 1)) * 100, { duration: 500, easing: ease }));
  }, [index, steps.length, progress]);
  const barStyle = useAnimatedStyle(() => ({ width: `${progress.get()}%` }));

  const showBack = index > 0 && step !== 'compute' && step !== 'reveal';
  const number = FIRST_RUN.indexOf(step);
  const me = modelInput(draft);

  let body: ReactNode[] = [];
  let footer: ReactNode = null;
  const continueButton = (title = t.common.continue, disabled = false) => (
    <Button title={title} disabled={disabled} onPress={editing && index === steps.length - 1 ? finish : next} />
  );

  if (step === 'welcome') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {o.welcomeEyebrow}
      </ThemedText>,
      <ThemedText key="t" type="title">
        Memento Mori
      </ThemedText>,
      <ThemedText key="p" style={styles.lede}>
        {o.welcomeLede}
      </ThemedText>,
      <ThemedText key="m" type="small">
        {o.welcomeNote}
      </ThemedText>,
      <LanguagePicker key="l" />,
    ];
    footer = <Button title={o.begin} onPress={next} />;
  } else if (step === 'name') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {o.step.you}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {o.nameQuestion}
      </ThemedText>,
      <TextField
        key="f"
        accessibilityLabel={o.nameA11y}
        placeholder={o.namePlaceholder}
        autoComplete="given-name"
        autoFocus={Platform.OS === 'web'}
        value={draft.name}
        onChangeText={(name) => set({ name })}
        onSubmitEditing={next}
        returnKeyType="next"
      />,
    ];
    footer = continueButton(draft.name.trim() ? t.common.continue : t.common.skip);
  } else if (step === 'dob') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {o.step.birth}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {o.dobQuestion}
      </ThemedText>,
      <DatePicker key="d" value={draft.dob} onChange={(dob) => set({ dob })} />,
      <AliveTimeline key="a" dob={draft.dob} />,
    ];
    footer = continueButton(t.common.continue, !draft.dob);
  } else if (step === 'sex') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {o.step.body}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {o.sexQuestion}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {o.sexWhy}
      </ThemedText>,
      <Choices<Sex> key="c" options={sexOptions(t)} value={draft.sex} onChange={(sex) => answerAndAdvance({ sex })} />,
    ];
  } else if ((HABIT_KEYS as string[]).includes(step)) {
    const k = step as HabitKey;
    const h = t.habits[k];
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {o.step.habits}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {h.question}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {h.why}
      </ThemedText>,
      <Choices key="c" options={habitOptions(t, k)} value={draft[k]} onChange={(v) => answerAndAdvance({ [k]: v })} />,
      <SourceLink key="s" of={k} prefix={t.common.theScience} />,
    ];
  } else if (step === 'phone') {
    const hours = draft.phoneHours ?? DEFAULT_PHONE_HOURS;
    const where = Platform.OS === 'ios' ? o.phoneWhereIos : Platform.OS === 'android' ? o.phoneWhereAndroid : o.phoneWhereWeb;
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {o.step.time}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {o.phoneQuestion}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {where}
      </ThemedText>,
      <Stepper
        key="s"
        value={hours}
        onChange={(phoneHours) => set({ phoneHours })}
        step={0.5}
        min={0}
        max={16}
        format={(v) => t.common.hoursValue(num(v))}
        accessibilityLabel={o.phoneA11y}
      />,
      me ? <RichText key="i" parts={o.phoneResult(dec1(yearsOfHours(hours, yearsLeft(me))), shareOfWaking(hours, t))} /> : null,
    ];
    footer = (
      <Button
        title={t.common.continue}
        onPress={() => {
          if (draft.phoneHours == null) set({ phoneHours: hours });
          if (editing && index === steps.length - 1) finish();
          else next();
        }}
      />
    );
  } else if (step === 'values') {
    const full = draft.values.length >= MAX_VALUES;
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {o.step.values}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {o.valuesQuestion}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {o.valuesWhy}
      </ThemedText>,
      <View key="c" style={styles.chips} accessibilityRole="list">
        {VALUES.map((v) => {
          const on = draft.values.includes(v);
          const disabled = !on && full;
          return (
            <Pressable
              key={v}
              accessibilityRole="checkbox"
              aria-checked={on}
              aria-disabled={disabled}
              disabled={disabled}
              onPress={() => set({ values: on ? draft.values.filter((x) => x !== v) : [...draft.values, v] })}
              style={[
                styles.chip,
                {
                  backgroundColor: on ? theme.accentSoft : theme.surface,
                  borderColor: on ? theme.accent : theme.line,
                  opacity: disabled ? 0.4 : 1,
                },
              ]}>
              <ThemedText themeColor="fg">{t.values[v]}</ThemedText>
            </Pressable>
          );
        })}
      </View>,
    ];
    footer = continueButton(draft.values.length ? t.common.continue : t.common.skipForNow);
  } else if (step === 'people' || step === 'activities') {
    const people = step === 'people';
    const any = draft.loves.some((l) => (people ? l.kind !== 'activity' : l.kind === 'activity'));
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {people ? o.step.who : o.step.what}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {people ? o.peopleQuestion : o.activitiesQuestion}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {people ? o.peopleWhy : o.activitiesWhy}
      </ThemedText>,
      <LoveEditor
        key={step}
        group={people ? 'who' : 'what'}
        loves={draft.loves}
        onChange={(loves) => set({ loves })}
        me={me}
      />,
    ];
    const last = editing && index === steps.length - 1;
    footer = continueButton(last ? t.common.save : any ? t.common.continue : t.common.skipForNow);
  } else if (step === 'compute') {
    body = [<Computing key="c" />];
  } else if (step === 'reveal' && me) {
    body = [<Reveal key="r" draft={draft} me={me} onDone={finish} />];
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.top}>
        <View style={styles.backSlot}>
          {showBack ? <Button title={t.common.back} variant="link" onPress={() => go(-1)} /> : null}
        </View>
        <View style={[styles.track, { backgroundColor: theme.line }]}>
          <Animated.View style={[styles.bar, { backgroundColor: theme.accent }, barStyle]} />
        </View>
        <View style={styles.backSlot}>
          {editing ? <Button title={t.common.close} variant="link" onPress={close} /> : null}
        </View>
      </View>

      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.root}>
          <Animated.View key={step} exiting={FadeOut.duration(200)} style={StyleSheet.absoluteFill}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
              <Stagger direction={direction}>{body}</Stagger>
              {footer ? (
                <Animated.View entering={FadeIn.delay(450).duration(400)} style={styles.footer}>
                  {footer}
                </Animated.View>
              ) : null}
            </ScrollView>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Forty dots filling in, while we "turn answers into time". */
function Computing() {
  const theme = useTheme();
  const t = useT();

  return (
    <View style={styles.compute}>
      <View style={styles.dots} accessible={false}>
        {Array.from({ length: 40 }, (_, i) => (
          <View key={i} style={[styles.dot, { borderColor: theme.remain }]}>
            <Animated.View
              entering={FadeIn.delay(i * 35).duration(300)}
              style={[styles.dotFill, { backgroundColor: theme.lived }]}
            />
          </View>
        ))}
      </View>
      <ThemedText type="subtitle" style={styles.center}>
        {t.onboarding.computing}
      </ThemedText>
      <ThemedText type="small" style={styles.center}>
        {t.onboarding.computingNote}
      </ThemedText>
    </View>
  );
}

/** The first look: weeks likely left, then what they mean and what can change them. */
function Reveal({ draft, me, onDone }: { draft: Draft; me: ModelInput; onDone: () => void }) {
  const theme = useTheme();
  const t = useT();
  const r = t.reveal;
  const [now] = useState(() => Date.now());
  const est = estimate(me, now);
  const age = ageAt(me.dob, now);
  const weeksLeft = (est.med - age) * WEEKS_PER_YEAR;
  const effect = habitsEffect(me, now);
  const lever = bestLever(me, now);
  const person = draft.loves.find((l) => l.kind !== 'activity');
  const values = VALUES.filter((v) => draft.values.includes(v)).map((v) => t.values[v]);

  const lines: ReactNode[] = [
    <ThemedText key="e" type="eyebrow">
      {r.eyebrow(draft.name)}
    </ThemedText>,
    <View key="n">
      <ThemedText type="small">{r.about}</ThemedText>
      <CountUp to={weeksLeft} style={styles.huge} themeColor="accent" />
      <ThemedText type="subtitle">{r.weeksRemain}</ThemedText>
    </View>,
    <ThemedText key="f">{r.fullLife(fmt(est.med * WEEKS_PER_YEAR), fmt(age * WEEKS_PER_YEAR))}</ThemedText>,
  ];

  if (person) {
    lines.push(<RichText key="p" parts={r.person(fmt(loveCount(person, me, now).times), loveCountLabel(person, t))} />);
  }

  if (draft.phoneHours) {
    lines.push(
      <RichText
        key="ph"
        parts={r.phone(dec1(yearsOfHours(draft.phoneHours, est.med - age)), swapSuggestion(me, draft.loves, t, now))}
      />,
    );
  }

  lines.push(
    <View key="h" style={[styles.agency, { borderTopColor: theme.line }]}>
      <RichText
        parts={[
          ...(Math.abs(effect) < 0.2 ? [plain(t.life.habitsNeutral)] : t.life.habitsEffect(effect > 0, dec1(Math.abs(effect)))),
          ...(lever ? r.lever(t.levers[lever.key], dec1(lever.years), fmt(lever.years * WEEKS_PER_YEAR)) : []),
        ]}
      />
      {lever ? <SourceLink of={lever.key} /> : null}
    </View>,
  );

  if (values.length) {
    lines.push(
      <ThemedText key="v" type="small">
        {r.values(values)}
      </ThemedText>,
    );
  }

  lines.push(
    <ThemedText key="r" type="small">
      {r.range(Math.round(est.med), Math.round(est.q25), Math.round(est.q75))}
    </ThemedText>,
    <Button key="b" title={r.seeLife} onPress={onDone} />,
  );

  return (
    <View style={styles.reveal}>
      <Stagger delay={0} step={450}>
        {lines}
      </Stagger>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  top: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    minHeight: 48,
  },
  backSlot: {
    minWidth: 64,
  },
  track: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: 28,
    paddingBottom: Spacing.four,
    gap: 18,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: Spacing.four,
  },
  lede: {
    fontSize: 19,
    lineHeight: 28,
  },
  why: {
    fontStyle: 'italic',
  },
  num: {
    fontFamily: Fonts.monoMedium,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  compute: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 22,
    paddingTop: 60,
  },
  dots: {
    width: 10 * 14 + 9 * 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  dotFill: {
    flex: 1,
  },
  center: {
    textAlign: 'center',
  },
  reveal: {
    gap: 18,
    paddingTop: 12,
  },
  huge: {
    fontFamily: Fonts.monoMedium,
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  agency: {
    borderTopWidth: 1,
    paddingTop: 14,
  },
});
