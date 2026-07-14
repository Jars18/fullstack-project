import { test, expect } from '@playwright/test'
 
test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  // 1. Entrar a la aplicación
  await page.goto('/')
 
  // 2. Crear una tarea
  await page.getByPlaceholder('Nueva tarea...').fill('Comprar pan')
  await page.getByRole('button', { name: 'Añade una nueva tarea' }).click()
  
  // 3. Verla en la lista (espera explícita)
  const tarea = page.getByText('Comprar pan')
  await tarea.waitFor({ state: 'visible', timeout: 10000 })
  await expect(tarea).toBeVisible()
})
