module.exports = {
  moduleDirectories: ['node_modules'],
  modulePaths: [
    'src',
    'src/server',
    'src/client/redux',
    'src/client',
    'src/assets',
    'src/assets/icons',
    'src/client/tests'
  ],
  moduleNameMapper: {
    // '^tests(.*)$': '<rootDir>/src/client/tests$1',
    // '^client(.*)$': '<rootDir>/src/client$1',
    // '^components(.*)$': '<rootDir>/src/client/components$1',
    // '^pages(.*)$': '<rootDir>/src/client/pages$1',
    // '^hooks(.*)$': '<rootDir>/src/client/hooks$1',
    // '^utils(.*)$': '<rootDir>/src/client/utils$1',
    // '^assets(.*)$': '<rootDir>/src/assets$1',
    // '^icons(.*)$': '<rootDir>/src/assets/icons$1',
    // '^redux(.*)$': '<rootDir>/src/client/redux$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './src/client/tests/mocks/files.js',
    '\\.(css|less)$': './src/client/tests/mocks/styles.js'
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': './src/client/tests/mocks/svgTransform.js'
  },
  setupFilesAfterEnv: ['./src/client/tests/setup.js']
};
