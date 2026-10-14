import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Choices } from '@/components/choices';
import { DatePicker } from '@/components/date-picker';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { useTheme } from '@/hooks/use-theme';
import { fmt } from '@/lib/life-views';
import { DAY_MS, HABITS, HABIT_KEYS, birthTime, type HabitKey, type Sex } from '@/lib/model';
import { saveProfile, useProfile, type Profile } from '@/lib/profile';

type Draft = Partial<Profile> & { name: string; dob: string };

const SEX_OPTIONS = [
  { value: 'm', label: 'Male' },
  { value: 'f', label: 'Female' },
] as const;

/**
 * All the model's questions on one screen. Interim until the one-question-per-screen onboarding
 * from the prototype is built; that flow will reuse DatePicker and Choices.
 */
export default function DetailsScreen() {
  const theme = useTheme();
  const profile = useProfile();
  const now = useNow(60_000);
  const [draft, setDraft] = useState<Draft>(() => profile ?? { name: '', dob: '' });
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const complete = !!draft.dob && !!draft.sex && HABIT_KEYS.every((k) => draft[k]);
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.head}>
            <ThemedText type="eyebrow">Your details</ThemedText>
            <Button title="Cancel" variant="link" onPress={close} />
          </View>
          <ThemedText type="small">Your answers stay on this device.</ThemedText>

          <Question title="What should we call you?">
            <TextField
              accessibilityLabel="First name"
              placeholder="Your first name"
              autoComplete="given-name"
              value={draft.name}
              onChangeText={(name) => set({ name })}
            />
          </Question>

          <Question title="When were you born?">
            <DatePicker value={draft.dob} onChange={(dob) => set({ dob })} />
            {draft.dob ? (
              <ThemedText>
                You have been alive for{' '}
                <ThemedText themeColor="accent">{fmt((now - birthTime(draft.dob)) / DAY_MS)}</ThemedText> days.
              </ThemedText>
            ) : null}
          </Question>

          <Question title="What was your sex at birth?" why="On average women outlive men by about five years.">
            <Choices<Sex> options={SEX_OPTIONS} value={draft.sex} onChange={(sex) => set({ sex })} />
          </Question>

          {HABIT_KEYS.map((k) => (
            <HabitQuestion key={k} habit={k} value={draft[k]} onChange={(v) => set({ [k]: v })} />
          ))}

          <Button
            title="Save"
            disabled={!complete}
            onPress={() => {
              saveProfile(draft as Profile);
              close();
            }}
          />
          {!complete ? <ThemedText type="small">Answer every question to see your count.</ThemedText> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function HabitQuestion({ habit, value, onChange }: { habit: HabitKey; value: string | undefined; onChange: (v: string) => void }) {
  const h = HABITS[habit];
  return (
    <Question title={h.question} why={h.why}>
      <Choices options={h.options} value={value} onChange={onChange} />
    </Question>
  );
}

function Question({ title, why, children }: { title: string; why?: string; children: React.ReactNode }) {
  return (
    <View style={styles.question}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {why ? (
        <ThemedText type="small" style={styles.why}>
          {why}
        </ThemedText>
      ) : null}
      {children}
    </View>
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
    paddingBottom: Spacing.six,
    gap: 18,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    gap: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 21,
    lineHeight: 26,
  },
  why: {
    fontStyle: 'italic',
  },
});
