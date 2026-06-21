// Validates learning content data quality: quiz options, answer-key integrity, and interactive
// launch configuration. Run: node scripts/validate-course-content.mjs  (npm run validate:content)
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const learning = JSON.parse(read("src/data/course-learning.ts").match(/courseLearning[^=]*=\s*(\{[\s\S]*?\});\s*\n\nexport const getCourseLearning/)[1]);
const extras = read("src/data/learn-extras.ts");
const answersSrc = read("src/data/quiz-answers.ts");

let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failed++;
};

// --- 1. every quiz question has a prompt and >= 2 options ------------------------------
let noOptions = 0;
let questionTotal = 0;
const promptsBySlug = {};
for (const [slug, list] of Object.entries(learning)) {
  promptsBySlug[slug] = new Set();
  for (const section of list) {
    for (const u of section.units) {
      if (!u.q) continue;
      questionTotal++;
      promptsBySlug[slug].add(u.q.p.trim().replace(/\s+/g, " ").toLowerCase());
      if (!Array.isArray(u.q.o) || u.q.o.length < 2 || !u.q.p) noOptions++;
    }
  }
}
check("every quiz question has a prompt + >= 2 options", noOptions === 0, `${questionTotal} questions, ${noOptions} bad`);

// --- 2. answer keys: index in range, single-choice has exactly one, prompt exists ------
const norm = (s) => s.trim().replace(/\s+/g, " ").toLowerCase();
const keyBlocks = [...answersSrc.matchAll(/"([a-z0-9-]+)":\s*\[([\s\S]*?)\n\s*\]/g)];
let keyTotal = 0;
let keyBadIndex = 0;
let keyNoMatch = 0;
let keyMultiForSingle = 0;
for (const [, slug, body] of keyBlocks) {
  // optionsByPrompt for this course (to range-check correct indices)
  const optsByPrompt = new Map();
  for (const section of learning[slug] || []) {
    for (const u of section.units) if (u.q) optsByPrompt.set(norm(u.q.p), u.q);
  }
  for (const m of body.matchAll(/prompt:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?correct:\s*\[([^\]]*)\]/g)) {
    keyTotal++;
    const prompt = m[1].replace(/\\"/g, '"');
    const correct = m[2].split(",").map((x) => x.trim()).filter((x) => x.length).map(Number);
    const q = optsByPrompt.get(norm(prompt));
    if (!q) { keyNoMatch++; continue; }
    if (correct.some((i) => i < 0 || i >= q.o.length)) keyBadIndex++;
    if (q.m === 0 && correct.length !== 1) keyMultiForSingle++;
  }
}
check("answer keys match a real question prompt", keyNoMatch === 0, `${keyTotal} keys, ${keyNoMatch} unmatched`);
check("answer-key indices are within option range", keyBadIndex === 0, `${keyBadIndex} out of range`);
check("single-choice answer keys have exactly one correct option", keyMultiForSingle === 0, `${keyMultiForSingle} bad`);

// --- 3. interactive units: must have embedUrl or externalLaunchUrl, no generic targets --
const interactiveBlocks = [...extras.matchAll(/section:\s*"[^"]*"[\s\S]*?(?=\},\s*\{|\}\s*\]\s*,|\}\s*\]\s*\};)/g)].map((m) => m[0]);
let interactiveCount = 0;
let interactiveBadUrl = 0;
let interactiveGeneric = 0;
const GENERIC_URL = /(boostmyskills\.eu\/?$)|(\/dashboard\b)|(\/courses\/?$)|(\/catalogue)|(\/home\/?$)|(apps\.boostmyskills\.eu\/?$)|(\/login\b)/i;
for (const block of interactiveBlocks) {
  interactiveCount++;
  const embed = block.match(/embedUrl:\s*"([^"]+)"/);
  const ext = block.match(/externalLaunchUrl:\s*(`[^`]+`|"[^"]+")/);
  if (!embed && !ext) { interactiveBadUrl++; continue; }
  const url = (ext?.[1] || embed?.[1] || "").replace(/[`"]/g, "");
  // the deep-link contains a jump_to/<block-v1...> or block path → not a generic shell
  if (GENERIC_URL.test(url) && !/jump_to\/block-v1:|\/block-v1:/.test(url)) interactiveGeneric++;
}
check("interactive units have embedUrl or externalLaunchUrl", interactiveBadUrl === 0, `${interactiveCount} units`);
check("no interactive launch points to a generic BoostMySkills page", interactiveGeneric === 0);
check(
  "Serious Game has a valid launch configuration",
  /serious_game_xblock/.test(extras) && /"serious-game":\s*\[[\s\S]*?jump_to\//.test(extras)
);

console.log(`\n${failed === 0 ? "✓ ALL CONTENT CHECKS PASSED" : `✗ ${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
