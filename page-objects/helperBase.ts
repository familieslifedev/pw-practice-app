import { Page } from "@playwright/test";

export class HelperBase {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
