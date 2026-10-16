import { useEffect, useState, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { richText } from '@/i18n/rich';
import type { CellState, GridView } from '@/lib/life-views';

/** SVG path for a full circle; many of these joined make one path per state, so 5,000 weeks stay cheap. */
const ring = (cx: number, cy: number, r: number) =>
  `M${cx - r},${cy}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

/** Pie wedge from 12 o'clock, clockwise, covering `f` of the circle. */
function wedge(cx: number, cy: number, r: number, f: number) {
  if (f >= 0.9999) return ring(cx, cy, r);
  const a = -Math.PI / 2 + Math.PI * 2 * f;
  const large = f > 0.5 ? 1 : 0;
  return `M${cx},${cy}L${cx},${cy - r}A${r},${r} 0 ${large},1 ${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}Z`;
}

/** Layer cells sit on top of a plain calendar: a phone week is a likely week, a reach year a "maybe" one. */
const UNDER: Partial<Record<CellState, 'likely' | 'maybe'>> = { sleep: 'likely', phone: 'likely', reach: 'maybe' };
type Base = 'lived' | 'likely' | 'maybe';
type Layer = 'reach' | 'sleep' | 'phone';
const isLayer = (st: CellState): st is Layer => st === 'reach' || st === 'sleep' || st === 'phone';

/**
 * Circles: lived, now (fills like a pie), likely ahead, and "if fortune allows". Layers (within reach,
 * sleep, phone) are drawn on their own and fade in whenever they change, so a "what if" shows up live.
 */
export function LifeGrid({ view, reachColors = [] }: { view: GridView; reachColors?: string[] }) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);

  const W = Math.min(width, 560);
  const cell = W > 120 ? Math.floor((W - view.labelW) / view.cols) : 0;
  const rows = Math.ceil(view.count / view.cols);
  const r = Math.max(1.4, cell / 2 - Math.max(0.8, cell * 0.12));
  const small = view.dense || r < 3.2;

  const paths: Record<Base, string[]> = { lived: [], likely: [], maybe: [] };
  const layers: Record<Layer, string[]> = { reach: [], sleep: [], phone: [] };
  // One path per change being tried, so each shows in its own color.
  const reach: string[][] = reachColors.map(() => []);
  const labels: { x: number; y: number; text: string; onLived: boolean }[] = [];
  let nowCell: { cx: number; cy: number } | null = null;

  if (cell) {
    for (let i = 0; i < view.count; i++) {
      const st = view.state(i);
      if (st === 'none') continue;
      const cx = view.labelW + (i % view.cols) * cell + cell / 2;
      const cy = Math.floor(i / view.cols) * cell + cell / 2;
      if (st === 'now') nowCell = { cx, cy };
      else if (isLayer(st)) {
        if (st === 'reach' && reach.length) reach[Math.min(reach.length - 1, view.reachOf?.(i) ?? 0)].push(ring(cx, cy, r));
        else layers[st].push(ring(cx, cy, r));
        paths[UNDER[st]!].push(ring(cx, cy, r));
      } else paths[st].push(ring(cx, cy, r));
      const text = view.label && r >= 11 && st !== 'now' ? view.label(i) : '';
      if (text) labels.push({ x: cx, y: cy, text, onLived: st === 'lived' });
    }
  }

  const stroke = Math.max(1, r * 0.12);
  const dash = Math.max(1.5, r * 0.3);
  const rowFont = Math.min(11, Math.max(8, cell * 0.9));

  const w = view.labelW + cell * view.cols;
  const h = rows * cell;
  // Changes whenever a layer grows or shrinks, so the new layer fades in.
  const layerKey = `${reach.map((p) => p.length).join('.')}-${layers.reach.length}-${layers.sleep.length}-${layers.phone.length}-${cell}`;

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="image"
      accessibilityLabel={richText(view.caption)}>
      {cell ? (
        <View style={{ width: w, height: h, alignSelf: 'center' }}>
          <Svg width={w} height={h}>
            <Path d={paths.lived.join('')} fill={theme.lived} />
            {small ? (
              <>
                <Path d={paths.likely.join('')} fill={theme.remain} />
                {/* Dashes don't fit a dot this small; a hollow ring still reads as "if fortune allows". */}
                <Path d={paths.maybe.join('')} fill="none" stroke={theme.remain} strokeWidth={Math.max(0.8, r * 0.32)} />
              </>
            ) : (
              <>
                <Path d={paths.likely.join('')} fill="none" stroke={theme.remain} strokeWidth={stroke} />
                <Path
                  d={paths.maybe.join('')}
                  fill="none"
                  stroke={theme.remain}
                  strokeWidth={stroke}
                  strokeDasharray={[dash, dash]}
                />
              </>
            )}
          </Svg>

          <Animated.View key={layerKey} entering={FadeIn.duration(900)} style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg width={w} height={h}>
              {small ? (
                <>
                  <Path d={layers.sleep.join('')} fill={theme.sleep} />
                  <Path d={layers.reach.join('')} fill={theme.accent} opacity={0.55} />
                  {reach.map((p, k) => (
                    <Path key={k} d={p.join('')} fill={reachColors[k]} />
                  ))}
                </>
              ) : (
                <>
                  <Path d={layers.sleep.join('')} fill={theme.sleep} stroke={theme.sleep} strokeWidth={stroke} />
                  <Path d={layers.reach.join('')} fill={theme.accentSoft} stroke={theme.accent} strokeWidth={stroke} />
                  {reach.map((p, k) => (
                    <Path key={k} d={p.join('')} fill={reachColors[k]} fillOpacity={0.45} stroke={reachColors[k]} strokeWidth={stroke} />
                  ))}
                </>
              )}
            </Svg>
          </Animated.View>

          {layers.phone.length ? (
            <Pulse trigger={layers.phone.length}>
              <Svg width={w} height={h}>
                <Path d={layers.phone.join('')} fill={theme.screen} stroke={small ? undefined : theme.screen} strokeWidth={stroke} />
              </Svg>
            </Pulse>
          ) : null}

          <Svg width={w} height={h} style={StyleSheet.absoluteFill} pointerEvents="none">
            {nowCell ? <NowCell {...nowCell} r={r} frac={view.frac} /> : null}

            {labels.map((l) => (
              <SvgText
                key={`${l.x},${l.y}`}
                x={l.x}
                y={l.y}
                dy={r * 0.22}
                fill={l.onLived ? theme.surface : theme.muted}
                fontFamily={Fonts.mono}
                fontSize={Math.round(r * 0.62)}
                textAnchor="middle">
                {l.text}
              </SvgText>
            ))}

            {view.rowLabel
              ? Array.from({ length: rows }, (_, row) => {
                  const text = view.rowLabel!(row);
                  return text ? (
                    <SvgText
                      key={`row${row}`}
                      x={0}
                      y={row * cell + cell / 2}
                      dy={rowFont * 0.35}
                      fill={theme.muted}
                      fontFamily={Fonts.mono}
                      fontSize={rowFont}>
                      {text}
                    </SvgText>
                  ) : null;
                })
              : null}
          </Svg>
        </View>
      ) : null}
    </View>
  );
}

/**
 * Phone time pulses three times when it appears or changes, then holds still: enough to catch the eye,
 * never a constant blink (distracting, and moving content must stop on its own; WCAG 2.2.2). Still under
 * Reduce Motion.
 */
function Pulse({ trigger, children }: PropsWithChildren<{ trigger: number }>) {
  const reduced = useReducedMotion();
  const opacity = useSharedValue(1);
  useEffect(() => {
    if (reduced) return;
    opacity.set(withRepeat(withSequence(withTiming(0.25, { duration: 450 }), withTiming(1, { duration: 450 })), 3));
  }, [trigger, reduced, opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.get() }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      {children}
    </Animated.View>
  );
}

function NowCell({ cx, cy, r, frac }: { cx: number; cy: number; r: number; frac: number }) {
  const theme = useTheme();
  const showPct = r >= 10;

  return (
    <>
      <Circle cx={cx} cy={cy} r={r} fill={theme.accentSoft} />
      {frac > 0 ? <Path d={wedge(cx, cy, r, frac)} fill={theme.accent} /> : null}
      <Circle cx={cx} cy={cy} r={r} fill="none" stroke={theme.accent} strokeWidth={Math.max(1, r * 0.18)} />
      {showPct ? (
        <>
          <Circle cx={cx} cy={cy} r={r * 0.62} fill={theme.surface} />
          <SvgText
            x={cx}
            y={cy}
            dy={r * 0.17}
            fill={theme.accent}
            fontFamily={Fonts.monoMedium}
            fontSize={Math.round(r * 0.48)}
            textAnchor="middle">
            {`${Math.floor(frac * 100)}%`}
          </SvgText>
        </>
      ) : null}
    </>
  );
}
