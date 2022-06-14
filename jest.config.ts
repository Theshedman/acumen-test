import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  clearMocks: true,
  resetMocks: true,
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: 'coverage',
  displayName: {
    name: 'acumen-service',
    color: 'blue',
  },
  // Indicates whether each individual test should be reported during the run.
  verbose: true,
  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/app.ts',
    '<rootDir>/src/app/index.ts',
    '<rootDir>/src/app/server.ts',
    '<rootDir>/src/app/utils/logger.ts',
    '<rootDir>/src/app/middlewares/morgan.ts',
    '<rootDir>/src/app/controllers/__fixtures__',
  ],
  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/app.ts',
    '<rootDir>/src/app/index.ts',
    '<rootDir>/src/app/server.ts',
    '<rootDir>/src/app/utils/logger.ts',
    '<rootDir>/src/app/middlewares/morgan.ts',
    '<rootDir>/src/app/controllers/__fixtures__',
  ],
};

export default config;
