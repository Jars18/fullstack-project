import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['dist', 'node_modules', 'prisma'],
  },
  
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,   
        ...globals.es2021,
      },
    },
    rules: {
      ...js.configs.recommended.rules, 
      
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_'
      }],
      'no-console': 'off',
    },
  },
]