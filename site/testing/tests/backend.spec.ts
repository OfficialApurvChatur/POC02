import { test, expect } from "@playwright/test";
import { getEnv } from "../src/aConnection/EnvironmentConnection";


const ENV = getEnv.ENV;
const MACHINE = getEnv.MACHINE;
const PORT = getEnv.PORT;
const APP_NAME = getEnv.APP_NAME;
const BACKEND_URL = getEnv.BACKEND_URL;

// test.describe("Node Connection", () => {
//   test("TC-001: GET / should return the HTML page", async ({
//     request,
//   }) => {
//     const response = await request.get(`${BACKEND_URL}/`);

//     expect(response.status()).toBe(200);
//     expect(response.headers()["content-type"]).toContain("text/html");

//     const body = await response.text();

//     expect(body).toContain("<title>Backend</title>");
//     expect(body).toContain("<h1>Node Connection</h1>");
//     expect(body).toContain("Node connection created successfully...");
//   });

//   test("TC-002: HTML should replace environment placeholders", async ({
//     request,
//   }) => {
//     const response = await request.get(`${BACKEND_URL}/`);
//     const body = await response.text();

//     expect(response.status()).toBe(200);
//     expect(body).not.toContain("{{ NODE_ENV }}");
//     expect(body).not.toContain("{{ NODE_MACHINE }}");
//     expect(body).not.toContain("{{ NODE_PORT }}");
//     expect(body).not.toContain("{{ NODE_APP_NAME }}");

//     expect(body).toContain("Environment:");
//     expect(body).toContain("Machine:");
//     expect(body).toContain("Port:");
//     expect(body).toContain("App Name:");

//     expect(body).toContain(`Environment: ${ENV}`);
//     expect(body).toContain(`Machine: ${MACHINE}`);
//     expect(body).toContain(`Port: ${PORT}`);
//     expect(body).toContain(`App Name: ${APP_NAME}`);
//   });

//   test("TC-003: GET /backend.png should return a PNG image", async ({
//     request,
//   }) => {
//     const response = await request.get(`${BACKEND_URL}/backend.png`);

//     expect(response.status()).toBe(200);
//     expect(response.headers()["content-type"]).toContain("image/png");

//     const body = await response.body();

//     // PNG files start with this 8-byte signature.
//     expect(body.subarray(0, 8)).toEqual(
//       Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
//     );
//   });

//   test("TC-004: GET /health should return a healthy JSON response", async ({
//     request,
//   }) => {
//     const response = await request.get(`${BACKEND_URL}/health`);

//     expect(response.status()).toBe(200);
//     expect(response.headers()["content-type"]).toContain(
//       "application/json",
//     );

//     await expect(response).toBeOK();

//     expect(await response.json()).toEqual({
//       success: true,
//       message: "healthy",
//     });
//   });

//   test("TC-005: Unknown route should return 404", async ({
//     request,
//   }) => {
//     const response = await request.get(
//       `${BACKEND_URL}/unknown-route`,
//     );

//     expect(response.status()).toBe(404);
//     expect(response.headers()["content-type"]).toContain("text/plain");
//     expect(await response.text()).toBe("Page Not Found");
//   });

//   test("TC-006: Favicon referenced by HTML should use the backend image route", async ({
//     request,
//   }) => {
//     const htmlResponse = await request.get(`${BACKEND_URL}/`);
//     const html = await htmlResponse.text();

//     expect(html).toContain('href="/backend.png"');

//     const imageResponse = await request.get(
//       `${BACKEND_URL}/backend.png`,
//     );

//     expect(imageResponse.status()).toBe(200);
//     expect(imageResponse.headers()["content-type"]).toContain(
//       "image/png",
//     );
//   });

//   test("TC-007: Health endpoint should return valid JSON", async ({
//     request,
//   }) => {
//     const response = await request.get(`${BACKEND_URL}/health`);

//     expect(response.status()).toBe(200);

//     const body = await response.text();

