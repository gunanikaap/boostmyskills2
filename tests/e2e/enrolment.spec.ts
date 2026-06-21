import { expect, test } from "@playwright/test";
import { SAMPLE_COURSE_SLUG, SAMPLE_PROGRAMME_SLUG } from "./fixtures";

test("micro-credential detail page shows an Enrol control", async ({ page }) => {
  await page.goto(`/micro-credentials/${SAMPLE_COURSE_SLUG}`);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Enrol/ }).or(page.getByRole("link", { name: /Go to course/ })).first()).toBeVisible();
});

test("micro-programme detail page shows an Enrol control", async ({ page }) => {
  await page.goto(`/micro-programmes/${SAMPLE_PROGRAMME_SLUG}`);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Enrol/ }).or(page.getByRole("link", { name: /View courses/ })).first()).toBeVisible();
});

// Enrolment APIs must reject anonymous callers (401 when Supabase is configured, 503 if not) —
// never 200. This protects against drive-by enrolment without a session.
test("course enrol API rejects anonymous POST", async ({ request }) => {
  const res = await request.post("/api/courses/enrol", { data: { slug: SAMPLE_COURSE_SLUG } });
  expect(res.ok()).toBeFalsy();
  expect([401, 503]).toContain(res.status());
});

test("programme enrol API rejects anonymous POST", async ({ request }) => {
  const res = await request.post("/api/programmes/enrol", { data: { slug: SAMPLE_PROGRAMME_SLUG } });
  expect(res.ok()).toBeFalsy();
  expect([401, 503]).toContain(res.status());
});

// NOTE: the full enrol → auto-enrol associated credentials → dashboard-updates → persists-after-
// refresh journey mutates the live database, so it is covered by MANUAL testing — see
// docs/FINAL_E2E_TEST_PLAN.md (section D).
