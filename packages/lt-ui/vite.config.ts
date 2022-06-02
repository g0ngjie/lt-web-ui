import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: 'src/my-element.ts',
      name: 'lt',
    },
    rollupOptions: {
      // external: /^lit/
    }
  }
})
