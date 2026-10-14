import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'heading' | 'eyebrow' | 'small' | 'mono' | 'quote';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const defaultColor: ThemeColor =
    type === 'eyebrow' ? 'accent' : type === 'heading' || type === 'small' ? 'muted' : 'fg';

  return <Text style={[{ color: theme[themeColor ?? defaultColor] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Fonts.body,
    fontSize: 17,
    lineHeight: 25,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: Fonts.display,
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: 1.4,
  },
  heading: {
    fontFamily: Fonts.display,
    fontSize: 13,
    letterSpacing: 1.6,
  },
  eyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 11.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  small: {
    fontFamily: Fonts.body,
    fontSize: 14.5,
    lineHeight: 21,
  },
  mono: {
    fontFamily: Fonts.mono,
    fontSize: 13.5,
    fontVariant: ['tabular-nums'],
  },
  quote: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 22,
    lineHeight: 31,
  },
});
