import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
    globals: true,
    testTimeout: 10000,
    coverage: { provider: 'c8', reporter: ['text', 'html'] }
  }
});