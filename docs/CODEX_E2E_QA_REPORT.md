# Codex E2E QA Report

Date: 2026-06-22
Branch: `codex-e2e-qa-fixes`
Base branch: `clean-production-ready`

## Summary

Final end-to-end QA was run against the existing app without redesigning UI or changing product behavior. One real bug was found before the app tests could run: `npm install` was not reproducible because `@eslint/js` used `latest`, which now resolves to ESLint 10 while the project uses ESLint 9. The dependency was pinned to the matching ESLint 9 line and the lockfile was regenerated with `npm install`.

No app-flow regressions were found in the automated E2E suite. Authenticated learner flows that require live credentials and database mutation remain skipped because no `BMS_LOGIN_USERNAME` / `BMS_LOGIN_PASSWORD` were configured for this run.

## Commands Run

| Command | Result |
| --- | --- |
| `git status` | Started on `clean-production-ready`; branch up to date. Initial status reported untracked `.claude/`, which was not touched. |
| `git branch` | Current branch was `clean-production-ready`. |
| `git pull origin clean-production-ready` | Passed, already up to date. |
| `git checkout -b codex-e2e-qa-fixes` | Passed after filesystem approval. |
| `npm install` | Failed initially with `ERESOLVE` due `@eslint/js@latest` resolving to `10.0.1` with peer `eslint@^10.0.0` while root uses `eslint@^9.39.4`. Passed after the dependency pin. |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed. |
| `npm run build` | Passed. Next.js emitted the existing `middleware` file convention deprecation warning. |
| `npm run validate:courses` | Passed. |
| `npm run validate:content` | Passed. |
| `npm run validate:mcqs` | Passed. Validator reports 570 missing answer keys, but zero invalid answer keys and exits successfully. |
| `npm run validate:certificates` | Passed. |
| `npm run test:e2e` | Passed: 68 passed, 8 skipped. |

## E2E Coverage

Automated Playwright coverage includes:

- Public page rendering and aliases for home, about, contact, legal pages, micro-credentials, and micro-programmes.
- Auth page rendering for sign-in, register, reset password.
- Protected-route redirects for `/dashboard`, `/account`, and `/learn/[slug]` with `next` parameters.
- Open-redirect guard for `/auth/callback`.
- Courses catalogue, search empty state, programme catalogue, and detail page rendering.
- Anonymous enrolment API rejection for course and programme enrolment.
- Anonymous certificate download rejection and unknown certificate verification state.
- Responsive horizontal-overflow checks across mobile, tablet, and desktop.
- Mobile navigation open/close behavior.

## Bugs Found

1. `npm install` was broken by an unstable `latest` dev dependency:
   - Root cause: `@eslint/js` resolved to `10.0.1`, whose optional peer expects ESLint 10, while the project uses ESLint 9.
   - Impact: A clean install could fail before lint/build/tests.

No functional app bugs were found by the automated E2E suite or validation commands.

## Bugs Fixed

1. Pinned `@eslint/js` to `^9.39.4` to match the configured ESLint major version.
2. Regenerated `package-lock.json` through `npm install`.

## Files Changed

- `package.json`
- `package-lock.json`
- `docs/CODEX_E2E_QA_REPORT.md`

## Tests Rerun After Fix

After the dependency fix:

- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run validate:courses`
- `npm run validate:content`
- `npm run validate:mcqs`
- `npm run validate:certificates`
- `npm run test:e2e`

## Skipped Tests and Limitations

Skipped Playwright tests:

- 6 authenticated dashboard tests across desktop and mobile.
- 2 authenticated learning-player tests across desktop and mobile.

Reason: `BMS_LOGIN_USERNAME` and `BMS_LOGIN_PASSWORD` were not set in the environment. These tests require live authenticated access and some of the requested full learner journeys require mutating enrolment/progress/certificate data. Per the QA instructions, credentials were not faked and no temporary credentials were committed.

Additional limitations:

- Full authenticated enrolment persistence, dashboard enrolled state, learning-player progress, one-attempt MCQ behavior, certificate eligibility/download, and duplicate certificate prevention were not executed without a configured test user and safe test database state.
- Build reports `.env.local` is present locally, but it was not printed or committed.
- Next.js build emits a deprecation warning for the `middleware` file convention. This is not a runtime failure and was not changed during this bug-only pass.
- `npm install` reports 2 moderate npm audit findings. No broad dependency upgrade was applied because that would exceed the minimal bug-fix scope.

## Security and Redirect Checks

Secret pattern scan was run for the explicit credential strings and Supabase service-role patterns requested in the QA brief, plus `.env.local`, `node_modules`, and `.next` references.

No matching committed source content was found outside ignored dependency/build locations for the explicit credential strings. The server-side Supabase admin key is referenced only as an environment variable in the account deletion API and is not exposed client-side.

Redirect/link scan was run for:

- `window.location`
- `next=`
- `redirect`
- `boostmyskills.eu`
- `apps.boostmyskills.eu`

Findings were consistent with existing architecture: local redirects use app routes, auth `next` handling is guarded by `safeNextPath`, and legacy BoostMySkills URLs remain in docs, scripts, asset/source metadata, or explicit external reference fields rather than as primary local navigation. Existing validators also passed `no primary nav href to boostmyskills.eu`.

## Final Readiness Status

Status: ready to review and merge after the commit is inspected.

The app builds, lints, typechecks, validates course/content/MCQ/certificate metadata, and passes the available unauthenticated E2E suite. Authenticated learner database flows still require real test credentials and safe test data before they can be marked fully executed.
