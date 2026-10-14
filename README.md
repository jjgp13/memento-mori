# Memento Mori

A free app that estimates how much life you likely have left and helps you spend it on what matters. See [CLAUDE.md](CLAUDE.md) for the product brief and [prototype/index.html](prototype/index.html) for the design and logic reference.

Expo (SDK 57, Expo Router) for iOS, Android and web · Supabase for auth and data.

**Live web build:** https://jjgp13.github.io/memento-mori/ — rebuilt by `.github/workflows/deploy-web.yml` on every push to `main`. Its Supabase settings come from the repo's Actions **variables** `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npx expo start               # press w for web, or scan the QR code with Expo Go
```

Without `.env.local` the app still starts and shows a "Supabase not configured" notice on the sign-in screen.

## Supabase setup (one time)

1. Create a project at [supabase.com](https://supabase.com). From **Project Settings → API**, put the project URL and the publishable (or legacy anon) key into `.env.local`.
2. Apply the schema: paste `supabase/migrations/*.sql` into the SQL editor, or `supabase link` + `supabase db push` with the Supabase CLI.
3. **Authentication → URL Configuration → Redirect URLs**: add
   - `http://localhost:8081/**` (web dev)
   - `https://jjgp13.github.io/memento-mori/**` (GitHub Pages)
   - `exp://**` (Expo Go)
   - `mementomori://**` (development and store builds)
4. **Authentication → Emails → Magic Link** template: include `{{ .Token }}` so emails carry the 6-digit code the app asks for. The link in the same email also works.
5. **Authentication → Providers**:
   - **Google**: create an OAuth client (Web application) in Google Cloud and use the callback URL Supabase shows.
   - **Apple**: needs an Apple Developer account (Services ID, key, team ID). Before App Store review, switch iOS to native Sign in with Apple (`expo-apple-authentication` + `signInWithIdToken`), as noted in `src/lib/auth.ts`.

## Layout

```
src/app/                 Expo Router routes
  _layout.tsx            fonts, AuthProvider, signed-in / signed-out guards
  sign-in.tsx            Apple, Google, email code
  (app)/(tabs)/          Life · Habits · Loves · Today (placeholders to port from the prototype)
  (app)/account.tsx      signed-in user, sign out
src/lib/supabase.ts      client (sessions in SQLite-backed localStorage on native)
src/lib/auth.ts          OAuth, email OTP, deep-link code exchange
src/providers/           auth session context
src/constants/theme.ts   colors and fonts from the prototype
supabase/migrations/     SQL schema with row-level security
prototype/               original single-file web prototype
```

## Checks

```bash
npx tsc --noEmit
npx expo lint
```

Not medical advice. Estimates come from population data.
