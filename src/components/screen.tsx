import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** A tab screen: brand bar with an account button, then a scrolling phone-width column. */
export function Screen({ children }: PropsWithChildren) {
  const theme = useTheme();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.bar}>
        <ThemedText style={styles.brand}>MEMENTO MORI</ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Account"
          onPress={() => router.push('/account')}
          style={[styles.icon, { borderColor: theme.line, backgroundColor: theme.surface }]}>
          <SymbolView name={{ ios: 'person', android: 'person', web: 'person' }} size={18} tintColor={theme.fg} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bar: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: 14,
    paddingBottom: 10,
  },
  brand: {
    fontFamily: Fonts.display,
    fontSize: 15,
    letterSpacing: 2.1,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: 120,
    gap: 22,
  },
});
