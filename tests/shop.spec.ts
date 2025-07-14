import { test, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop';

test('has title', async ({ page }) => {
    const shop = new ShopPage(page);
    await shop.goto('/#/shop');
    //2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    await shop.addToy('Stuffed Frog', 2);
    await shop.addToy('Fluffy Bunny', 5);
    await shop.addToy('Valentine Bear', 3);

});