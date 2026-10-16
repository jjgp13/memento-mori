import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
const daysIn = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

type View3 = 'year' | 'month' | 'day';

/** Birth-date picker from the prototype: year → month → day, one view at a time. */
export function DatePicker({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const theme = useTheme();
  const t = useT();
  const [init] = useState(() => (value ? value.split('-').map(Number) : null));
  const [y, setY] = useState<number | null>(init ? init[0] : null);
  const [m, setM] = useState<number | null>(init ? init[1] - 1 : null);
  const [d, setD] = useState<number | null>(init ? init[2] : null);
  const [view, setView] = useState<View3>(init ? 'day' : 'year');
  const yearsRef = useRef<ScrollView>(null);

  const commit = (ny: number | null, nm: number | null, nd: number | null) => {
    onChange(ny != null && nm != null && nd != null ? iso(ny, nm, nd) : '');
  };
  const pickYear = (k: number) => {
    const nd = d != null && m != null && d > daysIn(k, m) ? null : d;
    setY(k);
    setD(nd);
    setView('month');
    commit(k, m, nd);
  };
  const pickMonth = (k: number) => {
    const nd = d != null && y != null && d > daysIn(y, k) ? null : d;
    setM(k);
    setD(nd);
    setView('day');
    commit(y, k, nd);
  };
  const pickDay = (k: number) => {
    setD(k);
    commit(y, m, k);
  };

  const thisYear = new Date().getFullYear();
  const maxYear = thisYear - 13;
  const minYear = thisYear - 100;
  const target = y ?? 1990;

  let body;
  if (view === 'year') {
    const items = [];
    for (let dec = Math.floor(minYear / 10) * 10; dec <= maxYear; dec += 10) {
      items.push(
        <Text key={`d${dec}`} style={[styles.decade, { color: theme.muted }]}>
          {t.date.decade(dec)}
        </Text>,
      );
      for (let k = Math.max(dec, minYear); k < Math.min(dec + 10, maxYear + 1); k++) {
        items.push(
          <View
            key={k}
            style={{ width: '25%' }}
            onLayout={k === target ? (e) => yearsRef.current?.scrollTo({ y: e.nativeEvent.layout.y - 90, animated: false }) : undefined}>
            <Cell label={String(k)} on={k === y} onPress={() => pickYear(k)} width="100%" />
          </View>,
        );
      }
    }
    body = (
      <ScrollView ref={yearsRef} style={styles.years} nestedScrollEnabled contentContainerStyle={styles.wrap}>
        {items}
      </ScrollView>
    );
  } else if (view === 'month') {
    body = (
      <View style={styles.wrap}>
        {t.date.monthsShort.map((name, i) => (
          <Cell key={i} label={name} on={i === m} onPress={() => pickMonth(i)} width="33.333%" />
        ))}
      </View>
    );
  } else if (y != null && m != null) {
    const first = new Date(y, m, 1).getDay();
    body = (
      <View style={styles.wrap}>
        {t.date.weekdayInitials.map((c, i) => (
          <Text key={`w${i}`} style={[styles.weekday, { color: theme.muted }]}>
            {c}
          </Text>
        ))}
        {Array.from({ length: first }, (_, i) => (
          <View key={`b${i}`} style={{ width: '14.285%' }} />
        ))}
        {Array.from({ length: daysIn(y, m) }, (_, i) => (
          <Cell key={i} label={String(i + 1)} on={i + 1 === d} onPress={() => pickDay(i + 1)} width="14.285%" round />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.box, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.head}>
        <Head label={y != null ? String(y) : t.date.year} current={view === 'year'} onPress={() => setView('year')} />
        <Head
          label={m != null ? t.date.months[m] : t.date.month}
          current={view === 'month'}
          disabled={y == null}
          onPress={() => setView('month')}
        />
        <Head
          label={d != null ? String(d) : t.date.day}
          current={view === 'day'}
          disabled={m == null}
          onPress={() => setView('day')}
        />
      </View>
      <Animated.View key={view} entering={FadeIn.duration(300)}>
        {body}
      </Animated.View>
    </View>
  );
}

type CellProps = { label: string; on: boolean; onPress: () => void; width: `${number}%`; round?: boolean };

function Cell({ label, on, onPress, width, round }: CellProps) {
  const theme = useTheme();
  return (
    <View style={{ width, padding: 3 }}>
      <Pressable
        accessibilityRole="button"
        aria-selected={on}
        onPress={onPress}
        style={[styles.cell, round && styles.round, on && { backgroundColor: theme.fg }]}>
        <Text style={[styles.cellText, { color: on ? theme.bg : theme.fg }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

function Head({ label, current, disabled, onPress }: { label: string; current: boolean; disabled?: boolean; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      aria-selected={current}
      aria-disabled={!!disabled}
      disabled={disabled}
      onPress={onPress}
      style={[styles.headBtn, { borderColor: current ? theme.accent : theme.line }, disabled && styles.disabled]}>
      <Text style={[styles.headText, { color: current ? theme.accent : theme.fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 14,
    gap: 12,
  },
  head: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  headBtn: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  headText: {
    fontFamily: Fonts.mono,
    fontSize: 15,
  },
  disabled: {
    opacity: 0.4,
  },
  years: {
    maxHeight: 260,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  decade: {
    width: '100%',
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1.3,
    paddingTop: 8,
    paddingBottom: 2,
    paddingHorizontal: 3,
  },
  weekday: {
    width: '14.285%',
    textAlign: 'center',
    fontFamily: Fonts.mono,
    fontSize: 11,
    paddingVertical: 4,
  },
  cell: {
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
  },
  round: {
    borderRadius: 99,
    paddingVertical: 8,
  },
  cellText: {
    fontFamily: Fonts.mono,
    fontSize: 15,
    fontVariant: ['tabular-nums'],
  },
});
