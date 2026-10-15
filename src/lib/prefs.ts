// Native gets a SQLite-backed `localStorage` global; web uses the browser's.
import 'expo-sqlite/localStorage/install';

import { useSyncExternalStore } from 'react';

/** Small device-only settings, separate from the person's answers. */
export type Prefs = {
  /** Tick-tock while the seconds count up in onboarding. On unless turned off. */
  tickOnboarding: boolean;
  /** Tick-tock with the Life screen countdown. Off unless turned on (CLAUDE.md). */
  tickLife: boolean;
  /** Last time the Today screen was opened, to welcome people back after a while away. 0 = never. */
  lastSeen: number;
  /** When a suggested plan was waved off; no new suggestion for a week after (docs/nudges.md §2). */
  planNudgeDismissedAt: number;
  /** When today's fresh-start offer was waved off. */
  freshStartDismissedAt: number;
};

const KEY = 'mm.prefs.v1';
const DEFAULTS: Prefs = { tickOnboarding: true, tickLife: false, lastSeen: 0, planNudgeDismissedAt: 0, freshStartDismissedAt: 0 };
const listeners = new Set<() => void>();
let current: Prefs = read();

function read(): Prefs {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(KEY);
    return { ...DEFAULTS, ...(raw ? (JSON.parse(raw) as Partial<Prefs>) : {}) };
  } catch {
    return DEFAULTS;
  }
}

export function setPref<K extends keyof Prefs>(key: K, value: Prefs[K]) {
  current = { ...current, [key]: value };
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    // Storage unavailable; keep it for this session.
  }
  listeners.forEach((l) => l());
}

export function usePrefs() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => current,
  );
}
