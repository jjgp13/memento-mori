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
import { Fonts, Radius } from '@/constants/theme';
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

function Life({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const [zoom, setZoom] = useState<Zoom>('weeks');
  const [show, setShow] = useState<Show>('all');
  // "What if" changes being tried on the calendar; nothing here is saved.
  const [tries, setTries] = useState<Lever['key'][]>([]);
  const [tryPhone, setTryPhone] = useState<number | null>(null);
  // The grid only needs minute precision; the clock ticks every second on its own.
  const now = useNow(60_000);
  const est = estimate(profile, now);
  const age = ageAt(profile.dob, now);
  const levers = allLevers(profile, now);
  const tried = tries.filter((k) => levers.some((l) => l.key === k));
  const gain = gainFrom(profile, tried, now);
  const phone = tryPhone ?? profile.phoneHours;
  const lifeZoom = zoom === 'life' || zoom === 'weeks';
  const view = lifeView(zoom, profile.dob, est, now, {
    gain,
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

  // A "what if" is drawn on the whole-life views, so jump to one from Year or Today.
  const seeLife = () => {
    if (!lifeZoom) setZoom('weeks');
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
          reach={lifeZoom && gain > 0}
          sleep={lifeZoom && show !== 'all'}
          phone={lifeZoom && show === 'free' && !!phone}
        />
        <Animated.View key={zoom} entering={FadeIn.duration(300)}>
          <LifeGrid view={view} />
        </Animated.View>
      </View>

      <RichText style={styles.caption} parts={view.caption} />
      {lifeZoom ? <Segmented options={shows} value={show} onChange={setShow} accessibilityLabel="Show time ahead" /> : null}

      <WhatIf
        profile={profile}
        now={now}
        levers={levers}
        tried={tried}
        gain={gain}
        onToggle={(k) => {
          setTries(tried.includes(k) ? tried.filter((x) => x !== k) : [...tried, k]);
          seeLife();
        }}
        phone={phone}
        onPhone={(h) => {
          setTryPhone(h);
          setShow('free');
          seeLife();
        }}
        onResetPhone={() => setTryPhone(null)}
      />

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
      <PhoneCard profile={profile} now={now} />

      <ThemedText type="small">
        Estimates come from population averages and broad risk ratios. They show direction and rough size, not a
        promise, and are not medical advice.
      </ThemedText>
    </>
  );
}

/**
 * Try a change and watch it land on the calendar: habit changes add bronze "within reach" time, fewer
 * phone hours grow the part of life that's awake and off the phone. Seeing your own numbers helps most
 * when it leads straight to a plan, so a single change offers one.
 */
function WhatIf({
  profile,
  now,
  levers,
  tried,
  gain,
  onToggle,
  phone,
  onPhone,
  onResetPhone,
}: {
  profile: Profile;
  now: number;
  levers: Lever[];
  tried: Lever['key'][];
  gain: number;
  onToggle: (key: Lever['key']) => void;
  phone: number | undefined;
  onPhone: (hours: number) => void;
  onResetPhone: () => void;
}) {
  const theme = useTheme();
  const reported = profile.phoneHours;
  const phoneDiff = reported != null && phone != null ? reported - phone : 0;
  const one = tried.length === 1 ? levers.find((l) => l.key === tried[0]) : undefined;
  // The weeks ahead, split the way the "Off phone" calendar shows them, plus any time within reach.
  const weeks = yearsLeft(profile, now) * WEEKS_PER_YEAR;
  const sleep = sleepHours(profile) / 24;
  const phoneShare = (phone ?? 0) / 24;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        What if…
      </ThemedText>
      <TimeBar
        parts={[
          { key: 'free', label: 'awake, off phone', value: weeks * (1 - sleep - phoneShare), color: theme.remain },
          { key: 'phone', label: 'on your phone', value: weeks * phoneShare, color: theme.screen },
          { key: 'sleep', label: 'asleep', value: weeks * sleep, color: theme.sleep },
          { key: 'reach', label: 'within reach', value: gain * WEEKS_PER_YEAR, color: theme.accent },
        ]}
      />
      {levers.length ? (
        <>
          <ThemedText type="small">Tap a change to see it on your calendar.</ThemedText>
          <View style={styles.chips}>
            {levers.map((l) => {
              const on = tried.includes(l.key);
              return (
                <Pressable
                  key={l.key}
                  accessibilityRole="checkbox"
                  aria-checked={on}
                  accessibilityLabel={`${l.label}, about ${l.years.toFixed(1)} years`}
                  onPress={() => onToggle(l.key)}
                  style={[styles.chip, { backgroundColor: on ? theme.accentSoft : theme.bg, borderColor: on ? theme.accent : theme.line }]}>
                  <ThemedText type="small" themeColor="fg">
                    {l.label}{' '}
                    <ThemedText type="small" themeColor="accent">
                      +{l.years.toFixed(1)} yrs
                    </ThemedText>
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : (
        <ThemedText type="small">You already do the things that add the most time. Keep them, and keep your people close.</ThemedText>
      )}

      {tried.length ? (
        <Animated.View key={tried.join()} entering={FadeIn.duration(400)} style={styles.result}>
          <RichText
            parts={[
              { text: 'About ' },
              { text: `${fmt(gain * WEEKS_PER_YEAR)} more weeks`, strong: true },
              { text: ` (${gain.toFixed(1)} years${gain >= MAX_TOTAL_GAIN ? ', capped: habit effects overlap' : ''}): the bronze circles above.` },
            ]}
          />
          {tried.map((k) => (
            <SourceLink key={k} of={k} />
          ))}
          {one ? <LeverPlan profile={profile} lever={one} /> : null}
        </Animated.View>
      ) : null}

      <View style={[styles.phoneTry, { borderTopColor: theme.line }]}>
        {reported != null && phone != null ? (
          <>
            <View style={styles.timeRow}>
              <ThemedText type="small" style={styles.flex}>
                Phone, hours a day
              </ThemedText>
              <Stepper
                value={phone}
                onChange={onPhone}
                step={0.5}
                max={16}
                format={(v) => `${v} h`}
                accessibilityLabel="Try fewer or more phone hours a day"
              />
            </View>
            {phoneDiff ? (
              <>
                <RichText
                  parts={[
                    { text: `${Math.abs(phoneDiff)} h a day ${phoneDiff > 0 ? 'less' : 'more'} is about ` },
                    { text: `${yearsOfHours(Math.abs(phoneDiff), yearsLeft(profile, now)).toFixed(1)} years`, strong: true },
                    { text: phoneDiff > 0 ? ' more of your life awake and off your phone.' : ' less of your life awake and off your phone.' },
                  ]}
                />
                {phoneDiff > 0 ? (
                  <ThemedText type="small">Half an hour of it could become {swapSuggestion(profile, profile.loves ?? [], now)}.</ThemedText>
                ) : null}
                <Button title="Back to my answer" variant="link" onPress={onResetPhone} style={styles.start} />
              </>
            ) : (
              <ThemedText type="small">Try fewer hours to see the time it gives back. Just trying: your answer stays the same.</ThemedText>
            )}
          </>
        ) : (
          <ThemedText type="small">Add your phone time under Your phone to try it here.</ThemedText>
        )}
      </View>

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

/** What each color means, above the calendar; layers appear only while they're shown. */
function Legend({ life, reach, sleep, phone }: { life: boolean; reach: boolean; sleep: boolean; phone: boolean }) {
  const theme = useTheme();
  const items = [
    { label: 'Lived', fill: theme.lived },
    { label: 'Now', fill: theme.accent },
    { label: 'Likely ahead', stroke: theme.remain },
    ...(sleep ? [{ label: 'Asleep', fill: theme.sleep }] : []),
    ...(phone ? [{ label: 'On your phone', fill: theme.screen }] : []),
    ...(reach ? [{ label: 'Within reach', fill: theme.accentSoft, stroke: theme.accent }] : []),
    ...(life ? [{ label: 'If fortune allows', stroke: theme.remain, dashed: true }] : []),
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
                text: `${gain >= MAX_TOTAL_GAIN ? ' (capped: habit effects overlap)' : ''}. Try them on your calendar under What if.`,
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
  phoneTry: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 4,
    gap: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legend: {
    marginBottom: 12,
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
