import { test, expect } from "@playwright/test";
import { getEnv } from "../src/aConnection/EnvironmentConnection";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT;
const APP_NAME = getEnv.APP_NAME;
const BACKEND_URL = getEnv.BACKEND_URL;

test.describe("Node Connection", () => {
  test("TC-001: GET / should return the HTML page", async ({
    request,
  }) => {
    const response = await request.get(`${BACKEND_URL}/`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/html");

    const body = await response.text();

    expect(body).toContain("<title>Backend</title>");
    expect(body).toContain("<h1>Node Connection</h1>");
    expect(body).toContain("Node connection created successfully...");
  });

  test("TC-002: HTML should replace environment placeholders", async ({
    request,
  }) => {
    const response = await request.get(`${BACKEND_URL}/`);
    const body = await response.text();

    expect(response.status()).toBe(200);
    expect(body).not.toContain("{{ NODE_ENV }}");
    expect(body).not.toContain("{{ NODE_MACHINE }}");
    expect(body).not.toContain("{{ NODE_PORT }}");
    expect(body).not.toContain("{{ NODE_APP_NAME }}");

    expect(body).toContain("Environment:");
    expect(body).toContain("Machine:");
    expect(body).toContain("Port:");
    expect(body).toContain("App Name:");

    expect(body).toContain(`Environment: ${ENV}`);
    expect(body).toContain(`Machine: ${MACHINE}`);
    expect(body).toContain(`Port: ${PORT}`);
    expect(body).toContain(`App Name: ${APP_NAME}`);
  });

  test("TC-003: GET /backend.png should return a PNG image", async ({
    request,
  }) => {
    const response = await request.get(`${BACKEND_URL}/backend.png`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");

    const body = await response.body();

    // PNG files start with this 8-byte signature.
    expect(body.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
  });

  test("TC-004: GET /health should return a healthy JSON response", async ({
    request,
  }) => {
    const response = await request.get(`${BACKEND_URL}/health`);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain(
      "application/json",
    );

    await expect(response).toBeOK();

    expect(await response.json()).toEqual({
      success: true,
      message: "healthy",
    });
  });

  test("TC-005: Unknown route should return 404", async ({
    request,
  }) => {
    const response = await request.get(
      `${BACKEND_URL}/unknown-route`,
    );

    expect(response.status()).toBe(404);
    expect(response.headers()["content-type"]).toContain("text/plain");
    expect(await response.text()).toBe("Page Not Found");
  });

  test("TC-006: Favicon referenced by HTML should use the backend image route", async ({
    request,
  }) => {
    const htmlResponse = await request.get(`${BACKEND_URL}/`);
    const html = await htmlResponse.text();

    expect(html).toContain('href="/backend.png"');

    const imageResponse = await request.get(
      `${BACKEND_URL}/backend.png`,
    );

    expect(imageResponse.status()).toBe(200);
    expect(imageResponse.headers()["content-type"]).toContain(
      "image/png",
    );
  });

  test("TC-007: Health endpoint should return valid JSON", async ({
    request,
  }) => {
    const response = await request.get(`${BACKEND_URL}/health`);

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(() => JSON.parse(body)).not.toThrow();
  });

  test("TC-008: Repeated health requests should succeed", async ({
    request,
  }) => {
    for (let i = 0; i < 3; i++) {
      const response = await request.get(`${BACKEND_URL}/health`);

      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        success: true,
        message: "healthy",
      });
    }
  });

  test("TC-009: Unknown routes should not return a successful response", async ({
    request,
  }) => {
    const response = await request.get(
      `${BACKEND_URL}/this-route-does-not-exist`,
    );

    expect(response.ok()).toBe(false);
    expect(response.status()).toBe(404);
  });
});
