import type { Strings } from '@/i18n/strings/en';
import { HABITS, type HabitKey } from '@/lib/model';

/** A habit's answers with labels in the current language, for choice lists. */
export function habitOptions<K extends HabitKey>(t: Strings, habit: K) {
  const labels: Record<string, string> = t.habits[habit].options;
  return HABITS[habit].options.map((o) => ({ value: o.value as (typeof HABITS)[K]['options'][number]['value'], label: labels[o.value] }));
}

/** The label of one answer ("I quit"), or '' if unknown. */
export function habitAnswer(t: Strings, habit: HabitKey, value: string | undefined) {
  const labels: Record<string, string> = t.habits[habit].options;
  return value ? (labels[value] ?? '') : '';
}
