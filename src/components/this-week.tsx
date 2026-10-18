import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { PlanEditor } from '@/components/plan-editor';
import { ReachOut } from '@/components/reach-out';
import { SourceLink } from '@/components/source-link';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT, type Strings } from '@/i18n';
import { dec1, fmt } from '@/i18n/format';
import { COMING_BACK, PLANS } from '@/lib/evidence';
import { allLevers, bestLever } from '@/lib/habit-impact';
import { loveCount, type Love } from '@/lib/loves';
import { WEEK_MS } from '@/lib/model';
import {
  capitalize,
  cueLabel,
  defaultHabitPlan,
  defaultPersonPlan,
  doneSince,
  focusIsCurrent,
  freshStartLabel,
  maySuggestPlan,
  missedLastWeek,
  nameInSentence,
  nextOccurrence,
  personToPlan,
  planMoments,
  planSentence,
  weekStart,
  whenLabel,
  withDone,
  type Plan,
} from '@/lib/plans';
import { setPref, usePrefs } from '@/lib/prefs';
import { saveProfile, type Profile } from '@/lib/profile';

const startOfToday = (now: number) => new Date(new Date(now).setHours(0, 0, 0, 0)).getTime();

/** "next: Sunday", "today", or what's already been done. Never a streak, never a miss. */
function status(moments: number[], plan: Plan, t: Strings, now: number) {
  if (doneSince(moments, startOfToday(now))) return t.thisWeek.doneToday;
  if (doneSince(moments, weekStart(now))) return t.thisWeek.doneThisWeek;
  const when = whenLabel(nextOccurrence(plan, now), t, now);
  return when === t.plans.today ? when : t.thisWeek.next(when);
}

/**
 * The week's plans with the next step one tap away, a warm welcome back after a miss or time away, and at
 * most one suggested new plan a week (docs/nudges.md §2).
 */
