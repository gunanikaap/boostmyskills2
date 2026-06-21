# Learning Activity Links — live source inspection

Captured from the live BoostMySkills course player via the Open edX **blocks API**
(`/api/courses/v2/blocks/`) using an authenticated session. Login credentials are read only from
gitignored `.env.local` and were never committed or printed. Inspection script:
`scripts/scrape-live.mjs` (output is gitignored).

## Serious Game (interactive)

| Field | Value |
| --- | --- |
| Course slug | `serious-game` |
| Course id | `course-v1:Artemat+MC10_RES4CITY+2025_T01` |
| Unit title | Serious Game |
| Block type | **`serious_game_xblock`** (custom Open edX XBlock — not a video/LTI we can read) |
| Block id | `block-v1:Artemat+MC10_RES4CITY+2025_T01+type@serious_game_xblock+block@842789e2ee504fd4b860ece9fc33154a` |
| `student_view_url` | `https://boostmyskills.eu/xblock/block-v1:…serious_game_xblock+block@842789e2ee504fd4b860ece9fc33154a` |
| `lms_web_url` (jump_to) | `https://boostmyskills.eu/courses/course-v1:Artemat+MC10_RES4CITY+2025_T01/jump_to/block-v1:…serious_game_xblock+block@842789e2ee504fd4b860ece9fc33154a` |
| Embeddable? | **No** — render requires the learner's BoostMySkills session and is protected by `X-Frame-Options`; it is a server-rendered custom XBlock, not a public iframe/video, so no embed URL is exposed. |
| Requires live session/auth? | **Yes** |
| Final local behaviour | **Option B** — Play opens the **exact** activity via the `jump_to` deep-link in a new tab (`rel="noopener noreferrer"`). It lands directly on the Serious Game unit in the live player, **not** the home/catalogue/course shell. Helper text states it opens in the original platform. |

The blocks API returned only two leaf blocks for this course: the `video` "Introduction"
(YouTube `U9mJcwYw9Sc`, already in our data) and the `serious_game_xblock` "Serious Game". There is
no public game/iframe/LTI URL to embed — the game is rendered inside the XBlock on the platform.

## Positive Energy Districts (quiz answer keys)

| Field | Value |
| --- | --- |
| Course id | `course-v1:UPV+MC20v1+2024_01` |
| Problems found (blocks API) | 74 |
| `problem_get` (prompt + options) | ✅ works (used to confirm prompts/options match our data) |
| `problem_show` (raw API) | ⚠️ returns `"The state of this problem has changed…"` — the raw API is stateful and unreliable. |
| **DOM "Show Answer"** | ✅ works — see below. |

**Update:** answer keys are now harvested reliably by driving the rendered CAPA xblock in a browser
and clicking **"Show Answer"** (`scripts/harvest-answers.mjs`). On most courses Show Answer is gated
behind a submission, so the harvester submits one option first to unlock it. This produced **1690
revealed answers**, of which **1692 questions** validate locally after mapping (see
`docs/MCQ_ANSWER_KEY_AUDIT.md`). The two PED questions called out by the brief are verified:

1. **Exercise 1.2.1** — “Which of these topics needs to be addressed during the energy transition?”
   → **All of the above.** (option 3)
2. **Final Exam** — “What are the main characteristics of a Positive Energy District?”
   → **Sustainable energy generation and efficient resource management.** (option 1)

The remaining PED questions (and all other courses' quizzes) show the recorded-response message
until a key is verified and added — no code change is needed, just a new entry in
`src/data/quiz-answers.ts`.
