import { useEffect, useState, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { RichText } from '@/components/rich-text';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { s as plain } from '@/i18n/rich';
import { HABIT_KEYS, ageAt, hazardMultiplier, healthEstimate, survival, type ModelInput } from '@/lib/model';
import { yearsOfHours } from '@/lib/time-use';

/** [from, to) in years of age. */
type Span = { from: number; to: number };

/** Two decades a row, like the Life screen's one decade a row but compact. */
const COLS = 20;
const MAX_CELL = 18;
/** How faint a year taken by a habit ends up: its ring stays, its fill nearly goes. */
const FADED = 0.12;
/** Below this, an answer doesn't move the calendar enough to talk about. */
const NEUTRAL_YEARS = 0.05;
/** The healthy band fades in a few steps, as on the Life calendar (components/life-grid.tsx). */
const HEALTH_STEPS = [1, 0.7, 0.45, 0.22];

/** Arc of a circle from fraction f0 to f1, clockwise from 12 o'clock (a full circle when it covers it all). */
function arc(cx: number, cy: number, r: number, f0: number, f1: number) {
  if (f1 - f0 >= 0.9999) return `M${cx - r},${cy}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
  const at = (f: number) => {
    const a = -Math.PI / 2 + Math.PI * 2 * f;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  };
  return `M${cx},${cy}L${at(f0)}A${r},${r} 0 ${f1 - f0 > 0.5 ? 1 : 0},1 ${at(f1)}Z`;
}

const center = (k: number, cell: number) => ({
  cx: (k % COLS) * cell + cell / 2,
  cy: Math.floor(k / COLS) * cell + cell / 2,
});

/** Each year (circle) these spans touch, and how much of it, from and to. */
function* cells(spans: Span[]) {
  for (const { from, to } of spans) {
    for (let k = Math.floor(from); k < to; k++) {
      const f0 = Math.max(from, k) - k;
      const f1 = Math.min(to, k + 1) - k;
      if (f1 - f0 >= 0.02) yield { k, f0, f1 };
    }
  }
}

/** One path for every circle (or part of one) these spans cover, a circle a year. */
function spansPath(spans: Span[], cell: number, r: number) {
  let d = '';
  for (const { k, f0, f1 } of cells(spans)) {
    const { cx, cy } = center(k, cell);
    d += arc(cx, cy, r, f0, f1);
  }
  return d;
}

/** A ring around every year these spans touch: what the last answer changed. */
function halosPath(spans: Span[], cell: number, r: number) {
  const done = new Set<number>();
  let d = '';
  for (const { k } of cells(spans)) {
    if (done.has(k)) continue;
    done.add(k);
    const { cx, cy } = center(k, cell);
    d += arc(cx, cy, r, 0, 1);
  }
  return d;
}

const clip = (spans: Span[], lo: number, hi: number) =>
  spans.flatMap((x) => {
    const from = Math.max(x.from, lo);
    const to = Math.min(x.to, hi);
    return to > from ? [{ from, to }] : [];
  });

/** The parts of `a` not in `b`, and the parts in both. */
function split(a: Span[], b: Span[]) {
  const fresh: Span[] = [];
  const kept: Span[] = [];
  for (const x of a) {
    let pieces = [x];
    for (const y of b) {
      kept.push(...clip([x], y.from, y.to));
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
 * The whole life against the average for their age, sex and country (habits ×1): years lived, then likely
 * years, then the years habits add, then the faded years habits cost. Each answered habit's effect is taken
 * in turn (exact, since they add up to the total), so gains and costs can both show. Unanswered habits count
 * as ×1. The healthy band (healthEstimate) fades over the likely years, moved by habits like the Life screen's.
 */
function layout(me: ModelInput, now: number, phoneHours?: number) {
  const age = ageAt(me.dob, now);
  const med = (p: Partial<ModelInput>) => survival(me.sex, age, hazardMultiplier({ ...me, ...p } as ModelInput), me.country).med;
  const none = Object.fromEntries(HABIT_KEYS.map((k) => [k, undefined])) as Partial<ModelInput>;
  const base = med({ ...none, steps: undefined });

  let gain = 0;
  let cost = 0;
  let prev = base;
  const so: Partial<ModelInput> = { ...none, steps: undefined };
  for (const k of HABIT_KEYS) {
    // Daily steps, when known, stand in for the exercise answer.
    if (me[k] == null && !(k === 'exercise' && me.steps)) continue;
    Object.assign(so, k === 'exercise' ? { exercise: me.exercise, steps: me.steps } : { [k]: me[k] });
    const next = med(so);
    if (next > prev) gain += next - prev;
    else cost += prev - next;
    prev = next;
  }
  const mine = base + gain - cost;
  const plainEnd = Math.max(age, base - cost);
  const phone = phoneHours ? Math.min(plainEnd - age, yearsOfHours(phoneHours, mine - age)) : 0;
  const likely = [{ from: age, to: plainEnd - phone }];

  // Healthy band: full before q25, fading to nothing at q75, in steps.
  const { q25, q75 } = healthEstimate(me, now).health;
  const at = (level: number) => q75 - level * Math.max(1e-6, q75 - q25);
  const healthy = HEALTH_STEPS.map((_, k) => {
    const hi = (HEALTH_STEPS[k] + (HEALTH_STEPS[k + 1] ?? 0)) / 2;
    const lo = k ? (HEALTH_STEPS[k - 1] + HEALTH_STEPS[k]) / 2 : Infinity;
    return clip(likely, k ? at(lo) : 0, at(hi));
  });

  return {
    age,
    base,
    mine,
    total: base + gain,
    lived: [{ from: 0, to: age }],
    likely,
    /** Likely years before habit gains, phone time included: what an answer can give back. */
    ahead: [{ from: age, to: plainEnd }],
    healthy,
    phone: phone ? [{ from: plainEnd - phone, to: plainEnd }] : [],
    gain: gain > 0 ? [{ from: plainEnd, to: plainEnd + gain }] : [],
    cost: cost > 0 ? [{ from: mine, to: mine + cost }] : [],
  };
}

/**
 * Their whole life, a circle a year, live while the habit questions are answered: years lived, likely years
 * ahead with the healthy, independent ones tinted green, years habits add (bronze) and years they cost (faded
 * rings). The years the last answer added or took stay ringed, with a line saying how many, until the next
 * answer. Phone time, on its question, tints the end of the likely years. Under Reduce Motion it just updates.
 * Never a digit while "Hide numbers" is on.
 */
export function HabitCalendar({ me, phoneHours, hide }: { me: ModelInput; phoneHours?: number; hide: boolean }) {
  const theme = useTheme();
  const t = useT();
  const c = t.onboarding.calendar;
  const g = t.gentle.calendar;
  const reduced = useReducedMotion();
  const [now] = useState(() => Date.now());
  const [width, setWidth] = useState(0);
  const view = layout(me, now, phoneHours);

  // The last answer: what it changed stays highlighted until the next one.
  const sig = [...HABIT_KEYS.map((k) => me[k] ?? '-'), me.steps ?? '-'].join(',');
  const snap = { sig, ahead: view.ahead, gain: view.gain, cost: view.cost, mine: view.mine };
  const [shown, setShown] = useState(snap);
  const [before, setBefore] = useState(snap);
  if (shown.sig !== sig) {
    setBefore(shown);
    setShown(snap);
  }
  const answered = before.sig !== sig;
  const gain = split(view.gain, answered ? before.gain : view.gain);
  const cost = split(view.cost, answered ? before.cost : view.cost);
  const delta = answered ? view.mine - before.mine : 0;

  const cell = width ? Math.min(MAX_CELL, Math.floor(width / COLS)) : 0;
  const r = Math.max(2, cell / 2 - Math.max(1, cell * 0.14));
  const stroke = Math.max(0.8, r * 0.14);
  const count = Math.ceil(view.total);
  const w = cell * COLS;
  const h = Math.ceil(count / COLS) * cell;
  const path = (x: Span[]) => spansPath(x, cell, r);
  // Years the last answer gave back (no longer taken) are ringed too.
  const back = answered ? split(view.ahead, before.ahead).fresh : [];
  const fresh = [...gain.fresh, ...cost.fresh, ...back];

  const net = view.mine - view.base;
  const status =
    Math.abs(net) < NEUTRAL_YEARS
      ? [plain(hide ? g.same : c.same)]
      : hide
        ? [plain(g.effect(net > 0))]
        : c.effect(net > 0, dec1(Math.abs(net)));
  const last = !answered
    ? null
    : Math.abs(delta) < NEUTRAL_YEARS
      ? [plain(hide ? g.lastSame : c.lastSame)]
      : hide
        ? [plain(g.last(delta > 0))]
        : c.last(delta > 0, dec1(Math.abs(delta)));
  const a11y = hide ? g.a11y : c.a11y(fmt(view.mine - view.age), fmt(view.base - view.age));

  const legend: {
    key: keyof typeof c.legend;
    fill?: string;
    ring?: string;
    opacity?: number;
  }[] = [
    { key: 'lived', fill: theme.lived },
    { key: 'likely', fill: theme.remain },
    ...(view.healthy.some((x) => x.length) ? [{ key: 'healthy' as const, fill: theme.healthy }] : []),
    ...(view.phone.length ? [{ key: 'phone' as const, fill: theme.screen }] : []),
    ...(view.gain.length ? [{ key: 'gain' as const, fill: theme.accent }] : []),
    ...(view.cost.length ? [{ key: 'cost' as const, ring: theme.remain }] : []),
    ...(fresh.length ? [{ key: 'last' as const, ring: theme.fg }] : []),
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
              <Path d={path([{ from: 0, to: count }])} fill="none" stroke={theme.remain} strokeWidth={stroke} />
              <Path d={path(view.lived)} fill={theme.lived} />
              <Path d={path(view.likely)} fill={theme.remain} />
              {view.healthy.map((x, k) => (
                <Path key={k} d={path(x)} fill={theme.healthy} fillOpacity={HEALTH_STEPS[k]} />
              ))}
              <Path d={path(view.phone)} fill={theme.screen} />
              <Path d={path(gain.kept)} fill={theme.accent} />
              <Path d={path(cost.kept)} fill={theme.remain} fillOpacity={FADED} />
            </Svg>
            {gain.fresh.length ? (
              <Animated.View
                key={`g${sig}`}
                entering={reduced ? undefined : FadeIn.delay(150).duration(800)}
                style={StyleSheet.absoluteFill}
                pointerEvents="none">
                <Svg width={w} height={h}>
                  <Path d={path(gain.fresh)} fill={theme.accent} />
                </Svg>
              </Animated.View>
            ) : null}
            {cost.fresh.length ? (
              <Fading key={`c${sig}`} reduced={reduced}>
                <Svg width={w} height={h}>
                  <Path d={path(cost.fresh)} fill={theme.remain} />
                </Svg>
              </Fading>
            ) : null}
            {fresh.length ? (
              <Animated.View
                key={`h${sig}`}
                entering={reduced ? undefined : FadeIn.delay(400).duration(600)}
                style={StyleSheet.absoluteFill}
                pointerEvents="none">
                <Svg width={w} height={h}>
                  <Path
                    d={halosPath(fresh, cell, Math.min(cell / 2 - 0.5, r + Math.max(1.2, stroke * 1.6)))}
                    fill="none"
                    stroke={theme.fg}
                    strokeWidth={Math.max(1.2, stroke * 1.4)}
                  />
                </Svg>
              </Animated.View>
            ) : null}
          </View>
        ) : null}
      </View>
      <View style={styles.legend} accessible={false} importantForAccessibility="no-hide-descendants">
        {legend.map((l) => (
          <View key={l.key} style={styles.item}>
            <View style={[styles.dot, l.fill ? { backgroundColor: l.fill } : { borderColor: l.ring, borderWidth: 1.5 }]} />
            <ThemedText type="small">{c.legend[l.key]}</ThemedText>
          </View>
        ))}
      </View>
      <RichText parts={status} />
      {last ? <RichText type="small" parts={last} /> : null}
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
    columnGap: 12,
    rowGap: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});
