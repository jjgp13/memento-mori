import { router, useIsFocused } from 'expo-router';
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
import { useT } from '@/i18n';
import { dec1, fmt, num } from '@/i18n/format';
import { countryName } from '@/lib/country';
import { HEALTHY_LIFE_TABLES, LIFE_TABLES, PERSONAL_NUMBERS, WALK_AFTER_MEALS } from '@/lib/evidence';
import {
  MAX_TOTAL_GAIN,
  allLevers,
  bestHealthyLever,
  combinedGain,
  gainFrom,
  habitBreakdown,
  habitsEffect,
  healthyGainFrom,
  type Lever,
} from '@/lib/habit-impact';
import { ZOOMS, aheadLevel, lifeView, type Zoom } from '@/lib/life-views';
import { DAY_MS, WEEKS_PER_YEAR, YEAR_MS, ageAt, birthTime, estimate, healthEstimate, type Healthspan, type Survival } from '@/lib/model';
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
  strength: 'leverStrength',
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
  const t = useT();
  const [zoom, setZoom] = useState<Zoom>('weeks');
  const [show, setShow] = useState<Show>('all');
  // Changes being tried on the calendar, in the order they were turned on; nothing here is saved.
  const [tries, setTries] = useState<Lever['key'][]>([]);
  // The grid only needs minute precision; the clock ticks every second on its own.
  const now = useNow(60_000);
  const { life: est, health } = healthEstimate(profile, now);
  const age = ageAt(profile.dob, now);
  const levers = allLevers(profile, now);
  const triedLevers = tries.flatMap((k) => levers.filter((l) => l.key === k));
  const gain = gainFrom(profile, triedLevers.map((l) => l.key), now);
  const healthyGain = healthyGainFrom(profile, triedLevers.map((l) => l.key), now);
  const tried = splitGain(gain, triedLevers);
  const phone = profile.phoneHours;
  const lifeZoom = zoom === 'life' || zoom === 'weeks';
  // Optional ticking (off by default), only while this tab is on screen; no clock while numbers are hidden.
  const { tickLife, hideNumbers: hide } = usePrefs();
  const focused = useIsFocused();
  useClockTick(tickLife && focused && !hide);
  const view = lifeView(
    zoom,
    profile.dob,
    est,
    now,
    t,
    {
      gains: tried.map((x) => x.share),
      sleep: show === 'all' ? 0 : sleepHours(profile) / 24,
      phone: show === 'free' && phone ? phone / 24 : 0,
      health: shiftHealth(health, est, healthyGain, gain),
    },
    hide,
  );
  // The median is found in monthly steps from the current age, so re-estimating every tick would
  // pin "time left" to a constant. Anchor it to when the screen opened so the clock really counts down.
  const [anchor] = useState(() => Date.now());
  const end = birthTime(profile.dob) + estimate(profile, anchor).med * YEAR_MS;

  // Changes are drawn on the whole-life views, so jump to one from Year or Today.
  const seeLife = () => {
    if (!lifeZoom) setZoom('weeks');
  };
  const toggle = (key: Lever['key']) => {
    setTries(tries.includes(key) ? tries.filter((k) => k !== key) : [...tries, key]);
    seeLife();
  };
  const shows: { key: Show; label: string }[] = [
    { key: 'all', label: t.life.shows.all },
    { key: 'awake', label: t.life.shows.awake },
    ...(phone ? [{ key: 'free' as const, label: t.life.shows.free }] : []),
  ];

  return (
    <>
      <View>
        <View style={styles.clockHead}>
          <ThemedText type="eyebrow">{t.life.eyebrow(profile.name)}</ThemedText>
          {hide ? null : <SoundToggle on={tickLife} onChange={(on) => setPref('tickLife', on)} />}
        </View>
        {hide ? <ThemedText style={styles.ahead}>{t.gentle.ahead[aheadLevel(age, est)]}</ThemedText> : <Clock end={end} />}
      </View>

      <Segmented
        options={ZOOMS.map((key) => ({ key, label: t.life.zooms[key] }))}
        value={zoom}
        onChange={setZoom}
        accessibilityLabel={t.life.zoomA11y}
      />

      <View style={[styles.board, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <Legend
          life={lifeZoom}
          healthy={lifeZoom}
          dense={!!view.dense}
          sleep={lifeZoom && show !== 'all'}
          phone={lifeZoom && show === 'free' && !!phone}
        />
        {levers.length ? <Toggles levers={levers} tries={tries} onToggle={toggle} hide={hide} /> : null}
        <Animated.View key={zoom} entering={FadeIn.duration(300)}>
          <LifeGrid view={view} reachColors={tried.map((x) => theme[LEVER_COLOR[x.key]])} />
        </Animated.View>
      </View>

      <RichText style={styles.caption} parts={view.caption} />
      {lifeZoom ? <Segmented options={shows} value={show} onChange={setShow} accessibilityLabel={t.life.showA11y} /> : null}

      <PhoneCard
        profile={profile}
        now={now}
        hide={hide}
        onChange={(phoneHours) => {
          saveProfile({ ...profile, phoneHours });
          // Show the change where it lands: the part of life that's awake and off the phone.
          setShow('free');
          seeLife();
        }}
      />
      <WhatIf profile={profile} now={now} tried={tried} gain={gain} healthyGain={healthyGain} anyLevers={levers.length > 0} hide={hide} />

      <View style={styles.head}>
        {hide ? (
          <ThemedText type="small">{t.gentle.range}</ThemedText>
        ) : (
          <>
            <RichText style={styles.verdict} parts={t.life.verdict(dec1(age), Math.round(est.med), Math.round(est.med - age))} />
            <ThemedText type="small">
              {t.life.range(Math.round(est.q25), Math.round(est.q75), Math.round(est.p80 * 100))}
            </ThemedText>
          </>
        )}
        <TablesNote country={profile.country} />
      </View>

      <HealthyCard profile={profile} now={now} health={health} age={age} hide={hide} />

      <HabitsCard profile={profile} now={now} levers={levers} hide={hide} />

      <ThemedText type="small">{t.common.notAdvice}</ThemedText>
    </>
  );
}

/**
 * The healthy band, moved by the changes being tried. Each end can't pass the matching end of life, which the
 * changes move too.
 */
function shiftHealth(health: Healthspan, life: Survival, healthyGain: number, gain: number) {
  return {
    q25: Math.min(health.q25 + healthyGain, life.q25 + gain),
    med: Math.min(health.med + healthyGain, life.med + gain),
    q75: Math.min(health.q75 + healthyGain, life.q75 + gain),
  };
}

/**
 * Years likely in good health, and the one change that would add the most of them, with a small plan for it
 * (death reminders work when paired with one doable action: docs/nudges.md §1g). Strength training comes
 * first when it's open to them: it does the most for staying independent.
 */
function HealthyCard({
  profile,
  now,
  health,
  age,
  hide,
}: {
  profile: Profile;
  now: number;
  health: Healthspan;
  age: number;
  hide: boolean;
}) {
  const theme = useTheme();
  const t = useT();
  const h = t.life.healthy;
  const strength = allLevers(profile, now).find((l) => l.key === 'strength' && l.healthy >= 0.2);
  const lever = strength ?? bestHealthyLever(profile, now);
  const years = (a: number) => fmt(a - age);
  const askStrength = () => router.push({ pathname: '/onboarding', params: { edit: '1', only: 'strength' } });

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.timeRow}>
        <View style={[styles.dot, { backgroundColor: theme.healthy }]} />
        <ThemedText type="eyebrow" themeColor="muted" style={styles.flex}>
          {h.eyebrow}
        </ThemedText>
      </View>
      {hide ? (
        <ThemedText>{t.gentle.healthy.years}</ThemedText>
      ) : (
        <RichText parts={h.years(years(health.med), years(health.q25), years(health.q75))} />
      )}
      <ThemedText type="small">{h.later}</ThemedText>
      {lever && lever.healthy >= 0.2 ? (
        <View style={[styles.lever, { borderTopColor: theme.line }]}>
          {hide ? (
            <ThemedText>{t.gentle.healthy.lever(t.levers[lever.key], lever.key === 'strength')}</ThemedText>
          ) : (
            <RichText
              parts={h.lever(
                t.levers[lever.key],
                dec1(lever.healthy),
                lever.key === 'strength' ? 'strength' : lever.healthy > lever.years + 0.1 ? 'more' : 'plain',
              )}
            />
          )}
          <SourceLink of={lever.key === 'strength' ? 'mobility' : 'healthy'} />
          <LeverPlan profile={profile} lever={lever} />
        </View>
      ) : (
        <ThemedText type="small">{h.allGood}</ThemedText>
      )}
      {profile.strength == null ? (
        <Pressable accessibilityRole="button" onPress={askStrength} hitSlop={6}>
          <ThemedText type="small" themeColor="accent" style={styles.tablesEdit}>
            {h.askStrength}
          </ThemedText>
        </Pressable>
      ) : null}
      <View style={styles.tablesLinks}>
        <SourceLink source={HEALTHY_LIFE_TABLES.source} prefix={h.sourceHealthy} />
        <SourceLink of="healthy" prefix={h.sourceHabits} />
      </View>
    </View>
  );
}

