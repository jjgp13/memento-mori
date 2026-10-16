import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { LanguagePicker } from '@/components/language-picker';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { signOut } from '@/lib/auth';
import { clearProfile } from '@/lib/profile';
import { useAuth } from '@/providers/auth-provider';

/**
 * "You": the person's answers and data. The app is local-first, so there is no account to manage
 * unless they signed in earlier (guest sessions from the first test round).
 */
export default function YouScreen() {
  const theme = useTheme();
  const t = useT();
  const a = t.account;
  const { session } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteEverything() {
    setError(null);
    try {
      if (session) await signOut();
    } catch (e) {
      setError(e instanceof Error ? e.message : a.signOutFailed);
      return;
    }
    // With no answers left, the app guard sends them back to onboarding.
    clearProfile();
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <ThemedText type="eyebrow">{a.title}</ThemedText>
          <Button title={t.common.done} variant="link" onPress={() => router.back()} />
        </View>

        <Button
          title={a.edit}
          variant="ghost"
          onPress={() => router.push({ pathname: '/onboarding', params: { edit: '1' } })}
        />

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="heading">{a.dataHeading}</ThemedText>
          <ThemedText type="small" themeColor="fg">
            {a.dataBody}
          </ThemedText>
          {session ? <ThemedText type="small">{a.guestNote(!!session.user.is_anonymous)}</ThemedText> : null}
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="heading">{t.language.heading}</ThemedText>
          <LanguagePicker />
          <ThemedText type="small">{t.language.note}</ThemedText>
        </View>

        {confirming ? (
          <View style={styles.confirm}>
            <ThemedText type="small" themeColor="fg">
              {a.confirm}
            </ThemedText>
            <Button title={a.yesDelete} onPress={deleteEverything} style={{ backgroundColor: theme.danger }} />
            <Button title={a.keep} variant="link" onPress={() => setConfirming(false)} />
          </View>
        ) : (
          <Button title={a.deleteAll} variant="ghost" onPress={() => setConfirming(true)} />
        )}
        {error ? (
          <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
            {error}
          </ThemedText>
        ) : null}

        <ThemedText type="small">{a.disclaimer}</ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    padding: Spacing.three,
    gap: 18,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 8,
  },
  confirm: {
    gap: 10,
  },
});
