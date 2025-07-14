import { Locator, Page } from "@playwright/test";
import { BasePOM } from "./BasePOM";

export class MenuPage extends BasePOM {
  private contact: Locator;


  constructor(page: Page) {
    super(page);
    this.contact = page.locator('#nav-contact');
  }

  async selectContact() {
    await this.click(this.contact);
  }
 
}