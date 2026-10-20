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
import { CountryPicker } from '@/components/country-picker';
import { DatePicker } from '@/components/date-picker';
import { Disclaimer, ScreenLink } from '@/components/disclaimer';
import { LinkedText } from '@/components/linked-text';
import { LanguagePicker } from '@/components/language-picker';
import { AliveTimeline } from '@/components/onboarding/alive-timeline';
import { CountUp } from '@/components/onboarding/count-up';
import { HabitCalendar } from '@/components/onboarding/habit-calendar';
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
import { countryName, deviceCountry } from '@/lib/country';
import { HEALTHY_LIFE_TABLES, LIFE_TABLES } from '@/lib/evidence';
import { NEUTRAL, allLevers, bestHealthyLever, bestLever, habitsEffect } from '@/lib/habit-impact';
import { markIntroSeen } from '@/lib/intro';
import { LEGAL_VERSION } from '@/lib/legal';
import { aheadLevel } from '@/lib/life-views';
import { loveCount, loveCountLabel, type Love } from '@/lib/loves';
import {
  HABIT_KEYS,
  WEEKS_PER_YEAR,
  ageAt,
  estimate,
  habitHR,
  healthEstimate,
  survival,
  type HabitKey,
  type ModelInput,
  type Sex,
} from '@/lib/model';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';
import { shareOfWaking, swapSuggestion, yearsLeft, yearsOfHours } from '@/lib/time-use';
import { MAX_VALUES, VALUES, type ValueKey } from '@/lib/values';

type StepKey =
  | 'welcome'
  | 'name'
  | 'dob'
  | 'country'
  | 'sex'
  | HabitKey
  | 'phone'
  | 'values'
  | 'people'
  | 'activities'
  | 'disclaimer'
  | 'compute'
  | 'baseline'
  | 'habitsReveal'
  | 'reveal';

type ChapterKey = 'you' | 'habits' | 'loves';
/** Three chapters, each ending on what the answers mean so far, so every few taps pay off. */
const CHAPTERS: { key: ChapterKey; questions: StepKey[]; reveal: StepKey }[] = [
  { key: 'you', questions: ['name', 'dob', 'country', 'sex'], reveal: 'baseline' },
  { key: 'habits', questions: [...HABIT_KEYS, 'phone'], reveal: 'habitsReveal' },
  { key: 'loves', questions: ['values', 'people', 'activities'], reveal: 'reveal' },
];
const [YOU, HABITS, LOVES] = CHAPTERS;

/** The disclaimer is acknowledged before the first number. */
const FIRST_RUN: StepKey[] = [
  'welcome',
  ...YOU.questions,
  'disclaimer',
  'compute',
  YOU.reveal,
  ...HABITS.questions,
  HABITS.reveal,
  ...LOVES.questions,
  LOVES.reveal,
];
/** Editing skips the welcome and the reveals, and saves after the last question (or the one in `?only=`). */
const EDIT: StepKey[] = CHAPTERS.flatMap((c) => c.questions);

type Draft = Partial<Profile> & { name: string; dob: string; values: ValueKey[]; loves: Love[] };

const sexOptions = (t: Strings) => [
  { value: 'm' as const, label: t.onboarding.sex.m },
  { value: 'f' as const, label: t.onboarding.sex.f },
];

const ease = Easing.bezier(0.2, 0.7, 0.2, 1);
/** Starting point for the phone question: roughly the US adult average. */
const DEFAULT_PHONE_HOURS = 4;

/**
 * Model inputs once birth date and sex are in. A habit not answered yet (still to come, skipped with "use the
 * average", or asked only since 2026.10d on older profiles) counts as ×1, which the model does for a missing answer.
 */
function modelInput(d: Draft): ModelInput | null {
  if (!d.dob || !d.sex) return null;
  return d as ModelInput;
}

/** Changes smaller than this aren't worth pointing to (as in lib/habit-impact.ts). */
const MIN_LEVER_YEARS = 0.2;

/**
 * The single change that would win back what answer `k` costs: that habit's own, else the biggest other one
 * (a former smoker can't quit again, so smoking is never suggested to them). Early in the chapter the other
 * habits may not be answered yet; then they're taken at their neutral answer, so there is always a next step.
 */
