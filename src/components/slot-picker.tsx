import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Stepper } from '@/components/stepper';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { WEEKDAYS, timeLabel, type Slot } from '@/lib/reminders';

/** Day of the week as seven chips, then the time in half hours (6:00–22:00). */
export function SlotPicker({ value, onChange, label }: { value: Slot; onChange: (s: Slot) => void; label: string }) {
  const theme = useTheme();
  const minutes = value.hour * 60 + value.minute;

  return (
    <View style={styles.wrap}>
      <View accessibilityRole="radiogroup" accessibilityLabel={`${label}: day`} style={styles.days}>
        {WEEKDAYS.map((d, i) => {
          const on = i === value.weekday;
          return (
            <Pressable
              key={d}
              accessibilityRole="radio"
              accessibilityLabel={d}
              aria-checked={on}
              onPress={() => onChange({ ...value, weekday: i })}
              style={[
                styles.day,
                { backgroundColor: on ? theme.fg : theme.surface, borderColor: on ? theme.fg : theme.line },
              ]}>
              <Text style={[styles.dayText, { color: on ? theme.bg : theme.muted }]}>{d.slice(0, 2)}</Text>
            </Pressable>
          );
        })}
      </View>
      <Stepper
        value={minutes}
        onChange={(m) => onChange({ ...value, hour: Math.floor(m / 60), minute: m % 60 })}
        step={30}
        min={6 * 60}
        max={22 * 60}
        format={(m) => timeLabel({ hour: Math.floor(m / 60), minute: m % 60 })}
        accessibilityLabel={`${label}: time`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  days: {
    flexDirection: 'row',
    gap: 6,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: Radius.pill,
  },
  dayText: {
    fontFamily: Fonts.mono,
    fontSize: 12.5,
  },
});
