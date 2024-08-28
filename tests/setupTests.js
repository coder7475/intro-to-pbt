import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';

afterEach(() => {
  // Handle unhandled promise rejections
  globalThis.process.on('unhandledRejection', (error) => {
    console.warn('Unhandled Rejection:', error);
  });

  // Handle uncaught exceptions
  globalThis.process.on('uncaughtException', (error) => {
    console.warn('Uncaught Exception:', error);
  });
});