import {Page, Locator} from '@playwright/test';

export class BasePOM {
  private  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  //button
  async click(locator: Locator) {
    await locator.click();
  }

  //fields
  async fillInput(locator: Locator, value: string) {
      await locator.fill(value);    
  }
}