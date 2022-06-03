import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/index.ts',
      name: 'lt',
    },
    rollupOptions: {
      // external: /^lit/
    }
  }
})
