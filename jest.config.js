const jestConfig = require('@helpscout/zero/jest')

const coverageList = [
  'src/**/*.{js,jsx}',
  '!src/emotion/**/*.{js,jsx}',
  '!src/create-emotion/**/*.{js,jsx}',
  '!src/create-emotion-styled/index.{js,jsx}',
  '!src/**/testHelpers.{js,jsx}',
]

module.exports = Object.assign({}, jestConfig, {
  collectCoverageFrom: []
    .concat(jestConfig.collectCoverageFrom)
    .concat(coverageList),
})
