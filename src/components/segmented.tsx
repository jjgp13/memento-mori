import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props<K extends string> = {
  options: { key: K; label: string }[];
  value: K;
  onChange: (key: K) => void;
  accessibilityLabel: string;
};

const ease = Easing.bezier(0.2, 0.7, 0.2, 1);

/** Pill-shaped tabs with a sliding selection, as in the prototype's zoom control. */
export function Segmented<K extends string>({ options, value, onChange, accessibilityLabel }: Props<K>) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const index = Math.max(0, options.findIndex((o) => o.key === value));
  // Inside the 1px border and 3px padding.
  const segment = (width - 8) / options.length;
  const x = useSharedValue(0);
  const placed = useRef(false);

  useEffect(() => {
    if (!width) return;
    const to = index * segment;
    // Jump into place on first layout; slide on later changes.
    x.set(placed.current ? withTiming(to, { duration: 400, easing: ease }) : to);
    placed.current = true;
  }, [index, segment, width, x]);

  const pillStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.get() }] }));

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={[styles.track, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      {width ? <Animated.View style={[styles.pill, { width: segment, backgroundColor: theme.fg }, pillStyle]} /> : null}
      {options.map((o) => {
        const on = o.key === value;
        return (
          <Pressable
            key={o.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.key)}
            style={styles.button}>
            <Text style={[styles.label, { color: on ? theme.bg : theme.muted }]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: Radius.pill,
    padding: 3,
  },
  pill: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 3,
    borderRadius: Radius.pill,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 12.5,
  },
});
