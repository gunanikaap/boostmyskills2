# Final End-to-End Test Plan

Coverage map for the BoostMySkills rebuild before the Git branch. Each case is marked:

- **[A]** Automated — covered by a Playwright spec in `tests/e2e/`.
- **[A-gated]** Automated but credential-gated — runs only when `BMS_LOGIN_USERNAME` /
  `BMS_LOGIN_PASSWORD` are present in the test-runner environment (live Supabase + a confirmed test
  account). Skipped by default.
- **[M]** Manual — requires a live signed-in learner and database state; not safely automatable
  without mutating production data.

Run automated coverage with `npm run test:e2e`. Results are recorded in
[`FINAL_E2E_TEST_RESULTS.md`](./FINAL_E2E_TEST_RESULTS.md).

> Route note: the canonical pages are `/courses` (micro-credential catalogue), `/programs`
> (micro-programme catalogue), `/privacy`, `/cookie_policy`, `/tos`, `/auth/sign-in`,
> `/auth/register`. The friendly aliases `/micro-credentials`, `/micro-programmes`,
> `/privacy-policy`, `/cookie-policy`, `/terms-and-conditions`, `/login`, `/register` **redirect** to
> them.

---

## A. Public pages — `public-pages.spec.ts`

| Case | Type |
| --- | --- |
| Home renders (hero, trending programmes, CTA links) | [A] |
| About renders (h1) | [A] |
| Contact renders + enquiry form (email field, Submit) | [A] |
| Privacy Policy renders | [A] |
| Cookie Policy renders | [A] |
| Terms and Conditions renders | [A] |
| Programmes catalogue renders | [A] |
| Courses / Micro-credentials catalogue renders | [A] (see section C/courses) |
| Course detail page renders title + content | [A] (`courses.spec.ts`) |
| Footer present with links | [A] |

## B. Auth — `auth.spec.ts`

| Case | Type |
| --- | --- |
| Sign-in page renders | [A] |
| Register page renders | [A] |
| Reset-password route renders | [A] |
| Sign in with email | [A-gated] / [M] |
| Sign in with username (resolves via `email_for_username` RPC) | [A-gated] / [M] |
| Sign out | [A-gated] (`dashboard.spec.ts`) / [M] |
| Email confirmation flow | [M] (needs a real inbox + Supabase email) |
| Auth redirect preserves `next` param | [A] |
| `next` cannot open-redirect to an external site | [A] (callback) |
| Confirm with no token redirects to sign-in | [A] |

## C. Dashboard — `dashboard.spec.ts`

| Case | Type |
| --- | --- |
| Protected when signed out (redirect to sign-in) | [A] |
| Empty state (no enrolments) | [M] |
| Enrolled micro-credentials state | [M] |
| Enrolled micro-programmes state | [M] |
| User dropdown (Account + Sign Out) | [A-gated] |
| My courses dropdown | [A-gated] |
| Catalogue dropdown | [A-gated] |
| Footer links | [A] (`public-pages.spec.ts`) |

## D. Enrolment — `enrolment.spec.ts`

| Case | Type |
| --- | --- |
| Enrol control present on micro-credential detail | [A] |
| Enrol control present on micro-programme detail | [A] |
| Course enrol API rejects anonymous POST (401/503) | [A] |
| Programme enrol API rejects anonymous POST (401/503) | [A] |
| Enrol in a micro-credential → lands in player | [M] |
| Enrol in a micro-programme → auto-enrols its micro-credentials | [M] |
| Duplicate enrolment prevention (idempotent upsert) | [M] |
| Dashboard updates after enrolment | [M] |
| Enrolments persist after refresh | [M] |

## E. Learning player — `learning-player.spec.ts`

| Case | Type |
| --- | --- |
| Course access protection (signed out → sign-in, with `next`) | [A] |
| Signed-in but not-enrolled → enrolment gate, not the player | [A-gated] |
| Sections / sidebar render | [M] |
| Video unit (embed + 90% auto-complete) | [M] |
| Text/reading unit | [M] |
| Quiz / MCQ unit (single + multiple answer) | [M] |
| Grouped quiz/test unit (one sidebar entry, many questions) | [M] |
| One-attempt rule (locks after submit; re-submit returns stored answer) | [M] |
| Correct / wrong feedback | [M] |
| Progress update (mark complete) | [M] |
| Completion percentage recalculation | [M] |

## F. Certificates — `certificates.spec.ts`

| Case | Type |
| --- | --- |
| Download API rejects anonymous requests (401/403/503) | [A] |
| Verify page handles an unknown hash gracefully | [A] |
| Locked before eligibility | [M] |
| Unlocked after requirements met | [M] |
| MCQ courses require ≥ 50% (`MCQ_PASS_PERCENT`) | [M] + guarded by `validate:certificates` |
| Video-only courses require all videos | [M] + guarded by `validate:certificates` |
| Certificate PDF downloads | [M] |
| Existing certificate reused (idempotent number/hash) | [M] |

## G. Account

| Case | Type |
| --- | --- |
| Account page protection (signed out → sign-in) | [A] (`auth.spec.ts` protected paths) |
| Profile display | [M] |
| Edit profile / settings | [M] |
| Reset password from account | [M] |
| Delete account flow | [M] (documented in `docs/ACCOUNT_DELETION_FLOW.md`) |

## H. Responsive — `responsive.spec.ts`

| Case | Type |
| --- | --- |
| Desktop (1280px) — no horizontal overflow | [A] |
| Tablet (820px) — no horizontal overflow | [A] |
| Mobile (390px) — no horizontal overflow | [A] |
| Mobile header / nav opens and closes | [A] |
| Dropdowns work | [A] (mobile nav) / [A-gated] (learner header) |

## I. Performance

| Case | Type |
| --- | --- |
| Dashboard render (server-side, parallel queries) | [M] / reviewed |
| Courses page render | [A] (renders within prod test budget) |
| Learning page render (`getLearnUnits` memoised per slug) | [M] / reviewed |
| No repeated API spam (enrol button checks once per slug) | [M] / reviewed |
| No hydration errors (console clean) | [M] / spot-checked |

---

## Manual test checklist (run signed in, against a disposable test account)

1. Register a new account → confirm email (if enabled) → land on dashboard (empty state).
2. Enrol in one micro-credential from `/courses/<slug>` → redirected into `/learn/<slug>`.
3. In the player: open a video, watch ≥ 90% → unit auto-marks complete; mark a reading unit
   complete; answer an MCQ → it locks and shows correct/incorrect; reload → answer still locked.
4. Enrol in a micro-programme from `/micro-programmes/<slug>` → dashboard shows the programme and all
   auto-enrolled micro-credentials; refresh → still present; re-enrol → no duplicates.
5. Complete an MCQ course's requirements → certificate panel unlocks → download PDF → open the
   verify URL on the PDF and confirm it validates; download again → same certificate number.
6. Account page: view profile, change password, sign out.
7. Mobile (≤ 400px): navigate every page, open/close nav and dropdowns, confirm no sideways scroll.
