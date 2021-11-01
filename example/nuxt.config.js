const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    {
      handler: require('../'),
      options: {
        locale: "en_US",
        environment: "test",
        clientKey: "test_WG67OK3NLFG2TEPX4WVVXBY6ZYIZQUHO",
      }
    }
  ]
}
