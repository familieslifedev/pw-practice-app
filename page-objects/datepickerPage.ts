import { expect, Page } from "@playwright/test";

export class DatepickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatepickerDateFromToday(numberOfdaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInCalendar(numberOfdaysFromToday);
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number,
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const startDateToAssert =
      await this.selectDateInCalendar(startDayFromToday);
    const endDateToAssert = await this.selectDateInCalendar(endDayFromToday);
    const rangeDateToAssert = `${startDateToAssert} - ${endDateToAssert}`;
    await expect(calendarInputField).toHaveValue(rangeDateToAssert);
  }

  private async selectDateInCalendar(numberOfdaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfdaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("default", {
      month: "short",
    });
    const expectedMonthLong = date.toLocaleString("default", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nv-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator('.day-cell .ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert;
  }
}
