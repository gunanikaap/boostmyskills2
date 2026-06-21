# Visual QA

Source of truth: the live site <https://boostmyskills.eu/> via the captured reference in
`reference/live-html` and `reference/live-css`. Local build rendered with Playwright
(Chromium) at 1440 / 1280 / 768 / 390 px.

## Pages compared

Home, Micro-programmes (list + detail), Micro-credentials (list + detail), Catalogue
redirect, Sign in / Register / Reset, Enrolment, Contact, Privacy / Cookie / Terms,
Account, Dashboard, 404.

## Matches

- Brand palette: green #079845, dark text #1A1A1A, muted #767676, pale-green panels;
  Urbanist typography; reused original logo, hero, certificate, partner and programme
  card images.
- Header (logo + Catalogue dropdown left, Register / Sign in right) and footer
  (Platform / Projects / BoostMySkills columns + LinkedIn) are consistent on every page.
- Home matches the live section order: hero → trending micro-programmes → certificate →
  choose your option → 3 steps → benefits → testimonials → partners.
- Auth pages are a near pixel-match to the live `login-rendered.png` reference.
- Card pattern preserved: image, title, project/code metadata, credential list, Enrol +
  detail actions.
- Legal pages use a clean, readable legal layout (not raw unstyled text).

## What was fixed

- Removed a leaked "Legacy enrolment URL" field from the programme-detail aside — this also
  eliminated the only horizontal-overflow case (≈20 px at 390 px).
- Replaced backend-leaking, developer-facing copy across enrolment, auth, account,
  dashboard and the contact API with clean user-facing messages.
- Added `height: auto` to the global `img` rule to keep Next/Image aspect ratios under
  `max-width: 100%`.

## Automated checks (smoke + responsive)

`tests/e2e/smoke.spec.ts` (run on Desktop Chrome + Pixel 5):

- Home renders the primary live-site sections and hero CTAs.
- Micro-programmes renders verified programme cards.
- Micro-credentials renders the search box and credential cards.
- Auth (sign in + register) renders, no Supabase secrets exposed.
- Contact renders the enquiry form (email field + Submit).
- Legal pages render with styled headings.
- Legacy routes redirect: `/programs/`, `/courses`, `/login`, `/register`.
- Mobile navigation opens **and** closes.
- **No page has horizontal overflow at 390 px** (asserted across 6 routes).

Result: **18/18 passing**.

## Remaining differences

- Micro-credential descriptions are generated from verified programme relationships (full
  per-credential outcomes weren't available from unauthenticated inspection). Data-driven
  in `src/data/courses.ts`.
- Two Next/Image aspect-ratio console warnings on desktop for explicit-sized decorative
  images — dev-only, no effect on build or rendered output.

## Build / lint / typecheck status

| Check | Status |
| --- | --- |
| `npm run lint` | Pass (0 warnings) |
| `npm run typecheck` | Pass |
| `npm run build` | Pass |
| `npm run test:e2e` | Pass (18/18) |
