module.exports = {
  preset: "ts-jest",
  globals: {
    __DEV__: true,
    __SERVER__: false
  },
  moduleNameMapper: {
    "^assets/(.*)": "<rootDir>/src/assets/$1",
    "^icons/(.*)": "<rootDir>/src/assets/icons/$1",
    "^client/(.*)": "<rootDir>/src/client/$1",
    "^components/(.*)": "<rootDir>/src/client/components/$1",
    "^pages/(.*)": "<rootDir>/src/client/pages/$1",
    "^hooks/(.*)": "<rootDir>/src/client/hooks/$1",
    "^utils/(.*)": "<rootDir>/src/client/utils/$1",
    "^types/(.*)": "<rootDir>/src/client/types/$1",
    "^tests/(.*)": "<rootDir>/src/client/tests/$1",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/client/tests/mocks/files.ts',
    '\\.(css|less)$': '<rootDir>/src/client/tests/mocks/styles.ts',
  },
  transform: {
    '^.+\\.svg$': '<rootDir>/src/client/tests/mocks/svgTransform.js'
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
  setupFilesAfterEnv: ['./src/client/tests/setup.ts']
};
