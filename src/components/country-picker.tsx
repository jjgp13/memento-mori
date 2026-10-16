import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { countryName, searchCountries } from '@/lib/country';

/** The chosen country, and a search box to change it. */
export function CountryPicker({ value, onChange }: { value: string | undefined; onChange: (code: string) => void }) {
  const theme = useTheme();
  const t = useT();
  const o = t.onboarding;
  const [query, setQuery] = useState('');
  const results = searchCountries(query);
  const name = countryName(value);

  const row = (code: string, label: string, on: boolean) => (
    <Pressable
      key={code}
      accessibilityRole="radio"
      aria-checked={on}
      onPress={() => {
        onChange(code);
        setQuery('');
      }}
      style={[
        styles.choice,
        { backgroundColor: on ? theme.accentSoft : theme.surface, borderColor: on ? theme.accent : theme.line },
      ]}>
      <ThemedText style={styles.flex}>{label}</ThemedText>
      {on ? <View style={[styles.dot, { backgroundColor: theme.accent }]} /> : null}
    </Pressable>
  );

  return (
    <View style={styles.list}>
      {value && name && !query ? <View accessibilityRole="radiogroup">{row(value, name, true)}</View> : null}
      <TextField
        accessibilityLabel={o.countrySearch}
        placeholder={name ? o.countrySearchAgain : o.countrySearch}
        autoCorrect={false}
        autoComplete="country"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => results[0] && (onChange(results[0].code), setQuery(''))}
        returnKeyType="done"
      />
      {query ? (
        <View accessibilityRole="radiogroup" style={styles.list}>
          {results.length ? (
            results.map((c) => row(c.code, countryName(c.code) ?? c.name, c.code === value))
          ) : (
            <ThemedText type="small">{o.countryNone}</ThemedText>
          )}
        </View>
      ) : null}
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
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  flex: {
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
