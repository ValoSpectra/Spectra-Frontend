// webpack needs to be explicitly required
const webpack = require('webpack')

module.exports = {
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
}