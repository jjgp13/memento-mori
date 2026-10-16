import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { LANGUAGES, setLanguage, useLang, useT } from '@/i18n';

/** Each language named in itself, so anyone can find theirs. Picking one keeps it on this device. */
export function LanguagePicker() {
  const theme = useTheme();
  const t = useT();
  const current = useLang();

  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={t.language.a11y} style={styles.chips}>
      {LANGUAGES.map((l) => {
        const on = l.code === current;
        return (
          <Pressable
            key={l.code}
            accessibilityRole="radio"
            aria-checked={on}
            onPress={() => setLanguage(l.code)}
            style={[
              styles.chip,
              { backgroundColor: on ? theme.accentSoft : theme.surface, borderColor: on ? theme.accent : theme.line },
            ]}>
            <ThemedText type="small" themeColor="fg">
              {l.name}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});
