// One-off live inspection: finds the exact Serious Game activity URL and harvests verified quiz
// answer keys via the Open edX problem_show ("Show Answer") handler. Credentials are read ONLY
// from gitignored .env.local and never printed. Run: node scripts/scrape-live.mjs
import fs from "node:fs";
import { chromium } from "playwright";

const LMS = "https://boostmyskills.eu";

// --- credentials (never logged) -------------------------------------------------------
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/).filter((l) => l.includes("=")).map((l) => {
    const i = l.indexOf("=");
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  })
);
const USER = env.BMS_LOGIN_USERNAME;
const PASS = env.BMS_LOGIN_PASSWORD;
if (!USER || !PASS) { console.error("Missing BMS_LOGIN_USERNAME / BMS_LOGIN_PASSWORD in .env.local"); process.exit(1); }

const SERIOUS = "course-v1:Artemat+MC10_RES4CITY+2025_T01";
const PED = "course-v1:UPV+MC20v1+2024_01";

const out = { seriousGame: {}, pedAnswers: [] };

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // Login through the authn MFE (LMS /login redirects to apps.boostmyskills.eu/authn/login).
  await page.goto(`${LMS}/login`, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  const userSel = 'input[name="emailOrUsername"], input#emailOrUsername';
  await page.waitForSelector(userSel, { timeout: 30000 });
  await page.fill(userSel, USER);
  await page.fill('input[name="password"], input#password', PASS);
  await page.click('button#sign-in, button[type="submit"]');
  await page.waitForTimeout(8000);

  // Confirm auth by reading the user's own info via the API.
  const blocksUrl = (courseId) =>
    `${LMS}/api/courses/v2/blocks/?course_id=${encodeURIComponent(courseId)}&username=${encodeURIComponent(USER)}` +
    `&depth=all&requested_fields=student_view_data,children,display_name,lti_url,type,student_view_url,lms_web_url&student_view_data=video,html,lti,lti_consumer`;

  // --- Serious Game: find the interactive activity block --------------------------------
  const sgResp = await page.request.get(blocksUrl(SERIOUS));
  out.seriousGame.status = sgResp.status();
  if (sgResp.ok()) {
    const json = await sgResp.json();
    const blocks = Object.values(json.blocks || {});
    out.seriousGame.allTypes = [...new Set(blocks.map((b) => b.type))];
    out.seriousGame.candidates = blocks
      .filter((b) => !["course", "chapter", "sequential", "vertical"].includes(b.type))
      .map((b) => ({
        id: b.id,
        type: b.type,
        display_name: b.display_name,
        lti_url: b.lti_url,
        student_view_url: b.student_view_url,
        lms_web_url: b.lms_web_url,
        student_view_data: b.student_view_data
      }));
  }

  // --- PED answer keys via problem_show ------------------------------------------------
  const cookies = await ctx.cookies();
  const csrf = cookies.find((c) => c.name === "csrftoken")?.value || "";
  const hdr = { "X-Requested-With": "XMLHttpRequest", "X-CSRFToken": csrf, Referer: `${LMS}/courses/${PED}/courseware` };

  const pedResp = await page.request.get(blocksUrl(PED));
  if (pedResp.ok()) {
    const json = await pedResp.json();
    const problems = Object.values(json.blocks || {}).filter((b) => b.type === "problem");
    out.pedAnswers_count = problems.length;
    const limit = process.env.SCRAPE_ALL ? problems.length : 3;
    for (const p of problems.slice(0, limit)) {
      const base = `${LMS}/courses/${PED}/xblock/${p.id}/handler/xmodule_handler`;
      const entry = { id: p.id, display_name: p.display_name, prompt: "", options: [], showStatus: 0, answers: null };
      try {
        const getR = await page.request.post(`${base}/problem_get`, { headers: hdr });
        if (getR.ok()) {
          const html = (await getR.json()).html || "";
          entry.prompt = (html.match(/<p>([\s\S]*?)<\/p>/) || [, ""])[1].replace(/<[^>]+>/g, "").trim();
          entry.options = [...html.matchAll(/<label[^>]*>([\s\S]*?)<\/label>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
        } else entry.getStatus = getR.status();
        const showR = await page.request.post(`${base}/problem_show`, { headers: hdr });
        entry.showStatus = showR.status();
        entry.answers = showR.ok() ? await showR.json() : (await showR.text()).slice(0, 160);
      } catch (e) {
        entry.error = String(e).slice(0, 120);
      }
      out.pedAnswers.push(entry);
    }
  } else {
    out.pedAnswers_status = pedResp.status();
  }

  await browser.close();
  fs.writeFileSync("scripts/.scrape-output.json", JSON.stringify(out, null, 2));
  console.log("SERIOUS GAME status:", out.seriousGame.status, "types:", JSON.stringify(out.seriousGame.allTypes));
  console.log("SERIOUS GAME candidates:", JSON.stringify(out.seriousGame.candidates, null, 1));
  console.log("PED problems:", out.pedAnswers_count, "status:", out.pedAnswers_status || "ok");
  console.log("Sample PED answer:", JSON.stringify(out.pedAnswers[0], null, 1));
  console.log("\nFull output written to scripts/.scrape-output.json");
};

run().catch((e) => { console.error("scrape failed:", e.message); process.exit(2); });
