// Regenerates docs/COURSE_CONTENT_AUDIT.md from the live-scraped data + local fixes.
// Run with: node scripts/audit-courses.mjs
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const catalogue = JSON.parse(read("src/data/courses-catalogue.ts").match(/coursesCatalogue[^=]*=\s*(\[[\s\S]*?\]);/)[1]);
const learning = JSON.parse(read("src/data/course-learning.ts").match(/courseLearning[^=]*=\s*(\{[\s\S]*?\});\s*\n\nexport const getCourseLearning/)[1]);
const progMap = JSON.parse(read("src/data/programme-courses.ts").match(/programmeCourses[^=]*=\s*(\{[\s\S]*?\});/)[1]);

// learn-extras interactive units (which slugs have an interactive unit)
const interactiveSlugs = new Set(
  [...read("src/data/learn-extras.ts").matchAll(/"([a-z0-9-]+)":\s*\[/g)].map((m) => m[1])
);
// verified answer keys per slug
const answerKeysRaw = read("src/data/quiz-answers.ts");
const answerKeyCount = {};
for (const m of answerKeysRaw.matchAll(/"([a-z0-9-]+)":\s*\[([\s\S]*?)\n\s*\]/g)) {
  answerKeyCount[m[1]] = (m[2].match(/prompt:/g) || []).length;
}

// reverse programme association count
const assoc = {};
for (const list of Object.values(progMap)) for (const s of list) assoc[s] = (assoc[s] || 0) + 1;

// Same grouping logic as src/lib/learn.ts (kept in sync for the audit).
const GENERIC = /^(question|multiple\s*choice(\s*#?\d+)?|exercise(\s*-\s*multiple\s*(choice|answer))?|quiz|test)\s*$/i;
const meaningful = (t) => t.trim().length > 0 && !GENERIC.test(t.trim());

function group(slug) {
  const sections = learning[slug] || [];
  const titles = [];
  let quizGroups = 0;
  let questions = 0;
  let videos = 0;
  for (const section of sections) {
    let open = null;
    const flush = () => {
      if (!open) return;
      quizGroups += 1;
      questions += open.q;
      titles.push(meaningful(open.lead) ? open.lead.trim() : "Exercise");
      open = null;
    };
    for (const u of section.units) {
      if (u.q) {
        const m = meaningful(u.t);
        if (m || !open) { flush(); open = { lead: u.t, q: 0 }; }
        open.q += 1;
        continue;
      }
      flush();
      if (u.y) { videos += 1; titles.push(u.t); }
      else titles.push(u.t);
    }
    flush();
  }
  // generic "Question"-style entries left in the sidebar after grouping (should be 0)
  const genericLeft = titles.filter((t) => /^question$/i.test(t.trim())).length;
  return { quizGroups, questions, videos, genericLeft };
}

const rows = catalogue.map((c, i) => {
  const g = group(c.slug);
  const hasScraped = (learning[c.slug]?.length ?? 0) > 0;
  const interactive = interactiveSlugs.has(c.slug);
  const keys = answerKeyCount[c.slug] || 0;
  const hasQuestions = hasScraped && g.questions > 0;
  const grouped = g.quizGroups > 0 ? "yes" : "n/a";
  const answerKey = keys > 0 ? `partial (${keys}/${g.questions})` : hasQuestions ? "no" : "n/a";
  const localValidation = keys > 0 ? "partial" : hasQuestions ? "no" : "n/a";
  const fallbackUsed = hasQuestions && keys < g.questions ? "yes" : "no";
  const sidebarOk = g.genericLeft === 0 ? "yes" : `NO (${g.genericLeft})`;
  const notes = !hasScraped
    ? "blocks API 500 — reading + outline fallback"
    : interactive
    ? "interactive Serious Game unit (deep-link launch)"
    : `${g.quizGroups} quiz set(s), ${g.questions} questions`;
  return {
    n: i + 1,
    title: c.title,
    slug: c.slug,
    grouped,
    interactive: interactive ? "yes" : "n/a",
    answerKey,
    localValidation,
    fallbackUsed,
    sidebarOk,
    notes
  };
});

const genericTotal = catalogue.reduce((a, c) => a + group(c.slug).genericLeft, 0);
const scraped = catalogue.filter((c) => (learning[c.slug]?.length ?? 0) > 0).length;
const totalGroups = catalogue.reduce((a, c) => a + group(c.slug).quizGroups, 0);
const totalQuestions = catalogue.reduce((a, c) => a + group(c.slug).questions, 0);

let md = `# Course Content Audit

All **77** micro-credentials, content pulled from the live course player via Open edX REST APIs
(course **blocks** API for structure + YouTube videos; **problem_get** handler for quiz
questions). Login used only via gitignored \`.env.local\` — never committed.

| Metric | Value |
| --- | --- |
| Micro-credentials | 77 |
| Courses with scraped content | ${scraped} / 77 |
| **Grouped quiz sets** (was 1 page per question) | ${totalGroups} |
| **Quiz questions** mapped (prompt + options) | ${totalQuestions} |
| Generic "Question" sidebar items remaining | **${genericTotal}** (target 0) |
| Interactive units added (Serious Game) | ${interactiveSlugs.size} |
| Verified answer keys seeded | ${Object.values(answerKeyCount).reduce((a, b) => a + b, 0)} |
| Local learn route | \`/learn/[slug]\` (all 77) |

**Grouping fix:** consecutive quiz questions are now collapsed into a single quiz **set** (one
sidebar entry, all questions on one page) instead of one "Question" page each — matching the live
BoostMySkills player. **Interactive units** (e.g. the Serious Game LTI) are rendered as activity
cards. **Answer keys:** Open edX hides correct answers behind server-side grading, so only
individually **verified** keys are stored (see \`src/data/quiz-answers.ts\`); other quizzes show the
real prompt + options as a self-check. **15 courses** (newer RESSKILL runs) return a server 500
from the blocks API and fall back to scraped reading + outline.

## All 77 courses

| # | Title | Slug | Grouped quiz fixed? | Interactive unit? | Answer key available? | Local validation enabled? | Fallback message used? | Sidebar titles verified? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
`;
for (const r of rows) {
  md += `| ${r.n} | ${r.title} | ${r.slug} | ${r.grouped} | ${r.interactive} | ${r.answerKey} | ${r.localValidation} | ${r.fallbackUsed} | ${r.sidebarOk} | ${r.notes} |\n`;
}

fs.writeFileSync("docs/COURSE_CONTENT_AUDIT.md", md);
console.log(`Wrote docs/COURSE_CONTENT_AUDIT.md — ${rows.length} courses, ${totalGroups} quiz sets, ${genericTotal} generic items left.`);
