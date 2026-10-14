import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

/** A stacked single-choice list, like the prototype's onboarding answers. */
export function Choices<V extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: V; label: string }[];
  value: V | undefined;
  onChange: (v: V) => void;
}) {
  const theme = useTheme();

  return (
    <View accessibilityRole="radiogroup" style={styles.list}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            onPress={() => onChange(o.value)}
            style={[
              styles.choice,
              { backgroundColor: on ? theme.accentSoft : theme.surface, borderColor: on ? theme.accent : theme.line },
            ]}>
            <ThemedText>{o.label}</ThemedText>
            {on ? <View style={[styles.dot, { backgroundColor: theme.accent }]} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  choice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
