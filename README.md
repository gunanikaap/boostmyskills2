# BoostMySkills Rebuild

Production-oriented Next.js rebuild of the public BoostMySkills website and the core learner flows:
catalogue, authentication, enrolment, the learning player (videos, MCQs, interactive activities),
completion tracking and verifiable certificates.

## Overview

- **77 micro-credentials** and **10 micro-programmes** rendered from verified, static course data
  under `src/data/` (never loaded from the database, never shipped to the browser).
- **Supabase** auth + Postgres for accounts, enrolments, unit progress, MCQ attempts, completion and
  certificates (all protected by Row Level Security).
- **Server-first**: course content, eligibility and certificate issuance are computed server-side
  and never trust the client.

## Tech stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS
- Supabase Auth + Postgres (`@supabase/ssr`)
- React Hook Form + Zod (forms/validation)
- pdf-lib (certificate PDFs)
- Playwright (end-to-end tests)

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev          # http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Yes | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Yes | Supabase anon (publishable) key. |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Optional | Only used by the account-deletion route to hard-delete an auth user. Leave empty to fall back to the documented manual/scheduled deletion path. **Never expose client-side.** |

No real secrets are committed. `.env`, `.env*.local` and the scrape outputs are gitignored. The app
degrades gracefully when Supabase is not configured (auth-gated pages show an "unavailable" state
instead of crashing).

## Supabase setup

1. Create a Supabase project.
2. In the SQL editor, run **`supabase/schema.sql`**, then the migrations in order:
   `supabase/migrations/0001_account_profile.sql`, `0002_course_learning.sql`,
   `0003_course_completion_certificates.sql`.
3. (Optional) Run `supabase/seed.sql` to populate the catalogue helper tables.
4. Configure Auth redirect URLs and email templates — see `docs/AUTH_SETUP.md` and
   `docs/AUTH_EMAIL_SETUP.md`.
5. Set the environment variables above.

RLS is assumed throughout: every learner table is scoped to `auth.uid()`. Username sign-in and
public certificate verification use `SECURITY DEFINER` RPCs (`email_for_username`,
`verify_certificate`).

## Testing

```bash
npm run test:e2e     # Playwright — builds + serves a production build, then runs the suite
```

The default suite covers public pages, route protection, enrolment/certificate API guards, the
catalogue, responsiveness and redirects. Authenticated learner journeys are **credential-gated**
(set `BMS_LOGIN_USERNAME` / `BMS_LOGIN_PASSWORD` in the environment to enable them) and otherwise
covered by manual testing — see [`docs/FINAL_E2E_TEST_PLAN.md`](docs/FINAL_E2E_TEST_PLAN.md).

## Validation & build

```bash
npm run validate:courses        # catalogue integrity (77 credentials, unique slugs, mappings)
npm run validate:content        # quiz prompts/options + answer-key matching
npm run validate:mcqs           # MCQ cardinality / coverage
npm run validate:certificates   # certificate-rule consistency
npm run lint                    # eslint (zero warnings)
npm run typecheck               # tsc --noEmit
npm run build                   # production build
```

## Maintaining courses

To add, edit or remove micro-credentials, programmes, videos, MCQs, quizzes, interactive activities
or certificate rules, follow **[`docs/COURSE_MAINTENANCE_GUIDE.md`](docs/COURSE_MAINTENANCE_GUIDE.md)**.

## Deployment

Vercel is the simplest target. Add the environment variables in Project Settings and deploy from
GitHub or the Vercel CLI. Follow **[`docs/DEPLOYMENT_CHECKLIST.md`](docs/DEPLOYMENT_CHECKLIST.md)**
before every release.

## Key documentation

- [`docs/COURSE_MAINTENANCE_GUIDE.md`](docs/COURSE_MAINTENANCE_GUIDE.md) — add/edit/remove courses.
- [`docs/FINAL_E2E_TEST_PLAN.md`](docs/FINAL_E2E_TEST_PLAN.md) — full test coverage map.
- [`docs/DEPLOYMENT_CHECKLIST.md`](docs/DEPLOYMENT_CHECKLIST.md) — pre-deploy checks.
- [`docs/AUTH_SETUP.md`](docs/AUTH_SETUP.md), [`docs/AUTH_EMAIL_SETUP.md`](docs/AUTH_EMAIL_SETUP.md) — Supabase auth + email.
- [`docs/CERTIFICATE_RULES.md`](docs/CERTIFICATE_RULES.md) — per-course certificate rules.
- [`docs/ACCOUNT_DELETION_FLOW.md`](docs/ACCOUNT_DELETION_FLOW.md) — account deletion.
- [`docs/ROUTE_MAP.md`](docs/ROUTE_MAP.md) — route overview.

The `*_FIX_REPORT.md` and `*_AUDIT.md` files under `docs/` are historical engineering records kept
for reference.
