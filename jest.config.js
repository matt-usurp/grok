/* eslint-disable no-undef */

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',

  maxWorkers: 5,
  maxConcurrency: 3,

  modulePaths: [
    '<rootDir>/src/**',
  ],

  modulePathIgnorePatterns: [
    '<rootDir>/build/workspace',
  ],

  collectCoverage: true,
  coverageDirectory: 'build/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
  ],

  coveragePathIgnorePatterns: [
    '.bench.ts',
    '.proof.ts',
  ],

  coverageReporters: [
    'html',
    'text',
  ],

  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
