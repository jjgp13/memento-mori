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
import { AliveTimeline } from '@/components/onboarding/alive-timeline';
import { CountUp } from '@/components/onboarding/count-up';
import { LoveEditor } from '@/components/onboarding/love-editor';
import { Stagger } from '@/components/onboarding/stagger';
import { SourceLink } from '@/components/source-link';
import { Stepper } from '@/components/stepper';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { bestLever, habitsEffect } from '@/lib/habit-impact';
import { markIntroSeen } from '@/lib/intro';
import { fmt } from '@/lib/life-views';
import { loveCount, loveCountLabel, type Love } from '@/lib/loves';
import {
  HABITS,
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

const SEX_OPTIONS = [
  { value: 'm', label: 'Male' },
  { value: 'f', label: 'Female' },
] as const;

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
  const continueButton = (title = 'Continue', disabled = false) => (
    <Button title={title} disabled={disabled} onPress={editing && index === steps.length - 1 ? finish : next} />
  );

  if (step === 'welcome') {
    body = [
      <ThemedText key="e" type="eyebrow">
        Remember you will die
      </ThemedText>,
      <ThemedText key="t" type="title">
        Memento Mori
      </ThemedText>,
      <ThemedText key="p" style={styles.lede}>
        The Stoics kept death in mind so they would not waste their days. This app counts the time you likely have
        left, so today gets the weight it deserves, and points it at what you love.
      </ThemedText>,
      <ThemedText key="m" type="small">
        A few short questions, one at a time. Your answers stay on this device.
      </ThemedText>,
    ];
    footer = <Button title="Begin" onPress={next} />;
  } else if (step === 'name') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · You
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        What should we call you?
      </ThemedText>,
      <TextField
        key="f"
        accessibilityLabel="First name"
        placeholder="Your first name"
        autoComplete="given-name"
        autoFocus={Platform.OS === 'web'}
        value={draft.name}
        onChangeText={(name) => set({ name })}
        onSubmitEditing={next}
        returnKeyType="next"
      />,
    ];
    footer = continueButton(draft.name.trim() ? 'Continue' : 'Skip');
  } else if (step === 'dob') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · Birth
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        When were you born?
      </ThemedText>,
      <DatePicker key="d" value={draft.dob} onChange={(dob) => set({ dob })} />,
      <AliveTimeline key="a" dob={draft.dob} />,
    ];
    footer = continueButton('Continue', !draft.dob);
  } else if (step === 'sex') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · Body
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        What was your sex at birth?
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        On average women outlive men by about five years.
      </ThemedText>,
      <Choices<Sex> key="c" options={SEX_OPTIONS} value={draft.sex} onChange={(sex) => answerAndAdvance({ sex })} />,
    ];
  } else if ((HABIT_KEYS as string[]).includes(step)) {
    const k = step as HabitKey;
    const h = HABITS[k];
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · Habits
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {h.question}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {h.why}
      </ThemedText>,
      <Choices key="c" options={h.options} value={draft[k]} onChange={(v) => answerAndAdvance({ [k]: v })} />,
      <SourceLink key="s" of={k} prefix="The science" />,
    ];
  } else if (step === 'phone') {
    const hours = draft.phoneHours ?? DEFAULT_PHONE_HOURS;
    const where =
      Platform.OS === 'ios'
        ? 'Your iPhone already knows: Settings → Screen Time → See All App & Website Activity. Use the daily average.'
        : Platform.OS === 'android'
          ? 'Your phone already knows: Settings → Digital Wellbeing. Use the daily average.'
          : 'Your phone already knows. iPhone: Settings → Screen Time. Android: Settings → Digital Wellbeing. Use the daily average.';
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · Your time
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        How many hours a day are you on your phone?
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
        format={(v) => `${v} h`}
        accessibilityLabel="Hours a day on your phone"
      />,
      me ? (
        <ThemedText key="i">
          Over the time you likely have left, that is about{' '}
          <ThemedText themeColor="accent" style={styles.num}>
            {yearsOfHours(hours, yearsLeft(me)).toFixed(1)} years
          </ThemedText>
          , {shareOfWaking(hours)} of your waking hours.
        </ThemedText>
      ) : null,
    ];
    footer = (
      <Button
        title="Continue"
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
        {number} · What matters
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        What matters most to you?
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        Pick up to three. Your reminders will keep pointing back to them.
      </ThemedText>,
      <View key="c" style={styles.chips} accessibilityRole="list">
        {VALUES.map((v) => {
          const on = draft.values.includes(v.key);
          const disabled = !on && full;
          return (
            <Pressable
              key={v.key}
              accessibilityRole="checkbox"
              aria-checked={on}
              aria-disabled={disabled}
              disabled={disabled}
              onPress={() => set({ values: on ? draft.values.filter((x) => x !== v.key) : [...draft.values, v.key] })}
              style={[
                styles.chip,
                {
                  backgroundColor: on ? theme.accentSoft : theme.surface,
                  borderColor: on ? theme.accent : theme.line,
                  opacity: disabled ? 0.4 : 1,
                },
              ]}>
              <ThemedText themeColor="fg">{v.label}</ThemedText>
            </Pressable>
          );
        })}
      </View>,
    ];
    footer = continueButton(draft.values.length ? 'Continue' : 'Skip for now');
  } else if (step === 'people' || step === 'activities') {
    const people = step === 'people';
    const any = draft.loves.some((l) => (people ? l.kind !== 'activity' : l.kind === 'activity'));
    body = [
      <ThemedText key="e" type="eyebrow">
        {number} · {people ? 'Who loves you' : 'What you love'}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {people ? 'Who loves you, and who do you love?' : 'What do you love doing?'}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {people
          ? "The people (and pets) you'd most regret not seeing enough. We'll count how many more times you're likely to see them."
          : "We'll count how many more times you get to do it."}
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
    footer = continueButton(last ? 'Save' : any ? 'Continue' : 'Skip for now');
  } else if (step === 'compute') {
    body = [<Computing key="c" />];
  } else if (step === 'reveal' && me) {
    body = [<Reveal key="r" draft={draft} me={me} onDone={finish} />];
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.top}>
        <View style={styles.backSlot}>
          {showBack ? <Button title="← Back" variant="link" onPress={() => go(-1)} /> : null}
        </View>
        <View style={[styles.track, { backgroundColor: theme.line }]}>
          <Animated.View style={[styles.bar, { backgroundColor: theme.accent }, barStyle]} />
        </View>
        <View style={styles.backSlot}>
          {editing ? <Button title="Close" variant="link" onPress={close} /> : null}
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
        Counting your weeks
      </ThemedText>
      <ThemedText type="small" style={styles.center}>
        Turning your answers into time.
      </ThemedText>
    </View>
  );
}

