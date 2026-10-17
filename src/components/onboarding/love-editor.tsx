import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { Segmented } from '@/components/segmented';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { RichText } from '@/components/rich-text';
import { useT } from '@/i18n';
import { fmt } from '@/i18n/format';
import { s as plain } from '@/i18n/rich';
import {
  activitySuggestions,
  loveCount,
  loveUnit,
  type Love,
  type Per,
  type Species,
  personSuggestions,
} from '@/lib/loves';
import type { ModelInput } from '@/lib/model';

const PERS: Per[] = ['day', 'week', 'month', 'year'];
const SPECIES: Species[] = ['dog', 'cat'];
const WHO_KINDS = ['person', 'pet'] as const;

/** Segmented options from keys and their labels in the current language. */
const options = <K extends string>(keys: readonly K[], labels: Record<K, string>) =>
  keys.map((key) => ({ key, label: labels[key] }));

type Form = {
  kind: Love['kind'];
  species: Species;
  name: string;
  count: number;
  per: Per;
  until: string;
  theirAge: string;
  phone: string;
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
  const t = useT();
  const who = group === 'who';
  const empty: Form = {
    kind: who ? 'person' : 'activity',
    species: 'dog',
    name: '',
    count: 1,
    per: 'month',
    until: '',
    theirAge: '',
    phone: '',
  };
  const [form, setForm] = useState<Form>(empty);
  const set = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));
  const pet = form.kind === 'pet';
  const mine = loves.filter((l) => (who ? l.kind !== 'activity' : l.kind === 'activity'));
  const suggestions = (who ? personSuggestions(t) : activitySuggestions(t)).filter(
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
      phone: form.kind === 'person' && form.phone.trim() ? form.phone.trim() : undefined,
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
              accessibilityLabel={t.loves.useSuggestion(s.name)}
              onPress={() =>
                setForm({
                  kind: s.kind,
                  species: s.species ?? 'dog',
                  name: s.name,
                  count: s.count,
                  per: s.per,
                  until: s.until ? String(s.until) : '',
                  theirAge: s.theirAge ? String(s.theirAge) : '',
                  phone: '',
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
            options={options(WHO_KINDS, t.loves.kinds)}
            value={pet ? 'pet' : 'person'}
            onChange={(kind) => set({ kind })}
            accessibilityLabel={t.loves.personOrPet}
          />
        ) : null}
        {pet ? (
          <Segmented
            options={options(SPECIES, t.loves.species)}
            value={form.species}
            onChange={(species) => set({ species })}
            accessibilityLabel={t.loves.kindOfPet}
          />
        ) : null}
        <TextField
          accessibilityLabel={who ? t.loves.whoA11y : t.loves.whatA11y}
          placeholder={pet ? t.loves.petPlaceholder : who ? t.loves.personPlaceholder : t.loves.activityPlaceholder}
          value={form.name}
          onChangeText={(name) => set({ name })}
          onSubmitEditing={add}
          returnKeyType="done"
          style={{ backgroundColor: theme.bg }}
        />

        <ThemedText type="eyebrow" themeColor="muted">
          {who ? t.loves.howOftenSee : t.loves.howOftenDo}
        </ThemedText>
        <View style={styles.row}>
          <View style={[styles.stepper, { borderColor: theme.line }]}>
            <StepButton label="−" onPress={() => set({ count: Math.max(1, form.count - 1) })} accessibilityLabel={t.loves.fewer} />
            <Text style={[styles.count, { color: theme.fg }]} accessibilityLiveRegion="polite">
              {form.count}
            </Text>
            <StepButton label="+" onPress={() => set({ count: Math.min(99, form.count + 1) })} accessibilityLabel={t.common.more} />
          </View>
          <ThemedText type="small">{t.loves.times(form.count)}</ThemedText>
        </View>
        <Segmented options={options(PERS, t.loves.per)} value={form.per} onChange={(per) => set({ per })} accessibilityLabel={t.loves.perA11y} />

        <TextField
          accessibilityLabel={who ? t.loves.theirAge : t.loves.untilAge}
          placeholder={who ? (pet ? t.loves.petAge : t.loves.theirAge) : t.loves.untilAge}
          keyboardType="number-pad"
          value={who ? form.theirAge : form.until}
          onChangeText={(t) => {
            const v = t.replace(/\D/g, '').slice(0, 3);
            set(who ? { theirAge: v } : { until: v });
          }}
          style={{ backgroundColor: theme.bg }}
        />

        {form.kind === 'person' ? (
          <TextField
            accessibilityLabel={t.loves.phoneA11y}
            placeholder={t.loves.phonePlaceholder}
            keyboardType="phone-pad"
            autoComplete="tel"
            value={form.phone}
            onChangeText={(phone) => set({ phone })}
            style={{ backgroundColor: theme.bg }}
          />
        ) : null}

        <Button title={t.common.add} variant="ghost" disabled={!form.name.trim()} onPress={add} />
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
              <RichText
                type="small"
                parts={[
                  plain(t.loves.pace(l.count, l.per)),
                  ...(n != null ? [plain(' · '), ...t.loves.aboutMore(fmt(n), loveUnit(l))] : []),
                ]}
              />
            </View>
            <Button
              title={t.common.remove}
              variant="link"
              accessibilityLabel={t.common.removeA11y(l.name)}
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
