import { useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Button } from '@/components/button';
import { SourceLink } from '@/components/source-link';
import { Stepper } from '@/components/stepper';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { downloadFile } from '@/lib/download';
import { PLANS } from '@/lib/evidence';
import type { Love } from '@/lib/loves';
import {
  ANCHORS,
  DAY_NAMES,
  WEEK_ORDER,
  capitalize,
  defaultPersonPlan,
  minutesToTime,
  planIcs,
  planSentence,
  slug,
  timeLabel,
  timeToMinutes,
  type Plan,
  type Weekday,
} from '@/lib/plans';

const LAST_SLOT = 23 * 60 + 45;

/**
 * "When ___, I will ___": days, then either a cue they already have ("after lunch") or a time, then the
 * action. Starts from a suggested default; everything is editable.
 */
export function PlanEditor<P extends Plan>({
  initial,
  onSave,
  onCancel,
  note,
}: {
  initial: P;
  onSave: (plan: P) => void;
  onCancel: () => void;
  /** Shown above the buttons, e.g. "this replaces your current plan". */
  note?: ReactNode;
}) {
  const theme = useTheme();
  const [plan, setPlan] = useState<P>(initial);
  const set = (patch: Partial<Plan>) => setPlan((p) => ({ ...p, ...patch }));
  const anchored = !!plan.anchor?.trim();
  // Their own words for the cue stay on the list of choices while editing.
  const anchors = ANCHORS.some((a) => a.anchor === initial.anchor) || !initial.anchor
    ? ANCHORS
    : [{ anchor: initial.anchor, time: initial.time }, ...ANCHORS];

  const toggleDay = (d: Weekday) => {
    const on = plan.days.includes(d);
    if (on && plan.days.length === 1) return; // A plan needs at least one day.
    set({ days: on ? plan.days.filter((x) => x !== d) : [...plan.days, d] });
  };

  return (
    <Animated.View entering={FadeIn.duration(250)} style={[styles.wrap, { borderColor: theme.line }]}>
      <ThemedText type="heading">WHEN</ThemedText>
      <View style={styles.days} accessibilityLabel="Days">
        {WEEK_ORDER.map((d) => {
          const on = plan.days.includes(d);
          return (
            <Pressable
              key={d}
              accessibilityRole="checkbox"
              aria-checked={on}
              accessibilityLabel={DAY_NAMES[d]}
              onPress={() => toggleDay(d)}
              style={[styles.day, { backgroundColor: on ? theme.fg : theme.surface, borderColor: on ? theme.fg : theme.line }]}>
              <ThemedText type="mono" style={{ color: on ? theme.bg : theme.muted }}>
                {DAY_NAMES[d][0]}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.chips}>
        <Chip label="at a set time" on={!anchored} onPress={() => set({ anchor: undefined })} />
        {anchors.map((a) => (
          <Chip key={a.anchor} label={a.anchor} on={plan.anchor === a.anchor} onPress={() => set({ anchor: a.anchor, time: a.time })} />
        ))}
      </View>
      <TextField
        value={plan.anchor ?? ''}
        onChangeText={(anchor) => set({ anchor })}
        placeholder="or in your words: when I get home"
        accessibilityLabel="The moment that reminds you, in your words"
        autoCapitalize="none"
      />
      <View style={styles.timeRow}>
        <ThemedText type="small" style={styles.flex}>
          {anchored ? 'Around (for reminders)' : 'At'}
        </ThemedText>
        <Stepper
          value={timeToMinutes(plan.time)}
          onChange={(m) => set({ time: minutesToTime(m) })}
          step={15}
          max={LAST_SLOT}
          format={(m) => timeLabel(minutesToTime(m))}
          accessibilityLabel="Time"
        />
      </View>

      <ThemedText type="heading">I WILL</ThemedText>
      <TextField
        value={plan.action}
        onChangeText={(action) => set({ action })}
        placeholder="call Mom"
        accessibilityLabel="What you will do"
        autoCapitalize="none"
      />

      <ThemedText type="quote" style={styles.sentence}>
        {planSentence(plan)}
      </ThemedText>
      <ThemedText type="small">{PLANS.claim}</ThemedText>
      <SourceLink source={PLANS.source} />
      {note}

      <View style={styles.row}>
        <Button title="Save plan" disabled={!plan.action.trim()} onPress={() => onSave({ ...plan, anchor: plan.anchor?.trim() || undefined, action: plan.action.trim() })} style={styles.flex} />
        <Button title="Cancel" variant="link" onPress={onCancel} />
      </View>
    </Animated.View>
  );
}

function Chip({ label, on, onPress }: { label: string; on: boolean; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      aria-checked={on}
      onPress={onPress}
      style={[styles.chip, { backgroundColor: on ? theme.accentSoft : theme.surface, borderColor: on ? theme.accent : theme.line }]}>
      <ThemedText type="small" themeColor="fg">
        {label}
      </ThemedText>
    </Pressable>
  );
}

/** A person's plan on their card: suggest one when asked, otherwise show it. */
export function PersonPlan({ love, onChange }: { love: Love; onChange: (next: Love) => void }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <PlanEditor
        initial={love.plan ?? defaultPersonPlan(love)}
        onCancel={() => setEditing(false)}
        onSave={(plan) => {
          onChange({ ...love, plan: { ...plan, createdAt: love.plan?.createdAt ?? Date.now() } });
          setEditing(false);
        }}
      />
    );
  }
  if (love.plan) {
    return <PlanSummary plan={love.plan} onEdit={() => setEditing(true)} onRemove={() => onChange({ ...love, plan: undefined })} />;
  }
  return (
    <Button
      title="Plan when to reach out"
      variant="link"
      accessibilityLabel={`Plan when to reach out to ${love.name}`}
      onPress={() => setEditing(true)}
      style={styles.start}
    />
  );
}

/** A saved plan in one line, with Edit, calendar and Remove. */
export function PlanSummary({ plan, onEdit, onRemove }: { plan: Plan; onEdit: () => void; onRemove: () => void }) {
  return (
    <View style={styles.summary}>
      <ThemedText type="eyebrow" themeColor="muted">
        Your plan
      </ThemedText>
      <ThemedText style={styles.italic}>{planSentence(plan)}</ThemedText>
      <View style={styles.links}>
        <Button title="Edit" variant="link" onPress={onEdit} />
        <AddToCalendar plan={plan} />
        <Button title="Remove" variant="link" accessibilityLabel="Remove this plan" onPress={onRemove} />
      </View>
    </View>
  );
}

/**
 * Downloads a repeating .ics event with a reminder, so the plan shows up in their own calendar. No server
 * and no account; on phones the browser offers to add it. Native reminders come with the native build.
 */
export function AddToCalendar({ plan }: { plan: Plan }) {
  const [saved, setSaved] = useState(false);
  if (Platform.OS !== 'web') return null;
  const title = capitalize(plan.action.trim());

  return (
    <Button
      title={saved ? 'Saved: open it to add ✓' : 'Add to my calendar'}
      variant="link"
      accessibilityLabel={`Add "${title}" to your calendar as a repeating event`}
      onPress={() => setSaved(downloadFile(`${slug(title)}.ics`, planIcs(plan, title), 'text/calendar;charset=utf-8'))}
    />
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
    borderTopWidth: 1,
    paddingTop: 14,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  day: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sentence: {
    fontSize: 19,
    lineHeight: 27,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  summary: {
    gap: 4,
  },
  italic: {
    fontFamily: Fonts.bodyItalic,
  },
  start: {
    alignSelf: 'flex-start',
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
  },
});
