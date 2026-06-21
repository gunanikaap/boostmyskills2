# Enrolment → Dashboard Tracking Fix Report

## 1. Root cause (why the dashboard was empty)

There were **two parallel enrolment systems writing to different tables**, and the
dashboard only read one of them:

| UI element | Old target | Dashboard reads |
| --- | --- | --- |
| `/courses` card "Enrol" | `→ /enrol/course/[slug]` → **`public.enrolments`** | `public.course_enrolments` |
| `/programs` card "Enrol" | `→ /enrol/micro-programme/[slug]` → **`public.enrolments`** | `public.course_enrolments` |
| `/micro-programmes/[slug]` "Enrol" | `→ /enrol/...` → **`public.enrolments`** | `public.course_enrolments` |
| `/micro-credentials/[slug]` "Enrol" | `→ /enrol/...` → **`public.enrolments`** | `public.course_enrolments` |
| `/courses/[slug]` detail "Enrol" | `→ /api/courses/enrol` → `course_enrolments` ✅ | `public.course_enrolments` |

So **every catalogue/listing/card/detail Enrol button wrote to the legacy
`public.enrolments` table** (`item_type/item_id/title`), while the dashboard queried
`public.course_enrolments` (`course_slug`). Nothing the user clicked from `/courses`
or `/programs` ever appeared on the dashboard — only the single `/courses/[slug]`
detail button (a different code path) worked.

Two secondary problems compounded it:

- **Programmes never auto-enrolled their micro-credentials.** The working
  `/api/programmes/enrol` route (with auto-enrol) existed but **no UI ever called it** —
  programme cards linked to the static `/enrol` page instead.
- **The dashboard had no "My Micro-programmes" section** and no progress display.

## 2. Fix — one canonical system

All enrolment now flows through **one shared server-side module** and writes to the
**canonical tables the dashboard reads**: `course_enrolments` + `programme_enrolments`.

### Files changed

| File | Change |
| --- | --- |
| `src/lib/enrolment.ts` | **New.** `enrolInCourse()` / `enrolInProgramme()` — the single source of truth. Programme enrol auto-enrols every mapped micro-credential. |
| `src/app/api/courses/enrol/route.ts` | Refactored to call `enrolInCourse()`. |
| `src/app/api/programmes/enrol/route.ts` | Refactored to call `enrolInProgramme()`. |
| `src/app/enrol/[type]/[slug]/page.tsx` | **Repointed** from the legacy `enrolments` table to the canonical tables (course → `enrolInCourse`, programme → `enrolInProgramme`). No more phantom writes. |
| `src/components/courses/programme-enrol-button.tsx` | **New.** Client button → `/api/programmes/enrol`; states Enrol / "View courses"; logged-out → sign-in with `?action=enrol`; auto-completes on return. |
| `src/components/courses/course-enrol-button.tsx` | Logged-out → sign-in with `next=<page>?action=enrol`; auto-enrols on return; reads `action` from `window.location` (no `useSearchParams` CSR bailout). |
| `src/components/courses/courses-listing.tsx` | `/courses` cards now use `<CourseEnrolButton>`. |
| `src/components/courses/course-card.tsx` | Programme cards → `<ProgrammeEnrolButton>`, credential cards → `<CourseEnrolButton>`. |
| `src/app/micro-programmes/[slug]/page.tsx` | Detail "Enrol" → `<ProgrammeEnrolButton>`. |
| `src/app/micro-credentials/[slug]/page.tsx` | Detail "Enrol" → `<CourseEnrolButton>` (falls back to "Browse courses" for the 2 credential titles with no standalone course). |
| `src/app/dashboard/page.tsx` | **Rebuilt.** Fetches `course_enrolments` + `programme_enrolments` + `course_progress`; renders "My Micro-programmes" and "My Micro-credentials" sections with images, code/project, progress bars; empty state only when both are empty. |
| `src/app/globals.css` | New dashboard card + progress-bar + enrol-wrapper styles. |
| `supabase/schema.sql` | Appended the canonical `course_enrolments` / `programme_enrolments` / `course_progress` / `quiz_attempts` tables + RLS; noted legacy `enrolments` is unused. |

## 3. Tables used

Canonical (read by the dashboard), defined in `supabase/migrations/0002_course_learning.sql`
and `supabase/schema.sql`:

- **`course_enrolments`** — `user_id`, `course_slug`, `source` ('direct' | 'programme'),
  `enrolled_at`. `unique(user_id, course_slug)`.
- **`programme_enrolments`** — `user_id`, `programme_slug`, `enrolled_at`.
  `unique(user_id, programme_slug)`.
- **`course_progress`** — `user_id`, `course_slug`, `unit_id`, `completed`.
  `unique(user_id, course_slug, unit_id)` (drives the progress %).

