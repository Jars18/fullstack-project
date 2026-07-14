// playwright.config.js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000, // 30 segundos para cada test
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html'],  // Genera el reporte HTML
    ['list']   // Mantiene la salida en consola
  ],
  
  use: {
    baseURL: 'http://localhost:5173/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
  },
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/',
    reuseExistingServer: !process.env.CI, // Solo reusa en local, no en CI
    timeout: 120000, // 2 minutos para que el servidor inicie
    stdout: 'pipe',
    stderr: 'pipe',
  },
})