import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  await page.locator("input"); // tag name
  await page.locator("#inputEmail").click(); // id
  await page.locator(".input-full-width"); // class name
  await page.locator("[placeholder='Email']"); // attribute
  await page.locator("input[placeholder='Email']"); // tag name with attribute
  await page.locator("form input"); // descendant
  await page.locator("nb-card form input"); // multiple descendants
  await page.locator("[status='warning']"); // single attribute without value
  await page.locator("input[placeholder='Email'][type='email']"); // multiple attributes
  await page.locator('//*[@placeholder="Email"]'); // XPath (not recommended)
  await page.locator(':text("Sign in")'); // partial text content
  await page.locator(':text-is("Sign in")'); // exact text content
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }); // by role and accessible name
  await page.getByPlaceholder("Jane Doe"); // by placeholder text
  await page.getByLabel("Email"); // by associated label
  await page.getByText("Sign in"); // by text content
  await page.getByTitle("Sign in"); // by title attribute
  await page.getByTestId("sign-in-button"); // by test id attribute
});

test("Child locators", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click(); // chaining locators
  await page
    .locator("nb-card)")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click(); // multiple chaining
  await page.locator("nb-card").getByRole("button", { name: "Submit" }).click(); // combining locator types
  await page.locator("nb-card").nth(3); // selecting specific instance
});

test("Parent locators", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click(); // locating parent by child text
  await page.locator("nb-card", { has: page.locator("#inputEmail1") }); // locating parent by child locator
  await page
    .locator("nb-card")
    .filter({ hasText: "Horizontal form" })
    .getByRole("button", { name: "Submit" })
    .click(); // filtering parents by child text
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click(); // filtering parents by child locator
  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click(); // navigating to parent
});

test("Reusing locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" }); // define locator
  const emailInput = basicForm.getByRole("textbox", { name: "Email" });
  const passwordInput = basicForm.getByRole("textbox", { name: "Password" });
  const submitButton = basicForm.getByRole("button", { name: "Submit" });

  await emailInput.fill("test@test.com"); // use locator
  await passwordInput.fill("password123");
  await basicForm.locator("nb-checkbox").click();
  await submitButton.click();

  await expect(emailInput).toHaveValue("test@test.com"); // assert using locator
});

test("Extracting values from locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm
    .getByRole("button", { name: "Submit" })
    .textContent(); // extract single text content
  expect(buttonText).toEqual("Submit");

  const allRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtonLabels).toEqual([
    "Option 1",
    "Option 2",
    "Disabled Option",
  ]); // extract multiple text contents

  const emailInput = basicForm.getByRole("textbox", { name: "Email" });
  await emailInput.fill("test@test.com");
  const emailValue = await emailInput.inputValue(); // extract input value
  expect(emailValue).toEqual("test@test.com");

  const placeholderValue = await emailInput.getAttribute("placeholder"); // extract attribute value
  expect(placeholderValue).toEqual("Email");
});

test("Assertions", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");
  const x = 5;
  expect(x).toBeGreaterThan(3); // generic assertion

  const text = await basicFormButton.textContent();
  await expect(text).toEqual("Submit"); // value assertion

  expect(basicFormButton).toHaveText("Submit"); // locator assertion

  await expect.soft(basicFormButton).toHaveText("Submit"); // soft assertion
});
