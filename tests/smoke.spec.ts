import { test, expect } from '@playwright/test';

test.describe('Smoke Test - Frontend Rendering', () => {
  
  test('should render the main page without console errors', async ({ page }) => {
    const errors: string[] = [];
    const failedRequests: string[] = [];

    // Captura erros no console do navegador
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Captura falhas de rede (ex: 404 em CSS/JS)
    page.on('requestfailed', request => {
      failedRequests.push(`${request.url()} - ${request.failure()?.errorText}`);
    });

    // Navega para a aplicação (porta padrão do Vite preview)
    await page.goto('http://localhost:4173');

    // 1. Verifica se o container principal existe
    const appContainer = page.locator('#app');
    await expect(appContainer).toBeVisible();

    // 2. Verifica se houve erros fatais de rede
    if (failedRequests.length > 0) {
      throw new Error(`Failed to load assets:\n${failedRequests.join('\n')}`);
    }

    // 3. Verifica se houve erros de console
    if (errors.length > 0) {
      throw new Error(`Console errors detected:\n${errors.join('\n')}`);
    }

    console.log('Smoke test passed: App rendered successfully.');
  });
});
