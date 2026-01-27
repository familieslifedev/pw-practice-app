import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  await navigateTo.datepickerPage();
  await navigateTo.toasterPage();
  await navigateTo.smartTablePage();
  await navigateTo.tooltipPage();
});

test("Parametrized methods", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const onDatepickerPage = new DatepickerPage(page);

  // Navigate to Form Layouts Page
  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "test@test.com",
    "password123",
    "Option 2",
  );
  await onFormLayoutsPage.submitInlineFormWithCredentialsAndCheckbox(
    "John Smith",
    "John@test.com",
    true,
  );
  await navigateTo.datepickerPage();
  await onDatepickerPage.selectCommonDatepickerDateFromToday(10);
  await onDatepickerPage.selectDatepickerWithRangeFromToday(5, 15);
});
