// Validates the course/learning data. Run with: npm run validate:courses
import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const catalogue = JSON.parse(read("src/data/courses-catalogue.ts").match(/coursesCatalogue[^=]*=\s*(\[[\s\S]*?\]);/)[1]);
const content = JSON.parse(read("src/data/courses-content.ts").match(/coursesContent[^=]*=\s*(\{[\s\S]*\});\s*\n\nexport const getCourseContent/)[1]);
const progMap = JSON.parse(read("src/data/programme-courses.ts").match(/programmeCourses[^=]*=\s*(\{[\s\S]*?\});/)[1]);

const slugs = catalogue.map((c) => c.slug);
const slugSet = new Set(slugs);
let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failed++;
};

check("exactly 77 micro-credentials", catalogue.length === 77, `${catalogue.length}`);
check("all slugs unique", slugSet.size === catalogue.length, `${slugSet.size} unique`);
check("all have a content entry", catalogue.every((c) => content[c.slug]));
check("all have non-empty contentSections (learn units)", catalogue.every((c) => content[c.slug]?.contentSections?.length > 0));
check(
  "all programme mappings point to existing courses",
  Object.values(progMap).every((list) => list.every((s) => slugSet.has(s))),
  `${Object.keys(progMap).length} programmes`
);

// No external course/enrol nav in the listing/detail/player/enrol components.
const navFiles = [
  "src/components/courses/courses-listing.tsx",
  "src/components/courses/course-detail.tsx",
  "src/components/courses/course-enrol-button.tsx",
  "src/components/learn/course-player.tsx"
];
const externalHits = navFiles.filter((f) => /href=\{?["'`]https:\/\/(apps\.)?boostmyskills\.eu/.test(read(f)));
check("no primary nav href to boostmyskills.eu", externalHits.length === 0, externalHits.join(", "));

// Learn route exists for every course (dynamic /learn/[slug]).
// Scraped learning content: valid YouTube IDs, mappings to real course slugs.
const learning = JSON.parse(read("src/data/course-learning.ts").match(/courseLearning[^=]*=\s*(\{[\s\S]*?\});\s*\n\nexport const getCourseLearning/)[1]);
const learnSlugs = Object.keys(learning);
let badVideo = 0;
let videoCount = 0;
for (const list of Object.values(learning)) {
  for (const section of list) {
    for (const unit of section.units) {
      if (unit.y) {
        videoCount++;
        if (!/^[A-Za-z0-9_-]{6,15}$/.test(unit.y)) badVideo++;
      }
    }
  }
}
check("course-learning slugs are real courses", learnSlugs.every((s) => slugSet.has(s)), `${learnSlugs.length} with content`);
check("all scraped videos have valid YouTube IDs", badVideo === 0, `${videoCount} videos`);

check("/learn/[slug] route present", fs.existsSync("src/app/learn/[slug]/page.tsx"));
check("course enrol API present", fs.existsSync("src/app/api/courses/enrol/route.ts"));
check("programme auto-enrol API present", fs.existsSync("src/app/api/programmes/enrol/route.ts"));

// Quiz grouping: after collapsing runs of questions into sets (same logic as src/lib/learn.ts),
// no sidebar entry should be a bare generic "Question" item.
const GENERIC = /^(question|multiple\s*choice(\s*#?\d+)?|exercise(\s*-\s*multiple\s*(choice|answer))?|quiz|test)\s*$/i;
const meaningfulTitle = (t) => t.trim().length > 0 && !GENERIC.test(t.trim());
let genericSidebarItems = 0;
let quizSets = 0;
for (const list of Object.values(learning)) {
  for (const section of list) {
    let open = null;
    const flush = () => {
      if (!open) return;
      quizSets++;
      if (/^question$/i.test((meaningfulTitle(open.lead) ? open.lead : "Exercise").trim())) genericSidebarItems++;
      open = null;
    };
    for (const unit of section.units) {
      if (unit.q) {
        if (meaningfulTitle(unit.t) || !open) { flush(); open = { lead: unit.t }; }
        continue;
      }
      flush();
      if (!unit.y && /^question$/i.test((unit.t || "").trim())) genericSidebarItems++;
    }
    flush();
  }
}
check("no generic 'Question' sidebar items after grouping", genericSidebarItems === 0, `${quizSets} quiz sets`);
check("Serious Game interactive unit defined", /"serious-game"\s*:/.test(read("src/data/learn-extras.ts")));
check("PED Exercise 1.2.1 answer key present", /Which of these topics needs to be addressed/.test(read("src/data/quiz-answers.ts")));

console.log(`\n${failed === 0 ? "✓ ALL CHECKS PASSED" : `✗ ${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
