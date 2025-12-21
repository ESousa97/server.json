module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['api/**/*.js', 'src/**/*.js'],
  coverageDirectory: 'coverage',
  clearMocks: true,
};
