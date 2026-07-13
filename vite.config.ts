import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/BinBotEditorOfficialPage/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    exclude: [...configDefaults.exclude, '**/.worktrees/**'],
  },
})