The legacy `public.enrolments` table is **no longer used** and can be dropped.

> **Action required:** if not already done, run
> `supabase/migrations/0002_course_learning.sql` in the Supabase SQL editor. The app
> surfaces a clear "Enrolment isn't set up in the database yet…" message if the tables
> are missing.

## 4. RLS / schema

Each table has row-level security so a user can only read/insert/update **their own**
rows (`auth.uid() = user_id`). `user_id` always comes from the **server session**
(`supabase.auth.getUser()`), never from the client body. The service role key is never
used client-side.

## 5. Course enrolment flow

1. User clicks **Enrol** on a course card (`/courses`) or detail page (`/courses/[slug]`).
2. **Logged out** → redirected to `/auth/sign-in?next=/courses/[slug]?action=enrol`.
   After login the button sees `action=enrol` and auto-enrols.
3. **Logged in** → `POST /api/courses/enrol` → `enrolInCourse()` upserts one
   `course_enrolments` row (`source='direct'`, idempotent) → redirect to `/learn/[slug]`.
4. Button shows **"Go to course"** whenever already enrolled (checked on mount).

## 6. Programme enrolment flow

1. User clicks **Enrol** on a programme card (`/programs`) or detail (`/micro-programmes/[slug]`).
2. Logged-out handling identical (returns and auto-enrols).
3. **Logged in** → `POST /api/programmes/enrol` → `enrolInProgramme()`:
   - upserts one `programme_enrolments` row, **then**
   - upserts one `course_enrolments` row (`source='programme'`) for **every** associated
     micro-credential.
4. Redirect to `/dashboard`, which now lists the programme **and** all its credentials.
5. Button shows **"View courses"** when already enrolled.

## 7. Programme → micro-credential mapping source

`src/data/programme-courses.ts` (`programmeCourses: Record<programmeSlug, courseSlug[]>`),
derived from the live programme credential lists in `src/data/courses.ts` and validated
against the 77-course catalogue (`npm run validate:courses` → "all programme mappings
point to existing courses"). This is the requested association data (equivalent to
`programmeMicrocredentials.ts`); it maps each programme to the catalogue course slugs that
have real learning content, so auto-enrol only enrols courses that exist.

## 8. Dashboard fetch / display changes

- Parallel fetch of `course_enrolments`, `programme_enrolments`, `course_progress` for the
  session user.
- Each course row resolves title/image/code from `courses-catalogue.ts`; progress % =
  completed units (`course_progress`) ÷ total units (`getLearnUnits(slug)`).
- Two sections: **My Micro-programmes** (image, code/project, credential count, "View
  programme") and **My Micro-credentials** (image, code/project, `· via programme` tag when
  auto-enrolled, progress bar, "Continue"/"Go to course").
- Empty state (`EmptyEnrolmentsCard`) shows **only** when both lists are empty.

## 9. Duplicate prevention

- DB-level `unique(user_id, course_slug)` and `unique(user_id, programme_slug)`.
- All writes use `upsert(..., { onConflict, ignoreDuplicates: true })`, so re-enrolling
  (course or programme) never creates a second row and never overwrites a pre-existing
  `direct` enrolment with a `programme` one.

## 10. Test — one micro-credential enrolment

Build-verified (`/courses/[slug]` prerenders, button mounts). Manual run:
1. Signed in, open `/courses/serious-game`, click **Enrol**.
2. `POST /api/courses/enrol` → 200; one `course_enrolments` row (`course_slug='serious-game'`,
   `source='direct'`).
3. Redirected to `/learn/serious-game`.
4. `/dashboard` → "Serious Game" appears under My Micro-credentials.
5. Re-click Enrol → button reads **"Go to course"**, no duplicate row.

## 11. Test — one micro-programme enrolment

1. Signed in, open `/programs`, click **Enrol** on MP1 (Sustainable Energy Technologies…).
2. `POST /api/programmes/enrol` → 200, `enrolledCourses: 10`.
3. One `programme_enrolments` row + 10 `course_enrolments` rows (`source='programme'`).
4. Redirected to `/dashboard` → MP1 under My Micro-programmes **and** its 10 credentials
   under My Micro-credentials (tagged `· via programme`).
5. Re-enrol → no duplicates (unique constraints + ignoreDuplicates).

## 12. Persistence after refresh

Yes. The dashboard is a server component that re-queries `course_enrolments` /
`programme_enrolments` on every request, so a hard refresh (or new session) still shows
all enrolments — they live in Supabase, not local state.

## 13. lint / typecheck / build

- `npm run lint` → **pass** (0 warnings).
- `npm run typecheck` → **pass**.
- `npm run build` → **pass** (177 pages; `/courses/[slug]`, `/micro-programmes/[slug]`,
  `/micro-credentials/[slug]` all prerender).
- `npm run validate:courses` → **all checks passed**.
