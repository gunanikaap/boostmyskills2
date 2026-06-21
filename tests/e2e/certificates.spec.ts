import { expect, test } from "@playwright/test";
import { SAMPLE_COURSE_SLUG } from "./fixtures";

// The certificate download recomputes eligibility server-side and requires a session, so an
// anonymous caller must be rejected (401 configured / 503 not) — never handed a PDF.
test("certificate download API rejects anonymous requests", async ({ request }) => {
  const res = await request.get(`/api/certificates/${SAMPLE_COURSE_SLUG}`);
  expect(res.ok()).toBeFalsy();
  expect([401, 403, 503]).toContain(res.status());
});

test("certificate verify page handles an unknown hash gracefully", async ({ page }) => {
  await page.goto("/certificates/verify/not-a-real-hash-000");
  await expect(page.getByText("Certificate not found")).toBeVisible();
  await expect(page.getByRole("link", { name: /Back to BoostMySkills/ })).toBeVisible();
});

// NOTE: locked-before-eligibility, unlocked-after-requirements, MCQ ≥50% gating, video-only "all
// videos" gating, the actual PDF download and existing-certificate reuse all require an enrolled,
// progressed learner and are covered by MANUAL testing — see docs/FINAL_E2E_TEST_PLAN.md (section F).
// Eligibility maths is additionally guarded by `npm run validate:certificates`.
