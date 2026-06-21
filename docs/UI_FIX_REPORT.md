# UI Fix Report

Working report for the BoostMySkills rebuild, audited against the live site
<https://boostmyskills.eu/> using the captured reference in `reference/live-html`
and `reference/live-css`.

## Summary

The existing codebase was in much better shape than expected. It is a data-driven
Next.js (App Router) project that already reproduces the live site's layout, brand
colours (#079845 green, #1A1A1A text, #767676 muted, pale-green panels), Urbanist
typography, header/footer and page structure with good fidelity. `lint`, `typecheck`
and `build` all passed before any changes.

The real problems were **production-readiness defects**, not a wrong design:
end-user-facing copy leaked the implementation stack ("Supabase", `.env.example`,
"row-level security", "Legacy enrolment URL"), raw database error messages were shown
to users, and one page overflowed horizontally on mobile. These have been fixed.

## Pages checked

Audited by rendering the local build with Playwright at 1440 / 1280 / 768 / 390 px and
comparing against the live reference HTML/CSS.

| Page | Route | Result |
| --- | --- | --- |
| Home | `/` | Matches live structure (hero, trending micro-programmes, certificate, choose option, 3 steps, benefits, testimonials, partners). No changes needed. |
| Micro-programmes | `/micro-programmes` | Card grid matches live. OK. |
| Micro-credentials | `/micro-credentials` | Title + search + credential cards. OK. |
| Programme detail | `/micro-programmes/[slug]` | **Fixed** – removed leaked "Legacy enrolment URL" field. |
| Credential detail | `/micro-credentials/[slug]` | OK. |
| Catalogue (courses) | `/courses` → `/micro-credentials` | Redirect verified. |
| Sign in / Register / Reset | `/auth/*` | Near pixel-match to live `login-rendered.png`. **Fixed** auth fallback copy. |
| Enrolment | `/enrol/[type]/[slug]` | **Fixed** – logged-out redirect verified; cleaned copy. |
| Contact | `/contact` | Matches live. **Fixed** API success/error copy. |
| Legal | `/privacy-policy`, `/cookie-policy`, `/terms-and-conditions` | Styled legal layout, not raw text. OK. |
| Account / Dashboard | `/account`, `/dashboard` | **Fixed** fallback copy (protected, Supabase-backed). |
| 404 | `/not-found` | OK. |

## UI mismatches found

- **Programme detail aside leaked an internal URL** – a labelled
  "Legacy enrolment URL" row printed the raw `https://boostmyskills.eu/dashboard/programs/<uuid>`
  string. Not present on the live site and unprofessional.
- **Horizontal overflow on mobile (390 px)** – the same long unbroken URL pushed the
  programme-detail page ~20 px past the viewport. Every other page was overflow-clean.

## Features broken / missing

None functionally broken. The defects were copy/UX leaks of backend internals:

- Enrolment success showed "This record is stored in Supabase."
- Enrolment (unconfigured) showed "Supabase is not configured… Open legacy enrolment URL".
- Auth form error showed "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY…".
- Account / Dashboard fallbacks named `.env.example` and "row-level security".
- Contact API returned "Configure Supabase to store submissions" and raw DB `error.message`.
- "Continue to course/LMS" used internal jargon.

## Fixes completed

1. **`src/app/micro-programmes/[slug]/page.tsx`** – removed the leaked "Legacy enrolment URL"
   row (replaced with a neutral "Micro-credentials: N" stat). Removes the leak **and** the
   mobile overflow. Dropped the now-unused `Link` import.
2. **`src/app/enrol/[type]/[slug]/page.tsx`** – user-facing copy: success → "You're enrolled.
   We've saved this to your account."; errors no longer print raw DB messages; the
   unconfigured state now reads "Your place is ready. Continue to the course…"; external
   LMS link relabelled "Continue to course" (still configurable via data).
3. **`src/components/auth/auth-form.tsx`** – fallback now "Sign in is temporarily unavailable.
   Please try again shortly." (no env-var names).
4. **`src/app/account/page.tsx`** & **`src/app/dashboard/page.tsx`** – neutral fallbacks;
   "Continue to course" relabel.
5. **`src/app/api/contact/route.ts`** – success "Thanks — your message has been received.";
   server errors return a generic message instead of the raw DB error.
6. **`src/app/globals.css`** – added `height: auto` to the global `img` rule so Next/Image
   keeps aspect ratio when `max-width:100%` constrains width (removes the mobile image-ratio
   console warnings; no visual change).
7. **`tests/e2e/smoke.spec.ts`** – broadened smoke coverage (see VISUAL_QA.md).

## Responsive

Verified with Playwright at 390 / 768 / 1280 / 1440 px. After the fix, **no page has
horizontal overflow** (asserted by an automated test). Mobile navigation opens and closes.

## Auth & enrolment

- Supabase auth is wired (server + browser clients, `/auth/callback`, protected
  `/account` and `/dashboard`). No secrets are hard-coded; keys come from `.env.local`
  (git-ignored) and never appear in source, docs, or tests.
- Logged-out enrol → redirect to `/auth/sign-in?next=…` verified live in the browser.
- External LMS link is data-driven (`externalEnrolmentUrl`), so it stays configurable.

## Remaining limitations

- Micro-credential **descriptions** are generated from verified programme relationships;
  full per-credential learning outcomes weren't available from unauthenticated inspection
  of the live site. They are data-driven and trivially updatable in `src/data/courses.ts`.
- Two Next/Image aspect-ratio **console warnings** remain on desktop for explicit-sized
  decorative images (certificate / detail aside). Dev-only, non-blocking, no effect on the
  production build or rendered output.
- The live site exposes legacy paths (`/programs/`, `/courses`, `/login`, `/register`,
  `/privacy`, `/tos`, `/cookie_policy`); these are preserved as redirects to the cleaner
  maintained routes.

## Commands run

| Command | Result |
| --- | --- |
| `npm run lint` | Pass (0 warnings, `--max-warnings=0`) |
| `npm run typecheck` | Pass |
| `npm run build` | Pass (93 routes prerendered) |
| `npm run test:e2e` | Pass (18/18 across chromium + mobile-chrome) |
