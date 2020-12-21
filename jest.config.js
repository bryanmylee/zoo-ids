module.exports = {
  roots: [
    './src',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|js)',
    '**/?(*.)+(spec|test).+(ts|js)',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  collectCoverageFrom: ['./src/**/*.ts'],
  coveragePathIgnorePatterns: ['./node_modules/'],
  coverageThreshold: {
    global: {
      statements: 60,
    },
  },
  setupFilesAfterEnv: ['jest-extended'],
};