export function ThisWeek({ profile, now, lastSeen, freshToday }: { profile: Profile; now: number; lastSeen: number; freshToday: boolean }) {
  const theme = useTheme();
  const t = useT();
  const w = t.thisWeek;
  const { planNudgeDismissedAt, hideNumbers: hide } = usePrefs();
  const loves = profile.loves ?? [];
  const setLove = (next: Love) => saveProfile({ ...profile, loves: loves.map((l) => (l.id === next.id ? next : l)) });
  const week = weekStart(now);
  const today = startOfToday(now);

  const people = loves
    .filter((l): l is Love & { plan: Plan } => l.kind === 'person' && !!l.plan)
    .sort((a, b) => nextOccurrence(a.plan, now) - nextOccurrence(b.plan, now));
  const habit = profile.habitPlan;
  const focus = focusIsCurrent(profile.focus, profile.dob, now) ? profile.focus : null;
  const lever = habit ? allLevers(profile, now).find((l) => l.key === habit.habit) : undefined;

  const slipped = [
    ...people.map((l) => ({ plan: l.plan, moments: planMoments(l.plan, l) })),
    ...(habit ? [{ plan: habit as Plan, moments: planMoments(habit) }] : []),
  ].some(({ plan, moments }) => missedLastWeek(plan, moments, now) && !doneSince(moments, week));
  const away = lastSeen > 0 && now - lastSeen > WEEK_MS;
  const empty = !people.length && !habit && !focus;
  // A fresh-start offer is today's one nudge; the weekly plan suggestion waits.
  const suggest =
    !freshToday && maySuggestPlan(profile, planNudgeDismissedAt, now) && !!(personToPlan(loves) || (!habit && bestLever(profile, now)));

  return (
    <View style={styles.wrap}>
      <ThemedText type="eyebrow" themeColor="muted">
        {w.heading}
      </ThemedText>

      {slipped || away ? (
        <View style={[styles.card, { backgroundColor: theme.accentSoft, borderColor: theme.accent }]}>
          <ThemedText>{w.welcomeBack(profile.name)}</ThemedText>
          <ThemedText type="small">{t.claims.comingBack}</ThemedText>
          <SourceLink source={COMING_BACK.source} />
        </View>
      ) : null}

      {focus ? (
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            {w.oneThingFor(freshStartLabel(focus.period, t, focus.setAt))}
            {focus.doneAt ? w.doneMark : ''}
          </ThemedText>
          <ThemedText style={styles.action}>{focus.text}</ThemedText>
          {focus.doneAt ? null : (
            <Button title={w.did} variant="ghost" onPress={() => saveProfile({ ...profile, focus: { ...focus, doneAt: Date.now() } })} />
          )}
        </View>
      ) : null}

      {people.map((l) => (
        <View key={l.id} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            {cueLabel(l.plan, t)} · {status(planMoments(l.plan, l), l.plan, t, now)}
          </ThemedText>
          <ThemedText style={styles.action}>{capitalize(l.plan.action)}</ThemedText>
          <ThemedText type="small">
            {hide
              ? t.gentle.moreVisits(nameInSentence(l.name, t))
              : w.moreVisits(fmt(loveCount(l, profile, now).times), nameInSentence(l.name, t))}
          </ThemedText>
          <ReachOut love={l} onChange={setLove} compact />
        </View>
      ))}

      {habit ? (
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="eyebrow" themeColor="muted">
            {cueLabel(habit, t)} · {status(planMoments(habit), habit, t, now)}
          </ThemedText>
          <ThemedText style={styles.action}>{capitalize(habit.action)}</ThemedText>
          {lever ? (
            <>
              <ThemedText type="small">
                {hide ? t.gentle.smallStep(t.levers[lever.key]) : w.smallStep(t.levers[lever.key], dec1(lever.years))}
              </ThemedText>
              <SourceLink of={lever.key} />
            </>
          ) : null}
          <Button
            title={doneSince(planMoments(habit), today) ? w.didToday : w.did}
            variant="ghost"
            disabled={!!doneSince(planMoments(habit), today)}
            onPress={() => saveProfile({ ...profile, habitPlan: withDone(habit) })}
          />
        </View>
      ) : null}

      {suggest ? (
        <Suggestion profile={profile} now={now} />
      ) : empty ? (
        <View style={styles.empty}>
          <ThemedText>{w.noPlans}</ThemedText>
          <ThemedText type="small">{t.claims.plans}</ThemedText>
          <SourceLink source={PLANS.source} />
          <View style={styles.row}>
            <Button title={t.tabs.loves} variant="ghost" onPress={() => router.push('/loves')} style={styles.flex} />
            <Button title={t.tabs.life} variant="ghost" onPress={() => router.push('/')} style={styles.flex} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

/** One suggested plan, at most once a week: a person to reach out to first, else the best habit change. */
function Suggestion({ profile, now }: { profile: Profile; now: number }) {
  const theme = useTheme();
  const t = useT();
  const w = t.thisWeek;
  const { hideNumbers: hide } = usePrefs();
  const [editing, setEditing] = useState(false);
  const loves = profile.loves ?? [];
  const person = personToPlan(loves);
  const lever = person || profile.habitPlan ? null : bestLever(profile, now);
  const plan: Plan | null = person ? defaultPersonPlan(person, t, now) : lever ? defaultHabitPlan(lever.key, t, now) : null;
  if (!plan) return null;

  // The default was made with `now`, so createdAt is already this minute.
  function save(made: Plan) {
    if (person) saveProfile({ ...profile, loves: loves.map((l) => (l.id === person.id ? { ...l, plan: made } : l)) });
    else if (lever) saveProfile({ ...profile, habitPlan: { ...made, habit: lever.key } });
  }

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <ThemedText type="eyebrow" themeColor="muted">
        {w.suggestHeading}
      </ThemedText>
      {person ? (
        <ThemedText type="small">
          {hide
            ? t.gentle.suggestPerson(nameInSentence(person.name, t))
            : w.suggestPerson(fmt(loveCount(person, profile, now).times), nameInSentence(person.name, t))}
        </ThemedText>
      ) : lever ? (
        <ThemedText type="small">
          {hide ? t.gentle.suggestLever(t.levers[lever.key]) : w.suggestLever(t.levers[lever.key], dec1(lever.years))}
        </ThemedText>
      ) : null}
      <SourceLink source={PLANS.source} prefix={w.whyPlans} />
      {editing ? (
        <PlanEditor initial={plan} onCancel={() => setEditing(false)} onSave={save} />
      ) : (
        <>
          <ThemedText style={styles.sentence}>{planSentence(plan, t)}</ThemedText>
          <View style={styles.row}>
            <Button title={w.makeItMine} onPress={() => save(plan)} style={styles.flex} />
            <Button title={w.changeIt} variant="ghost" onPress={() => setEditing(true)} />
          </View>
          <Button title={w.notNow} variant="link" onPress={() => setPref('planNudgeDismissedAt', Date.now())} style={styles.start} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 8,
  },
  action: {
    fontFamily: Fonts.bodyBold,
    fontSize: 19,
    lineHeight: 26,
  },
  sentence: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 19,
    lineHeight: 27,
  },
  empty: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  flex: {
    flexGrow: 1,
  },
  start: {
    alignSelf: 'flex-start',
  },
});
