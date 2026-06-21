# Live Course Structure Audit

Reference: `https://apps.boostmyskills.eu/` (learner app, Open edX MFE) and the public
`https://boostmyskills.eu/courses` listing + `/courses/<id>/about` pages.

## Routes inspected (public, no login)

- `/courses` — course discovery/listing (cards + refine sidebar).
- `/courses/course-v1:<ORG>+<CODE>+<RUN>/about` — per-course about page: hero (image, title,
  "by <org>", Enrol), **Context and overview**, **Learning objectives**, **Background**, a sidebar
  **Sections** list (the unit/module outline), workload, and "Created and delivered by".
- `apps.boostmyskills.eu/learner-dashboard` and `/account` — auth-gated learner app (Open edX MFE).

## What is public vs auth-gated

| Data | Source | Access |
| --- | --- | --- |
| Title, org, code, project, image | `/courses` + `/about` | public ✓ (already in `courses-catalogue.ts`) |
| Overview / Objectives / Background | `/about` | public ✓ (in `courses-content.ts`) |
| Section/unit **titles** (outline) | `/about` sidebar "Sections" | public ✓ (`modules` in `courses-content.ts`) |
| **Unit bodies, YouTube videos, quizzes** | course player inside the learner app | **auth-gated** (login required) |
| Enrolment / progress | learner app | auth-gated |

## Course player layout (to mirror locally)

- App header (logo, My courses, Catalogue, user menu) — already built as `LearnerHeader`.
- Left unit/section navigation with completion ticks.
- Main content area per unit; previous/next; mark-complete.
- Unit types observed on Open edX: **video** (YouTube embed), **text/HTML**, **problem/quiz**
  (multiple-choice etc.), and reading/resource blocks.

## Programme → micro-credential relationship

Each **micro-programme** bundles ~9–10 **micro-credentials** (its credential list). Enrolling in a
programme enrols the learner in all of its micro-credentials. Captured locally in
`src/data/programme-courses.ts` (10 programmes → their course slugs, 98/100 titles matched; the 2
unmatched are credentials without a standalone course among the 77 — documented).

## Enrolment behaviour (local implementation, Step 1)

- **Single micro-credential:** `POST /api/courses/enrol` → row in `course_enrolments`
  (`source = 'direct'`). Detail/learn Enrol button → on success "Go to course" → `/learn/[slug]`.
- **Micro-programme:** `POST /api/programmes/enrol` → row in `programme_enrolments` **and**
  auto-enrols every associated micro-credential into `course_enrolments` (`source = 'programme'`),
  idempotent (existing direct enrolments preserved).
- Logged-out access to `/learn/[slug]` → redirect to `/auth/sign-in?next=/learn/[slug]`.

## Step 2 (next): authenticated content scrape

With the provided login (stored only in `.env.local`, never committed), scrape each of the 77
courses' player to capture per-unit **YouTube IDs, text bodies, and quiz questions/options**, then
extend `src/lib/learn.ts` / a `course-content` data set so the player renders real videos/quizzes.