/** The first look: weeks likely left, then what they mean and what can change them. */
function Reveal({ draft, me, onDone }: { draft: Draft; me: ModelInput; onDone: () => void }) {
  const theme = useTheme();
  const [now] = useState(() => Date.now());
  const est = estimate(me, now);
  const age = ageAt(me.dob, now);
  const weeksLeft = (est.med - age) * WEEKS_PER_YEAR;
  const effect = habitsEffect(me, now);
  const lever = bestLever(me, now);
  const person = draft.loves.find((l) => l.kind !== 'activity');
  const values = VALUES.filter((v) => draft.values.includes(v.key)).map((v) => v.label.toLowerCase());

  const lines: ReactNode[] = [
    <ThemedText key="e" type="eyebrow">
      {draft.name ? `${draft.name}, your time` : 'Your time'}
    </ThemedText>,
    <View key="n">
      <ThemedText type="small">About</ThemedText>
      <CountUp to={weeksLeft} style={styles.huge} themeColor="accent" />
      <ThemedText type="subtitle">weeks likely remain</ThemedText>
    </View>,
    <ThemedText key="f">
      A full life like yours is about {fmt(est.med * WEEKS_PER_YEAR)} weeks. You have lived {fmt(age * WEEKS_PER_YEAR)} of
      them. Let&apos;s make the rest count.
    </ThemedText>,
  ];

  if (person) {
    lines.push(
      <ThemedText key="p">
        That is about{' '}
        <ThemedText themeColor="accent" style={styles.num}>
          {fmt(loveCount(person, me, now).times)}
        </ThemedText>{' '}
        {loveCountLabel(person)}.
      </ThemedText>,
    );
  }

  if (draft.phoneHours) {
    lines.push(
      <ThemedText key="ph">
        Your phone takes about{' '}
        <ThemedText themeColor="accent" style={styles.num}>
          {yearsOfHours(draft.phoneHours, est.med - age).toFixed(1)} years
        </ThemedText>{' '}
        of that. Half an hour less a day could become {swapSuggestion(me, draft.loves, now)}.
      </ThemedText>,
    );
  }

  lines.push(
    <View key="h" style={[styles.agency, { borderTopColor: theme.line }]}>
      <ThemedText>
        {Math.abs(effect) < 0.2
          ? 'Your habits keep you close to the baseline estimate.'
          : `Your habits ${effect > 0 ? 'add' : 'cost'} about `}
        {Math.abs(effect) >= 0.2 ? (
          <>
            <ThemedText themeColor="accent" style={styles.num}>
              {Math.abs(effect).toFixed(1)} years
            </ThemedText>
            .
          </>
        ) : null}
        {lever ? (
          <>
            {' '}
            {lever.label} could add about{' '}
            <ThemedText themeColor="accent" style={styles.num}>
              {lever.years.toFixed(1)} years
            </ThemedText>
            , roughly {fmt(lever.years * WEEKS_PER_YEAR)} more weekends.
          </>
        ) : null}
      </ThemedText>
      {lever ? <SourceLink of={lever.key} /> : null}
    </View>,
  );

  if (values.length) {
    lines.push(
      <ThemedText key="v" type="small">
        You said {listJoin(values)} matter{values.length === 1 ? 's' : ''} most. We will keep pointing you back to{' '}
        {values.length === 1 ? 'it' : 'them'}.
      </ThemedText>,
    );
  }

  lines.push(
    <ThemedText key="r" type="small">
      This is a range, not a date: half of people living like you reach {Math.round(est.med)}, and most land between{' '}
      {Math.round(est.q25)} and {Math.round(est.q75)}. Not medical advice.
    </ThemedText>,
    <Button key="b" title="See your life" onPress={onDone} />,
  );

  return (
    <View style={styles.reveal}>
      <Stagger delay={0} step={450}>
        {lines}
      </Stagger>
    </View>
  );
}

const listJoin = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`);

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
