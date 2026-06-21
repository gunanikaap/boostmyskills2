// Generates src/data/certificate-rules.ts: per-course video/MCQ counts + eligibility rule for all
// 77 micro-credentials. Counts match src/lib/learn.ts (videos = video units, mcqs = quiz questions).
// Run: node scripts/gen-certificate-rules.mjs
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const catalogue = JSON.parse(read("src/data/courses-catalogue.ts").match(/coursesCatalogue[^=]*=\s*(\[[\s\S]*?\]);/)[1]);
const learning = JSON.parse(read("src/data/course-learning.ts").match(/courseLearning[^=]*=\s*(\{[\s\S]*?\});\s*\n\nexport const getCourseLearning/)[1]);
const content = JSON.parse(read("src/data/courses-content.ts").match(/coursesContent[^=]*=\s*(\{[\s\S]*\});\s*\n\nexport const getCourseContent/)[1]);

const esc = (s) => (s || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const rows = catalogue.map((c) => {
  let videos = 0, mcqs = 0;
  for (const section of learning[c.slug] || []) {
    for (const u of section.units) {
      if (u.y) videos++;
      else if (u.q) mcqs++;
    }
  }
  const contentUnits = content[c.slug]?.contentSections?.length || 0;
  const rule = mcqs > 0 ? "mcq" : videos > 0 ? "video-only" : "content";
  return { slug: c.slug, title: c.title, code: c.code, project: c.project, org: c.org, videos, mcqs, contentUnits, rule };
});

let body = "";
for (const r of rows) {
  body += `  ${JSON.stringify(r.slug)}: { code: "${esc(r.code)}", title: "${esc(r.title)}", project: "${esc(r.project)}", org: "${esc(r.org)}", totalVideos: ${r.videos}, totalMcqs: ${r.mcqs}, totalContentUnits: ${r.contentUnits}, rule: "${r.rule}" },\n`;
}

const out = `// Auto-generated per-course certificate eligibility metadata for all 77 micro-credentials.
// totalVideos / totalMcqs mirror src/lib/learn.ts (videos = video units, mcqs = quiz questions).
// rule: "mcq" → all videos complete + every MCQ attempted + MCQ score >= 50%;
//       "video-only" → all videos complete; "content" → all content/reading units complete.
// Regenerate with: node scripts/gen-certificate-rules.mjs
export type CertificateRule = "mcq" | "video-only" | "content";

export type CertificateRuleMeta = {
  code: string;
  title: string;
  project: string;
  org: string;
  totalVideos: number;
  totalMcqs: number;
  totalContentUnits: number;
  rule: CertificateRule;
};

export const MCQ_PASS_PERCENT = 50;

export const certificateRules: Record<string, CertificateRuleMeta> = {
${body}};

export const getCertificateRule = (slug: string): CertificateRuleMeta | undefined => certificateRules[slug];
`;

fs.writeFileSync("src/data/certificate-rules.ts", out);
const mcq = rows.filter((r) => r.rule === "mcq").length;
const vid = rows.filter((r) => r.rule === "video-only").length;
const con = rows.filter((r) => r.rule === "content").length;

// ---- docs/CERTIFICATE_RULES.md ----
const ruleText = {
  mcq: "all videos complete + every MCQ attempted + MCQ score ≥ 50%",
  "video-only": "all videos complete",
  content: "all course sections complete"
};
let md = `# Certificate Rules

How certificate eligibility is calculated for each of the 77 micro-credentials, and the completion
formula. Eligibility is computed **server-side** in \`src/lib/completion.ts\` from stored
\`unit_progress\` (video/section completion) and \`mcq_attempts\` (one attempt per question), and
persisted to \`course_completion\`. Certificates are issued/downloaded at
\`GET /api/certificates/<slug>\` (PDF, pdf-lib) only when eligible.

## Eligibility rules

| Rule | Applies when | Certificate requires |
| --- | --- | --- |
| **mcq** | course has ≥ 1 MCQ | all videos complete **AND** every MCQ attempted (one attempt each) **AND** MCQ score ≥ **50%** |
| **video-only** | course has videos, no MCQs | all videos complete |
| **content** | course has neither (reading/outline only) | all content sections marked complete |

**MCQ score** = correct ÷ total questions × 100. **Completion %** = (completed videos + attempted
MCQs) ÷ (total videos + total MCQs) × 100 — for content courses it is completed ÷ total sections.
A wrong answer counts permanently (one attempt only); an unattempted question keeps the course
incomplete. **MCQ_PASS_PERCENT = 50**.

## Coverage

| Metric | Value |
| --- | --- |
| Micro-credentials | ${rows.length} |
| MCQ-rule courses | ${mcq} |
| Video-only courses | ${vid} |
| Content-only courses (RESSKILL, blocks API 500) | ${con} |
| Certificate available locally (all) | yes — \`/api/certificates/<slug>\` |

## All 77 courses

| # | Title | Slug | Code | Videos | MCQs | Eligibility rule | Certificate | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
`;
rows.forEach((r, i) => {
  const note = r.rule === "content" ? "reading/outline only (blocks API 500)" : ruleText[r.rule];
  md += `| ${i + 1} | ${r.title} | ${r.slug} | ${r.code} | ${r.videos} | ${r.mcqs} | ${r.rule} (${ruleText[r.rule]}) | yes | ${note} |\n`;
});
fs.writeFileSync("docs/CERTIFICATE_RULES.md", md);

console.log(`Wrote src/data/certificate-rules.ts + docs/CERTIFICATE_RULES.md — ${rows.length} courses (mcq:${mcq} video-only:${vid} content:${con}).`);
