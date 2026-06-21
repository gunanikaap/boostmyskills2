# Final Handoff Report

Date: 2026-06-22
Scope: final stabilisation before creating the Git branch — end-to-end testing, bug fixes, safe
clean-up, reusable methods/components, comments and maintainer documentation.

## 1. Testing completed

- **Automated (Playwright):** 8 spec files in `tests/e2e/`. Full suite `npm run test:e2e`:
  **68 passed, 8 skipped (credential-gated), 0 failed** across `chromium` + `mobile-chrome`.
- **Validators:** `validate:courses`, `validate:content`, `validate:mcqs`, `validate:certificates`
  — all pass.
- **Quality gates:** `lint`, `typecheck`, `build` — all pass (178 routes).
- **Coverage map:** `docs/FINAL_E2E_TEST_PLAN.md`. **Results:** `docs/FINAL_E2E_TEST_RESULTS.md`.
- Authenticated learner journeys (enrol → player → certificate) are credential-gated/manual and
  documented; they mutate live data and are not automated.

## 2. Bugs fixed

| # | Severity | Bug | Fix |
| --- | --- | --- | --- |
| 1 | High (security) | Open redirect: the untrusted `next` param was used unsanitised in `/auth/callback` and `/auth/confirm` (`new URL(next, origin)` accepts absolute / protocol-relative URLs → off-site redirect). | New `src/lib/safe-redirect.ts` (`safeNextPath`) allows only local single-slash paths; applied in both routes and unified with the client `auth-form.tsx`. E2E-verified. |
| 2 | Medium (test infra) | E2E suite timed out on heavy pages under a cold dev server. | `playwright.config.ts` `webServer` now uses a production build (`npm run build && npm run start`). |
| 3 | Medium (test correctness) | Specs asserted wrong catalogue routes/redirect directions. | Pointed at canonical `/courses` + `/programs`; corrected alias redirects. |

No broken routes, broken enrolment, failing auth redirects, MCQ-retry, early-certificate,
external-redirect, build or TypeScript errors were found beyond the above. Enrolment idempotency,
the one-attempt MCQ DB constraint, and server-side certificate eligibility were reviewed and are
sound.

## 3. Files changed

**Added**
- `src/lib/safe-redirect.ts` — `safeNextPath` open-redirect guard.
- `src/lib/profile.ts` — `getProfileDisplayName` name resolver.
- `src/components/courses/use-enrol-button.ts` — shared enrolment hook.
- `tests/e2e/fixtures.ts` + 8 specs: `public-pages`, `auth`, `dashboard`, `enrolment`, `courses`,
  `learning-player`, `certificates`, `responsive`.
- `docs/COURSE_MAINTENANCE_GUIDE.md`, `docs/FINAL_E2E_TEST_PLAN.md`,
  `docs/FINAL_E2E_TEST_RESULTS.md`, `docs/DEPLOYMENT_CHECKLIST.md`, `docs/FINAL_HANDOFF_REPORT.md`.

**Modified**
- `src/app/auth/callback/route.ts`, `src/app/auth/confirm/route.ts`,
  `src/components/auth/auth-form.tsx` — use `safeNextPath`.
- `src/app/dashboard/layout.tsx`, `src/app/account/layout.tsx`,
  `src/app/api/certificates/[courseSlug]/route.ts` — use `getProfileDisplayName`.
- `src/components/courses/course-enrol-button.tsx`,
  `src/components/courses/programme-enrol-button.tsx` — use `useEnrolButton`.
- `playwright.config.ts` — production `webServer`.
- `README.md` — rewritten (overview, env, Supabase, testing, validation, deployment, docs links).
- `src/lib/learn.ts`, `src/lib/completion.ts`, `src/app/page.tsx` — performance fixes (see §6).

**Deleted**
- `src/app/_dashpreview/page.tsx` — dead private preview folder.
- `src/components/courses/catalogue-search.tsx` — unused component.
- `tests/e2e/smoke.spec.ts` — folded into the new, broader specs.

## 4. Reusable methods/components added or cleaned

