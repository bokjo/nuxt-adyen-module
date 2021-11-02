const path = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['nuxt-adyen-module'],
    ...moduleOptions
  }

  if (!options.clientKey) throw new Error('[nuxt-adyen-module] property clientKey is required')
  if (!options.environment) throw new Error('[nuxt-adyen-module] property environment is required')
  if (!options.locale) throw new Error('[nuxt-adyen-module] property locale is required')

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    fileName: 'nuxt-adyen-module.js',
    options
  })
}

module.exports.meta = require('../package.json')
