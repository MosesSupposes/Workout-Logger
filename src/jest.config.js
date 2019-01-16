module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json'],
    transform: {
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
        'jest-transform-stub',
      '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    // snapshotSerializers: ['jest-serializer-vue'],
    testMatch: [
      '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
  };

// module.exports = {

//   "jest": {
//     "verbose": true,
//     "transform": {
//       "^.+\\.js$": "babel-jest",
//       "^.+\\.(css|scss|less)$": "jest-css-modules"
//     },
//     "globals": {
//       "NODE_ENV": "test"
//     },
//     "moduleFileExtensions": [
//       "js",
//       "jsx"
//     ],
//     "moduleDirectories": [
//       "node_modules",
//       "src/frontend",
//       "src/shared"
//     ]
//   },
// }