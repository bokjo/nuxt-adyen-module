module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['nuxt-adyen-module'],
    ...moduleOptions
  }

  if (!options.clientKey) throw new Error('[nuxt-adyen-module] property clientKey is required')
  if (!options.environment) throw new Error('[nuxt-adyen-module] property environment is required')
  if (!options.locale) throw new Error('[nuxt-adyen-module] property locale is required')

  this.options.publicRuntimeConfig = {
    ...this.options.publicRuntimeConfig,
    adyen: { ...options }
  }

  this.options.build.transpile.push('@adyen/adyen-web')
  this.options.css.push('@adyen/adyen-web/dist/adyen.css')
}

module.exports.meta = require('../package.json')
