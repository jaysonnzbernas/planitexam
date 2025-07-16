import { expect, Locator, Page } from "@playwright/test";
import { BasePOM } from "./BasePOM";
import { CartObj } from "../objects/cart";

export class CartPage extends BasePOM {
  private cartItems: Locator;
  private totalPrice: Locator;
  private myCart: CartObj;

  constructor(page: Page, cart: CartObj) {
    super(page);
    this.cartItems = page.locator('.cart-item');
    this.totalPrice = page.locator('.total');
    this.myCart = cart;
  }

  private async getCartItems(): Promise<Array<Locator>> {
    await this.cartItems.first().waitFor({ state: 'visible' });
    const items = await this.cartItems.all();
    return items;
  }

  //assertions
  async verifySubtotalEachProductIsCorrect() {
    const items = await this.getCartItems();
    for (let item of items) {
        const name: string | null = await item.locator('td').nth(0).textContent();
        const subtotalStr: string | null = await item.locator('td').nth(3).textContent();
        const subtotal: number | null = subtotalStr ? parseFloat(subtotalStr.replace('$', '')) : null;
        
        await expect(subtotal)
            .toBe(this.myCart.getSubtotalForProduct(name?.trim() || ''))
    }
  }

  async verifyPriceOfEachProductIsCorrect() {
    const items = await this.getCartItems();
    for (let item of items) {
        const name: string | null = await item.locator('td').nth(0).textContent();
        const priceStr: string | null = await item.locator('td').nth(1).textContent();
        const price: number | null = priceStr ? parseFloat(priceStr.replace('$', '')) : null;
        
        const product = this.myCart.getProducts().find(p => p.getName() === name?.trim());
        await expect(price)
            .toBe(product ? product.getPrice() : null);
    }
  }

  async verifyTotalPrice() {
    const totalStr: string | null = await this.totalPrice.textContent();
    const total: number | null = totalStr ? parseFloat(totalStr.replace('Total: ', '')) : null;
    
    await expect(total).toBeCloseTo(this.myCart.getTotalPrice(), 0.01);
  }

}