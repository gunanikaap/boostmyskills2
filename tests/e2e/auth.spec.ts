import { expect, test } from "@playwright/test";
import { PROTECTED_PATHS } from "./fixtures";

test("sign-in page renders the form", async ({ page }) => {
  await page.goto("/auth/sign-in");
  await expect(page.getByRole("heading", { name: "Start learning with BoostMySkills" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Forgot password" })).toBeVisible();
});

test("register page renders the form", async ({ page }) => {
  await page.goto("/auth/register");
  await expect(page.getByRole("heading", { name: "Start learning with BoostMySkills" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Create an account for free" })).toBeVisible();
});

test("reset-password page renders", async ({ page }) => {
  await page.goto("/auth/reset-password");
  await expect(page.getByRole("button", { name: /Send reset link|Reset|Update/ }).first()).toBeVisible();
});

test("protected routes redirect anonymous users to sign-in with a next param", async ({ page }) => {
  for (const path of PROTECTED_PATHS) {
    await page.goto(path);
    await expect(page, `expected ${path} to redirect to sign-in`).toHaveURL(/\/auth\/sign-in/);
    expect(new URL(page.url()).searchParams.get("next"), `next param for ${path}`).toContain(path.split("?")[0]);
  }
});

// Open-redirect guard: an absolute `next` must never send the user off-origin. The callback
// sanitises it to the local fallback, so the user must NOT end up on the attacker's host.
test("auth callback cannot be used as an open redirect", async ({ page }) => {
  await page.goto("/auth/callback?next=https://example.com/phishing");
  const host = new URL(page.url()).hostname;
  expect(host, "callback must not redirect off-site").not.toBe("example.com");
  expect(["127.0.0.1", "localhost"], `unexpected host ${host}`).toContain(host);
});

test("auth confirm with no token redirects back to sign-in", async ({ page }) => {
  await page.goto("/auth/confirm");
  await expect(page).toHaveURL(/\/auth\/sign-in/);
});
