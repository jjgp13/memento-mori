import { useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { richText, type CellState, type GridView } from '@/lib/life-views';

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

/** Circles: lived, now (fills like a pie), likely ahead, and "if fortune allows". */
export function LifeGrid({ view }: { view: GridView }) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);

  const W = Math.min(width, 560);
  const cell = W > 120 ? Math.floor((W - view.labelW) / view.cols) : 0;
  const rows = Math.ceil(view.count / view.cols);
  const r = Math.max(1.4, cell / 2 - Math.max(0.8, cell * 0.12));
  const small = r < 3.2;

  const paths: Record<Exclude<CellState, 'none' | 'now'>, string[]> = { lived: [], likely: [], maybe: [] };
  const labels: { x: number; y: number; text: string; onLived: boolean }[] = [];
  let nowCell: { cx: number; cy: number } | null = null;

  if (cell) {
    for (let i = 0; i < view.count; i++) {
      const st = view.state(i);
      if (st === 'none') continue;
      const cx = view.labelW + (i % view.cols) * cell + cell / 2;
      const cy = Math.floor(i / view.cols) * cell + cell / 2;
      if (st === 'now') nowCell = { cx, cy };
      else paths[st].push(ring(cx, cy, r));
      const text = view.label && r >= 11 && st !== 'now' ? view.label(i) : '';
      if (text) labels.push({ x: cx, y: cy, text, onLived: st === 'lived' });
    }
  }

  const stroke = Math.max(1, r * 0.12);
  const dash = Math.max(1.5, r * 0.3);
  const rowFont = Math.min(11, Math.max(8, cell * 0.9));

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="image"
      accessibilityLabel={richText(view.caption)}>
      {cell ? (
        <Svg width={view.labelW + cell * view.cols} height={rows * cell} style={{ alignSelf: 'center' }}>
          <Path d={paths.lived.join('')} fill={theme.lived} />
          {small ? (
            <>
              <Path d={paths.likely.join('')} fill={theme.remain} />
              <Path d={paths.maybe.join('')} fill={theme.maybe} />
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
      ) : null}
    </View>
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
