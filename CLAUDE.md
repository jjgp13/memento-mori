# Memento Mori — project brief

A free app that estimates how much life a person likely has left and helps them spend it on what matters. Stoic in spirit: the point is presence and gratitude, not fear.

## Status
- `prototype/index.html` is a working single-file web prototype (built in a claude.ai chat, Oct 2026). Open it in a browser to see the intended flow and feel. Treat it as the design and logic reference for the real app.
- Oct 13 2026: Expo app scaffolded (SDK 57, Expo Router, routes in `src/app/`) with Supabase auth (Apple, Google, email OTP) and placeholder Life / Habits / Loves / Today tabs. See README.md for setup and layout.
- Live web build: https://jjgp13.github.io/memento-mori/ (GitHub Pages, deploys on push to main).
- Supabase project `memento-mori` (ref `apncolizrozdjjwrqtzr`, us-west-1, free tier, org J^2). Migrations in `supabase/migrations/` are applied. Sign-in methods are switched in `SIGN_IN_METHODS` (`src/lib/auth.ts`): guest (anonymous) is on; Google is off until its provider is configured; email needs custom SMTP; Apple needs a paid developer account.
- Done: model ported to `src/lib/model.ts` (parity with prototype checked by `npm run check:model`); Life screen with all four zoom levels; interim one-page details form (`src/app/(app)/details.tsx`); profile stored on device only (`src/lib/profile.ts`).
- Next: finish Google provider setup; Habits screen; one-question-per-screen onboarding + opening sequence; health-data consent before syncing profile answers.

## Working in this repo
- Follow @AGENTS.md for Expo conventions (versioned docs, `npx expo install`, no hand-edited `ios/`/`android/`).
- Run `npx tsc --noEmit` and `npx expo lint` before calling work done. `.claude/launch.json` has an `expo-web` preview config.

## Product decisions so far
- **Flow on every open:** impact card ("~150 more movies") → Stoic quote + question → life calendar. First open after onboarding starts with a "weeks remaining" reveal. One tap to move on; skippable.
- **Onboarding:** one question per screen with fade/slide animations; custom birth-date picker (year → month → day); sex at birth, smoking, exercise, weight, alcohol, sleep; health-data step (Apple Health / Health Connect, mobile only); "things you love" (activity or person, how often, optional "until age", person's age).
- **Main screens (bottom nav, swipe, slide transitions):**
  1. Life — circles, not squares. Current unit fills like a pie and shows its %. Zoom levels: Life (years), Weeks, Year (days), Today (hours). Live countdown; optional ticking sound (off by default).
  2. Habits — tap options to see years gained/lost; daily-steps slider with step-by-step math; ranked "What matters most" list with evidence badges (strong / moderate / emerging).
  3. Loves — "N more times" counters for activities and people.
  4. Today — quote, question, evening-review journal.
- **Tone:** show ranges, not a single death date. Pair scarcity with agency ("…and walking more could add ~2 years"). Sometimes look back with gratitude. Let users hide numbers.

## Model
- Gompertz–Makeham hazard h(x) = (A + B·e^(b·x)) × habit multiplier, b = 0.085.
  - Male A=0.0012, B=6.0e-5 (~75 at birth). Female A=0.0007, B=4.2e-5 (~81 at birth). Approximation of US period life tables — replace with real SSA tables.
- Habit hazard ratios: smoking former 1.3 / current 2.2; exercise rarely 1.3 / 3+×wk 0.85; BMI under 1.4 / over 1.05 / obese 1.35; heavy alcohol 1.4; sleep <6h 1.15.
- Steps: HR = exp(−0.072 × (min(steps,10000) − 6000)/1000). Steps replace the exercise answer (never double count).
- Shortcut: years gained ≈ ln(1/HR) ÷ 0.085.
- Output: median, middle-50% range, P(reach 80). Cap total gains; associations are not causation.

## Planned architecture
- Client: React Native + Expo (iOS, Android, web from one codebase). Native modules later for HealthKit, Health Connect, home-screen widget, notifications. Android Studio only needed for emulator/widget work; test early builds with Expo Go on a phone.
- Backend: Supabase (Postgres + auth + storage). Free tier to start, Pro ($25/mo) at launch.
- Auth: Sign in with Apple, Google, email.
- Tables: users, profiles, loves, journal_entries, health_snapshots, notification_prefs, daily_content, science_cards, stories (later).
- Life-expectancy calculation runs on device; store the model/table version used.
- Weekly science job: pull PubMed/medRxiv → summarize with Claude API (Batch) → human review → publish cards. Only change the model on meta-analyses, versioned. Keep AI out of per-user daily features to stay free.
- Later: opt-in "stories of change" social feed (anonymous by default, AI moderation, no like counts or leaderboards).

## Must-haves
- Privacy: Washington My Health My Data Act (consent + health privacy policy), GDPR/CCPA export and delete, encrypt journal entries.
- Emotional safety: gentle tone, hide-numbers option, non-morbid notifications, link to support resources.
- "Not medical advice" note; cite data sources; accessibility (text alternatives for circle views, reduced motion).
