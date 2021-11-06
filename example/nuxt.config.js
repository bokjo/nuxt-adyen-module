export default {
  modules: ['../src/module.ts'],

  adyen: {
    locale: process.env.ADYEN_LOCALE,
    environment: process.env.ADYEN_ENVIRONMENT,
    clientKey: process.env.ADYEN_CLIENT_KEY
  }
}
