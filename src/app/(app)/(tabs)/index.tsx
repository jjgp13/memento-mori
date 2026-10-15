import { useIsFocused } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { Button } from '@/components/button';
import { LifeGrid } from '@/components/life-grid';
import { PlanEditor, PlanSummary } from '@/components/plan-editor';
import { RichText } from '@/components/rich-text';
import { Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { SourceLink } from '@/components/source-link';
import { SoundToggle } from '@/components/sound-toggle';
import { Stepper } from '@/components/stepper';
import { ThemedText } from '@/components/themed-text';
import { TimeBar } from '@/components/time-bar';
import { Fonts, Radius, type ThemeColor } from '@/constants/theme';
import { useClockTick } from '@/hooks/use-clock-tick';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { PERSONAL_NUMBERS, WALK_AFTER_MEALS } from '@/lib/evidence';
import { MAX_TOTAL_GAIN, allLevers, combinedGain, gainFrom, habitBreakdown, habitsEffect, type Lever } from '@/lib/habit-impact';
import { ZOOMS, fmt, lifeView, type Zoom } from '@/lib/life-views';
import { DAY_MS, WEEKS_PER_YEAR, YEAR_MS, ageAt, birthTime, estimate } from '@/lib/model';
import { defaultHabitPlan, planSentence } from '@/lib/plans';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';
import { SWAP_HOURS, shareOfWaking, sleepHours, swapSuggestion, yearsLeft, yearsOfHours } from '@/lib/time-use';

export default function LifeScreen() {
  const profile = useProfile();

  // Onboarding guards this screen, so a profile is always here in practice.
  return <Screen>{profile ? <Life profile={profile} /> : null}</Screen>;
}

/** Which of the time ahead to show: all of it, the awake part, or awake and off the phone. */
type Show = 'all' | 'awake' | 'free';

/** Each change gets its own color on the calendar. */
const LEVER_COLOR: Record<Lever['key'], ThemeColor> = {
  steps: 'leverMove',
  exercise: 'leverMove',
  connection: 'leverPeople',
  bmi: 'leverWeight',
  sleep: 'leverSleep',
  smoke: 'leverSmoke',
  alcohol: 'leverDrink',
};

/** A change being tried and the share of the combined gain it's drawn with. */
type Tried = Lever & { share: number };

/**
 * Changes together add less than their sum (and are capped), so the combined gain is split between them
 * in proportion to what each would add alone.
 */
function splitGain(total: number, levers: Lever[]): Tried[] {
  const sum = levers.reduce((t, l) => t + l.years, 0) || 1;
  return levers.map((l) => ({ ...l, share: (total * l.years) / sum }));
}

function Life({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const [zoom, setZoom] = useState<Zoom>('weeks');
  const [show, setShow] = useState<Show>('all');
  // Changes being tried on the calendar, in the order they were turned on; nothing here is saved.
  const [tries, setTries] = useState<Lever['key'][]>([]);
  // The grid only needs minute precision; the clock ticks every second on its own.
  const now = useNow(60_000);
  const est = estimate(profile, now);
  const age = ageAt(profile.dob, now);
  const levers = allLevers(profile, now);
  const triedLevers = tries.flatMap((k) => levers.filter((l) => l.key === k));
  const gain = gainFrom(profile, triedLevers.map((l) => l.key), now);
  const tried = splitGain(gain, triedLevers);
  const phone = profile.phoneHours;
  const lifeZoom = zoom === 'life' || zoom === 'weeks';
  const view = lifeView(zoom, profile.dob, est, now, {
    gains: tried.map((t) => t.share),
    sleep: show === 'all' ? 0 : sleepHours(profile) / 24,
    phone: show === 'free' && phone ? phone / 24 : 0,
  });
  // The median is found in monthly steps from the current age, so re-estimating every tick would
  // pin "time left" to a constant. Anchor it to when the screen opened so the clock really counts down.
  const [anchor] = useState(() => Date.now());
  const end = birthTime(profile.dob) + estimate(profile, anchor).med * YEAR_MS;
  // Optional ticking (off by default), only while this tab is on screen.
  const { tickLife } = usePrefs();
  const focused = useIsFocused();
  useClockTick(tickLife && focused);

  // Changes are drawn on the whole-life views, so jump to one from Year or Today.
  const seeLife = () => {
    if (!lifeZoom) setZoom('weeks');
  };
  const toggle = (key: Lever['key']) => {
    setTries(tries.includes(key) ? tries.filter((k) => k !== key) : [...tries, key]);
    seeLife();
  };
  const shows: { key: Show; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'awake', label: 'Awake' },
    ...(phone ? [{ key: 'free' as const, label: 'Off phone' }] : []),
  ];

  return (
    <>
      <View>
        <View style={styles.clockHead}>
          <ThemedText type="eyebrow">{profile.name ? `${profile.name} · likely time left` : 'Likely time left'}</ThemedText>
          <SoundToggle on={tickLife} onChange={(on) => setPref('tickLife', on)} />
        </View>
        <Clock end={end} />
      </View>

      <Segmented options={ZOOMS} value={zoom} onChange={setZoom} accessibilityLabel="Zoom" />

      <View style={[styles.board, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <Legend
          life={lifeZoom}
          dense={!!view.dense}
          sleep={lifeZoom && show !== 'all'}
          phone={lifeZoom && show === 'free' && !!phone}
        />
        {levers.length ? <Toggles levers={levers} tries={tries} onToggle={toggle} /> : null}
        <Animated.View key={zoom} entering={FadeIn.duration(300)}>
          <LifeGrid view={view} reachColors={tried.map((t) => theme[LEVER_COLOR[t.key]])} />
        </Animated.View>
      </View>

      <RichText style={styles.caption} parts={view.caption} />
      {lifeZoom ? <Segmented options={shows} value={show} onChange={setShow} accessibilityLabel="Show time ahead" /> : null}

      <PhoneCard
        profile={profile}
        now={now}
        onChange={(phoneHours) => {
          saveProfile({ ...profile, phoneHours });
          // Show the change where it lands: the part of life that's awake and off the phone.
          setShow('free');
          seeLife();
        }}
      />
      <WhatIf profile={profile} now={now} tried={tried} gain={gain} anyLevers={levers.length > 0} />

      <View style={styles.head}>
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

      <HabitsCard profile={profile} now={now} levers={levers} />

      <ThemedText type="small">
        Estimates come from population averages and broad risk ratios. They show direction and rough size, not a
        promise, and are not medical advice.
      </ThemedText>
    </>
  );
}

/**
 * "What if…" switches on the calendar itself, one per change that would add time for this person (from
 * their onboarding answers), each in the color it's drawn with.
 */
function Toggles({ levers, tries, onToggle }: { levers: Lever[]; tries: Lever['key'][]; onToggle: (key: Lever['key']) => void }) {
  const theme = useTheme();

  return (
    <View style={[styles.toggles, { borderTopColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        What if… tap to try
      </ThemedText>
      <View style={styles.chips}>
        {levers.map((l) => {
          const on = tries.includes(l.key);
          const color = theme[LEVER_COLOR[l.key]];
          return (
            <Pressable
              key={l.key}
              accessibilityRole="switch"
              aria-checked={on}
              accessibilityLabel={`What if: ${l.label}, about ${l.years.toFixed(1)} years`}
              onPress={() => onToggle(l.key)}
              hitSlop={4}
              style={[styles.toggle, { borderColor: on ? color : theme.line, backgroundColor: on ? theme.bg : 'transparent' }]}>
              <View style={[styles.dot, on ? { backgroundColor: color } : { borderWidth: 1.5, borderColor: color }]} />
              <ThemedText type="mono" style={[styles.toggleText, { color: on ? theme.fg : theme.muted }]}>
                {l.label} <ThemedText type="mono" style={[styles.toggleText, { color }]}>+{l.years.toFixed(1)}y</ThemedText>
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * What the changes being tried add up to, each linked to its source. Seeing your own numbers helps most
 * when it leads straight to a plan, so a single change offers one.
 */
function WhatIf({ profile, now, tried, gain, anyLevers }: { profile: Profile; now: number; tried: Tried[]; gain: number; anyLevers: boolean }) {
  const theme = useTheme();
  // The weeks ahead, split the way the "Off phone" calendar shows them, plus the changes being tried.
  const weeks = yearsLeft(profile, now) * WEEKS_PER_YEAR;
  const sleep = sleepHours(profile) / 24;
  const phoneShare = (profile.phoneHours ?? 0) / 24;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        Your weeks ahead
      </ThemedText>
      <TimeBar
        parts={[
          { key: 'free', label: 'awake, off phone', value: weeks * (1 - sleep - phoneShare), color: theme.remain },
          { key: 'phone', label: 'on your phone', value: weeks * phoneShare, color: theme.screen },
          { key: 'sleep', label: 'asleep', value: weeks * sleep, color: theme.sleep },
          ...tried.map((t) => ({ key: t.key, label: t.label.toLowerCase(), value: t.share * WEEKS_PER_YEAR, color: theme[LEVER_COLOR[t.key]] })),
        ]}
      />

      {tried.length ? (
        <Animated.View key={tried.map((t) => t.key).join()} entering={FadeIn.duration(400)} style={styles.result}>
          <RichText
            parts={[
              { text: tried.length > 1 ? 'Together, about ' : 'About ' },
              { text: `${fmt(gain * WEEKS_PER_YEAR)} more weeks`, strong: true },
              { text: ` (${gain.toFixed(1)} years)` },
              {
                text:
                  tried.length > 1
                    ? `: less than the sum, since habit effects overlap${gain >= MAX_TOTAL_GAIN ? ', and capped' : ''}.`
                    : '.',
              },
            ]}
          />
          {tried.map((t) => (
            <View key={t.key} style={styles.triedRow}>
              <View style={[styles.dot, { backgroundColor: theme[LEVER_COLOR[t.key]] }]} />
              <View style={styles.flex}>
                <ThemedText type="small" themeColor="fg">
                  {t.label}: about {t.years.toFixed(1)} years on its own
                </ThemedText>
                <SourceLink of={t.key} />
              </View>
            </View>
          ))}
          {tried.length === 1 ? <LeverPlan profile={profile} lever={tried[0]} /> : null}
        </Animated.View>
      ) : anyLevers ? (
        <ThemedText type="small">Tap a “What if” on the calendar to see what a change could add.</ThemedText>
      ) : (
        <ThemedText type="small">You already do the things that add the most time. Keep them, and keep your people close.</ThemedText>
      )}

      <ThemedText type="small">{PERSONAL_NUMBERS.claim}</ThemedText>
      <SourceLink source={PERSONAL_NUMBERS.source} />
    </View>
  );
}

/** One small plan for a habit change ("after dinner, a 10-minute walk"); only one at a time. */
function LeverPlan({ profile, lever }: { profile: Profile; lever: Lever }) {
  const [editing, setEditing] = useState(false);
  const plan = profile.habitPlan;

  if (editing) {
    return (
      <PlanEditor
        initial={plan?.habit === lever.key ? plan : defaultHabitPlan(lever.key)}
        onCancel={() => setEditing(false)}
        onSave={(next) => {
          saveProfile({ ...profile, habitPlan: { ...next, createdAt: plan?.habit === lever.key ? plan.createdAt : Date.now() } });
          setEditing(false);
        }}
        note={
          <>
            {lever.key === 'steps' || lever.key === 'exercise' ? (
              <>
                <ThemedText type="small">{WALK_AFTER_MEALS.claim}</ThemedText>
                <SourceLink source={WALK_AFTER_MEALS.source} />
              </>
            ) : null}
            {plan && plan.habit !== lever.key ? (
              <ThemedText type="small">One small plan at a time: this would take the place of “{planSentence(plan)}”</ThemedText>
            ) : null}
          </>
        }
      />
    );
  }
  if (plan?.habit === lever.key) {
    return <PlanSummary plan={plan} onEdit={() => setEditing(true)} onRemove={() => saveProfile({ ...profile, habitPlan: undefined })} />;
  }
  return (
    <Button
      title="Make a small plan"
      variant="link"
      accessibilityLabel={`Make a small plan for: ${lever.label}`}
      onPress={() => setEditing(true)}
      style={styles.start}
    />
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

/** What each color means, above the calendar; sleep and phone appear only while they're shown. */
function Legend({ life, dense, sleep, phone }: { life: boolean; dense: boolean; sleep: boolean; phone: boolean }) {
  const theme = useTheme();
  // Matches how the grid draws: on the dense Weeks view, likely weeks are dots and "maybe" ones plain rings.
  const items = [
    { label: 'Lived', fill: theme.lived },
    { label: 'Now', fill: theme.accent },
    dense ? { label: 'Likely ahead', fill: theme.remain } : { label: 'Likely ahead', stroke: theme.remain },
    ...(sleep ? [{ label: 'Asleep', fill: theme.sleep }] : []),
    ...(phone ? [{ label: 'On your phone', fill: theme.screen }] : []),
    ...(life ? [{ label: 'If fortune allows', stroke: theme.remain, dashed: !dense }] : []),
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

/**
 * Daily phone time in time-left terms, and what half an hour of it could become. The one place to set
 * it; a change shows right away on the calendar above.
 */
function PhoneCard({ profile, now, onChange }: { profile: Profile; now: number; onChange: (hours: number) => void }) {
  const theme = useTheme();
  const hours = profile.phoneHours;
  const left = yearsLeft(profile, now);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.timeRow}>
        <ThemedText type="eyebrow" themeColor="muted" style={styles.flex}>
          Your phone
        </ThemedText>
        <Stepper value={hours ?? 4} onChange={onChange} step={0.5} max={16} format={(v) => `${v} h`} accessibilityLabel="Hours a day on your phone" />
      </View>
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
    </View>
  );
}

/**
 * What the person's habits do to the estimate, and every change within reach, each linked to its study.
 * Each change can be tried on the calendar with the "What if" switches.
 */
function HabitsCard({ profile, now, levers }: { profile: Profile; now: number; levers: Lever[] }) {
  const theme = useTheme();
  const gain = combinedGain(profile, now);
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
            <View key={l.key} style={styles.leverItem}>
              <View style={styles.habitRow}>
                <View style={styles.flex}>
                  <ThemedText>{l.label}</ThemedText>
                  <ThemedText type="small">about {fmt(l.years * WEEKS_PER_YEAR)} more weekends</ThemedText>
                  <SourceLink of={l.key} />
                </View>
                <ThemedText type="mono" themeColor="accent">
                  {signed(l.years)} yrs
                </ThemedText>
              </View>
              <LeverPlan profile={profile} lever={l} />
            </View>
          ))}
          <RichText
            parts={[
              { text: levers.length > 1 ? 'Together, about ' : 'That is about ' },
              { text: `${gain.toFixed(1)} more years`, strong: true },
              {
                text: `${gain >= MAX_TOTAL_GAIN ? ' (capped: habit effects overlap)' : ''}. Try them on the calendar with What if.`,
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
  clockHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    maxWidth: '100%',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  result: {
    gap: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggles: {
    borderTopWidth: 1,
    paddingTop: 10,
    marginBottom: 12,
    gap: 8,
  },
  toggle: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  toggleText: {
    fontSize: 11.5,
    flexShrink: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  triedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  legend: {
    marginBottom: 10,
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
  leverItem: {
    gap: 4,
  },
  start: {
    alignSelf: 'flex-start',
  },
  lever: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 4,
    gap: 10,
  },
});
