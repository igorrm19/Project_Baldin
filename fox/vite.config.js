import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './main.ts',
      name: 'Fox',
      fileName: (format) => `fox.${format}.js`
    },
    sourcemap: true
  }
});
