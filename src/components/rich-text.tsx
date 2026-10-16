import { StyleSheet, type TextStyle, type StyleProp } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import type { Rich } from '@/i18n/rich';

/** Body text whose **strong** runs are set in bronze monospace, like the prototype's <b>. */
export function RichText({ parts, style, type }: { parts: Rich; style?: StyleProp<TextStyle>; type?: ThemedTextProps['type'] }) {
  return (
    <ThemedText type={type} style={style}>
      {parts.map((p, i) =>
        p.strong ? (
          <ThemedText key={i} type={type} themeColor="accent" style={[style, styles.strong]}>
            {p.text}
          </ThemedText>
        ) : (
          p.text
        ),
      )}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  strong: {
    fontFamily: Fonts.monoMedium,
    fontVariant: ['tabular-nums'],
  },
});
