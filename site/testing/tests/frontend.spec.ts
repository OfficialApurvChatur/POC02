import { test, expect } from '@playwright/test';
import { getEnv } from '../src/aConnection/EnvironmentConnection';


const FRONTEND_URL = getEnv.FRONTEND_URL

test.describe("React Connection", () => {

  test("should load React connection page", async ({ page }) => {
    const response = await page.goto(FRONTEND_URL);

    expect(response?.status()).toBe(200);
  });

  test("should display React Connection heading", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("React Connection", { exact: true })
    ).toBeVisible();
  });

  test("should display successful connection message", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("React connection created successfully...")
    ).toBeVisible();
  });

  test("should display Environment", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.locator("ul li").nth(0)
    ).toContainText("Environment:");
  });

  test("should display Machine", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.locator("ul li").nth(1)
    ).toContainText("Machine:");
  });

  test("should display Port", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.locator("ul li").nth(2)
    ).toContainText("Port:");
  });

  test("should display App", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.locator("ul li").nth(3)
    ).toContainText("App Name:");
  });

  test("should have four environment details", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const listItems = page.locator("ul li");

    await expect(listItems).toHaveCount(4);
  });

});
