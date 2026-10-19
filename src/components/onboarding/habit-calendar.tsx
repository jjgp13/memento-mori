import { useEffect, useState, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { RichText } from '@/components/rich-text';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { s as plain } from '@/i18n/rich';
import { HABIT_KEYS, ageAt, hazardMultiplier, survival, type ModelInput } from '@/lib/model';
import { yearsOfHours } from '@/lib/time-use';

/** What a stretch of the years ahead is: likely, on the phone, added by habits, or taken by them. */
type Kind = 'likely' | 'phone' | 'gain' | 'cost';
/** [from, to) in years from now. */
type Span = { from: number; to: number };
type Spans = Record<Kind, Span[]>;

const COLS = 15;
const MAX_CELL = 20;
/** How faint a year taken by a habit ends up: its ring stays, its fill nearly goes. */
const FADED = 0.12;
/** Below this, an answer doesn't move the calendar enough to talk about. */
const NEUTRAL_YEARS = 0.1;

/** Arc of a circle from fraction f0 to f1, clockwise from 12 o'clock (a full ring when it covers it all). */
function arc(cx: number, cy: number, r: number, f0: number, f1: number) {
  if (f1 - f0 >= 0.9999) return `M${cx - r},${cy}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
  const at = (f: number) => {
    const a = -Math.PI / 2 + Math.PI * 2 * f;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  };
  return `M${cx},${cy}L${at(f0)}A${r},${r} 0 ${f1 - f0 > 0.5 ? 1 : 0},1 ${at(f1)}Z`;
}

/** One path for every circle (or part of one) these spans cover, a circle a year. */
function spansPath(spans: Span[], cell: number, r: number) {
  let d = '';
  for (const { from, to } of spans) {
    for (let k = Math.floor(from); k < to; k++) {
      const f0 = Math.max(from, k) - k;
      const f1 = Math.min(to, k + 1) - k;
      if (f1 - f0 < 0.02) continue;
      d += arc((k % COLS) * cell + cell / 2, Math.floor(k / COLS) * cell + cell / 2, r, f0, f1);
    }
  }
  return d;
}

/** The parts of `a` not in `b`, and the parts in both. */
function split(a: Span[], b: Span[]) {
  const fresh: Span[] = [];
  const kept: Span[] = [];
  for (const x of a) {
    let pieces = [x];
    for (const y of b) {
      const from = Math.max(x.from, y.from);
      const to = Math.min(x.to, y.to);
      if (to > from) kept.push({ from, to });
      pieces = pieces.flatMap((p) =>
        [
          { from: p.from, to: Math.min(p.to, y.from) },
          { from: Math.max(p.from, y.to), to: p.to },
        ].filter((q) => q.to - q.from > 1e-6),
      );
    }
    fresh.push(...pieces);
  }
  return { fresh, kept };
}

/**
 * Where the years ahead stand against the average for their age, sex and country (habits ×1). Each answered
 * habit's effect is taken in turn (exact, since they add up to the total), so gains and costs can both show:
 * likely years, then the years habits add, then the faded years habits cost. Unanswered habits count as ×1.
 */
function layout(me: ModelInput, now: number, phoneHours?: number) {
  const age = ageAt(me.dob, now);
  const left = (p: Partial<ModelInput>) =>
    survival(me.sex, age, hazardMultiplier({ ...me, ...p } as ModelInput), me.country).med - age;
  const none = Object.fromEntries(HABIT_KEYS.map((k) => [k, undefined])) as Partial<ModelInput>;
  const base = left({ ...none, steps: undefined });

  let gain = 0;
  let cost = 0;
  let prev = base;
  const so: Partial<ModelInput> = { ...none, steps: undefined };
  for (const k of HABIT_KEYS) {
    // Daily steps, when known, stand in for the exercise answer.
    if (me[k] == null && !(k === 'exercise' && me.steps)) continue;
    Object.assign(so, k === 'exercise' ? { exercise: me.exercise, steps: me.steps } : { [k]: me[k] });
    const next = left(so);
    if (next > prev) gain += next - prev;
    else cost += prev - next;
    prev = next;
  }
  const mine = base + gain - cost;
  const plainEnd = Math.max(0, base - cost);
  const phone = phoneHours ? Math.min(plainEnd, yearsOfHours(phoneHours, mine)) : 0;
  const spans: Spans = {
    likely: [{ from: 0, to: plainEnd - phone }],
    phone: phone ? [{ from: plainEnd - phone, to: plainEnd }] : [],
    gain: gain > 0 ? [{ from: plainEnd, to: plainEnd + gain }] : [],
    cost: cost > 0 ? [{ from: mine, to: mine + cost }] : [],
  };
  return { spans, base, mine, total: base + gain };
}

const spansKey = (s: Spans) =>
  (Object.keys(s) as Kind[]).map((k) => `${k}:${s[k].map((x) => `${x.from.toFixed(3)}-${x.to.toFixed(3)}`).join(',')}`).join('|');

/**
 * The years likely ahead, a circle each, live while the habit questions are answered: an answer that adds time
 * versus the average brings new circles in at the end (green); one that costs time fades circles to empty rings.
 * Phone time, on its question, tints the end of the likely years. Under Reduce Motion it just updates.
 * Never a digit while "Hide numbers" is on.
 */
export function HabitCalendar({ me, phoneHours, hide }: { me: ModelInput; phoneHours?: number; hide: boolean }) {
  const theme = useTheme();
  const t = useT();
  const c = t.onboarding.calendar;
  const reduced = useReducedMotion();
  const [now] = useState(() => Date.now());
  const [width, setWidth] = useState(0);
  const { spans, base, mine, total } = layout(me, now, phoneHours);

  // What changed since the last answer: only that animates.
  const key = spansKey(spans);
  const [shown, setShown] = useState({ key, spans });
  const [before, setBefore] = useState(spans);
  if (shown.key !== key) {
    setBefore(shown.spans);
    setShown({ key, spans });
  }
  const gain = split(spans.gain, before.gain);
  const cost = split(spans.cost, before.cost);

  const cell = width ? Math.min(MAX_CELL, Math.floor(width / COLS)) : 0;
  const r = Math.max(2, cell / 2 - Math.max(1, cell * 0.14));
  const stroke = Math.max(0.8, r * 0.14);
  const count = Math.ceil(total);
  const w = cell * COLS;
  const h = Math.ceil(count / COLS) * cell;
  const all = spansPath([{ from: 0, to: count }], cell, r);
  const path = (x: Span[]) => spansPath(x, cell, r);

  const net = mine - base;
  const status =
    Math.abs(net) < NEUTRAL_YEARS
      ? [plain(hide ? t.gentle.calendar.same : c.same)]
      : hide
        ? [plain(t.gentle.calendar.effect(net > 0))]
        : c.effect(net > 0, dec1(Math.abs(net)));
  const a11y = hide ? t.gentle.calendar.a11y : c.a11y(fmt(mine), fmt(base));

  const legend: { kind: Kind; color: string; faded?: boolean }[] = [
    { kind: 'likely', color: theme.remain },
    ...(spans.phone.length ? [{ kind: 'phone' as const, color: theme.screen }] : []),
    ...(spans.gain.length ? [{ kind: 'gain' as const, color: theme.leverMove }] : []),
    ...(spans.cost.length ? [{ kind: 'cost' as const, color: theme.remain, faded: true }] : []),
  ];

  return (
    <View style={styles.wrap}>
      <ThemedText type="eyebrow" themeColor="muted">
        {c.title}
      </ThemedText>
      <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} accessible accessibilityRole="image" accessibilityLabel={a11y}>
        {cell ? (
          <View style={{ width: w, height: h }}>
            <Svg width={w} height={h}>
              <Path d={all} fill="none" stroke={theme.remain} strokeWidth={stroke} />
              <Path d={path(spans.likely)} fill={theme.remain} />
              <Path d={path(spans.phone)} fill={theme.screen} />
              <Path d={path(gain.kept)} fill={theme.leverMove} />
              <Path d={path(cost.kept)} fill={theme.remain} fillOpacity={FADED} />
            </Svg>
            {gain.fresh.length ? (
              <Animated.View
                key={`g${key}`}
                entering={reduced ? undefined : FadeIn.delay(150).duration(800)}
                style={StyleSheet.absoluteFill}
                pointerEvents="none">
                <Svg width={w} height={h}>
                  <Path d={path(gain.fresh)} fill={theme.leverMove} />
                </Svg>
              </Animated.View>
            ) : null}
            {cost.fresh.length ? (
              <Fading key={`c${key}`} reduced={reduced}>
                <Svg width={w} height={h}>
                  <Path d={path(cost.fresh)} fill={theme.remain} />
                </Svg>
              </Fading>
            ) : null}
          </View>
        ) : null}
      </View>
      <View style={styles.legend} accessible={false} importantForAccessibility="no-hide-descendants">
        {legend.map((l) => (
          <View key={l.kind} style={styles.item}>
            <View
              style={[
                styles.dot,
                l.faded ? { borderColor: l.color, borderWidth: 1 } : { backgroundColor: l.color },
              ]}
            />
            <ThemedText type="small">{c.legend[l.kind]}</ThemedText>
          </View>
        ))}
      </View>
      <RichText parts={status} />
    </View>
  );
}

/** Years an answer just took: drawn as they were, then fading to empty rings (at once under Reduce Motion). */
function Fading({ reduced, children }: PropsWithChildren<{ reduced: boolean }>) {
  const opacity = useSharedValue(reduced ? FADED : 1);
  useEffect(() => {
    if (!reduced) opacity.set(withDelay(250, withTiming(FADED, { duration: 1100 })));
  }, [reduced, opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.get() }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    rowGap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});
