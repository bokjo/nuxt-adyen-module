export default {
  server: {
    port: 8080,
  },
  buildModules: ['@nuxt/typescript-build'],
  modules: ['../src/module.ts'],

  adyen: {
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    returnUrl: process.env.ADYEN_RETURN_URL,
    checkoutEndpoint: process.env.ADYEN_CHECKOUT_ENDPOINT,
    apiKey: process.env.ADYEN_API_KEY,
    environment: process.env.ADYEN_ENVIRONMENT,
    origin: process.env.ADYEN_ORIGIN_URL,
    locale: process.env.ADYEN_LOCALE,
    clientKey: process.env.ADYEN_CLIENT_KEY
  }
}
