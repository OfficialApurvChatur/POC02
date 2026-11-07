import { test, expect } from "@playwright/test";
import { getEnv } from "../src/aConnection/EnvironmentConnection";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT - 5000;
const APP_NAME = getEnv.APP_NAME;
const FRONTEND_URL = getEnv.FRONTEND_URL;

// test.describe("React Connection", () => {

//   test("TC-001: Should load React connection page", async ({ page }) => {
//     const response = await page.goto(FRONTEND_URL);

//     expect(response?.status()).toBe(200);
//   });

//   test("TC-002: Should display React Connection heading", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(
//       page.getByRole("heading", { name: "React Connection", exact: true })
//     ).toBeVisible();
//   });

//   test("TC-003: Should display successful connection message", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(
//       page.getByText("React connection created successfully...", {
//         exact: true,
//       })
//     ).toBeVisible();
//   });

//   test("TC-004: Should display the correct Environment", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(page.locator("ul li").nth(0))
//       .toHaveText(`Environment: ${ENV}`);
//   });

//   test("TC-005: Should display the correct Machine", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(page.locator("ul li").nth(1))
//       .toHaveText(`Machine: ${MACHINE}`);
//   });

//   test("TC-006: Should display the correct Port", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(page.locator("ul li").nth(2))
//       .toHaveText(`Port: ${PORT}`);
//   });

//   test("TC-007: Should display the correct App Name", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(page.locator("ul li").nth(3))
//       .toHaveText(`App Name: ${APP_NAME}`);
//   });

//   test("TC-008: Should display four environment details", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     await expect(page.locator("ul li")).toHaveCount(4);
//   });

//   test("TC-009: Should display all environment values in order", async ({ page }) => {
//     await page.goto(FRONTEND_URL);

//     const expectedValues = [
//       `Environment: ${ENV}`,
//       `Machine: ${MACHINE}`,
//       `Port: ${PORT}`,
//       `App Name: ${APP_NAME}`,
//     ];

//     const listItems = page.locator("ul li");

//     for (let i = 0; i < expectedValues.length; i++) {
//       await expect(listItems.nth(i)).toHaveText(expectedValues[i]);
//     }
//   });

// });

test.describe("React + Shadcn Connection", () => {

  // TC-001: React page loading
  test("TC-001: Should load React connection page", async ({ page }) => {
    const response = await page.goto(FRONTEND_URL);

    expect(response?.status()).toBe(200);
  });

  // TC-002: Shadcn heading
  test("TC-002: Should display Shadcn Connection heading", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("Shadcn Connection", {
        exact: true,
      })
    ).toBeVisible();
  });

  // TC-003: Shadcn description
  test("TC-003: Should display Shadcn connection message", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("Shadcn connection created successfully...", {
        exact: true,
      })
    ).toBeVisible();
  });

  // TC-004: React heading
  test("TC-004: Should display React Connection heading", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("React Connection", {
        exact: true,
      })
    ).toBeVisible();
  });

  // TC-005: React description
  test("TC-005: Should display React connection message", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.getByText("React connection created successfully...", {
        exact: true,
      })
    ).toBeVisible();
  });

  // TC-006: Environment
  test("TC-006: Should display the correct Environment", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(0))
      .toHaveText(`Environment: ${ENV}`);
  });

  // TC-007: Machine
  test("TC-007: Should display the correct Machine", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(1))
      .toHaveText(`Machine: ${MACHINE}`);
  });

  // TC-008: Port
  test("TC-008: Should display the correct Port", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(2))
      .toHaveText(`Port: ${PORT}`);
  });

  // TC-009: App Name
  test("TC-009: Should display the correct App Name", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li").nth(3))
      .toHaveText(`App Name: ${APP_NAME}`);
  });

  // TC-010: Environment details count
  test("TC-010: Should display four environment details", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator("ul li")).toHaveCount(4);
  });

  // TC-011: Environment details order
  test("TC-011: Should display all environment values in order", async ({ page }) => {
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

  // TC-012: Disabled button
  test("TC-012: Should display disabled Click Here button", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const button = page.getByRole("button", {
      name: "Click Here",
      exact: true,
    });

    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });

  // TC-013: Shadcn Alert
  test("TC-013: Should display Shadcn alert component", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(
      page.locator('[role="alert"]')
    ).toBeVisible();
  });

  // TC-014: React Card
  test("TC-014: Should display React connection card", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    const card = page.locator(".max-w-sm");

    await expect(card).toBeVisible();
    await expect(card).toContainText("React Connection");
  });

  // TC-015: React and Shadcn components
  test("TC-015: Should display both React and Shadcn components", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page.locator(".max-w-sm")).toBeVisible();
  });

});

