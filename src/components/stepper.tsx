import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

/** − value + with bounds; `format` turns the number into its label (e.g. "4.5 h"). */
export function Stepper({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 99,
  format = String,
  accessibilityLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  format?: (v: number) => string;
  accessibilityLabel: string;
}) {
  const theme = useTheme();
  const t = useT();
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ text: format(value) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => onChange(clamp(value + (e.nativeEvent.actionName === 'increment' ? step : -step)))}
      style={[styles.box, { borderColor: theme.line, backgroundColor: theme.surface }]}>
      <Pressable accessibilityLabel={t.common.less} onPress={() => onChange(clamp(value - step))} style={styles.btn} disabled={value <= min}>
        <Text style={[styles.sign, { color: value <= min ? theme.line : theme.muted }]}>−</Text>
      </Pressable>
      <Text style={[styles.value, { color: theme.fg }]}>{format(value)}</Text>
      <Pressable accessibilityLabel={t.common.more} onPress={() => onChange(clamp(value + step))} style={styles.btn} disabled={value >= max}>
        <Text style={[styles.sign, { color: value >= max ? theme.line : theme.muted }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  sign: {
    fontFamily: Fonts.mono,
    fontSize: 22,
  },
  value: {
    fontFamily: Fonts.monoMedium,
    fontSize: 22,
    minWidth: 76,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
});
