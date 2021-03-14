module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
    SpreadsheetApp: {},
    UrlFetchApp: {},
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: './src',
  testRegex: '(/test/.*|(\\.|/)(_test|_spec))\\.[jt]sx?$',
};