/**
 * "What if…" switches on the calendar itself, one per change that would add time for this person (from
 * their onboarding answers), each in the color it's drawn with.
 */
function Toggles({
  levers,
  tries,
  onToggle,
  hide,
}: {
  levers: Lever[];
  tries: Lever['key'][];
  onToggle: (key: Lever['key']) => void;
  hide: boolean;
}) {
  const theme = useTheme();
  const t = useT();

  return (
    <View style={[styles.toggles, { borderTopColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {t.life.whatIf}
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
              accessibilityLabel={hide ? t.gentle.whatIfA11y(t.levers[l.key]) : t.life.whatIfA11y(t.levers[l.key], dec1(l.years), dec1(l.healthy))}
              onPress={() => onToggle(l.key)}
              hitSlop={4}
              style={[styles.toggle, { borderColor: on ? color : theme.line, backgroundColor: on ? theme.bg : 'transparent' }]}>
              <View style={[styles.dot, on ? { backgroundColor: color } : { borderWidth: 1.5, borderColor: color }]} />
              <ThemedText type="mono" style={[styles.toggleText, { color: on ? theme.fg : theme.muted }]}>
                {t.levers[l.key]}
                {hide ? null : (
                  <ThemedText type="mono" style={[styles.toggleText, { color }]}>{` ${t.life.whatIfYears(dec1(l.years))}`}</ThemedText>
                )}
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
function WhatIf({
  profile,
  now,
  tried,
  gain,
  healthyGain,
  anyLevers,
  hide,
}: {
  profile: Profile;
  now: number;
  tried: Tried[];
  gain: number;
  healthyGain: number;
  anyLevers: boolean;
  hide: boolean;
}) {
  const theme = useTheme();
  const t = useT();
  // The weeks ahead, split the way the "Off phone" calendar shows them, plus the changes being tried.
  const weeks = yearsLeft(profile, now) * WEEKS_PER_YEAR;
  const sleep = sleepHours(profile) / 24;
  const phoneShare = (profile.phoneHours ?? 0) / 24;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {t.life.weeksAhead}
      </ThemedText>
      <TimeBar
        unit={t.life.weeksUnit}
        hideNumbers={hide}
        parts={[
          { key: 'free', label: t.life.bar.free, value: weeks * (1 - sleep - phoneShare), color: theme.remain },
          { key: 'phone', label: t.life.bar.phone, value: weeks * phoneShare, color: theme.screen },
          { key: 'sleep', label: t.life.bar.sleep, value: weeks * sleep, color: theme.sleep },
          ...tried.map((x) => ({
            key: x.key,
            label: t.life.barLever(t.levers[x.key]),
            value: x.share * WEEKS_PER_YEAR,
            color: theme[LEVER_COLOR[x.key]],
          })),
        ]}
      />

      {tried.length ? (
        <Animated.View key={tried.map((x) => x.key).join()} entering={FadeIn.duration(400)} style={styles.result}>
          {hide ? (
            <ThemedText>
              {t.gentle.triedTotal(tried.length > 1)}
              {healthyGain >= 0.1 ? t.gentle.healthy.tried : ''}
            </ThemedText>
          ) : (
            <RichText
              parts={[
                ...t.life.triedTotal(tried.length > 1, fmt(gain * WEEKS_PER_YEAR), dec1(gain), gain >= MAX_TOTAL_GAIN),
                ...(healthyGain >= 0.1 ? t.life.triedHealthy(dec1(healthyGain)) : []),
              ]}
            />
          )}
          {tried.map((x) => (
            <View key={x.key} style={styles.triedRow}>
              <View style={[styles.dot, { backgroundColor: theme[LEVER_COLOR[x.key]] }]} />
              <View style={styles.flex}>
                <ThemedText type="small" themeColor="fg">
                  {hide ? t.levers[x.key] : t.life.triedOne(t.levers[x.key], dec1(x.years), dec1(x.healthy))}
                </ThemedText>
                <SourceLink of={x.key} />
              </View>
            </View>
          ))}
          {tried.length === 1 ? <LeverPlan profile={profile} lever={tried[0]} /> : null}
        </Animated.View>
      ) : anyLevers ? (
        <ThemedText type="small">{t.life.tapWhatIf}</ThemedText>
      ) : (
        <ThemedText type="small">{t.life.allGood}</ThemedText>
      )}

      {/* Why the screen shows personal numbers; moot while they're hidden. */}
      {hide ? null : (
        <>
          <ThemedText type="small">{t.claims.personalNumbers}</ThemedText>
          <SourceLink source={PERSONAL_NUMBERS.source} />
        </>
      )}
    </View>
  );
}

/** One small plan for a habit change ("after dinner, a 10-minute walk"); only one at a time. */
function LeverPlan({ profile, lever }: { profile: Profile; lever: Lever }) {
  const t = useT();
  const [editing, setEditing] = useState(false);
  const plan = profile.habitPlan;

  if (editing) {
    return (
      <PlanEditor
        initial={plan?.habit === lever.key ? plan : defaultHabitPlan(lever.key, t)}
        onCancel={() => setEditing(false)}
        onSave={(next) => {
          saveProfile({ ...profile, habitPlan: { ...next, createdAt: plan?.habit === lever.key ? plan.createdAt : Date.now() } });
          setEditing(false);
        }}
        note={
          <>
            {lever.key === 'steps' || lever.key === 'exercise' ? (
              <>
                <ThemedText type="small">{t.claims.walkAfterMeals}</ThemedText>
                <SourceLink source={WALK_AFTER_MEALS.source} />
              </>
            ) : null}
            {plan && plan.habit !== lever.key ? (
              <ThemedText type="small">{t.life.onePlanAtATime(planSentence(plan, t))}</ThemedText>
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
      title={t.life.makePlan}
      variant="link"
      accessibilityLabel={t.life.makePlanA11y(t.levers[lever.key])}
      onPress={() => setEditing(true)}
      style={styles.start}
    />
  );
}

function Clock({ end }: { end: number }) {
  const t = useT();
  const now = useNow(1000);
  const ms = Math.max(0, end - now);
  const y = Math.floor(ms / YEAR_MS);
  const rem = ms - y * YEAR_MS;
  const d = Math.floor(rem / DAY_MS);
  const s = Math.floor((rem - d * DAY_MS) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <ThemedText style={styles.clock} accessibilityLabel={t.life.clockA11y(y, d)}>
      {`${t.life.clock(y, d)}${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:`}
      <ThemedText style={styles.clock} themeColor="accent">
        {pad(s % 60)}
      </ThemedText>
    </ThemedText>
  );
}

/** What each color means, above the calendar; sleep and phone appear only while they're shown. */
function Legend({ life, healthy, dense, sleep, phone }: { life: boolean; healthy: boolean; dense: boolean; sleep: boolean; phone: boolean }) {
  const theme = useTheme();
  const l = useT().life.legend;
  // Matches how the grid draws: on the dense Weeks view, likely weeks are dots and "maybe" ones plain rings.
  const items = [
    { label: l.lived, fill: theme.lived },
    { label: l.now, fill: theme.accent },
    ...(healthy ? [{ label: l.healthy, fill: theme.healthy }] : []),
    dense ? { label: l.likely, fill: theme.remain } : { label: l.likely, stroke: theme.remain },
    ...(sleep ? [{ label: l.asleep, fill: theme.sleep }] : []),
    ...(phone ? [{ label: l.phone, fill: theme.screen }] : []),
    ...(life ? [{ label: l.maybe, stroke: theme.remain, dashed: !dense }] : []),
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
function PhoneCard({
  profile,
  now,
  hide,
  onChange,
}: {
  profile: Profile;
  now: number;
  hide: boolean;
  onChange: (hours: number) => void;
}) {
  const theme = useTheme();
  const t = useT();
  const hours = profile.phoneHours;
  const left = yearsLeft(profile, now);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.timeRow}>
        <ThemedText type="eyebrow" themeColor="muted" style={styles.flex}>
          {t.life.phoneTitle}
        </ThemedText>
        <Stepper
          value={hours ?? 4}
          onChange={onChange}
          step={0.5}
          max={16}
          format={(v) => t.common.hoursValue(num(v))}
          accessibilityLabel={t.onboarding.phoneA11y}
        />
      </View>
      {hours != null ? (
        <>
          {hide ? (
            <ThemedText>{t.gentle.phoneLine(shareOfWaking(hours, t))}</ThemedText>
          ) : (
            <RichText parts={t.life.phoneLine(num(hours), dec1(yearsOfHours(hours, left)), shareOfWaking(hours, t))} />
          )}
          {hours >= SWAP_HOURS ? (
            <ThemedText type="small">
              {hide ? t.gentle.phoneSwap : t.life.phoneSwap(swapSuggestion(profile, profile.loves ?? [], t, now))}
            </ThemedText>
          ) : null}
          <SourceLink of="phone" />
        </>
      ) : (
        <ThemedText>{t.life.phoneAsk}</ThemedText>
      )}
    </View>
  );
}

/**
 * What the person's habits do to the estimate, and every change within reach, each linked to its study.
 * Each change can be tried on the calendar with the "What if" switches.
 */
function HabitsCard({ profile, now, levers, hide }: { profile: Profile; now: number; levers: Lever[]; hide: boolean }) {
  const theme = useTheme();
  const t = useT();
  const gain = combinedGain(profile, now);
  const total = habitsEffect(profile, now);
  const items = habitBreakdown(profile, t, now);
  const signed = (y: number) => `${y > 0 ? '+' : '−'}${dec1(Math.abs(y))}`;
  const effect = (y: number) => (hide ? (y > 0 ? t.gentle.adds : t.gentle.costs) : t.common.yrs(signed(y)));

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {t.life.habitsTitle}
      </ThemedText>
      <RichText
        parts={
          Math.abs(total) < 0.2
            ? [{ text: t.life.habitsNeutral }]
            : hide
              ? [{ text: t.gentle.habitsEffect(total > 0) }]
              : t.life.habitsEffect(total > 0, dec1(Math.abs(total)))
        }
      />
      {items.map((it) => (
        <View key={it.key} style={styles.habitRow}>
          <View style={styles.flex}>
            <ThemedText type="small">
              {it.label} · {it.answer}
            </ThemedText>
            <SourceLink of={it.key} prefix={t.common.why} />
          </View>
          <ThemedText type="mono" themeColor={it.years > 0 ? 'accent' : 'muted'}>
            {effect(it.years)}
          </ThemedText>
        </View>
      ))}

      {levers.length ? (
        <View style={[styles.lever, { borderTopColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            {t.life.withinReach}
          </ThemedText>
          {levers.map((l) => (
            <View key={l.key} style={styles.leverItem}>
              <View style={styles.habitRow}>
                <View style={styles.flex}>
                  <ThemedText>{t.levers[l.key]}</ThemedText>
                  <ThemedText type="small">{hide ? t.gentle.couldAdd : t.life.moreWeekends(fmt(l.years * WEEKS_PER_YEAR))}</ThemedText>
                  <SourceLink of={l.key} />
                </View>
                {hide ? null : (
                  <ThemedText type="mono" themeColor="accent">
                    {t.common.yrs(signed(l.years))}
                  </ThemedText>
                )}
              </View>
              <LeverPlan profile={profile} lever={l} />
            </View>
          ))}
          {hide ? (
            <ThemedText>{t.gentle.together(levers.length > 1)}</ThemedText>
          ) : (
            <RichText parts={t.life.together(levers.length > 1, dec1(gain), gain >= MAX_TOTAL_GAIN)} />
          )}
        </View>
      ) : (
        <ThemedText type="small">{t.life.allGood}</ThemedText>
      )}
    </View>
  );
}

/** Whose life tables the estimate starts from, or a nudge to pick a country on profiles saved before there was one. */
function TablesNote({ country }: { country: string | undefined }) {
  const t = useT();
  const name = countryName(country);
  const edit = () => router.push({ pathname: '/onboarding', params: { edit: '1', only: 'country' } });
  return (
    <View style={styles.tables}>
      {name ? (
        <ThemedText type="small">{t.life.tablesFor(name)}</ThemedText>
      ) : (
        <ThemedText type="small">{t.life.tablesUS}</ThemedText>
      )}
      <View style={styles.tablesLinks}>
        <SourceLink source={LIFE_TABLES.source} prefix={t.common.lifeTables} />
        <Pressable accessibilityRole="button" onPress={edit} hitSlop={6}>
          <ThemedText type="small" themeColor="accent" style={styles.tablesEdit}>
            {name ? t.life.changeCountry : t.life.setCountry}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tables: {
    gap: 2,
  },
  tablesLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 14,
  },
  tablesEdit: {
    fontSize: 12.5,
    textDecorationLine: 'underline',
  },
  head: {
    gap: 8,
  },
  verdict: {
    fontSize: 21,
    lineHeight: 29,
  },
  ahead: {
    fontFamily: Fonts.display,
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: 0.6,
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
