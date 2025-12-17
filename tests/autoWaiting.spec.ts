import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test("Auto-waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  await successButton.click();
  const text = successButton.textContent();
  expect(text).toEqual("Data loaded with AJAX get request.");
});

test("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  // wait for element
  await page.waitForSelector(".bg-success");
  // wait for particlular response
  await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  // wait for network calls to be completed ('NOT RECOMMENDED' )
  await page.waitForLoadState("networkidle");
  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
  test.setTimeout(10000);
  test.slow();
  const successButton = page.locator(".bg-success");
  await successButton.click();
});
