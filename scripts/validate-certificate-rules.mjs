// Validates certificate rule metadata + plumbing. Run: node scripts/validate-certificate-rules.mjs
// (npm run validate:certificates)
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const exists = (p) => fs.existsSync(p);
const catalogue = JSON.parse(read("src/data/courses-catalogue.ts").match(/coursesCatalogue[^=]*=\s*(\[[\s\S]*?\]);/)[1]);
const rulesSrc = read("src/data/certificate-rules.ts");

let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failed++;
};

// Parse certificate-rules.ts entries.
const rules = {};
for (const m of rulesSrc.matchAll(/"([a-z0-9-]+)":\s*\{([^}]*)\}/g)) {
  const body = m[2];
  const num = (k) => Number((body.match(new RegExp(`${k}:\\s*(\\d+)`)) || [])[1]);
  const str = (k) => (body.match(new RegExp(`${k}:\\s*"([^"]*)"`)) || [])[1];
  rules[m[1]] = {
    code: str("code"), title: str("title"),
    totalVideos: num("totalVideos"), totalMcqs: num("totalMcqs"), totalContentUnits: num("totalContentUnits"),
    rule: str("rule")
  };
}

const slugs = catalogue.map((c) => c.slug);
check("all 77 courses have certificate rule metadata", slugs.every((s) => rules[s]) && Object.keys(rules).length === 77, `${Object.keys(rules).length} rules`);
check("every rule has a video count", Object.values(rules).every((r) => Number.isFinite(r.totalVideos)));
check("every rule has an MCQ count", Object.values(rules).every((r) => Number.isFinite(r.totalMcqs)));
check("MCQ pass threshold is 50%", /MCQ_PASS_PERCENT\s*=\s*50/.test(rulesSrc));

// Rule correctness: mcq when MCQs>0; video-only when videos>0 & MCQs==0; content otherwise.
let ruleMismatch = 0;
for (const r of Object.values(rules)) {
  const expected = r.totalMcqs > 0 ? "mcq" : r.totalVideos > 0 ? "video-only" : "content";
  if (r.rule !== expected) ruleMismatch++;
}
check("eligibility rule matches video/MCQ counts", ruleMismatch === 0, `${ruleMismatch} mismatch`);
check("MCQ courses use the >=50% rule (rule=mcq)", Object.values(rules).filter((r) => r.totalMcqs > 0).every((r) => r.rule === "mcq"));
check("video-only courses require all videos", Object.values(rules).filter((r) => r.totalMcqs === 0 && r.totalVideos > 0).every((r) => r.rule === "video-only"));
check("no course missing slug/code/title", Object.entries(rules).every(([slug, r]) => slug && r.code && r.title));

// Plumbing.
check("certificate PDF template exists", exists("src/lib/certificates/pdf.ts"));
check("certificate identifier helper exists", exists("src/lib/certificates/identifier.ts"));
check("certificate download route exists", exists("src/app/api/certificates/[courseSlug]/route.ts"));
check("certificate verify page exists", exists("src/app/certificates/verify/[hash]/page.tsx"));
check("one-attempt MCQ route exists", exists("src/app/api/courses/mcq/route.ts"));
check("completion library exists", exists("src/lib/completion.ts"));
check("completion/certificate migration exists", exists("supabase/migrations/0003_course_completion_certificates.sql"));

const mcq = Object.values(rules).filter((r) => r.rule === "mcq").length;
const vid = Object.values(rules).filter((r) => r.rule === "video-only").length;
const con = Object.values(rules).filter((r) => r.rule === "content").length;
console.log(`\n--- CERTIFICATE RULES ---\nCourses: ${Object.keys(rules).length}  MCQ: ${mcq}  Video-only: ${vid}  Content: ${con}`);
console.log(`\n${failed === 0 ? "✓ CERTIFICATE VALIDATION PASSED" : `✗ ${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
