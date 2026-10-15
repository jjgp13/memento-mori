# Memento Mori — project brief

A free app that estimates how much life a person likely has left and helps them spend it on what matters. Stoic in spirit: the point is presence and gratitude, not fear.

## Principles (Oct 14 2026)
- A tool, not a business: free, no ads, no tracking, no selling data. Ask for money (e.g. donations) only if hosting costs ever require it.
- Local-first: everything works without an account and stays on the device. The estimate runs on device.
- Ask people to sign in only when it gives them something more: backup/sync across devices, diary entries, sharing stories. Health data (Apple Health / Health Connect) is read on device, so it does NOT need sign-in.
- The core is the person's loves: who loves them (people and pets) and what they love doing, shown as "N more times", so the time left points at what matters.

## Status
- `prototype/index.html` is a working single-file web prototype (built in a claude.ai chat, Oct 2026). Open it in a browser to see the intended flow and feel. Treat it as the design and logic reference for the real app.
- Oct 13 2026: Expo app scaffolded (SDK 57, Expo Router, routes in `src/app/`) with Supabase auth (Apple, Google, email OTP) and placeholder Life / Habits / Loves / Today tabs. See README.md for setup and layout.
- Live web build: https://jjgp13.github.io/memento-mori/ (GitHub Pages, deploys on push to main).
- Supabase project `memento-mori` (ref `apncolizrozdjjwrqtzr`, us-west-1, free tier, org J^2). Migrations in `supabase/migrations/` are applied. Sign-in methods are switched in `SIGN_IN_METHODS` (`src/lib/auth.ts`): guest (anonymous) is on; Google is off until its provider is configured; email needs custom SMTP; Apple needs a paid developer account.
- Done: model ported to `src/lib/model.ts` (parity with prototype checked by `npm run check:model`); Life screen with all four zoom levels, a habits card (years each habit adds/costs, best single change) and "within reach" circles for that change; one-question-per-screen onboarding (`src/app/(app)/onboarding.tsx`: name, birth, sex, 5 habits, up to 3 values, people who love them, activities, then a weeks-remaining reveal), reused with `?edit=1` for editing; profile stored on device only (`src/lib/profile.ts`).
- Oct 14: local-first (no sign-in at startup; "You" screen with delete-everything); pets in loves (dog/cat typical lifespans); Loves tab with "N more times" counters; opening sequence on each launch (today's count, often a love → Stoic quote + question), content bundled in `src/lib/daily.ts`.
- Science brief: `docs/science.md` (what drives lifespan/healthspan, meaning, time use; proposals). Its ranked list lives in-app in `src/lib/evidence.ts` (Habits screen); keep the two in step.
- Oct 14: Habits screen (options with years ±, steps math, "What matters most" with evidence badges and sources, how the estimate works); phone time (self-reported in onboarding and on Life, turned into years of what's left and a swap with a love, `src/lib/time-use.ts`); reach out to people (Message via share sheet/sms, Call if a phone number is saved, "We talked" log) on Loves and on the Today screen, which picks who to reach out to.
- Screen time from the OS: Android UsageStatsManager ("Usage access") and iOS Screen Time API (Family Controls entitlement, data stays in a report extension) both need the native app; self-report until then.
- Sounds: synthesized clock tick/tock (`assets/sounds`, regenerate with `scripts/make-clock-sounds.py`) via `useClockTick`; 15 ticks when the birth-date seconds start (on by default, mutable), optional on the Life countdown (off by default). Prefs in `src/lib/prefs.ts`.
- Behavior-change brief: `docs/nudges.md` (if-then plans, well-timed few prompts, fresh starts, welcome-backs, death reminders always paired with one doable action, "could" not "should").
- Oct 15: plans (`src/lib/plans.ts`): an if-then plan per person (Loves) and one small habit plan (Life), Today's "This week" with one-tap actions, welcome-backs (no streaks), at most one suggested plan a week, fresh starts (Mondays, the 1st, birthdays), "Add to my calendar" .ics download on web.
- Oct 15: Life puts the clock, legend and calendar first; "What if" switches on the calendar (one per change that would add time for them, each drawn in its own color, combined gain split in proportion and capped); "All / Awake / Off phone" layers (sleep framed as time well spent); one phone control under the calendar; "Your weeks ahead" bar with sources and a plan offer. Today opens with one rotating count, weighted to loves, paired with its next step. Evidence notes in docs/nudges.md §1k.
- Oct 15: baseline by country (`gm-2026.10c+wpp2024-2023`): UN WPP 2024 life tables fitted per country and sex by `npm run fit:countries` (`scripts/fit-country-tables.mts` → `src/lib/country-tables.ts`); a country step in onboarding, pre-filled from the device region (`expo-localization`, `src/lib/country.ts`); Life says which tables it uses. No country = the old US approximation.
- Next: 1–2 local reminders a week (needs native build for notifications); diet/strength/purpose as model factors; native build for health data and screen time; healthy-years estimate.

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
- Gompertz–Makeham hazard h(x) = (A + B·e^(b·x) + c before 15 + y from 15 to 29) × habit multiplier.
  - Per country and sex: fitted to UN WPP 2024 life tables (2023), ages 30–100 for A, B, b; c and y match survival to 15 and 30. `npm run check:model` checks every median at birth is within a year of the table.
  - No country (older profiles): male A=0.0012, B=6.0e-5 (~75 at birth), female A=0.0007, B=4.2e-5 (~81), b = 0.085, the prototype's US approximation.
- Habit hazard ratios: smoking former 1.3 / current 2.2; exercise rarely 1.3 / 3+×wk 0.85; BMI under 1.4 / over 1.05 / obese 1.35; heavy alcohol 1.4; sleep <6h 1.15; connection (seeing close people) a few times a month 1.1 (interpolated) / rarely 1.29 (Holt-Lunstad 2015; model `gm-approx-2026.10b`).
- Steps: HR = exp(−0.072 × (min(steps,10000) − 6000)/1000). Steps replace the exercise answer (never double count).
- Shortcut: years gained ≈ ln(1/HR) ÷ 0.085 (fitted b runs ~0.09–0.11, so the shortcut is a rule of thumb; the screens compute real deltas).
- Output: median, middle-50% range, P(reach 80). Combined gains capped at 14 years (`MAX_TOTAL_GAIN`, Li 2018); associations are not causation. Every claim in the UI links its source via `SourceLink` / `evidenceFor()` in `src/lib/evidence.ts`.

## Planned architecture
- Client: React Native + Expo (iOS, Android, web from one codebase). Native modules later for HealthKit, Health Connect, home-screen widget, notifications. Android Studio only needed for emulator/widget work; test early builds with Expo Go on a phone.
- Backend: Supabase (Postgres + auth + storage). Free tier to start, Pro ($25/mo) at launch.
- Auth: optional and deferred (see Principles). Code for guest, Google, email, Apple sign-in exists but the app no longer asks at startup.
- Tables: users, profiles, loves, journal_entries, health_snapshots, notification_prefs, daily_content, science_cards, stories (later).
- Life-expectancy calculation runs on device; store the model/table version used.
- Weekly science job: pull PubMed/medRxiv → summarize with Claude API (Batch) → human review → publish cards. Only change the model on meta-analyses, versioned. Keep AI out of per-user daily features to stay free.
- Later: opt-in "stories of change" social feed (anonymous by default, AI moderation, no like counts or leaderboards).

## Must-haves
- Privacy: Washington My Health My Data Act (consent + health privacy policy), GDPR/CCPA export and delete, encrypt journal entries.
- Emotional safety: gentle tone, hide-numbers option, non-morbid notifications, link to support resources.
- "Not medical advice" note; cite data sources; accessibility (text alternatives for circle views, reduced motion).
