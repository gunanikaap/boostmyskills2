// Generates src/data/quiz-answers.ts from scripts/.harvested-answers.json by matching each live
// "Show Answer" correct option TEXT to the option index in our scraped course-learning data.
// Manual verified keys (e.g. user-confirmed) are preserved/merged. Run: node scripts/gen-answers.mjs
import fs from "node:fs";

const harvested = JSON.parse(fs.readFileSync("scripts/.harvested-answers.json", "utf8"));
const learning = JSON.parse(
  fs.readFileSync("src/data/course-learning.ts", "utf8").match(/courseLearning[^=]*=\s*(\{[\s\S]*?\});\s*\n\nexport const getCourseLearning/)[1]
);

const norm = (s) => (s || "").trim().replace(/\s+/g, " ").replace(/[.…]+$/, "").toLowerCase();

// Manually verified keys (kept even if live harvest missed them).
const manual = {
  "positive-energy-districts": [
    {
      prompt: "Which of these topics needs to be addressed during the energy transition?",
      correct: [3],
      explanation: "The energy transition requires deploying renewable energy, electrifying energy consumption AND increasing energy efficiency — so the answer is “All of the above.”"
    },
    {
      prompt: "What are the main characteristics of a Positive Energy District?",
      correct: [1],
      explanation: "A Positive Energy District is defined by sustainable (net-positive) energy generation and efficient resource management."
    }
  ]
};

const stats = { questions: 0, matched: 0, noReveal: 0, noPromptMatch: 0, textMismatch: 0 };
const bySlug = {};

for (const [slug, list] of Object.entries(learning)) {
  // Build prompt -> question (options) from our data.
  const ourQ = new Map();
  for (const section of list) for (const u of section.units) if (u.q) ourQ.set(norm(u.q.p), u.q);
  stats.questions += ourQ.size;

  const entries = [];
  const seen = new Set();

  // Manual first.
  for (const m of manual[slug] || []) {
    entries.push({ prompt: m.prompt, correct: m.correct, explanation: m.explanation, src: "verified (manual)" });
    seen.add(norm(m.prompt));
    stats.matched++;
  }

  for (const h of harvested[slug] || []) {
    if (!h || !h.corrects || h.corrects.length === 0) { stats.noReveal++; continue; }
    const q = ourQ.get(norm(h.prompt));
    if (!q) { stats.noPromptMatch++; continue; }
    if (seen.has(norm(h.prompt))) continue;
    // Map each correct option TEXT to its index in our options.
    const idxs = h.corrects
      .map((c) => q.o.findIndex((o) => norm(o) === norm(c)))
      .filter((i) => i >= 0)
      .sort((a, b) => a - b);
    if (idxs.length !== h.corrects.length || idxs.length === 0) { stats.textMismatch++; continue; }
    entries.push({ prompt: q.p, correct: idxs, src: "verified (live show-answer)" });
    seen.add(norm(h.prompt));
    stats.matched++;
  }

  if (entries.length) bySlug[slug] = entries;
}

// Emit the TS file.
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
let body = "";
for (const [slug, entries] of Object.entries(bySlug).sort()) {
  body += `  ${JSON.stringify(slug)}: [\n`;
  for (const e of entries) {
    const expl = e.explanation ? `, explanation: "${esc(e.explanation)}"` : "";
    body += `    { prompt: "${esc(e.prompt)}", correct: [${e.correct.join(", ")}]${expl} },\n`;
  }
  body += `  ],\n`;
}

const out = `// Verified MCQ answer keys. Most are harvested by live "Show Answer" from the BoostMySkills course
// player (scripts/harvest-answers.mjs → scripts/gen-answers.mjs); a few are user-verified. Each is
// matched to a question by its exact prompt text; correct[] holds the 0-based option indices.
// Questions with no entry have no answer key available locally (see docs/MCQ_ANSWER_KEY_AUDIT.md).
// DO NOT hand-edit — regenerate with: node scripts/gen-answers.mjs
export type AnswerKey = { prompt: string; correct: number[]; explanation?: string };

export const quizAnswers: Record<string, AnswerKey[]> = {
${body}};

const normalise = (value: string) => value.trim().replace(/\\s+/g, " ").toLowerCase();

const index = new Map<string, Map<string, AnswerKey>>();
for (const [slug, keys] of Object.entries(quizAnswers)) {
  const byPrompt = new Map<string, AnswerKey>();
  for (const key of keys) byPrompt.set(normalise(key.prompt), key);
  index.set(slug, byPrompt);
}

export const getAnswerKey = (slug: string, prompt: string): AnswerKey | undefined =>
  index.get(slug)?.get(normalise(prompt));
`;

fs.writeFileSync("src/data/quiz-answers.ts", out);
const courses = Object.keys(bySlug).length;
console.log(`Wrote src/data/quiz-answers.ts — ${stats.matched} keys across ${courses} courses.`);
console.log(`questions=${stats.questions} matched=${stats.matched} noReveal=${stats.noReveal} noPromptMatch=${stats.noPromptMatch} textMismatch=${stats.textMismatch}`);
fs.writeFileSync("scripts/.gen-answers-stats.json", JSON.stringify(stats, null, 1));
