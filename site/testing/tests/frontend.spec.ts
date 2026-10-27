import { test, expect } from "@playwright/test";
import { getEnv } from "../src/aConnection/EnvironmentConnection";


const FRONTEND_URL = getEnv.FRONTEND_URL;

test("has title", async ({ page }) => {
  await page.goto(FRONTEND_URL);
  await expect(page).toHaveTitle("Frontend");
});
