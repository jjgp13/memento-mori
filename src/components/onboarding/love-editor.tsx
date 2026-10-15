import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { Segmented } from '@/components/segmented';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { fmt } from '@/lib/life-views';
import {
  ACTIVITY_SUGGESTIONS,
  PERSON_SUGGESTIONS,
  PER_LABEL,
  loveCount,
  loveUnit,
  type Love,
  type Per,
  type Species,
} from '@/lib/loves';
import type { ModelInput } from '@/lib/model';

const PERS: { key: Per; label: string }[] = [
  { key: 'day', label: 'a day' },
  { key: 'week', label: 'a week' },
  { key: 'month', label: 'a month' },
  { key: 'year', label: 'a year' },
];

const WHO_KINDS: { key: 'person' | 'pet'; label: string }[] = [
  { key: 'person', label: 'Person' },
  { key: 'pet', label: 'Pet' },
];
const SPECIES: { key: Species; label: string }[] = [
  { key: 'dog', label: 'Dog' },
  { key: 'cat', label: 'Cat' },
];

type Form = {
  kind: Love['kind'];
  species: Species;
  name: string;
  count: number;
  per: Per;
  until: string;
  theirAge: string;
};

/**
 * Add who loves you (people and pets) or what you love doing, each with how often; shows how many more
 * times are likely left. Turn `showList` off when the caller lists the loves itself (the Loves tab).
 */
export function LoveEditor({
  group,
  loves,
  onChange,
  me,
  showList = true,
}: {
  group: 'who' | 'what';
  loves: Love[];
  onChange: (loves: Love[]) => void;
  me: ModelInput | null;
  showList?: boolean;
}) {
  const theme = useTheme();
  const who = group === 'who';
  const empty: Form = {
    kind: who ? 'person' : 'activity',
    species: 'dog',
    name: '',
    count: 1,
    per: 'month',
    until: '',
    theirAge: '',
  };
  const [form, setForm] = useState<Form>(empty);
  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));
  const pet = form.kind === 'pet';
  const mine = loves.filter((l) => (who ? l.kind !== 'activity' : l.kind === 'activity'));
  const suggestions = (who ? PERSON_SUGGESTIONS : ACTIVITY_SUGGESTIONS).filter(
    (s) => !mine.some((l) => l.name === s.name),
  );

  const add = () => {
    const name = form.name.trim();
    if (!name) return;
    const toNumber = (s: string) => (s.trim() ? Number(s) : undefined);
    const love: Love = {
      id: `${Date.now()}`,
      kind: form.kind,
      name,
      count: form.count,
      per: form.per,
      until: form.kind === 'activity' ? toNumber(form.until) : undefined,
      theirAge: form.kind === 'activity' ? undefined : toNumber(form.theirAge),
      species: pet ? form.species : undefined,
      addedAt: Date.now(),
    };
    onChange([...loves, love]);
    setForm({ ...empty, kind: form.kind });
  };

  return (
    <View style={styles.wrap}>
      {suggestions.length ? (
        <View style={styles.chips}>
          {suggestions.map((s) => (
            <Pressable
              key={s.name}
              accessibilityRole="button"
              accessibilityLabel={`Use suggestion: ${s.name}`}
              onPress={() =>
                setForm({
                  kind: s.kind,
                  species: s.species ?? 'dog',
                  name: s.name,
                  count: s.count,
                  per: s.per,
                  until: s.until ? String(s.until) : '',
                  theirAge: s.theirAge ? String(s.theirAge) : '',
                })
              }
              style={[styles.chip, { backgroundColor: theme.surface, borderColor: theme.line }]}>
              <ThemedText type="small" themeColor="fg">
                {s.name}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      ) : null}

      <View style={[styles.form, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        {who ? (
          <Segmented
            options={WHO_KINDS}
            value={pet ? 'pet' : 'person'}
            onChange={(kind) => set({ kind })}
            accessibilityLabel="Person or pet"
          />
        ) : null}
        {pet ? (
          <Segmented
            options={SPECIES}
            value={form.species}
            onChange={(species) => set({ species })}
            accessibilityLabel="Kind of pet"
          />
        ) : null}
        <TextField
          accessibilityLabel={who ? 'Who' : 'What'}
          placeholder={pet ? 'Max, Luna…' : who ? 'Mom, my partner, Sam…' : 'Play soccer, read, travel…'}
          value={form.name}
          onChangeText={(name) => set({ name })}
          onSubmitEditing={add}
          returnKeyType="done"
          style={{ backgroundColor: theme.bg }}
        />

        <ThemedText type="eyebrow" themeColor="muted">
          {who ? 'How often you see them' : 'How often you do it'}
        </ThemedText>
        <View style={styles.row}>
          <View style={[styles.stepper, { borderColor: theme.line }]}>
            <StepButton label="−" onPress={() => set({ count: Math.max(1, form.count - 1) })} accessibilityLabel="Fewer" />
            <Text style={[styles.count, { color: theme.fg }]} accessibilityLiveRegion="polite">
              {form.count}
            </Text>
            <StepButton label="+" onPress={() => set({ count: Math.min(99, form.count + 1) })} accessibilityLabel="More" />
          </View>
          <ThemedText type="small">{form.count === 1 ? 'time' : 'times'}</ThemedText>
        </View>
        <Segmented options={PERS} value={form.per} onChange={(per) => set({ per })} accessibilityLabel="Per" />

        <TextField
          accessibilityLabel={who ? 'Their age (optional)' : 'Until what age? (optional)'}
          placeholder={who ? (pet ? 'Their age in years (optional)' : 'Their age (optional)') : 'Until what age? (optional)'}
          keyboardType="number-pad"
          value={who ? form.theirAge : form.until}
          onChangeText={(t) => {
            const v = t.replace(/\D/g, '').slice(0, 3);
            set(who ? { theirAge: v } : { until: v });
          }}
          style={{ backgroundColor: theme.bg }}
        />

        <Button title="Add" variant="ghost" disabled={!form.name.trim()} onPress={add} />
      </View>

      {(showList ? mine : []).map((l) => {
        const n = me ? loveCount(l, me).times : null;
        return (
          <Animated.View
            key={l.id}
            entering={FadeInDown.duration(400)}
            exiting={FadeOut.duration(200)}
            layout={LinearTransition}
            style={[styles.item, { borderBottomColor: theme.line }]}>
            <View style={styles.flex}>
              <ThemedText>{l.name}</ThemedText>
              <ThemedText type="small">
                {l.count} {PER_LABEL[l.per]}
                {n != null ? (
                  <>
                    {' · about '}
                    <ThemedText type="small" themeColor="accent">
                      {fmt(n)}
                    </ThemedText>
                    {` more ${loveUnit(l)}`}
                  </>
                ) : null}
              </ThemedText>
            </View>
            <Button
              title="Remove"
              variant="link"
              accessibilityLabel={`Remove ${l.name}`}
              onPress={() => onChange(loves.filter((x) => x.id !== l.id))}
            />
          </Animated.View>
        );
      })}
    </View>
  );
}

function StepButton({ label, onPress, accessibilityLabel }: { label: string; onPress: () => void; accessibilityLabel: string }) {
  const theme = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={styles.stepBtn}>
      <Text style={[styles.count, { color: theme.muted }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 13,
  },
  form: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 14,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Radius.pill,
  },
  stepBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  count: {
    fontFamily: Fonts.mono,
    fontSize: 16,
    minWidth: 18,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
