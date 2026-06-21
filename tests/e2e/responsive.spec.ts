import { expect, test } from "@playwright/test";
import { SAMPLE_COURSE_SLUG, SAMPLE_PROGRAMME_SLUG } from "./fixtures";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1280, height: 900 }
];

const PAGES = [
  "/",
  "/micro-programmes",
  "/micro-credentials",
  "/contact",
  "/privacy-policy",
  `/micro-credentials/${SAMPLE_COURSE_SLUG}`,
  `/micro-programmes/${SAMPLE_PROGRAMME_SLUG}`
];

for (const vp of VIEWPORTS) {
  test(`no horizontal overflow at ${vp.name} (${vp.width}px)`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    for (const path of PAGES) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `horizontal overflow on ${path} @ ${vp.name}`).toBeLessThanOrEqual(1);
    }
  });
}

test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByLabel("Toggle menu");
  await toggle.click();
  await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
  await expect(page.getByRole("link", { name: "Micro-programmes" }).first()).toBeVisible();
  await toggle.click();
  await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeHidden();
});
