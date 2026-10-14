/** What someone says matters most. Used to point reminders and daily content at what they care about. */
export const VALUES = [
  { key: 'family', label: 'Family' },
  { key: 'partner', label: 'My partner' },
  { key: 'friends', label: 'Friends' },
  { key: 'health', label: 'Health' },
  { key: 'craft', label: 'Work and craft' },
  { key: 'learning', label: 'Learning' },
  { key: 'creating', label: 'Creating' },
  { key: 'faith', label: 'Faith and spirit' },
  { key: 'nature', label: 'Nature' },
  { key: 'adventure', label: 'Adventure' },
  { key: 'service', label: 'Helping others' },
  { key: 'peace', label: 'Peace of mind' },
] as const;

export type ValueKey = (typeof VALUES)[number]['key'];

export const MAX_VALUES = 3;
