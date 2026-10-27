import { test, expect } from "@playwright/test";
import { getEnv } from "../src/aConnection/EnvironmentConnection";


const BACKEND_URL = getEnv.BACKEND_URL;

test("has title", async ({ page }) => {
  await page.goto(BACKEND_URL);
  await expect(page).toHaveTitle("Backend");
});
