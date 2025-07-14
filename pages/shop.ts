import { Locator, Page } from "@playwright/test";
import { BasePOM } from "./BasePOM";
import { ProductObj } from "../objects/product";
import { CartObj } from "../objects/cart";

export class ShopPage extends BasePOM {
    private products: Locator;
    private myCart: CartObj


    constructor(page: Page) {
        super(page);
        this.products = page.locator('li.product');
        this.myCart = new CartObj();
    }

    async addToy(toy: string, quantity: number) {;
        const product = this.products.filter({ hasText: `${toy}` });
        const productInfo = await this.extractProductInfo(product);

        for (let i = 0; i < quantity; i++) {
            await this.click(product.locator('a.btn'));
            this.myCart.addProduct(productInfo);
        }
    }



    private async extractProductInfo(product: Locator): Promise<ProductObj>{
        const name = await product.locator('h4.product-title').innerText();
        const img = await product.locator('img').getAttribute('ng-src');
        const price = await product.locator('.product-price').innerText();
        return new ProductObj(name, parseFloat(price.replace('$','')), img || '');
    }
}