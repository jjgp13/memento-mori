import { StyleSheet, type TextStyle, type StyleProp } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import type { Rich } from '@/lib/life-views';

/** Body text whose **strong** runs are set in bronze monospace, like the prototype's <b>. */
export function RichText({ parts, style }: { parts: Rich; style?: StyleProp<TextStyle> }) {
  return (
    <ThemedText style={style}>
      {parts.map((p, i) =>
        p.strong ? (
          <ThemedText key={i} themeColor="accent" style={[style, styles.strong]}>
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
