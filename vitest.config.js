import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/setupTests.js'],
    testTimeout: 30000,
    testEnvironment: 'jsdom',
    verbose: true,
  },
});
