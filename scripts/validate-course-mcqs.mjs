// Validates MCQ answer-key integrity across all courses. Run: node scripts/validate-course-mcqs.mjs
// (npm run validate:mcqs). Fails on invalid keys; reports verified/missing summary.
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const learning = JSON.parse(read("src/data/course-learning.ts").match(/courseLearning[^=]*=\s*(\{[\s\S]*?\});\s*\n\nexport const getCourseLearning/)[1]);
const answersSrc = read("src/data/quiz-answers.ts");

const norm = (s) => (s || "").trim().replace(/\s+/g, " ").toLowerCase();
let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failed++;
};

// Parse quiz-answers.ts -> { slug: Map(normPrompt -> correct[]) }
const keys = {};
for (const block of answersSrc.matchAll(/"([a-z0-9-]+)":\s*\[([\s\S]*?)\n\s*\]/g)) {
  const slug = block[1];
  const map = new Map();
  for (const m of block[2].matchAll(/prompt:\s*"((?:[^"\\]|\\.)*)"\s*,\s*correct:\s*\[([^\]]*)\]/g)) {
    const prompt = m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    const correct = m[2].split(",").map((x) => x.trim()).filter((x) => x.length).map(Number);
    map.set(norm(prompt), correct);
  }
  keys[slug] = map;
}

let total = 0, verified = 0, missing = 0, invalid = 0, emptyOptions = 0, dupIds = 0;
const coursesMissing = new Set();
const perCourse = {};

// Replicate grouping ids from src/lib/learn.ts to detect duplicate question ids.
const GENERIC = /^(question|multiple\s*choice(\s*#?\d+)?|exercise(\s*-\s*multiple\s*(choice|answer))?|quiz|test)\s*$/i;
const meaningful = (t) => t.trim().length > 0 && !GENERIC.test(t.trim());

for (const [slug, list] of Object.entries(learning)) {
  const km = keys[slug] || new Map();
  perCourse[slug] = { total: 0, verified: 0, missing: 0 };
  const idsSeen = new Set(); // question ids only need to be unique within a course (one /learn page)
  let counter = 0;
  for (const section of list) {
    let open = null;
    const flush = () => { if (open) { counter++; open = null; } };
    for (const u of section.units) {
      if (u.q) {
        if (meaningful(u.t) || !open) { flush(); counter++; open = { unitId: `quiz-${counter}`, i: 0 }; }
        const qid = `${open.unitId}-q${open.i++}`;
        if (idsSeen.has(qid)) dupIds++; else idsSeen.add(qid);
        total++; perCourse[slug].total++;
        if (!Array.isArray(u.q.o) || u.q.o.length < 2) emptyOptions++;
        const correct = km.get(norm(u.q.p));
        if (!correct) { missing++; perCourse[slug].missing++; coursesMissing.add(slug); continue; }
        // validate the key
        const single = u.q.m === 0;
        if (correct.length === 0) invalid++;
        else if (correct.some((idx) => idx < 0 || idx >= u.q.o.length)) invalid++;
        else if (single && correct.length !== 1) invalid++;
        else { verified++; perCourse[slug].verified++; }
      } else flush();
    }
    flush();
  }
}

check("no empty/short option sets", emptyOptions === 0, `${emptyOptions} bad`);
check("no duplicate question ids", dupIds === 0, `${dupIds} dup`);
check("no invalid answer keys (out-of-range / wrong cardinality)", invalid === 0, `${invalid} invalid`);
check("no generic 'graded inside BoostMySkills' message in data", !/graded inside the BoostMySkills/i.test(answersSrc));

console.log("\n--- MCQ ANSWER KEY SUMMARY ---");
console.log(`Total MCQ questions:     ${total}`);
console.log(`Verified answer keys:    ${verified}`);
console.log(`Missing answer keys:     ${missing}`);
console.log(`Invalid answer keys:     ${invalid}`);
console.log(`Courses with missing:    ${coursesMissing.size}`);
const fully = Object.entries(perCourse).filter(([, c]) => c.total > 0 && c.missing === 0).length;
console.log(`Courses fully verified:  ${fully}`);

console.log(`\n${failed === 0 ? "✓ MCQ VALIDATION PASSED" : `✗ ${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
