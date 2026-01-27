import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo().formLayoutsPage();
  await pageManager.navigateTo().datepickerPage();
  await pageManager.navigateTo().toasterPage();
  await pageManager.navigateTo().smartTablePage();
  await pageManager.navigateTo().tooltipPage();
});

test("Parametrized methods", async ({ page }) => {
  const pageManager = new PageManager(page);

  // Navigate to Form Layouts Page
  await pageManager.navigateTo().formLayoutsPage();
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      "test@test.com",
      "password123",
      "Option 2",
    );
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithCredentialsAndCheckbox(
      "John Smith",
      "John@test.com",
      true,
    );
  await pageManager.navigateTo().datepickerPage();
  await pageManager.onDatepickerPage().selectCommonDatepickerDateFromToday(10);
  await pageManager
    .onDatepickerPage()
    .selectDatepickerWithRangeFromToday(5, 15);
});
