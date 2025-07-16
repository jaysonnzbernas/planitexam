import { test as base } from '@playwright/test';
import { CartObj } from "../objects/cart"
import { CartPage } from "./cart";
import { ShopPage } from "./shop";
import { MenuPage } from './banner';
import { ContactPage } from './contact';

type pages = {
    cart: CartObj;
    shopPage: ShopPage;
    cartPage: CartPage;
    menuPage: MenuPage;
    contactPage: ContactPage;
}

export const test = base.extend<pages>({
    menuPage: async ({ page }, use) => {
        const menuPage = new MenuPage(page);
        await use(menuPage);
    },

    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page);
        await use(contactPage);
    },

    cart: async ({ }, use) => {
        const cart = new CartObj();
        await use(cart);
    },
    shopPage: async ({ page, cart }, use) => {
        const shopPage = new ShopPage(page, cart);
        await use(shopPage);
    },
    cartPage: async ({ page, cart }, use) => {
        const cartPage = new CartPage(page, cart);
        await use(cartPage);
    }
});