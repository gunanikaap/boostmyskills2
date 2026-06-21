# Learning Player Fix Report

Fixes three issues visible in the live BoostMySkills/Open edX course player vs. our local
`/learn/[slug]`: the missing **Serious Game** interactive unit, **quiz answer checking**
(Positive Energy Districts Exercise 1.2.1), and **question grouping** (one page per question →
one page per quiz set). Applied through the data model, so it covers **all 77 micro-credentials**.

## 1. Unit types in the live player

| Type | Source | Local rendering |
| --- | --- | --- |
| Text / reading | scraped course overview/objectives/background | `reading` unit (paragraphs + bullets) |
| Video | Open edX blocks API → YouTube id | `video` unit (youtube-nocookie iframe) |
| Quiz / exercise (single) | problem_get handler → prompt + options | `quiz` unit with 1 question |
| Grouped quiz / test / final exam | a run of problem units in one sequence | **`quiz` unit with N questions on one page** |
| Interactive / external game (LTI) | not exposed by the REST APIs | `interactive` activity card (Play → live) |
| Graded exercise (unparseable) | 2 problems that didn't parse | `exercise` card |

Progress: the live player counts **completed components / total components** (e.g. "8 / 113").
We count **completed units / total units** in the sidebar; because we group questions, our total
is lower than the live per-component total — this is expected and documented (see §7).

## 2. Serious Game interactive unit

The live Serious Game (Artemat · MC10 | RES4CITY) has one interactive activity: a white card with
the title **Serious Game**, a green **Play** button, a yellow **Status: Started** badge, and the
helper text *"Please refresh to see your updated score."* It is an **external LTI game** and is not
returned by the blocks/problem APIs, so it was missing locally.

It is now defined in **`src/data/learn-extras.ts`** as an `interactive` unit and injected by
`getLearnUnits()` after the course's "Serious Game" section. The exact block was captured from the
live blocks API (`serious_game_xblock`, see `docs/LEARNING_ACTIVITY_LINKS.md`):

```ts
{ section: "Serious Game", title: "Serious Game", activityType: "external-game",
  launchLabel: "Play", status: "Started",
  helperText: "This interactive game opens in the original BoostMySkills learning platform…",
  externalLaunchUrl: "https://boostmyskills.eu/courses/course-v1:Artemat+MC10_RES4CITY+2025_T01/jump_to/block-v1:…serious_game_xblock+block@842789e2ee504fd4b860ece9fc33154a" }
```

`InteractiveActivity` in `course-player.tsx` renders the exact card. The game is a custom
server-rendered XBlock gated by auth + `X-Frame-Options`, so it can't be embedded; **Play opens the
EXACT activity deep-link in a new tab** (`jump_to/<block>`), landing on the Serious Game unit in the
live player — not the home/catalogue/course shell. If a future unit has a public embeddable source,
set `embedUrl` and the player embeds it inline instead. This is the only learning unit that links
out; the rest of the flow stays local.

## 3. Positive Energy Districts — Exercise 1.2.1 answer fix

Section **"Urban energy transitions: an overview"**, Exercise 1.2.1, question *"Which of these
topics needs to be addressed during the energy transition?"* — verified correct answer is
**"All of the above."** (option index 3). Seeded in **`src/data/quiz-answers.ts`** and matched to
the question by its exact prompt. Now:

- selecting an option highlights it;
- **Check answer** validates against the key;
- correct → green "Correct." with explanation; wrong → red "Not quite. Correct answer: All of the
  above." + the correct option is highlighted green, the wrong pick red;
- the generic "graded inside BoostMySkills" note appears **only** when no key exists.

## 4. Quiz grouping data model change (`src/lib/learn.ts`)

`getLearnUnits()` now collapses a run of quiz questions into one `quiz` unit:

```ts
type LearnUnit = … | { id; title; type: "quiz"; questions: QuizQuestion[]; section? } | …
type QuizQuestion = { id; prompt; options; multiple; correct?: number[]; explanation? }
```

Grouping rule: a **meaningful** title ("Exercise 1.2.1", "Final test", "Test module 4") starts a
new set; generic titles ("Question", "Multiple Choice", "Exercise - multiple choice") **append** to
the open set. Any non-quiz unit (video/exercise/interactive) closes the set. Generic-led sets with
no meaningful title fall back to "Exercise N" (or "Section — Exercise N"). Answer keys are attached
per question from `quiz-answers.ts`.

Result across all 77 courses: **568 quiz sets**, **2262 questions**, **0** generic "Question"
sidebar items remaining.

## 5. Sidebar rendering change

The sidebar lists each unit **once** by its real title — videos by lesson title, quiz sets by their
set title (e.g. "Exercise 1.2.1", "Final test"), interactive units by their name. Completed = green
check, incomplete = grey dot, active = pale-green background + green text. No more repeated
"Question" entries (a quiz of 10 questions is **one** "Final test" row, not 10).

## 6. Quiz renderer changes (`QuizSet` in `course-player.tsx`)

- Renders **all questions in the set on one page**, each with "Question N" + "Select one/all" hint.
- Single-choice → radio, multiple-choice → checkbox; per-question selection state.
- **Check answer(s)** button (enabled once anything is answered).
- Per-question feedback: correct / incorrect (+ correct option shown) / "recorded" when no key.
- Explanation shown when present.

## 7. Progress tracking

Unchanged transport: **Mark as complete** → `POST /api/courses/progress` → `course_progress`
(`user_id, course_slug, unit_id`, unique). The sidebar count and dashboard progress bar
(completed units ÷ total units) update from this table. Because questions are grouped, "total
units" is the count of sets/videos, not individual components, so our totals are smaller than the
live per-component "X / 113". Enrolment and dashboard were not touched.

## 8. Coverage

- **77 / 77** courses run through the new grouped model (see `docs/COURSE_CONTENT_AUDIT.md`,
  regenerated by `npm run audit:courses`).
- **62** courses have full scraped video/quiz content; **15** RESSKILL courses (blocks API 500)
  fall back to reading + outline.
- **1** interactive unit (Serious Game). **1** verified answer key (PED Exercise 1.2.1).

## 9. Courses with missing answer keys

All quiz courses except the one verified PED key. Open edX does not expose correct answers via the
learner REST APIs (graded server-side on submit), so keys can only be added when individually
verified. The renderer degrades gracefully (records the selection + self-check note). Add more keys
incrementally in `src/data/quiz-answers.ts` — no code change needed.

## 10. Tested routes

- `/learn/positive-energy-districts` — Exercise 1.2.1 grouped (3 questions), "All of the above"
  marked correct, wrong picks flagged; "Final test" is one entry with 10 questions.
- `/learn/serious-game` — interactive Serious Game card with Play / Status: Started / helper text.
- `/learn/advanced-modelling-of-buildings-and-energy-systems` — 9 grouped quiz sets, no generic rows.
- `/dashboard` — progress bar reflects completed units.

## 11. Build results

- `npm run lint` → pass · `npm run typecheck` → pass · `npm run build` → pass · `npm run
  validate:courses` → pass · `npm run audit:courses` → 0 generic items.
