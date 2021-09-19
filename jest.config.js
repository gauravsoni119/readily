module.exports = {
  collectCoverage: true,
  coverageReporters: ['html', 'json', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  projects: [
    '<rootDir>/apps/readily-web',
    '<rootDir>/libs/data',
    '<rootDir>/libs/shell/feature',
    '<rootDir>/libs/shell/layout',
    '<rootDir>/libs/dashboard/feature',
    '<rootDir>/libs/shared/ui',
    '<rootDir>/libs/dashboard/ui',
    '<rootDir>/libs/shared/webworkers',
    '<rootDir>/libs/shared/data-access/store',
    '<rootDir>/libs/shared/data-access/models',
  ],
};
