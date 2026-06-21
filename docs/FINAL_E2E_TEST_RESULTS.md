# Final End-to-End Test Results

Date: 2026-06-22
Command: `npm run test:e2e` (Playwright, production build, projects: `chromium` + `mobile-chrome`)

## Summary

| Metric | Value |
| --- | --- |
| Total tests | 76 (38 × 2 browser projects) |
| Passed | 68 |
| Skipped (credential-gated authenticated flows) | 8 (4 × 2 projects) |
| Failed | 0 |
| Duration | ~1 min |

Validation gates (all passing):

| Command | Result |
| --- | --- |
| `npm run validate:courses` | PASS — 77 micro-credentials, unique slugs, programme mappings, routes |
| `npm run validate:content` | PASS — 2262 questions, 1580 answer keys matched, 0 out of range |
| `npm run validate:mcqs` | PASS — 0 invalid; 1692/2262 verified keys (570 unverified, non-blocking) |
| `npm run validate:certificates` | PASS — 77 rules consistent (60 mcq, 2 video-only, 15 content) |
| `npm run lint` | PASS — 0 warnings |
| `npm run typecheck` | PASS |
| `npm run build` | PASS — 178 routes |

## Per-spec results

| Spec | Status | Notes |
| --- | --- | --- |
| `public-pages.spec.ts` | pass | Home, About, Contact, Privacy, Cookie, Terms, Programmes, Courses render; footer; alias redirects. |
| `auth.spec.ts` | pass | Sign-in/register/reset render; protected routes redirect with `next`; **open-redirect blocked**; confirm-with-no-token → sign-in. |
| `dashboard.spec.ts` | pass / gated | Signed-out protection passes; authenticated dropdown/header tests are credential-gated (skipped by default). |
| `enrolment.spec.ts` | pass | Enrol controls present on both detail pages; enrol APIs reject anonymous POST (401/503). |
| `courses.spec.ts` | pass | Catalogue search + cards; client filter empties grid on no-match; programme cards; detail content. |
| `learning-player.spec.ts` | pass / gated | Signed-out protection passes; not-enrolled gate test is credential-gated. |
| `certificates.spec.ts` | pass | Download API rejects anonymous; verify page handles unknown hash. |
| `responsive.spec.ts` | pass | No horizontal overflow at mobile/tablet/desktop; mobile nav opens/closes. |

## Issues found & fixed during testing

| # | Status | Issue | Root cause | Fix |
| --- | --- | --- | --- | --- |
| 1 | **fixed** | `next` query param could open-redirect to an external site via `/auth/callback` and `/auth/confirm`. | Server routes built `new URL(next, origin)` without sanitising `next`; only the client form sanitised it. | Added `src/lib/safe-redirect.ts` (`safeNextPath`) and applied it in `auth/callback/route.ts`, `auth/confirm/route.ts` and `auth-form.tsx`. Verified by `auth.spec.ts` ("auth callback cannot be used as an open redirect"). |
| 2 | fixed (tests) | First test run timed out on heavy pages (`/`, `/programs`, catalogue). | Tests ran against `npm run dev`; 6 parallel workers hit a cold Turbopack dev server compiling on demand. | Switched the Playwright `webServer` to a production build (`npm run build && npm run start`). Re-run: 0 timeouts. |
| 3 | fixed (tests) | Catalogue/redirect assertions wrong. | Test assumed `/micro-credentials` rendered a catalogue with a specific placeholder; in reality it **redirects** to `/courses` (CoursesListing). | Pointed the specs at the canonical routes (`/courses`, `/programs`) and corrected the alias-redirect directions. |
| 4 | fixed (cleanup) | Dead code. | `src/app/_dashpreview/` (private preview folder) and `src/components/courses/catalogue-search.tsx` (no importers). | Removed both. |

## Skipped (credential-gated) — require manual verification

These run only when `BMS_LOGIN_USERNAME` / `BMS_LOGIN_PASSWORD` are set in the test-runner
environment (a confirmed Supabase test account). In this environment automated login did not complete
(live email-confirmation / RPC account state is not reproducible here), so they remain gated and are
covered by the manual checklist in `FINAL_E2E_TEST_PLAN.md`:

- authenticated dashboard reachable after sign-in
- learner header user dropdown (Account + Sign Out)
- learner header My courses + Catalogue dropdowns
- non-enrolled learner sees the enrolment gate (not the player)

## Manual-only flows (see FINAL_E2E_TEST_PLAN.md sections D–G)

Enrolment → auto-enrolment → dashboard update → persistence; in-player video/MCQ/quiz/progress;
certificate lock/unlock/download/reuse; account profile/password/delete. These mutate live learner
data and are intentionally not automated.
