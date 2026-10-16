import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { fmt } from '@/i18n/format';

export type BarPart = { key: string; label: string; value: number; color: string };

const ease = Easing.bezier(0.2, 0.7, 0.2, 1);

/**
 * The weeks ahead as one bar (awake and free, phone, sleep, within reach) that eases to new sizes as
 * someone tries a change, right next to the controls they're touching.
 */
export function TimeBar({ parts, unit }: { parts: BarPart[]; unit: string }) {
  const theme = useTheme();
  const total = parts.reduce((t, p) => t + p.value, 0) || 1;
  const shown = parts.filter((p) => p.value >= 0.5);

  return (
    <View style={styles.wrap} accessible accessibilityLabel={shown.map((p) => `${fmt(p.value)} ${unit} ${p.label}`).join(', ')}>
      <View style={[styles.bar, { backgroundColor: theme.maybe }]}>
        {parts.map((p) => (
          <Segment key={p.key} share={p.value / total} color={p.color} />
        ))}
      </View>
      <View style={styles.keys} importantForAccessibility="no-hide-descendants">
        {shown.map((p) => (
          <View key={p.key} style={styles.key}>
            <View style={[styles.swatch, { backgroundColor: p.color }]} />
            <ThemedText type="mono" themeColor="muted" style={styles.keyText}>
              {fmt(p.value)} {p.label}
            </ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

function Segment({ share, color }: { share: number; color: string }) {
  const width = useSharedValue(share * 100);
  useEffect(() => {
    width.set(withTiming(share * 100, { duration: 700, easing: ease }));
  }, [share, width]);
  const style = useAnimatedStyle(() => ({ width: `${width.get()}%` }));
  return <Animated.View style={[styles.segment, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  bar: {
    flexDirection: 'row',
    height: 14,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  keys: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 4,
  },
  key: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  swatch: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  keyText: {
    fontSize: 11.5,
  },
});
