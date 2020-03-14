module.exports = {
  clearMocks: true,
  setupFiles: ['dotenv/config'],
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: [
    'src/server',
    'src/client/redux',
    'src/client',
    'src/assets',
    'src/assets/icons',
    'src/client/tests'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './src/client/tests/mocks/files.js',
    '\\.(css|less)$': './src/client/tests/mocks/styles.js'
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': './src/client/tests/mocks/svgTransform.js'
  },
  collectCoverage: true,
  coverageReporters: ['lcov'],
  coverageDirectory: 'test-coverage',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  setupFilesAfterEnv: ['./src/client/tests/setup.js']
};
