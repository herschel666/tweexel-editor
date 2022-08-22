import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
/** @type {import('vitest/config')} */
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [preact()],
  esbuild: {
    // @see https://github.com/vitejs/vite/issues/8644
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  test: {
    globals: false,
    environment: 'jsdom',
  },
});
