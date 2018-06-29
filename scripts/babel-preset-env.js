const env = require('babel-preset-env')

const ENV = process.env.BABEL_ENV

module.exports = {
  presets: [
    [
      env,
      {
        targets: {
          ie: 11,
          node: '6.11',
        },
        modules: ENV === 'modules' ? false : 'commonjs',
      },
    ],
  ],
}
