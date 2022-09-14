import { defineConfig as configure } from 'vitest/config';

export default configure({
  test: {
    globals: true,
    environment: 'node',
    passWithNoTests: true,

    include: [
      'src/**/*.test.{js,jsx,ts,tsx}',
    ],

    coverage: {
      all: true,
      clean: true,
      skipFull: true,

      include: [
        'src/**/*',
      ],

      reportsDirectory: 'build/coverage',
      reporter: ['text', 'html-spa'],

      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
