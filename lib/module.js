module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['nuxt-adyen-module'],
    ...moduleOptions
  }

  this.options.publicRuntimeConfig = {
    ...this.options.publicRuntimeConfig,
    adyen: { ...options }
  }

  this.options.build.transpile.push('@adyen/adyen-web')
  this.options.css.push('@adyen/adyen-web/dist/adyen.css')
}

module.exports.meta = require('../package.json')