function winBackLever(me: ModelInput, k: HabitKey, now: number) {
  const usable = (p: ModelInput) =>
    allLevers(p, now).filter((l) => l.years >= MIN_LEVER_YEARS && !(l.key === 'smoke' && me.smoke === 'former'));
  const levers = usable(me);
  const own = levers.find((l) => l.key === k || (k === 'exercise' && l.key === 'steps'));
  if (own ?? levers[0]) return own ?? levers[0];
  const filled = { ...me };
  for (const h of HABIT_KEYS) if (filled[h] == null) Object.assign(filled, { [h]: NEUTRAL[h] });
  return usable(filled)[0] ?? null;
}

/** One question per screen, in three chapters (you, habits, what they love), each ending on a reveal. */
export default function OnboardingScreen() {
  const theme = useTheme();
  const t = useT();
  const o = t.onboarding;
  const reduced = useReducedMotion();
  const { hideNumbers: hide } = usePrefs();
  const [now] = useState(() => Date.now());
  const existing = useProfile();
  const params = useLocalSearchParams<{ edit?: string; only?: string }>();
  const editing = params.edit === '1';
  const only = EDIT.find((s) => s === params.only);
  const steps = editing ? (only ? [only] : EDIT) : FIRST_RUN;

  const [draft, setDraft] = useState<Draft>(() => ({
    name: '',
    dob: '',
    ...existing,
    // Suggest the device's region; profiles saved before countries existed get it when they next edit.
    country: existing?.country ?? deviceCountry(),
    values: existing?.values ?? [],
    loves: existing?.loves ?? [],
  }));
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const step = steps[index];
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const go = (delta: 1 | -1) => {
    setDirection(delta);
    setIndex((i) => {
      const j = Math.min(steps.length - 1, Math.max(0, i + delta));
      // "Counting your weeks" only plays going forward.
      return delta < 0 && steps[j] === 'compute' ? j - 1 : j;
    });
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
  const answerAndAdvance = (patch: Partial<Draft>, wait = 320) => {
    set(patch);
    clearTimeout(advanceTimer.current);
    // Editing a single answer (`?only=strength`): the answer is the last step, so save and close.
    const save = () => {
      saveProfile({ ...draft, ...patch } as Profile);
      close();
    };
    advanceTimer.current = setTimeout(editing && index === steps.length - 1 ? save : next, reduced ? 0 : wait);
  };
  /** "Skip, use the average": straight to the chapter's reveal, with the habits not answered yet at ×1. */
  const skipHabits = () => {
    clearTimeout(advanceTimer.current);
    setDirection(1);
    setIndex(steps.indexOf(HABITS.reveal));
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

  // One progress bar per chapter, each full once its reveal is reached.
  const segments = CHAPTERS.flatMap((c) => {
    const at = steps.flatMap((s, i) => (c.questions.includes(s) || s === c.reveal ? [i] : []));
    if (!at.length) return [];
    const [start, end] = [at[0], at[at.length - 1]];
    const fill = end > start ? (index - start) / (end - start) : index >= start ? 1 : 0;
    return [{ key: c.key, fill: Math.min(1, Math.max(0, fill)) }];
  });

  const showBack = index > 0 && step !== 'compute';
  const chapter = CHAPTERS.find((c) => c.questions.includes(step));
  const eyebrow = chapter ? (
    <ThemedText key="e" type="eyebrow">
      {o.chapterStep(o.chapters[chapter.key], chapter.questions.indexOf(step) + 1, chapter.questions.length)}
    </ThemedText>
  ) : null;
  const me = modelInput(draft);
  // The live calendar stays put across the habit questions, so each answer shows up on it.
  const inHabits = HABITS.questions.includes(step);
  const skipLink =
    inHabits && !editing ? <Button title={o.skipHabits} variant="link" onPress={skipHabits} /> : null;

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
      <LinkedText key="g" type="small" text={t.legal.agree} />,
      <LanguagePicker key="l" />,
    ];
    footer = (
      <Button
        title={o.begin}
        onPress={() => {
          setPref('agreedVersion', LEGAL_VERSION);
          setPref('agreedAt', Date.now());
          next();
        }}
      />
    );
  } else if (step === 'name') {
    body = [
      eyebrow,
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
      eyebrow,
      <ThemedText key="t" type="subtitle">
        {o.dobQuestion}
      </ThemedText>,
      <DatePicker key="d" value={draft.dob} onChange={(dob) => set({ dob })} />,
      <AliveTimeline key="a" dob={draft.dob} />,
    ];
    footer = continueButton(t.common.continue, !draft.dob);
  } else if (step === 'country') {
    body = [
      eyebrow,
      <ThemedText key="t" type="subtitle">
        {o.countryQuestion}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {o.countryWhy}
      </ThemedText>,
      <CountryPicker key="c" value={draft.country} onChange={(country) => set({ country })} />,
      <SourceLink key="s" source={LIFE_TABLES.source} prefix={t.common.lifeTables} />,
    ];
    footer = continueButton(draft.country ? t.common.continue : t.common.skip);
  } else if (step === 'sex') {
    body = [
      eyebrow,
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
    const answer = draft[k];
    // An answer that costs time stays on screen with the change that could win it back; others move on.
    const costs = !!me && answer != null && habitHR(k, answer) > 1;
    const lever = costs && me ? winBackLever(me, k, now) : null;
    const cost = me ? estimate({ ...me, [k]: undefined }, now).med - estimate(me, now).med : 0;
    body = [
      eyebrow,
      <ThemedText key="t" type="subtitle">
        {h.question}
      </ThemedText>,
      <ThemedText key="w" type="small" style={styles.why}>
        {h.why}
      </ThemedText>,
      <Choices
        key="c"
        options={habitOptions(t, k)}
        value={answer}
        onChange={(v) => {
          if (me && habitHR(k, v) > 1) {
            clearTimeout(advanceTimer.current);
            set({ [k]: v });
          } else answerAndAdvance({ [k]: v }, habitHR(k, v) < 1 ? 900 : 320);
        }}
      />,
      <SourceLink key="s" of={k} prefix={t.common.theScience} />,
      lever ? (
        <View key="wb" style={[styles.agency, styles.healthy, { borderTopColor: theme.line }]}>
          <RichText
            parts={
              hide
                ? [plain(t.gentle.calendar.winBack(t.levers[lever.key]))]
                : o.winBack(dec1(cost), t.levers[lever.key], dec1(lever.years))
            }
          />
          <SourceLink of={lever.key} />
        </View>
      ) : null,
    ];
    footer =
      costs || skipLink ? (
        <View style={styles.healthy}>
          {costs ? continueButton() : null}
          {skipLink}
        </View>
      ) : null;
  } else if (step === 'phone') {
    const hours = draft.phoneHours ?? DEFAULT_PHONE_HOURS;
    const where = Platform.OS === 'ios' ? o.phoneWhereIos : Platform.OS === 'android' ? o.phoneWhereAndroid : o.phoneWhereWeb;
    body = [
      eyebrow,
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
      <View style={styles.healthy}>
        <Button
          title={t.common.continue}
          onPress={() => {
            if (draft.phoneHours == null) set({ phoneHours: hours });
            if (editing && index === steps.length - 1) finish();
            else next();
          }}
        />
        {skipLink}
      </View>
    );
  } else if (step === 'values') {
    const full = draft.values.length >= MAX_VALUES;
    body = [
      eyebrow,
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
      eyebrow,
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
  } else if (step === 'disclaimer') {
    body = [
      <ThemedText key="e" type="eyebrow">
        {t.disclaimer.beforeEyebrow}
      </ThemedText>,
      <ThemedText key="t" type="subtitle">
        {t.disclaimer.beforeTitle}
      </ThemedText>,
      <Disclaimer key="d" full />,
    ];
    footer = (
      <Button
        title={t.disclaimer.understand}
        onPress={() => {
          setPref('disclaimerAt', Date.now());
          next();
        }}
      />
    );
  } else if (step === 'compute') {
    body = [<Computing key="c" />];
  } else if (step === 'baseline' && draft.dob && draft.sex) {
    body = [<Baseline key="b" name={draft.name} dob={draft.dob} sex={draft.sex} country={draft.country} onNext={next} />];
  } else if (step === 'habitsReveal' && me) {
    body = [<HabitsReveal key="h" draft={draft} me={me} onNext={next} />];
  } else if (step === 'reveal' && me) {
    body = [<Reveal key="r" draft={draft} me={me} onDone={finish} />];
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.top}>
        <View style={styles.backSlot}>
          {showBack ? <Button title={t.common.back} variant="link" onPress={() => go(-1)} /> : null}
        </View>
        <View style={styles.bars}>
          {segments.map((sg) => (
            <ChapterBar key={sg.key} fill={sg.fill} />
          ))}
        </View>
        <View style={styles.backSlot}>
          {editing ? <Button title={t.common.close} variant="link" onPress={close} /> : null}
        </View>
      </View>

      {inHabits && me ? (
        <Animated.View entering={FadeIn.duration(400)} exiting={FadeOut.duration(200)} style={styles.calendar}>
          <HabitCalendar
            me={me}
            hide={hide}
            phoneHours={step === 'phone' ? (draft.phoneHours ?? DEFAULT_PHONE_HOURS) : undefined}
          />
        </Animated.View>
      ) : null}

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

/** One chapter's share of the progress bar. */
function ChapterBar({ fill }: { fill: number }) {
  const theme = useTheme();
  const width = useSharedValue(fill * 100);
  useEffect(() => {
    width.set(withTiming(fill * 100, { duration: 500, easing: ease }));
  }, [fill, width]);
  const style = useAnimatedStyle(() => ({ width: `${width.get()}%` }));

  return (
    <View style={[styles.track, { backgroundColor: theme.line }]}>
      <Animated.View style={[styles.bar, { backgroundColor: theme.accent }, style]} />
    </View>
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

/** End of chapter one: the starting point for people their age, sex and country, before habits. */
function Baseline({
  name,
  dob,
  sex,
  country,
  onNext,
}: {
  name: string;
  dob: string;
  sex: Sex;
  country?: string;
  onNext: () => void;
}) {
  const theme = useTheme();
  const t = useT();
  const r = t.reveal;
  const { hideNumbers: hide } = usePrefs();
  const [now] = useState(() => Date.now());
  const age = ageAt(dob, now);
  const est = survival(sex, age, 1, country);
  const place = countryName(country) ?? null;

  const lines: ReactNode[] = [
    <ThemedText key="e" type="eyebrow">
      {r.baseEyebrow(name)}
    </ThemedText>,
    hide ? (
      <ThemedText key="n" style={styles.gentle} themeColor="accent">
        {t.gentle.ahead[aheadLevel(age, est)]}
      </ThemedText>
    ) : (
      <View key="n">
        <ThemedText type="small">{r.about}</ThemedText>
        <CountUp to={(est.med - age) * WEEKS_PER_YEAR} style={styles.huge} themeColor="accent" />
        <ThemedText type="subtitle">{r.weeksRemain}</ThemedText>
      </View>
    ),
    <ThemedText key="w">{r.baseWho(place)}</ThemedText>,
    <View key="r" style={styles.healthy}>
      <ThemedText type="small">
        {hide ? t.gentle.reveal.range(place) : r.baseRange(Math.round(est.med), Math.round(est.q25), Math.round(est.q75))}
      </ThemedText>
      <SourceLink source={LIFE_TABLES.source} prefix={t.common.lifeTables} />
    </View>,
    <ThemedText key="h" style={[styles.agency, { borderTopColor: theme.line }]}>
      {r.baseHook}
    </ThemedText>,
    <Button key="b" title={r.baseNext} onPress={onNext} />,
  ];

  return (
    <View style={styles.reveal}>
      <Stagger delay={0} step={450}>
        {lines}
      </Stagger>
    </View>
  );
}

/** End of chapter two: the estimate with their habits, counted from the starting point, and what could add more. */
function HabitsReveal({ draft, me, onNext }: { draft: Draft; me: ModelInput; onNext: () => void }) {
  const theme = useTheme();
  const t = useT();
  const r = t.reveal;
  const g = t.gentle;
  const { hideNumbers: hide } = usePrefs();
  const [now] = useState(() => Date.now());
  const { life: est, health } = healthEstimate(me, now);
  const age = ageAt(me.dob, now);
  const base = survival(me.sex, age, 1, me.country);
  // Strength training first when it's open to them: it does the most for staying independent.
  const strong = allLevers(me, now).find((l) => l.key === 'strength' && l.healthy >= 0.2) ?? bestHealthyLever(me, now);
  const effect = habitsEffect(me, now);
  const lever = bestLever(me, now);

  const lines: ReactNode[] = [
    <ThemedText key="e" type="eyebrow">
      {r.habitsEyebrow(draft.name)}
    </ThemedText>,
    hide ? (
      <ThemedText key="n" style={styles.gentle} themeColor="accent">
        {g.ahead[aheadLevel(age, est)]}
      </ThemedText>
    ) : (
      <View key="n">
        <ThemedText type="small">{r.about}</ThemedText>
        <CountUp
          from={(base.med - age) * WEEKS_PER_YEAR}
          to={(est.med - age) * WEEKS_PER_YEAR}
          delay={1100}
          duration={1800}
          style={styles.huge}
          themeColor="accent"
        />
        <ThemedText type="subtitle">{r.weeksRemain}</ThemedText>
      </View>
    ),
    <View key="h" style={[styles.agency, { borderTopColor: theme.line }]}>
      <RichText
        parts={
          hide
            ? [
                plain(Math.abs(effect) < 0.2 ? t.life.habitsNeutral : g.habitsEffect(effect > 0)),
                ...(lever ? [plain(g.reveal.lever(t.levers[lever.key]))] : []),
              ]
            : [
                ...(Math.abs(effect) < 0.2 ? [plain(t.life.habitsNeutral)] : t.life.habitsEffect(effect > 0, dec1(Math.abs(effect)))),
                ...(lever ? r.lever(t.levers[lever.key], dec1(lever.years), fmt(lever.years * WEEKS_PER_YEAR)) : []),
              ]
        }
      />
      {lever ? <SourceLink of={lever.key} /> : null}
    </View>,
    <View key="hy" style={styles.healthy}>
      {hide ? (
        <ThemedText>{g.healthy.reveal(strong && strong.healthy >= 0.2 ? t.levers[strong.key] : null)}</ThemedText>
      ) : (
        <RichText
          parts={r.healthy(
            fmt((health.med - age) * WEEKS_PER_YEAR),
            strong && strong.healthy >= 0.2 ? t.levers[strong.key] : null,
            strong ? dec1(strong.healthy) : '',
          )}
        />
      )}
      <SourceLink source={HEALTHY_LIFE_TABLES.source} prefix={t.life.healthy.sourceHealthy} />
    </View>,
  ];

  if (draft.phoneHours) {
    lines.push(
      hide ? (
        <ThemedText key="ph">{g.reveal.phone}</ThemedText>
      ) : (
        <RichText
          key="ph"
          parts={r.phone(dec1(yearsOfHours(draft.phoneHours, est.med - age)), swapSuggestion(me, draft.loves, t, now))}
        />
      ),
    );
  }

  lines.push(
    <ThemedText key="k" style={[styles.agency, { borderTopColor: theme.line }]}>
      {r.habitsHook}
    </ThemedText>,
    <Button key="b" title={r.habitsNext} onPress={onNext} />,
  );

  return (
    <View style={styles.reveal}>
      <Stagger delay={0} step={450}>
        {lines}
      </Stagger>
    </View>
  );
}

/** The last chapter's end: how many more times for who and what they love, then the whole range. */
function Reveal({ draft, me, onDone }: { draft: Draft; me: ModelInput; onDone: () => void }) {
  const t = useT();
  const r = t.reveal;
  const g = t.gentle;
  // "Hide numbers" can be on already when the reveal comes after editing the answers.
  const { hideNumbers: hide } = usePrefs();
  const [now] = useState(() => Date.now());
  const est = estimate(me, now);
  const age = ageAt(me.dob, now);
  const values = VALUES.filter((v) => draft.values.includes(v)).map((v) => t.values[v]);
  const loves = draft.loves.slice(0, 3);

  const lines: ReactNode[] = [
    <ThemedText key="e" type="eyebrow">
      {r.eyebrow(draft.name)}
    </ThemedText>,
    <ThemedText key="t" type="subtitle">
      {r.lovesTitle}
    </ThemedText>,
  ];

  if (loves.length) {
    for (const love of loves) {
      const times = loveCount(love, me, now).times;
      lines.push(
        hide ? (
          <ThemedText key={love.id}>{g.reveal.person(loveCountLabel(love, t), g.howMany[times < 100 ? 'few' : 'many'])}</ThemedText>
        ) : (
          <RichText key={love.id} parts={r.person(fmt(times), loveCountLabel(love, t))} />
        ),
      );
    }
  } else {
    lines.push(
      <ThemedText key="f">{hide ? g.reveal.fullLife : r.fullLife(fmt(est.med * WEEKS_PER_YEAR), fmt(age * WEEKS_PER_YEAR))}</ThemedText>,
    );
  }

  if (values.length) {
    lines.push(
      <ThemedText key="v" type="small">
        {r.values(values)}
      </ThemedText>,
    );
  }

  lines.push(
    <ThemedText key="r" type="small">
      {hide
        ? g.reveal.range(countryName(me.country) ?? null)
        : r.range(Math.round(est.med), Math.round(est.q25), Math.round(est.q75), countryName(me.country) ?? null)}
    </ThemedText>,
    <ScreenLink key="w" href="/how-it-works" title={t.disclaimer.howItWorks} />,
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
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
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
  calendar: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
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
  gentle: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: 0.6,
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
  healthy: {
    gap: 4,
  },
});
