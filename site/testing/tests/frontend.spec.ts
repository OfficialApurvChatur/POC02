import { test, expect } from "@playwright/test";
import { getEnv } from "../src/aConnection/EnvironmentConnection";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT - 5000;
const APP_NAME = getEnv.APP_NAME;
const FRONTEND_URL = getEnv.FRONTEND_URL;

test.describe("React Connection", () => {

  test("TC-001: Should load React connection page", async ({ page }) => {
    const response = await page.goto(FRONTEND_URL);

    expect(response?.status()).toBe(200);
  });

  test("TC-002: Should display React Connection heading", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByRole("heading", { name: "React Connection", exact: true })
    ).toBeVisible();
  });

  test("TC-003: Should display successful connection message", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("React connection created successfully...", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("TC-004: Should display the correct Environment", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(0))
      .toHaveText(`Environment: ${ENV}`);
  });

  test("TC-005: Should display the correct Machine", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(1))
      .toHaveText(`Machine: ${MACHINE}`);
  });

  test("TC-006: Should display the correct Port", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(2))
      .toHaveText(`Port: ${PORT}`);
  });

  test("TC-007: Should display the correct App Name", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(3))
      .toHaveText(`App Name: ${APP_NAME}`);
  });

  test("TC-008: Should display four environment details", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li")).toHaveCount(4);
  });

  test("TC-009: Should display all environment values in order", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const expectedValues = [
      `Environment: ${ENV}`,
      `Machine: ${MACHINE}`,
      `Port: ${PORT}`,
      `App Name: ${APP_NAME}`,
    ];

    const listItems = page.locator("ul li");

    for (let i = 0; i < expectedValues.length; i++) {
      await expect(listItems.nth(i)).toHaveText(expectedValues[i]);
    }
  });

});
