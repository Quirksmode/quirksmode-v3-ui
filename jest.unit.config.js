module.exports = {
  verbose: false,
  modulePaths: [
    'src',
    'src/server',
    'src/client/redux',
    'src/client',
    'src/client/tests'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './src/client/tests/mocks/files.js',
    '\\.(css|less)$': './src/client/tests/mocks/styles.js'
  },
  setupFilesAfterEnv: ['./src/client/tests/setup.js']
};
