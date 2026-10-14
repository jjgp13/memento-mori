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
  type Love,
  type Per,
} from '@/lib/loves';
import type { ModelInput } from '@/lib/model';

const PERS: { key: Per; label: string }[] = [
  { key: 'week', label: 'a week' },
  { key: 'month', label: 'a month' },
  { key: 'year', label: 'a year' },
];

type Form = { name: string; count: number; per: Per; until: string; theirAge: string };
const EMPTY: Form = { name: '', count: 1, per: 'month', until: '', theirAge: '' };

/** Add people or activities, each with how often; shows how many more times are likely left. */
export function LoveEditor({
  kind,
  loves,
  onChange,
  me,
}: {
  kind: Love['kind'];
  loves: Love[];
  onChange: (loves: Love[]) => void;
  me: ModelInput | null;
}) {
  const theme = useTheme();
  const [form, setForm] = useState<Form>(EMPTY);
  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));
  const person = kind === 'person';
  const mine = loves.filter((l) => l.kind === kind);
  const suggestions = (person ? PERSON_SUGGESTIONS : ACTIVITY_SUGGESTIONS).filter(
    (s) => !mine.some((l) => l.name === s.name),
  );

  const add = () => {
    const name = form.name.trim();
    if (!name) return;
    const toNumber = (s: string) => (s.trim() ? Number(s) : undefined);
    const love: Love = {
      id: `${Date.now()}`,
      kind,
      name,
      count: form.count,
      per: form.per,
      until: person ? undefined : toNumber(form.until),
      theirAge: person ? toNumber(form.theirAge) : undefined,
      addedAt: Date.now(),
    };
    onChange([...loves, love]);
    setForm(EMPTY);
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
        <TextField
          accessibilityLabel={person ? 'Who' : 'What'}
          placeholder={person ? 'Mom, my partner, Sam…' : 'Play soccer, read, travel…'}
          value={form.name}
          onChangeText={(name) => set({ name })}
          onSubmitEditing={add}
          returnKeyType="done"
          style={{ backgroundColor: theme.bg }}
        />

        <ThemedText type="eyebrow" themeColor="muted">
          {person ? 'How often you see them' : 'How often you do it'}
        </ThemedText>
        <View style={styles.row}>
          <View style={[styles.stepper, { borderColor: theme.line }]}>
            <StepButton label="−" onPress={() => set({ count: Math.max(1, form.count - 1) })} accessibilityLabel="Fewer" />
            <Text style={[styles.count, { color: theme.fg }]} accessibilityLiveRegion="polite">
              {form.count}
            </Text>
            <StepButton label="+" onPress={() => set({ count: Math.min(99, form.count + 1) })} accessibilityLabel="More" />
          </View>
          <View style={styles.flex}>
            <Segmented options={PERS} value={form.per} onChange={(per) => set({ per })} accessibilityLabel="Per" />
          </View>
        </View>

        <TextField
          accessibilityLabel={person ? 'Their age (optional)' : 'Until what age? (optional)'}
          placeholder={person ? 'Their age (optional)' : 'Until what age? (optional)'}
          keyboardType="number-pad"
          value={person ? form.theirAge : form.until}
          onChangeText={(t) => {
            const v = t.replace(/\D/g, '').slice(0, 3);
            set(person ? { theirAge: v } : { until: v });
          }}
          style={{ backgroundColor: theme.bg }}
        />

        <Button title="Add" variant="ghost" disabled={!form.name.trim()} onPress={add} />
      </View>

      {mine.map((l) => {
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
                    {person ? ' more visits' : ' more times'}
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
