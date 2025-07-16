import { test } from '../pages/pageFixtures';

test.beforeEach(async ({ shopPage }) => {
    await shopPage.goto('/#/shop');
});

test('Shop Toys', async ({ shopPage, cartPage }) => {
    
    //2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
    await shopPage.addToy('Stuffed Frog', 2);
    await shopPage.addToy('Fluffy Bunny', 5);
    await shopPage.addToy('Valentine Bear', 3);

    await cartPage.goto('/#/cart');
    await cartPage.verifySubtotalEachProductIsCorrect();
    await cartPage.verifyPriceOfEachProductIsCorrect();
    await cartPage.verifyTotalPrice();

});