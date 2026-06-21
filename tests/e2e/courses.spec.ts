import { expect, test } from "@playwright/test";
import { SAMPLE_COURSE_SLUG } from "./fixtures";

// The micro-credentials catalogue lives at /courses (CoursesListing); /micro-credentials redirects
// here. It renders a "Viewing N courses" heading, a live search box and one card per course.
test("courses catalogue renders search and course cards", async ({ page }) => {
  await page.goto("/courses");
  await expect(page.getByRole("heading", { name: /Viewing \d+ courses/ })).toBeVisible();
  await expect(page.getByPlaceholder("Search for a course")).toBeVisible();
  expect(await page.locator("article.bms-course-card").count()).toBeGreaterThan(10);
});

test("catalogue search filters the visible cards", async ({ page }) => {
  await page.goto("/courses");
  const before = await page.locator("article.bms-course-card").count();
  expect(before).toBeGreaterThan(0);
  // A query that matches nothing must empty the grid and show the empty-state message.
  await page.getByPlaceholder("Search for a course").fill("zzqqxxnomatch");
  await expect(page.getByText("No courses match your search.")).toBeVisible();
  expect(await page.locator("article.bms-course-card").count()).toBe(0);
});

// The micro-programmes catalogue lives at /programs; /micro-programmes redirects here.
test("programmes catalogue renders verified programme cards", async ({ page }) => {
  await page.goto("/programs");
  await expect(page.getByRole("heading", { name: "Micro-programmes" }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", { exact: true, name: "Sustainable Energy Technologies and Strategies in Urban Environments" })
  ).toBeVisible();
});

test("course detail page renders title and learning content", async ({ page }) => {
  await page.goto(`/micro-credentials/${SAMPLE_COURSE_SLUG}`);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  // Detail pages render at least one content/section heading below the hero.
  expect(await page.getByRole("heading", { level: 2 }).count()).toBeGreaterThan(0);
});
