import { MODEL_VERSION } from '@/lib/model';
import { getPrefs } from '@/lib/prefs';
import { getProfile } from '@/lib/profile';

/**
 * Everything the app keeps on this device, as one readable JSON file: the right to take a copy
 * (GDPR Art. 20, CCPA, Washington MHMDA). Keys mirror what is stored (`mm.profile.v1`, `mm.prefs.v1`).
 */
export function dataExport(about: string, now = new Date()) {
  // The person's own date, not UTC, so an evening export isn't named for tomorrow.
  const day = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, '0')).join('-');
  const data = {
    app: 'Memento Mori',
    about,
    exportedAt: now.toISOString(),
    modelVersion: MODEL_VERSION,
    profile: getProfile(),
    settings: getPrefs(),
  };
  return {
    name: `memento-mori-data-${day}.json`,
    content: `${JSON.stringify(data, null, 2)}\n`,
    type: 'application/json',
  };
}