//     expect(() => JSON.parse(body)).not.toThrow();
//   });

//   test("TC-008: Repeated health requests should succeed", async ({
//     request,
//   }) => {
//     for (let i = 0; i < 3; i++) {
//       const response = await request.get(`${BACKEND_URL}/health`);

//       expect(response.status()).toBe(200);
//       expect(await response.json()).toEqual({
//         success: true,
//         message: "healthy",
//       });
//     }
//   });

//   test("TC-009: Unknown routes should not return a successful response", async ({
//     request,
//   }) => {
//     const response = await request.get(
//       `${BACKEND_URL}/this-route-does-not-exist`,
//     );

//     expect(response.ok()).toBe(false);
//     expect(response.status()).toBe(404);
//   });
// });

test.describe("Node + Express Connection", () => {

  // TC-001: Backend connection
  test("TC-001: Backend server connection", async ({ request }) => {
    const response = await request.get(BACKEND_URL);

    expect(response.status()).toBe(200);
  });

  // TC-002: Homepage status
  test("TC-002: GET / should return 200", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/`);

    expect(response.status()).toBe(200);
  });

  // TC-003: Homepage content
  test("TC-003: Homepage should contain correct heading", async ({ request }) => {
    const response = await request.get(BACKEND_URL);
    const body = await response.text();

    expect(body).toContain("Node + Express Connection");
    expect(body).toContain("connection created successfully");
  });

  // TC-004: Environment rendering
  test("TC-004: Environment should be rendered", async ({ request }) => {
    const response = await request.get(BACKEND_URL);
    const body = await response.text();

    expect(body).toContain("Environment:");
    expect(body).not.toContain("{{ NODE_ENV }}");
    expect(body).toContain(`Environment: ${ENV}`);
  });

  // TC-005: Machine rendering
  test("TC-005: Machine should be rendered", async ({ request }) => {
    const response = await request.get(BACKEND_URL);
    const body = await response.text();

    expect(body).toContain("Machine:");
    expect(body).not.toContain("{{ NODE_MACHINE }}");
    expect(body).toContain(`Machine: ${MACHINE}`);
  });
  
  // TC-006: Port rendering
  test("TC-006: Port should be rendered", async ({ request }) => {
    const response = await request.get(BACKEND_URL);
    const body = await response.text();
    
    expect(body).toContain("Port:");
    expect(body).not.toContain("{{ NODE_PORT }}");
    expect(body).toContain(`Port: ${PORT}`);
  });
  
  // TC-007: App name rendering
  test("TC-007: App name should be rendered", async ({ request }) => {
    const response = await request.get(BACKEND_URL);
    const body = await response.text();
    
    expect(body).toContain("App Name:");
    expect(body).not.toContain("{{ NODE_APP_NAME }}");
    expect(body).toContain(`App Name: ${APP_NAME}`);
  });

  // TC-008: Static image status
  test("TC-008: Backend image should return 200", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/backend.png`);

    expect(response.status()).toBe(200);
  });

  // TC-009: Static image content type
  test("TC-009: Backend image should have image/png content type", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/backend.png`);

    expect(response.headers()["content-type"]).toContain("image/png");
  });

  // TC-010: Health endpoint status
  test("TC-010: Health endpoint should return 200", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/health`);

    expect(response.status()).toBe(200);
  });

  // TC-011: Health endpoint JSON response
  test("TC-011: Health endpoint should return correct JSON", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/health`);

    expect(response.headers()["content-type"]).toContain("application/json");

    expect(await response.json()).toEqual({
      success: true,
      message: "healthy",
    });
  });

  // TC-012: Invalid route status
  test("TC-012: Invalid route should return 404", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/invalid`);

    expect(response.status()).toBe(404);
  });

  // TC-013: Invalid route response
  test("TC-013: Invalid route should return Page Not Found", async ({ request }) => {
    const response = await request.get(`${BACKEND_URL}/invalid`);

    expect(await response.text()).toBe("Page Not Found");
  });

});
