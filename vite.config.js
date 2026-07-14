import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // test: {
  //   globals: true,
  //   environment: 'node',
  // },
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: './src/test/setup.js',
  // },
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: [
      '**/e2e/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/backend/**',
      '**/tests/**'
    ],
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
      exclude: [
        '**/backend/**',
        '**/tests/**'
      ]
    },
  },
})