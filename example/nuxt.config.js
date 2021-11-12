export default {
  server: {
    port: 8080
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
    channel: process.env.ADYEN_CHANNEL,
    clientKey: process.env.ADYEN_CLIENT_KEY,
    hmacKey: process.env.ADYEN_HMAC_KEY,
    // registerCheckoutComponent: true,  // optional property that will be used to register AdyenCheckout.vue component globally
    // disableServerMiddleware: true  // optional property that will be used to disable module server middelware to have complete control over the requests.
  }
}
