import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ScreenLink, SupportLine } from '@/components/disclaimer';
import { LanguagePicker } from '@/components/language-picker';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';
import { deleteAccount, signOutLocally } from '@/lib/auth';
import { clearPrefs, setPref, usePrefs } from '@/lib/prefs';
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
  const { hideNumbers } = usePrefs();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  /** The server couldn't erase the account; nothing has been deleted yet. */
  const [accountFailed, setAccountFailed] = useState(false);

  function clearDevice() {
    // With no answers left, the app guard sends them back to onboarding.
    clearPrefs();
    clearProfile();
  }

  async function deleteEverything() {
    setAccountFailed(false);
    setDeleting(true);
    try {
      // An account from an early test is erased on the server first, so a failure leaves everything as it was.
      if (session) await deleteAccount();
    } catch (e) {
      console.warn('Account deletion failed', e);
      setAccountFailed(true);
      setDeleting(false);
      return;
    }
    clearDevice();
  }

  async function deleteOnDeviceOnly() {
    setDeleting(true);
    await signOutLocally();
    clearDevice();
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
          <View style={styles.row}>
            <ThemedText type="heading" style={styles.flex}>
              {t.gentle.setting}
            </ThemedText>
            <Switch
              value={hideNumbers}
              onValueChange={(on) => setPref('hideNumbers', on)}
              accessibilityLabel={t.gentle.setting}
              trackColor={{ false: theme.line, true: theme.accent }}
              thumbColor={theme.fg}
              // react-native-web colors the "on" thumb with its own prop (teal by default).
              {...{ activeThumbColor: theme.fg }}
            />
          </View>
          <ThemedText type="small">{t.gentle.settingNote}</ThemedText>
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
            <Button
              title={a.yesDelete}
              onPress={deleteEverything}
              loading={deleting}
              style={{ backgroundColor: theme.danger }}
            />
            {accountFailed ? (
              <>
                <ThemedText type="small" themeColor="fg" accessibilityLiveRegion="polite">
                  {a.accountFailed}
                </ThemedText>
                <Button title={a.deviceOnly} variant="ghost" disabled={deleting} onPress={deleteOnDeviceOnly} />
              </>
            ) : null}
            <Button
              title={a.keep}
              variant="link"
              disabled={deleting}
              onPress={() => {
                setConfirming(false);
                setAccountFailed(false);
              }}
            />
          </View>
        ) : (
          <Button title={a.deleteAll} variant="ghost" onPress={() => setConfirming(true)} />
        )}

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
});
