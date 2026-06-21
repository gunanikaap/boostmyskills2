// Live answer-key harvester (robust). For every MCQ in the 62 scraped courses it renders the real
// CAPA xblock and reveals the verified correct option(s) via "Show Answer". On courses where Show
// Answer is gated, it submits one option first to unlock it. Resumable + incremental save to
// scripts/.harvested-answers.json. Credentials only from gitignored .env.local.
//   node scripts/harvest-answers.mjs
import fs from "node:fs";
import { chromium } from "playwright";

const LMS = "https://boostmyskills.eu";
const OUT = "scripts/.harvested-answers.json";
const CONCURRENCY = 3;
const RECREATE_EVERY = 120; // recycle a page after N problems to bound memory

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/).filter((l) => l.includes("=")).map((l) => {
    const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  })
);
const USER = env.BMS_LOGIN_USERNAME, PASS = env.BMS_LOGIN_PASSWORD;
const courseIds = JSON.parse(fs.readFileSync("scripts/.course-ids.json", "utf8"));
const result = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
const save = () => fs.writeFileSync(OUT, JSON.stringify(result, null, 1));

const readCorrects = (page) =>
  page.$$eval("label.choicegroup_correct", (els) =>
    els.map((e) => e.textContent.trim().replace(/\s*correct\s*$/i, "").trim()).filter(Boolean)
  );

const reveal = async (page, prob) => {
  try {
    await page.goto(`${LMS}/xblock/${prob.id}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector(".choicegroup, .inputtype, .wrapper-problem-response", { timeout: 15000 }).catch(() => {});

    const type = (await page.locator(".choicegroup input[type=checkbox]").count()) > 0
      ? "multi"
      : (await page.locator(".choicegroup input[type=radio]").count()) > 0
      ? "single"
      : "other";
    const prompt = await page.locator(".wrapper-problem-response .problem > p, .problem p, fieldset legend").first()
      .textContent({ timeout: 3000 }).then((t) => (t || "").trim().replace(/\s+/g, " ")).catch(() => "");

    let corrects = await readCorrects(page);
    let showBtn = page.locator('button:has-text("Show answer"), a:has-text("Show answer"), .action .show').first();

    // Gated Show Answer: submit one option to unlock it.
    if (!corrects.length && !(await showBtn.count())) {
      const radio = page.locator(".choicegroup input[type=radio], .choicegroup input[type=checkbox]").first();
      if (await radio.count()) {
        await radio.check({ timeout: 4000 }).catch(() => {});
        const submit = page.locator('button:has-text("Submit"), button:has-text("Final check"), .action .check').first();
        if (await submit.count()) {
          await submit.click({ timeout: 5000 }).catch(() => {});
          await page.waitForSelector('button:has-text("Show answer"), a:has-text("Show answer"), label.choicegroup_correct', { timeout: 8000 }).catch(() => {});
        }
        showBtn = page.locator('button:has-text("Show answer"), a:has-text("Show answer"), .action .show').first();
      }
    }
    if (!corrects.length && (await showBtn.count())) {
      await showBtn.click({ timeout: 5000 }).catch(() => {});
      await page.waitForSelector("label.choicegroup_correct, .field-answer", { timeout: 8000 }).catch(() => {});
      corrects = await readCorrects(page);
    }
    const fieldAns = await page.$$eval(".field-answer", (els) => els.map((e) => e.textContent.trim())).catch(() => []);
    return { id: prob.id, display_name: prob.display_name, prompt, type, corrects, fieldAns, revealed: corrects.length > 0 };
  } catch (e) {
    return { id: prob.id, display_name: prob.display_name, error: String(e).slice(0, 100) };
  }
};

const run = async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-dev-shm-usage", "--disable-gpu", "--no-sandbox", "--js-flags=--max-old-space-size=512"]
  });
  const ctx = await browser.newContext();
  const api = await ctx.newPage();
  await api.goto(`${LMS}/login`, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
  await api.waitForTimeout(3000);
  await api.fill('input[name="emailOrUsername"]', USER);
  await api.fill('input[name="password"]', PASS);
  await api.click("button#sign-in");
  await api.waitForTimeout(8000);
  const csrf = (await ctx.cookies()).find((c) => c.name === "csrftoken")?.value || "";
  const hdr = { "X-Requested-With": "XMLHttpRequest", "X-CSRFToken": csrf };

  const slugs = Object.keys(courseIds);
  let courseN = 0;
  for (const slug of slugs) {
    courseN++;
    const prior = result[slug];
    const priorAns = Array.isArray(prior) ? prior.filter((h) => (h?.corrects?.length || 0) > 0).length : 0;
    if (Array.isArray(prior) && (prior.length === 0 || priorAns > 0) && !process.env.FORCE) {
      console.log(`[${courseN}/${slugs.length}] ${slug} — cached (${priorAns}/${prior.length})`);
      continue;
    }

    let problems = [];
    try {
      const url = `${LMS}/api/courses/v2/blocks/?course_id=${encodeURIComponent(courseIds[slug])}&username=${encodeURIComponent(USER)}&depth=all&requested_fields=type,display_name`;
      problems = Object.values((await api.request.get(url, { headers: hdr }).then((r) => r.json())).blocks || {}).filter((b) => b.type === "problem");
    } catch {
      result[slug] = []; save(); console.log(`[${courseN}/${slugs.length}] ${slug} — blocks error`); continue;
    }

    let pages = [];
    for (let i = 0; i < CONCURRENCY; i++) pages.push(await ctx.newPage());
    const counts = new Array(CONCURRENCY).fill(0);
    const harvested = [];
    let idx = 0;
    await Promise.all(
      pages.map(async (page, slot) => {
        while (idx < problems.length) {
          const my = idx++;
          harvested[my] = await reveal(page, problems[my]);
          if (++counts[slot] >= RECREATE_EVERY) { // recycle to bound memory
            await page.close().catch(() => {});
            pages[slot] = page = await ctx.newPage();
            counts[slot] = 0;
          }
        }
      })
    );
    for (const p of pages) await p.close().catch(() => {});
    result[slug] = harvested;
    save();
    const withAns = harvested.filter((h) => (h?.corrects?.length || 0) > 0).length;
    console.log(`[${courseN}/${slugs.length}] ${slug} — ${harvested.length} problems, ${withAns} answers`);
  }

  await browser.close();
  const totals = Object.values(result).flat();
  console.log(`\nDONE. ${totals.length} problems, ${totals.filter((h) => (h?.corrects?.length || 0) > 0).length} answers revealed.`);
};
run().catch((e) => { console.error("harvest failed:", e.message); process.exit(2); });
