import { Page } from "@playwright/test";

export class FormLayoutsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string,
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm.getByLabel("Password").fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingTheGridForm.getByRole("button", { name: "Submit" }).click();
  }
  async submitInlineFormWithCredentialsAndCheckbox(
    name: string,
    email: string,
    check: boolean,
  ) {
    const inlineForm = this.page.locator("nb-card", { hasText: "Inline form" });
    await inlineForm.getByPlaceholder("Jane Doe").fill(name);
    await inlineForm.getByPlaceholder("Email").fill(email);
    if (check) {
      await inlineForm
        .getByRole("checkbox", { name: "Remember me" })
        .check({ force: true });
      await inlineForm.getByRole("button", { name: "Submit" }).click();
    }
  }
}
