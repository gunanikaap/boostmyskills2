// One-off live certificate inspection. Logs in (creds only from .env.local, never printed),
// queries the Open edX certificates API + learner dashboard for any earned certificate, and dumps
// its HTML structure/fields so we can match the design locally. Output gitignored.
import fs from "node:fs";
import { chromium } from "playwright";

const LMS = "https://boostmyskills.eu";
const APPS = "https://apps.boostmyskills.eu";
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/).filter((l) => l.includes("=")).map((l) => {
    const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  })
);
const USER = env.BMS_LOGIN_USERNAME, PASS = env.BMS_LOGIN_PASSWORD;
const out = {};

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${LMS}/login`, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await page.fill('input[name="emailOrUsername"]', USER);
  await page.fill('input[name="password"]', PASS);
  await page.click("button#sign-in");
  await page.waitForTimeout(8000);

  // 1) Certificates API
  const certApi = await page.request.get(`${LMS}/api/certificates/v0/certificates/${USER}/`, { headers: { "X-Requested-With": "XMLHttpRequest" } });
  out.certApiStatus = certApi.status();
  out.certApi = certApi.ok() ? await certApi.json() : (await certApi.text()).slice(0, 300);

  // 2) Learner dashboard for certificate links
  await page.goto(`${APPS}/dashboard`, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  out.dashCertLinks = await page.evaluate(() =>
    [...document.querySelectorAll("a")].map((a) => a.href).filter((h) => /certificate/i.test(h)).slice(0, 10)
  );

  // 3) If any certificate URL found, fetch and inspect its HTML
  const certUrl = (Array.isArray(out.certApi) && out.certApi[0]?.download_url) || out.dashCertLinks?.[0];
  if (certUrl) {
    out.certUrl = certUrl;
    const full = certUrl.startsWith("http") ? certUrl : `${LMS}${certUrl}`;
    await page.goto(full, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(4000);
    out.certPage = await page.evaluate(() => {
      const txt = (s) => (document.querySelector(s)?.textContent || "").trim().replace(/\s+/g, " ");
      return {
        title: document.title,
        h1: txt("h1"),
        names: [...document.querySelectorAll(".accomplishment-recipient, .user-name, .accomplishment-statement-detail")].map((e) => e.textContent.trim().replace(/\s+/g, " ")).slice(0, 5),
        headings: [...document.querySelectorAll("h1,h2,h3")].map((e) => e.textContent.trim().replace(/\s+/g, " ")).slice(0, 12),
        logos: [...document.querySelectorAll("img")].map((i) => ({ alt: i.alt, src: i.src })).slice(0, 12),
        bodyText: (document.body.innerText || "").replace(/\s+/g, " ").slice(0, 1200)
      };
    });
  }

  await browser.close();
  fs.writeFileSync("scripts/.cert-inspect.json", JSON.stringify(out, null, 2));
  console.log("certApiStatus:", out.certApiStatus);
  console.log("certApi:", JSON.stringify(out.certApi).slice(0, 500));
  console.log("dashCertLinks:", JSON.stringify(out.dashCertLinks));
  console.log("certPage:", JSON.stringify(out.certPage, null, 1)?.slice(0, 1500));
};
run().catch((e) => { console.error("inspect-cert failed:", e.message); process.exit(2); });
