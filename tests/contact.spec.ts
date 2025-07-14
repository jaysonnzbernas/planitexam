import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/banner';

test('has title', async ({ page }) => {
    const banner = new MenuPage(page);
    await banner.goto('/');
    await banner.selectContact();
});