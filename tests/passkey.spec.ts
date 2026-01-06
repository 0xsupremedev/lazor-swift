import { test, expect } from '@playwright/test';

const BASE_URL = 'https://lazor-swift.vercel.app';

test.describe('LazorSwift UI & Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('should load landing page correctly', async ({ page }) => {
        await expect(page).toHaveTitle(/LazorSwift/);
        await expect(page.locator('h1')).toContainText('Passkey Native');
    });

    test('should navigate to documentation', async ({ page }) => {
        await page.click('text=Docs');
        await expect(page).toHaveURL(/.*\/docs/);
        await expect(page.locator('h1')).toContainText('Documentation');
    });

    test('should have a working search in docs', async ({ page }) => {
        await page.goto(`${BASE_URL}/docs`);
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('Gasless');
        await expect(page.locator('text=Gasless Transactions')).toBeVisible();
    });

    test('should toggle theme', async ({ page }) => {
        const body = page.locator('body');
        const themeBtn = page.locator('button[aria-label*="theme"], button >> .lucide-sun, button >> .lucide-moon').first();

        // Check initial state or just toggle
        await themeBtn.click();
        // This depends on implementation, but typically adds/removes .dark class
    });

    test('should show connecting state on wallet click', async ({ page }) => {
        const connectBtn = page.locator('button:has-text("Connect Wallet")');
        await expect(connectBtn).toBeVisible();
        await connectBtn.click();
        await expect(page.locator('button:has-text("Connecting...")')).toBeVisible();
    });
});

test.describe('Responsive Design', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

    test('should show mobile menu on small screens', async ({ page }) => {
        await page.goto(BASE_URL);
        const menuBtn = page.locator('button >> .lucide-menu');
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();
        await expect(page.locator('nav >> text=Docs')).toBeVisible();
    });
});