- `safeNextPath` — single open-redirect guard for all `next`/`returnTo` handling (server + client).
- `getProfileDisplayName` — one name-resolution helper, reused by the dashboard layout, account
  layout and certificate route (each passes its own priority order; behaviour preserved exactly).
- `useEnrolButton` — shared hook backing both `CourseEnrolButton` and `ProgrammeEnrolButton`
  (previously ~95% duplicated); the two components are now thin config wrappers.
- Existing canonical helpers (`getCourseBySlug`, `getProgrammeBySlug`, `getCourseContent`,
  `getProgrammeCourseSlugs`, `enrolInCourse`, `enrolInProgramme`, `calculateCourseCompletion`,
  `certificateNumber`/`verificationHash`) were already centralised and are documented in the
  maintenance guide.

## 5. Comments added

Targeted comments only, where they aid maintainers: the open-redirect rationale in
`safe-redirect.ts`; the dual-priority rationale in `profile.ts`; the enrol-intent/sign-in flow in
`use-enrol-button.ts`; the certificate learner-name priority; and the data-shape/assembly notes
carried into `COURSE_MAINTENANCE_GUIDE.md`. Pre-existing comments on enrolment, auto-enrolment, the
one-attempt MCQ rule and certificate eligibility were retained.

## 6. Performance fixes (carried in this branch)

- `getLearnUnits(slug)` and `indexCourseUnits(slug)` are memoised per slug (they were rebuilt twice
  per learn/MCQ/progress request).
- Below-the-fold homepage images no longer use `priority`/`loading="eager"` (defer off the critical
  path). No UI/layout change.

## 7. Security & config

- No secrets in `src/`/`docs/`. `.env`, `.env*.local` and scrape outputs gitignored;
  `.env.example` holds empty placeholders.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only (account-deletion route); anon key only client-side.
- Scanned for `alert(`/`prompt(`/`confirm(`, `TODO`/`FIXME`, `console.log`, hardcoded credentials,
  and external primary redirects — none present. `window.location` uses are all legitimate.
- RLS assumptions and `SECURITY DEFINER` RPCs documented in README + DEPLOYMENT_CHECKLIST.

## 8. Commands run & results

| Command | Result |
| --- | --- |
| `npm run validate:courses` | PASS |
| `npm run validate:content` | PASS |
| `npm run validate:mcqs` | PASS (0 invalid; 570 unverified keys — non-blocking, see §9) |
| `npm run validate:certificates` | PASS |
| `npm run lint` | PASS (0 warnings) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS (178 routes) |
| `npm run test:e2e` | PASS (68 passed, 8 skipped, 0 failed) |

## 9. Known limitations

- **570 MCQ answer keys are unverified** (41 courses). These questions still function and record
  attempts, but show no correct/incorrect feedback and do not count toward the MCQ score until a
  verified key is added. Tracked by `validate:mcqs`; this is pre-existing data coverage, not a
  regression.
- **Authenticated e2e flows are credential-gated.** Live login did not complete in this environment
  (email-confirmation / RPC account state is not reproducible here), so dashboard/enrolment/player/
  certificate journeys are covered by the manual checklist in `FINAL_E2E_TEST_PLAN.md`.
- **Next.js deprecation warning:** the `middleware` file convention is deprecated in favour of
  `proxy`. The middleware works correctly; migration is deferred to avoid a routing-convention
  change during stabilisation.

## 10. Git status

The project is **not yet a Git repository** (`git status` → "not a git repository"). No commit was
made (none requested). To create the branch:

```bash
git init
git add -A
git commit -m "Stabilise: e2e tests, open-redirect fix, reusable helpers, course docs"
git checkout -b final-stabilisation
```

A full inventory of created/modified/deleted files is in §3 above (substitutes for `git diff --stat`
until the repo is initialised).

## 11. Ready for a Git branch?

**Yes.** All core flows are tested or documented, the open-redirect bug is fixed, dead/duplicate code
is removed, reusable helpers are in place, useful comments are added, no secrets are present, the
maintenance guide and deployment docs exist, and lint/typecheck/build plus the e2e and validation
suites all pass.
