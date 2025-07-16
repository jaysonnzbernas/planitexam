import {Page, Locator, expect} from '@playwright/test';

export class BasePOM {
  private  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  //fields
  async fillInput(locator: Locator, value: string) {
      await locator.fill(value);    
  }

  //alert
  async verifyAlertMessage(expectedMessage: string) {
    const alert = this.page.locator('.alert');
    await expect(alert).toHaveText(expectedMessage, { timeout: 20000 });
  }

  //asssertions
  async verifyMessage(locator: Locator, expectedMessage: string) {
    const message = await locator.textContent();
    if (message) {
      await expect(message.trim()).toBe(expectedMessage);
    } 
  }

}
