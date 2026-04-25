import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  plugins: [
    visualizer({
      filename: '.vite-stats.json',
      json: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
}); 