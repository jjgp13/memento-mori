/**
 * What someone says matters most. Used to point reminders and daily content at what they care about.
 * Labels are in the language catalogs (src/i18n), under `values`.
 */
export const VALUES = [
  'family',
  'partner',
  'friends',
  'health',
  'craft',
  'learning',
  'creating',
  'faith',
  'nature',
  'adventure',
  'service',
  'peace',
] as const;

export type ValueKey = (typeof VALUES)[number];

export const MAX_VALUES = 3;
