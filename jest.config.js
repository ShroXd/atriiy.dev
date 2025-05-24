module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use babel-jest for all JS/TS files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
};
