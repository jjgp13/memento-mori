/**
 * The opening sequence plays once per app launch (each page load on web), but not right after
 * onboarding, which ends with its own reveal.
 */
let seenThisLaunch = false;

export const introSeen = () => seenThisLaunch;

export function markIntroSeen() {
  seenThisLaunch = true;
}
