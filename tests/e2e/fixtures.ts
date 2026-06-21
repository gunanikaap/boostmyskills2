import { expect, type Page } from "@playwright/test";

// Stable slugs that exist in the catalogue (validated by scripts/validate-courses.mjs).
export const SAMPLE_COURSE_SLUG = "advanced-modelling-of-buildings-and-energy-systems";
export const SAMPLE_PROGRAMME_SLUG = "sustainable-energy-technologies-and-strategies-in-urban-environments";

// Routes that require a signed-in user — each must bounce an anonymous visitor to sign-in.
export const PROTECTED_PATHS = ["/dashboard", "/account", `/learn/${SAMPLE_COURSE_SLUG}`];

// Optional sign-in helper for credential-gated authenticated flows. Reads BMS_LOGIN_USERNAME /
// BMS_LOGIN_PASSWORD from the environment so no credentials are ever hard-coded in the repo.
// Returns false when credentials are absent (the caller should skip the test in that case).
export const authCredentials = () => {
  const username = process.env.BMS_LOGIN_USERNAME;
  const password = process.env.BMS_LOGIN_PASSWORD;
  return username && password ? { username, password } : null;
};

export async function signIn(page: Page): Promise<boolean> {
  const creds = authCredentials();
  if (!creds) return false;
  await page.goto("/auth/sign-in");
  await page.locator('#sign-in-form input[type="text"]').fill(creds.username);
  await page.locator('#sign-in-form input[type="password"]').fill(creds.password);
  await page.locator("#sign-in").click();
  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
  return true;
}

// A page "loaded successfully" if the HTTP status is < 400 and it exposes a level-1 heading.
export async function expectPageOk(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response, `no response for ${path}`).not.toBeNull();
  expect(response!.status(), `bad status for ${path}`).toBeLessThan(400);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
}
