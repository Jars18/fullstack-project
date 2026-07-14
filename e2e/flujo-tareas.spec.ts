// e2e/flujo-tareas.spec.ts
import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Navegar a la página
  await page.goto('/')
  
  // Esperar a que la página cargue completamente
  await page.waitForLoadState('networkidle')
  
  // Tomar screenshot del estado inicial
  await page.screenshot({ path: 'estado-inicial.png' })
  
  // 2. Crear una tarea
  // Primero verifica que el input existe
  const input = page.locator('input[placeholder="Nueva tarea..."]')
  await expect(input).toBeVisible({ timeout: 5000 })
  
  await input.fill('Comprar pan')
  await page.click('button:has-text("Agregar")')
  
  // Esperar un momento
  await page.waitForTimeout(1000)
  
  // Tomar screenshot después de crear
  await page.screenshot({ path: 'despues-crear.png' })
  
  // Ver el HTML para debug
  const html = await page.content()
  console.log('HTML de la página:', html.substring(0, 1000))
  
  // 3. Verla en la lista
  const tarea = page.getByText('Comprar pan')
  await expect(tarea).toBeVisible({ timeout: 10000 })
})