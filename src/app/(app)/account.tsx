import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ScreenLink, SupportLine } from '@/components/disclaimer';
import { LanguagePicker } from '@/components/language-picker';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { signOut } from '@/lib/auth';
import { dataExport } from '@/lib/data-export';
import { clearPrefs } from '@/lib/prefs';
import { clearProfile } from '@/lib/profile';
import { shareFile } from '@/lib/share-file';
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
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState<{ ok: boolean; name: string } | null>(null);

  async function downloadData() {
    setExporting(true);
    setExported(null);
    const { name, content, type } = dataExport(a.exportAbout);
    let ok = false;
    try {
      ok = await shareFile(name, content, type, a.exportButton);
    } catch {
      // Falls through to the "could not" line.
    }
    setExported({ ok, name });
    setExporting(false);
  }

  async function deleteEverything() {
    setError(null);
    try {
      if (session) await signOut();
    } catch (e) {
      setError(e instanceof Error ? e.message : a.signOutFailed);
      return;
    }
    // With no answers left, the app guard sends them back to onboarding.
    clearPrefs();
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
          <ThemedText type="small">{a.exportNote}</ThemedText>
          <Button title={a.exportButton} variant="ghost" loading={exporting} onPress={downloadData} />
          {exported ? (
            <ThemedText
              type="small"
              themeColor={exported.ok ? 'fg' : 'danger'}
              accessibilityLiveRegion="polite">
              {exported.ok ? a.exportDone(exported.name) : a.exportFailed}
            </ThemedText>
          ) : null}
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

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="heading">{t.methods.accountHeading}</ThemedText>
          <ThemedText type="small" themeColor="fg">
            {a.disclaimer}
          </ThemedText>
          <View style={styles.links}>
            <ScreenLink href="/how-it-works" title={t.disclaimer.howItWorks} />
            <ScreenLink href="/sources" title={t.disclaimer.sources} />
          </View>
        </View>

        <View style={styles.links}>
          <ScreenLink href="/legal/terms" title={t.legal.terms} />
          <ScreenLink href="/legal/privacy" title={t.legal.privacy} />
          <ScreenLink href="/legal/health-data" title={t.legal.health} />
        </View>

        <SupportLine />
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
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 4,
  },
});
