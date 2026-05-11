import { test, expect } from '@playwright/test';

test.describe('Smoke Test - Frontend Rendering', () => {
  
  test('should render the main page without console errors', async ({ page }) => {
    const errors: string[] = [];
    const failedRequests: string[] = [];

    // Captures browser console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Captures network failures (e.g., 404 in CSS/JS)
    page.on('requestfailed', request => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });

    // Navigates to the application (Vite preview default port)
    await page.goto('http://localhost:4173');

    // 1. Checks if the main container exists
    const appContainer = page.locator('#app');
    await expect(appContainer).toBeVisible();

    // 2. Checks if there were fatal network errors
    if (failedRequests.length > 0) {
      throw new Error(`Failed to load assets:\n${failedRequests.join('\n')}`);
    }

    // 3. Checks if there were console errors
    if (errors.length > 0) {
      throw new Error(`Console errors detected:\n${errors.join('\n')}`);
    }

    console.log('Smoke test passed: App rendered successfully.');
  });
});
