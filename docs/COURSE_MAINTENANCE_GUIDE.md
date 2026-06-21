# Course Maintenance Guide

How to **add, edit and remove** micro-credentials, micro-programmes, videos, MCQs, quizzes,
interactive activities and certificate rules in this project — for future university partners and
maintainers.

> Golden rule: course data is **static TypeScript** under `src/data/`. The app never loads course
> content from the database, and all of it is server-rendered (it never ships to the browser). After
> any change, run the validators in [section 12](#12-required-commands-before-every-commit) — they
> catch the vast majority of mistakes before they reach a learner.

---

## 1. Where course data lives

| What | File | Notes |
| --- | --- | --- |
| Course summaries (catalogue) | `src/data/courses-catalogue.ts` | 77 micro-credentials: slug, org, code, project, title, image. |
| Micro-programmes + credential lists | `src/data/courses.ts` | Programme objects + derived micro-credentials. |
| Full "about" content | `src/data/courses-content.ts` | Overview / objectives / background sections + sidebar module list. |
| Learning units (videos, quizzes, exercises) | `src/data/course-learning.ts` | Per-course sections → ordered units. |
| MCQ answer keys | `src/data/quiz-answers.ts` | Correct option indices, matched to a question by its prompt. |
| Interactive / external activities | `src/data/learn-extras.ts` | Serious Game and similar embed/launch units. |
| Certificate rules | `src/data/certificate-rules.ts` | Per-course `rule` + video/MCQ/content counts. |
| Programme → micro-credential mapping | `src/data/programme-courses.ts` | Drives programme **auto-enrolment**. |
| Navigation / footer | `src/data/navigation.ts` | Header + footer links. |
| Programme images / brand assets | `public/images/`, `public/logos/`, `public/icons/` | Programme art lives in `public/images/programmes/`. Micro-credential card images are remote URLs on the catalogue's `image` field. |

The reusable accessors (use these, never hand-roll lookups) live in `src/data/*` and `src/lib/*`:

- `getCourseBySlug(slug)`, `getCourseByLegacyId(legacyId)`, `coursesCatalogue`, `courseFacets` — `courses-catalogue.ts`
- `getProgrammeBySlug(slug)`, `getMicroCredentialBySlug(slug)`, `publishedProgrammes`, `microCredentials`, `slugify()` — `courses.ts`
- `getCourseContent(slug)` — `courses-content.ts`
- `getCourseLearning(slug)` — `course-learning.ts`
- `getAnswerKey(slug, prompt)` — `quiz-answers.ts`
- `getInteractiveUnits(slug)` — `learn-extras.ts`
- `getCertificateRule(slug)`, `MCQ_PASS_PERCENT` — `certificate-rules.ts`
- `getProgrammeCourseSlugs(programmeSlug)` — `programme-courses.ts`
- `getLearnUnits(slug)` — `src/lib/learn.ts` (assembles everything below into the ordered player units)
- `calculateCourseCompletion()`, `evaluateEligibility()` — `src/lib/completion.ts`
- `enrolInCourse()`, `enrolInProgramme()` — `src/lib/enrolment.ts`

---

## 2. Course summary fields (`courses-catalogue.ts` → `CourseListing`)

```ts
export type CourseListing = {
  slug: string;        // URL id, kebab-case, MUST be unique. Used by /courses/<slug>, /learn/<slug>.
  org: string;         // Delivering organisation, e.g. "University of Coimbra".
  code: string;        // Course code, e.g. "MC13". Printed on the certificate.
  project: string;     // Funding project label, e.g. "RES4CITY" / "SHERLOCK" / "COSS".
  title: string;       // Display title.
  image: string;       // Card/hero image URL (remote LMS asset URL or a local /images/... path).
  externalUrl: string; // OPTIONAL reference to the original LMS course. NEVER used for navigation.
};
```

`slug` is the single source of identity — it links the catalogue entry to its content, learning
units, answer keys, certificate rule and (optionally) a programme mapping. Keep it stable: changing a
slug orphans existing enrolments and certificates stored against the old slug.

### Programme fields (`courses.ts` → `Programme`)

```ts
type Programme = {
  id: string;                  // stable uuid
  code: string;                // e.g. "MP1"
  project: string;             // funding project
  title: string;
  slug: string;                // URL id for /programs and /micro-programmes/<slug>
  description: string;
  image: string;               // /images/programmes/<file>
  duration: string;            // e.g. "Self-paced"
  provider: string;
  credentialTitles: string[];  // the micro-credentials shown on the programme
  externalEnrolmentUrl: string;// reference only
  status: "published" | "draft";// only "published" shows in the catalogue
  sortOrder: number;
};
```

Micro-credentials (`MicroCredential`) are **derived automatically** from the unique
`credentialTitles` across all programmes and linked back to their programmes — you normally do not
edit `microCredentials` by hand.

---

## 3. Full learning content fields

### About-page content (`courses-content.ts` → `CourseContent`)

```ts
type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type ContentSection = { title: string; blocks: ContentBlock[] };

type CourseContent = {
  contentSections: ContentSection[]; // Overview, Learning objectives, Background, ... (in order)
  modules: string[];                 // numbered "Sections" list shown in the detail sidebar
  workload: string | null;           // e.g. "20 hours" (or null)
  createdBy: string | null;          // delivering author/org line (or null)
};
```

`contentSections` are shown on the course detail page **and** as the first "reading" units in the
learning player.

### Learning units (`course-learning.ts`)

```ts
type LearnVideo    = { t: string; y: string };                            // title + YouTube id
type LearnQuiz     = { t: string; q: { p: string; o: string[]; m: 0 | 1 } }; // one MCQ
type LearnExercise = { t: string; x: 1 };                                 // graded exercise placeholder
type LearnSectionData = { title: string; units: (LearnVideo | LearnQuiz | LearnExercise)[] };
```

- `t` = unit title, `y` = YouTube video id, `p` = question prompt, `o` = options array,
  `m` = `1` for "select all that apply" (multiple), `0` for single-answer.
- `getLearnUnits(slug)` in `src/lib/learn.ts` assembles: reading units (from `contentSections`) →
  videos / grouped quizzes / exercises (from `course-learning.ts`) → interactive units (from
  `learn-extras.ts`), attaching correct answers from `quiz-answers.ts`.

---

## 4. Add a new micro-credential — step by step

1. **Image** — put a local image in `public/images/...` (or use the remote LMS asset URL).
2. **Catalogue entry** — add a `CourseListing` object to `coursesCatalogue` in
   `src/data/courses-catalogue.ts` with a **unique** `slug`.
3. **About content** — add a `CourseContent` entry keyed by the slug to `coursesContent` in
   `src/data/courses-content.ts` (at least one `contentSections` entry).
4. **Learning units** — add a `LearnSectionData[]` entry keyed by the slug to `courseLearning` in
   `src/data/course-learning.ts` (videos, quizzes, exercises). See [section 5](#5-add-youtube-videos)
   and [section 6](#6-add-mcqs).
5. **MCQ answer keys** — add an `AnswerKey[]` entry keyed by the slug to `quizAnswers` in
   `src/data/quiz-answers.ts` (see [section 6](#6-add-mcqs)).
6. **Certificate rule** — add a `CertificateRuleMeta` entry keyed by the slug to `certificateRules`
   in `src/data/certificate-rules.ts`, **or** regenerate with `node scripts/gen-certificate-rules.mjs`.
   See [section 11](#11-update-an-existing-course) for the rule meaning.
7. **Programme link (optional)** — if it belongs to a micro-programme, add its slug to that
   programme's array in `src/data/programme-courses.ts` (see [section 9](#9-link-a-course-to-a-micro-programme)).
8. **Validate** — `npm run validate:courses && npm run validate:content && npm run validate:mcqs && npm run validate:certificates`.
9. **Test the route** — `npm run dev`, then open `/courses/<slug>` (detail) and, after enrolling,
   `/learn/<slug>` (player).

---

## 5. Add YouTube videos

- In `course-learning.ts`, add a unit `{ t: "Video title", y: "<YOUTUBE_ID>" }` to the relevant
  section's `units` array. `y` is the **id only** (the part after `v=`), not a full URL.
- The player embeds it via the privacy-friendly `youtube-nocookie.com` IFrame API
  (`src/components/learn/course-player.tsx`).
- **Completion tracking:** a video auto-marks complete once the learner watches **90%** — no button
  needed. Do not change this threshold without updating `certificate-rules` expectations.
- Avoid: full URLs in `y`, private/unlisted videos, or region-locked content.

---

## 6. Add MCQs

Each MCQ has **two parts**: the question (in `course-learning.ts`) and its answer key (in
`quiz-answers.ts`). They are matched by the **exact prompt text** (whitespace/case-normalised).

**Question** (`course-learning.ts`):

```ts
{ t: "Multiple Choice", q: { p: "Which gas is the primary driver of the greenhouse effect?",
  o: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"], m: 0 } }
```

**Answer key** (`quiz-answers.ts`, under the course slug):

```ts
{ prompt: "Which gas is the primary driver of the greenhouse effect?", correct: [1],
  explanation: "CO2 is the dominant anthropogenic greenhouse gas." }
```

- **Single-choice** (`m: 0`): `correct` must contain **exactly one** index.
- **Multiple-answer / "select all that apply"** (`m: 1`): `correct` may contain several indices.
- **True/False:** model as single-choice with `o: ["True", "False"]` and `correct: [0]` or `[1]`.
- Indices are **0-based** and must be within `o`'s range.
- `explanation` is optional and shown after submission.
- **One-attempt rule:** each question can be answered **once** per learner — enforced by a unique
  DB constraint (`mcq_attempts` on `user_id, course_slug, question_id`) and locked in the UI. The
  server records the attempt and returns the stored answer on any re-submit. Do not try to defeat
  this client-side.
- If an answer key is **missing**, the question still works (the learner's answer is recorded) but
  no correct/incorrect feedback is shown and it does not count toward the MCQ score.
- **Validate:** `npm run validate:mcqs` (cardinality, out-of-range, duplicates) and
  `npm run validate:content` (every answer key matches a real prompt).

---

## 7. Grouped quizzes / tests

The player groups a **run of consecutive MCQs into one quiz unit** (one sidebar entry, all questions
on a single page) so it matches the live course — you do **not** create a sidebar page per question.

How grouping is decided (`src/lib/learn.ts`):

- A question whose title is **generic** (`Question`, `Multiple Choice`, `Quiz`, `Test`,
  `Exercise - Multiple Choice`, ...) is appended to the current quiz set.
- A question whose title is **meaningful** (e.g. `Exercise 1.2.1`, `Final test`) **starts a new
  quiz set**.
- Any non-quiz unit (video/exercise) ends the current set.

So to keep multiple questions on one page, give them generic titles (or the same meaningful lead
title on the first one). To split into separate tests, give the first question of each test a
distinct meaningful title.

---

## 8. Add an interactive activity

For custom xblocks / external games / simulators that are not plain video or MCQ, add an
`InteractiveUnit` to `interactiveUnits` in `src/data/learn-extras.ts`, keyed by the course slug:

```ts
{
  section: "Serious Game",          // places the unit after this scraped section
  title: "Serious Game",
  activityType: "external-game",    // "external-game" | "external-tool" | "video"
  launchLabel: "Play",
  status: "Started",                // optional badge
  helperText: "Opens in the original platform…", // optional
  embedUrl: "https://…",            // use ONLY for a truly embeddable public iframe/video
  externalLaunchUrl: "https://…"    // OR a deep-link to the EXACT live activity (not a course shell)
}
```

- Set **`embedUrl`** only when the source is publicly embeddable; the player renders it in an
  iframe.
- Otherwise set **`externalLaunchUrl`** to the exact activity deep-link (never a generic
  catalogue/home page — `validate:content` rejects that).
- Document the source of any new activity link in `docs/LEARNING_ACTIVITY_LINKS.md`.

---

## 9. Link a course to a micro-programme

1. Add the **micro-credential slug** to the programme's array in `src/data/programme-courses.ts`
   (`programmeCourses["<programme-slug>"]`).
2. Make sure the title also appears in that programme's `credentialTitles` in `src/data/courses.ts`
   (drives the catalogue display).

**Auto-enrolment behaviour:** when a learner enrols in a micro-programme, `enrolInProgramme()`
writes one `programme_enrolments` row **and** one `course_enrolments` row per mapped course
(`source: "programme"`). It is idempotent — existing direct enrolments are preserved, re-enrolling
never duplicates. The dashboard then lists the programme and every auto-enrolled credential.

Validate the mapping with `npm run validate:courses` ("all programme mappings point to existing
courses").

---

## 10. Remove a course safely

1. Remove its `CourseListing` from `coursesCatalogue` (`courses-catalogue.ts`).
2. Remove its `coursesContent[slug]` entry (`courses-content.ts`).
3. Remove its `courseLearning[slug]` and `quizAnswers[slug]` entries.
4. Remove its `interactiveUnits[slug]` entry if present (`learn-extras.ts`).
5. Remove its `certificateRules[slug]` entry (`certificate-rules.ts`).
6. Remove the slug from every array in `programme-courses.ts`, and the title from
   `credentialTitles` in `courses.ts`.
7. Remove the image from `public/images/...` **only if** no other course uses it.
8. **Existing enrolments/certificates:** rows in Supabase keyed by the old slug are not deleted by a
   code change. They become inert (no matching course renders), which is safe. If you must purge
   them, do it deliberately in the database — never hard-delete learner certificates without
   approval.
9. **Validate & test:** run all validators, then check `/courses` and the dashboard render without
   the removed course and without errors.

---

## 11. Update an existing course

- **Title / code / provider / project / image:** edit the `CourseListing` (`courses-catalogue.ts`)
  and, if relevant, the matching `certificateRules[slug]` meta (code/title/org appear on the
  certificate).
- **About content:** edit `coursesContent[slug]`.
- **Videos / quizzes:** edit `courseLearning[slug]`; keep answer keys (`quizAnswers[slug]`) in sync
  by **exact prompt text**.
- **Certificate rule:** the `rule` field controls eligibility —
  - `"mcq"` → all videos complete **and** every MCQ attempted **and** MCQ score ≥ `MCQ_PASS_PERCENT`
    (50%).
  - `"video-only"` → all videos complete.
  - `"content"` → all reading/content units complete.
  After changing video/MCQ counts, regenerate counts with `node scripts/gen-certificate-rules.mjs`
  (or update `totalVideos` / `totalMcqs` / `totalContentUnits` to match) so
  `validate:certificates` passes.
- **Programme association:** edit `programme-courses.ts` (see [section 9](#9-link-a-course-to-a-micro-programme)).

---

## 12. Required commands before every commit

```bash
npm run validate:courses        # 77 credentials, unique slugs, programme mappings, routes
npm run validate:content        # quiz prompts/options, answer keys match real prompts
npm run validate:mcqs           # MCQ cardinality / out-of-range / duplicates + coverage summary
npm run validate:certificates   # per-course rule consistency vs video/MCQ counts
npm run lint                    # eslint, zero warnings
npm run typecheck               # tsc --noEmit
npm run build                   # production build
npm run test:e2e                # Playwright (route protection, public pages, responsive, redirects)
```

(`npm run audit:courses` prints an extra coverage report; `npm run validate:content` is an alias
companion to `validate:mcqs`.)

---

## 13. Common mistakes to avoid

- **Duplicate slugs** — every `slug` must be unique across the catalogue (`validate:courses` checks).
- **Missing / mismatched answer key** — the `prompt` in `quiz-answers.ts` must match the question's
  `q.p` exactly (whitespace/case aside), or feedback and scoring break.
- **Single-choice with multiple correct indices** — `m: 0` questions need exactly one `correct`.
- **Out-of-range answer index** — `correct` indices must fit the `o` options array.
- **Wrong programme mapping** — a slug in `programme-courses.ts` that has no catalogue entry fails
  validation and breaks auto-enrolment.
- **Using a live LMS URL as a primary link** — `externalUrl` / `externalLaunchUrl` are references
  only; internal routes are `/courses/<slug>`, `/learn/<slug>`, `/enrol/<type>/<slug>`.
- **Loading course content client-side** — course data is server-only by design; never import the
  big `courses-content.ts` / `course-learning.ts` / `quiz-answers.ts` into a `"use client"`
  component (it would bloat the browser bundle). Pass already-built props instead.
- **Committing credentials** — never put usernames/passwords/keys in `src/` or `docs/`. Secrets live
  in `.env.local` (gitignored).
- **Accidentally changing certificate rules** — `rule` and `MCQ_PASS_PERCENT` affect who earns a
  certificate; change them only intentionally and re-run `validate:certificates`.

---

## 14. Example course objects

**Catalogue summary** (`src/data/courses-catalogue.ts`):

```ts
{
  slug: "introduction-to-renewable-energies",
  org: "University of Coimbra",
  code: "MC11",
  project: "RES4CITY",
  title: "Introduction to Renewable Energies",
  image: "https://boostmyskills.eu/asset-v1:UCOI+MC11v1+2024_01+type@asset+block@MC11.jpeg",
  externalUrl: "https://boostmyskills.eu/courses/course-v1:UCOI+MC11v1+2024_01/about"
}
```

**About content** (`src/data/courses-content.ts`):

```ts
"introduction-to-renewable-energies": {
  contentSections: [
    { title: "Context and overview", blocks: [
      { type: "paragraph", text: "This micro-credential introduces the core renewable energy sources…" },
      { type: "list", items: ["Solar", "Wind", "Hydro", "Biomass"] }
    ] },
    { title: "Learning objectives", blocks: [
      { type: "list", items: ["Explain each renewable source", "Compare their trade-offs"] }
    ] }
  ],
  modules: ["Solar energy", "Wind energy", "Assessment"],
  workload: "20 hours",
  createdBy: "University of Coimbra"
}
```

**Learning units** (`src/data/course-learning.ts`):

```ts
"introduction-to-renewable-energies": [
  { title: "Solar energy", units: [
    { t: "What is solar PV?", y: "dQw4w9WgXcQ" },
    { t: "Multiple Choice", q: { p: "Which device converts sunlight to electricity?",
      o: ["Turbine", "Photovoltaic cell", "Boiler"], m: 0 } }
  ] }
]
```

**Answer key** (`src/data/quiz-answers.ts`):

```ts
"introduction-to-renewable-energies": [
  { prompt: "Which device converts sunlight to electricity?", correct: [1],
    explanation: "A photovoltaic (PV) cell converts light directly into electricity." }
]
```

**Certificate rule** (`src/data/certificate-rules.ts`):

```ts
"introduction-to-renewable-energies": {
  code: "MC11", title: "Introduction to Renewable Energies", project: "RES4CITY",
  org: "University of Coimbra", totalVideos: 1, totalMcqs: 1, totalContentUnits: 2, rule: "mcq"
}
```
