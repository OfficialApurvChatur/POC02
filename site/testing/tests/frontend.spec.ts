import { test, expect } from "@playwright/test";


const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001";

test("has title", async ({ page }) => {
  await page.goto(FRONTEND_URL);
  await expect(page).toHaveTitle("Frontend");
});
