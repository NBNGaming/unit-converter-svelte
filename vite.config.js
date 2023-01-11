import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  base: '',
  plugins: [svelte()],
  test: {
    globals: true, // required
    setupFiles: ['vitest-localstorage-mock'],
  },
  build: {
    outDir: './docs'
  }
})
