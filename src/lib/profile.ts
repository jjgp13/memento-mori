// Native gets a SQLite-backed `localStorage` global; web uses the browser's.
import 'expo-sqlite/localStorage/install';

import { useSyncExternalStore } from 'react';

import type { Love } from '@/lib/loves';
import type { ModelInput } from '@/lib/model';
import type { ValueKey } from '@/lib/values';

/**
 * The person's answers. Kept on this device only for now; syncing to Supabase waits for the
 * health-data consent flow (Washington My Health My Data Act).
 */
export type Profile = ModelInput & {
  name: string;
  /** Up to three things that matter most (added in onboarding v2; absent on older profiles). */
  values?: ValueKey[];
  /** People and activities they love. */
  loves?: Love[];
  /** Average hours a day on their phone, self-reported (from Screen Time / Digital Wellbeing) for now. */
  phoneHours?: number;
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

/** Forgets every answer stored on this device. */
export function clearProfile() {
  current = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing stored, or storage unavailable.
  }
  listeners.forEach((l) => l());
}
