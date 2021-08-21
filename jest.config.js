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
    '<rootDir>/apps/api',
    '<rootDir>/libs/data',
  ],
};
