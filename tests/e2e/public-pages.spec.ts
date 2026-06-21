import { expect, test } from "@playwright/test";
import { expectPageOk } from "./fixtures";

// Every public marketing/legal page must render with a status < 400 and a visible <h1>.
const PUBLIC_PAGES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-and-conditions",
  "/micro-programmes",
  "/micro-credentials"
];

for (const path of PUBLIC_PAGES) {
  test(`public page renders: ${path}`, async ({ page }) => {
    await expectPageOk(page, path);
  });
}

test("home shows the live hero and trending programmes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Become a leader in sustainability" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our Trending Micro-programmes" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore Micro-programmes/ })).toBeVisible();
});

test("contact page exposes the enquiry form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByPlaceholder("Your Email")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("footer links are present on a public page", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer).toBeVisible();
  await expect(footer.getByRole("link", { name: /Privacy/i }).first()).toBeVisible();
});

// Friendly hyphenated aliases redirect to the canonical maintained routes.
test("legacy/alias public routes redirect to maintained routes", async ({ page }) => {
  const redirects: [string, RegExp][] = [
    ["/micro-programmes", /\/programs/],
    ["/micro-credentials", /\/courses/],
    ["/privacy-policy", /\/privacy/],
    ["/cookie-policy", /\/cookie_policy/],
    ["/terms-and-conditions", /\/tos/],
    ["/login", /\/auth\/sign-in/],
    ["/register", /\/auth\/register/]
  ];
  for (const [from, to] of redirects) {
    await page.goto(from);
    await expect(page, `${from} should redirect`).toHaveURL(to);
  }
});
