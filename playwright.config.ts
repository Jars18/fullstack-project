// playwright.config.js
import { defineConfig } from '@playwright/test'
 
export default defineConfig({
  testDir: './e2e',
  reporter: [
    ['html'],  // Genera el reporte HTML
    ['list']   // Mantiene la salida en consola (opcional)
  ],
  use: {
    baseURL: 'http://localhost:5173/',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/',
    reuseExistingServer: true,
  },
})
