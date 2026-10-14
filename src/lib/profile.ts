// Native gets a SQLite-backed `localStorage` global; web uses the browser's.
import 'expo-sqlite/localStorage/install';

import { useSyncExternalStore } from 'react';

import type { ModelInput } from '@/lib/model';

/**
 * The person's answers. Kept on this device only for now; syncing to Supabase waits for the
 * health-data consent flow (Washington My Health My Data Act).
 */
export type Profile = ModelInput & {
  name: string;
};

const KEY = 'mm.profile.v1';
const listeners = new Set<() => void>();
let current: Profile | null = read();

function read(): Profile | null {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile) {
  current = profile;
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    // Storage can be unavailable (private browsing); keep the in-memory copy.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useProfile() {
  return useSyncExternalStore(subscribe, () => current, () => current);
}
