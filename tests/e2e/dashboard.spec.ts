import { expect, test } from "@playwright/test";
import { authCredentials, signIn } from "./fixtures";

test("dashboard is protected when signed out", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/auth\/sign-in/);
});

// Authenticated dashboard checks. Credential-gated: these run only when BMS_LOGIN_USERNAME /
// BMS_LOGIN_PASSWORD are set in the environment. Without them the signed-in dashboard states
// (empty / enrolled credentials / enrolled programmes, dropdowns) are covered by manual testing —
// see docs/FINAL_E2E_TEST_PLAN.md.
test.describe("authenticated dashboard", () => {
  test.skip(!authCredentials(), "BMS_LOGIN_USERNAME / BMS_LOGIN_PASSWORD not set");

  test("learner can reach the dashboard after signing in", async ({ page }) => {
    await signIn(page);
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole("heading", { name: /My Micro-/ }).first()).toBeVisible();
  });

  test("learner header user dropdown reveals account + sign out", async ({ page }) => {
    await signIn(page);
    await page.locator(".bms-lh-user-btn").click();
    await expect(page.getByRole("menuitem", { name: "Account" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Sign Out" })).toBeVisible();
  });

  test("learner header My courses + Catalogue dropdowns open", async ({ page }) => {
    await signIn(page);
    await page.getByRole("button", { name: "My courses" }).click();
    await expect(page.getByRole("menuitem", { name: "My Micro-credentials" })).toBeVisible();
    await page.getByRole("button", { name: "Catalogue" }).click();
    await expect(page.getByRole("menuitem", { name: "Micro-credentials" })).toBeVisible();
  });
});
