import { test, expect } from '@playwright/test';
import { getEnv } from '../src/aConnection/EnvironmentConnection';


const BACKEND_URL = getEnv.BACKEND_URL

test.describe("Node Connection", () => {

  test("should load the backend page", async ({ page }) => {
    const response = await page.goto(BACKEND_URL);

    expect(response?.status()).toBe(200);
  });

  test("should have Backend title", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(page).toHaveTitle("Backend");
  });

  test("should have Node Connection heading", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(
      page.getByRole("heading", { name: "Node Connection" })
    ).toBeVisible();
  });

  test("should show successful connection message", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(
      page.getByText("Node connection created successfully...")
    ).toBeVisible();
  });

  test("should have environment list", async ({ page }) => {
    await page.goto(BACKEND_URL);

    const listItems = page.locator("ul li");

    await expect(listItems).toHaveCount(4);
  });

  test("should display Environment", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(
      page.locator("ul li").nth(0)
    ).toContainText("Environment:");
  });

  test("should display Machine", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(
      page.locator("ul li").nth(1)
    ).toContainText("Machine:");
  });

  test("should display Port", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(
      page.locator("ul li").nth(2)
    ).toContainText("Port:");
  });

  test("should display App", async ({ page }) => {
    await page.goto(BACKEND_URL);

    await expect(
      page.locator("ul li").nth(3)
    ).toContainText("App Name:");
  });

  test("should have backend favicon", async ({ request }) => {
    const response = await request.get(
      `${BACKEND_URL}/backend.png`
    );

    expect(response.status()).toBe(200);

    expect(
      response.headers()["content-type"]
    ).toContain("image/png");
  });

});
