import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ReachOut } from '@/components/reach-out';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { fmt } from '@/lib/life-views';
import { loveCount, loveCountLabel, loveCountReason, type Love } from '@/lib/loves';
import { saveProfile, useProfile } from '@/lib/profile';
import { slotLabel } from '@/lib/reminders';

/** One person, with Call and Message ready: where a reminder about them opens. */
export default function PersonScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = useProfile();
  const loves = profile?.loves ?? [];
  const love = loves.find((l) => l.id === id);
  const setLove = (next: Love) => profile && saveProfile({ ...profile, loves: loves.map((l) => (l.id === next.id ? next : l)) });
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <ThemedText type="eyebrow">Reach out</ThemedText>
          <Button title="Done" variant="link" onPress={close} />
        </View>

        {love && profile ? (
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <ThemedText type="subtitle">{love.name}</ThemedText>
            <ThemedText>
              About <ThemedText themeColor="accent">{fmt(loveCount(love, profile).times)}</ThemedText>{' '}
              {loveCountLabel(love)}. {loveCountReason(love)}.
            </ThemedText>
            <ReachOut love={love} onChange={setLove} />
            {love.plan ? <ThemedText type="small">Your plan: {slotLabel(love.plan)}.</ThemedText> : null}
          </View>
        ) : (
          <ThemedText>This person is no longer in your list.</ThemedText>
        )}
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
    gap: 10,
  },
});
