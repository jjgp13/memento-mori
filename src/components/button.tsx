import { ActivityIndicator, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: 'solid' | 'ghost' | 'link';
  loading?: boolean;
};

export function Button({ title, variant = 'solid', loading, disabled, style, ...rest }: ButtonProps) {
  const theme = useTheme();
  const solid = variant === 'solid';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      disabled={isDisabled}
      style={(state) => [
        styles.base,
        solid && { backgroundColor: theme.fg },
        variant === 'ghost' && { borderWidth: 1, borderColor: theme.line },
        variant === 'link' && styles.link,
        isDisabled && styles.disabled,
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={solid ? theme.bg : theme.fg} />
      ) : (
        <Text style={[styles.label, { color: solid ? theme.bg : variant === 'link' ? theme.muted : theme.fg }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: Radius.pill,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    minHeight: 36,
    paddingHorizontal: 4,
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 14,
    letterSpacing: 0.7,
  },
  disabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.7,
  },
});
