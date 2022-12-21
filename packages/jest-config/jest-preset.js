const mappedModule = process.env.TEST_ENV === 'prod' ? '<rootDir>/dist/$1' : '<rootDir>/src/$1'

module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/src/**?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  moduleNameMapper: {
    '^@/(.*)$': mappedModule,
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
}
