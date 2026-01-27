import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly formLayoutsMenuItem: Locator;
  readonly datepickerMenuItem: Locator;
  readonly toasterMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenuItem = page.getByText("Form Layouts");
    this.datepickerMenuItem = page.getByText("Datepicker");
    this.toasterMenuItem = page.getByText("Toastr");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.tooltipMenuItem = page.getByText("Tooltip");
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const isExpanded = await groupMenuItem.getAttribute("aria-expanded");
    if (isExpanded !== "true") {
      await groupMenuItem.click();
    }
  }

  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenuItem.click();
  }

  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datepickerMenuItem.click();
  }

  async toasterPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toasterMenuItem.click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.smartTableMenuItem.click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }
}
