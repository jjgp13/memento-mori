import { useIsFocused } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { LifeGrid } from '@/components/life-grid';
import { RichText } from '@/components/rich-text';
import { Screen } from '@/components/screen';
import { Segmented } from '@/components/segmented';
import { SourceLink } from '@/components/source-link';
import { SoundToggle } from '@/components/sound-toggle';
import { Stepper } from '@/components/stepper';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useClockTick } from '@/hooks/use-clock-tick';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { dec1, fmt, num } from '@/i18n/format';
import { MAX_TOTAL_GAIN, allLevers, combinedGain, habitBreakdown, habitsEffect, type Lever } from '@/lib/habit-impact';
import { ZOOMS, lifeView, type Zoom } from '@/lib/life-views';
import { DAY_MS, WEEKS_PER_YEAR, YEAR_MS, ageAt, birthTime, estimate, type ModelInput } from '@/lib/model';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';
import { SWAP_HOURS, shareOfWaking, swapSuggestion, yearsLeft, yearsOfHours } from '@/lib/time-use';

export default function LifeScreen() {
  const profile = useProfile();

  // Onboarding guards this screen, so a profile is always here in practice.
  return <Screen>{profile ? <Life profile={profile} /> : null}</Screen>;
}

function Life({ profile }: { profile: Profile }) {
  const theme = useTheme();
  const t = useT();
  const [zoom, setZoom] = useState<Zoom>('weeks');
  // The grid only needs minute precision; the clock below ticks every second on its own.
  const now = useNow(60_000);
  const est = estimate(profile, now);
  const age = ageAt(profile.dob, now);
  const levers = allLevers(profile, now);
  const gain = combinedGain(profile, now);
  const view = lifeView(zoom, profile.dob, est, now, t, gain);
  // The median is found in monthly steps from the current age, so re-estimating every tick would
  // pin "time left" to a constant. Anchor it to when the screen opened so the clock really counts down.
  const [anchor] = useState(() => Date.now());
  const end = birthTime(profile.dob) + estimate(profile, anchor).med * YEAR_MS;
  // Optional ticking (off by default), only while this tab is on screen.
  const { tickLife } = usePrefs();
  const focused = useIsFocused();
  useClockTick(tickLife && focused);

  return (
    <>
      <View style={styles.head}>
        <ThemedText type="eyebrow">{t.life.eyebrow(profile.name)}</ThemedText>
        <RichText style={styles.verdict} parts={t.life.verdict(dec1(age), Math.round(est.med), Math.round(est.med - age))} />
        <ThemedText type="small">
          {t.life.range(Math.round(est.q25), Math.round(est.q75), Math.round(est.p80 * 100))}
        </ThemedText>
      </View>

      <HabitsCard profile={profile} now={now} levers={levers} gain={gain} />
      <PhoneCard profile={profile} now={now} />

      <View>
        <View style={styles.clockHead}>
          <ThemedText type="eyebrow" themeColor="muted">
            {t.life.timeLeft}
          </ThemedText>
          <SoundToggle on={tickLife} onChange={(on) => setPref('tickLife', on)} />
        </View>
        <Clock end={end} />
      </View>

      <Segmented
        options={ZOOMS.map((key) => ({ key, label: t.life.zooms[key] }))}
        value={zoom}
        onChange={setZoom}
        accessibilityLabel={t.life.zoomA11y}
      />

      <View style={[styles.board, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <Animated.View key={zoom} entering={FadeIn.duration(300)}>
          <LifeGrid view={view} />
        </Animated.View>
      </View>

      <RichText style={styles.caption} parts={view.caption} />
      <Legend reach={gain > 0} />

      <ThemedText type="small">{t.common.notAdvice}</ThemedText>
    </>
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

function Legend({ reach }: { reach: boolean }) {
  const theme = useTheme();
  const l = useT().life.legend;
  const items = [
    { label: l.lived, fill: theme.lived },
    { label: l.now, fill: theme.accent },
    { label: l.likely, stroke: theme.remain },
    ...(reach ? [{ label: l.reach, fill: theme.accentSoft, stroke: theme.accent }] : []),
    { label: l.maybe, stroke: theme.remain, dashed: true },
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
  const t = useT();
  const hours = profile.phoneHours;
  const left = yearsLeft(profile, now);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {t.life.phoneTitle}
      </ThemedText>
      {hours != null ? (
        <>
          <RichText parts={t.life.phoneLine(num(hours), dec1(yearsOfHours(hours, left)), shareOfWaking(hours, t))} />
          {hours >= SWAP_HOURS ? (
            <ThemedText type="small">{t.life.phoneSwap(swapSuggestion(profile, profile.loves ?? [], t, now))}</ThemedText>
          ) : null}
          <SourceLink of="phone" />
        </>
      ) : (
        <ThemedText>{t.life.phoneAsk}</ThemedText>
      )}
      <Stepper
        value={hours ?? 4}
        onChange={(phoneHours) => saveProfile({ ...profile, phoneHours })}
        step={0.5}
        max={16}
        format={(v) => t.common.hoursValue(num(v))}
        accessibilityLabel={t.onboarding.phoneA11y}
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
  const t = useT();
  const total = habitsEffect(profile, now);
  const items = habitBreakdown(profile, t, now);
  const signed = (y: number) => `${y > 0 ? '+' : '−'}${dec1(Math.abs(y))}`;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {t.life.habitsTitle}
      </ThemedText>
      <RichText
        parts={Math.abs(total) < 0.2 ? [{ text: t.life.habitsNeutral }] : t.life.habitsEffect(total > 0, dec1(Math.abs(total)))}
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
            {t.common.yrs(signed(it.years))}
          </ThemedText>
        </View>
      ))}

      {levers.length ? (
        <View style={[styles.lever, { borderTopColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            {t.life.withinReach}
          </ThemedText>
          {levers.map((l) => (
            <View key={l.key} style={styles.habitRow}>
              <View style={styles.flex}>
                <ThemedText>{t.levers[l.key]}</ThemedText>
                <ThemedText type="small">{t.life.moreWeekends(fmt(l.years * WEEKS_PER_YEAR))}</ThemedText>
                <SourceLink of={l.key} />
              </View>
              <ThemedText type="mono" themeColor="accent">
                {t.common.yrs(signed(l.years))}
              </ThemedText>
            </View>
          ))}
          <RichText parts={t.life.together(levers.length > 1, dec1(gain), gain >= MAX_TOTAL_GAIN)} />
        </View>
      ) : (
        <ThemedText type="small">{t.life.allGood}</ThemedText>
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
