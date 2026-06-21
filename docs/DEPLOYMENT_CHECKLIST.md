# Deployment Checklist

Run through this before every production deploy.

## 1. Environment variables (hosting provider, e.g. Vercel Project Settings)

- [ ] `NEXT_PUBLIC_SUPABASE_URL` set to the production Supabase URL.
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set to the production anon key.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` — set **only** if immediate account deletion is required; keep it
      server-side (never a `NEXT_PUBLIC_` var). Leave empty otherwise.
- [ ] No secrets committed to the repo (`.env.local` is gitignored; `.env.example` holds empty
      placeholders only).

## 2. Supabase database

- [ ] `supabase/schema.sql` applied.
- [ ] Migrations applied in order: `0001_account_profile.sql`, `0002_course_learning.sql`,
      `0003_course_completion_certificates.sql`.
- [ ] (Optional) `supabase/seed.sql` applied.
- [ ] Row Level Security enabled on all learner tables (`course_enrolments`,
      `programme_enrolments`, `unit_progress`, `mcq_attempts`, `course_completion`, `certificates`,
      `profiles`).
- [ ] `SECURITY DEFINER` RPCs present: `email_for_username` (username sign-in),
      `verify_certificate` (public verification).

## 3. Auth configuration

- [ ] Site URL set to the production origin.
- [ ] Redirect URLs allow `/auth/callback` and `/auth/confirm` on the production origin
      (see `docs/AUTH_SETUP.md`).
- [ ] Email templates configured (confirmation, reset) — see `docs/AUTH_EMAIL_SETUP.md`.
- [ ] `next` redirect parameter is sanitised server-side (`safeNextPath`) — already enforced in
      code; no config needed, but verify callback/confirm point only at local paths.

## 4. Assets & storage

- [ ] Programme images present under `public/images/programmes/`.
- [ ] Brand logos/icons present under `public/logos/` and `public/icons/`.
- [ ] Remote course card images (LMS asset URLs) reachable, or replaced with local assets.
- [ ] Certificate template assets used by `src/lib/certificates/pdf.ts` resolve at runtime.

## 5. Build & quality gates (CI or local, must all pass)

- [ ] `npm run validate:courses`
- [ ] `npm run validate:content`
- [ ] `npm run validate:mcqs`
- [ ] `npm run validate:certificates`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e` (authenticated flows require `BMS_LOGIN_*` env or manual sign-off)

## 6. Manual smoke checks against the deployed URL

- [ ] Home, About, Contact, legal pages load.
- [ ] `/courses` and `/programs` catalogues load; search filters.
- [ ] A course detail page loads; **Enrol** is visible.
- [ ] Signed-out `/dashboard`, `/account`, `/learn/<slug>` all redirect to sign-in.
- [ ] Register → confirm → sign in → dashboard works on a disposable account.
- [ ] Enrol in a course → player loads; enrol in a programme → dashboard lists auto-enrolled
      credentials.
- [ ] Complete a short course → certificate unlocks → PDF downloads → verify URL validates.
- [ ] Mobile viewport: no horizontal scrolling; nav and dropdowns work.
- [ ] Browser console is free of hydration/runtime errors on the main pages.

## 7. Post-deploy

- [ ] Confirm certificate verification URLs resolve on the production origin.
- [ ] Confirm auth emails arrive and their links land on the production origin.
