# nuxt-adyen-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Adyen Module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-adyen-module` dependency to your project

```bash
yarn add nuxt-adyen-module # or npm install nuxt-adyen-module
```

2. Add `nuxt-adyen-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    ['nuxt-adyen-module', {
      locale: "en_US",
      environment: "test | live",
      clientKey: "<YOUR_CLIENT_KEY>",
    }]
  ]
}
```

* `clientKey` - <https://docs.adyen.com/development-resources/client-side-authentication#get-your-client-key>

3. Copy `AdyenCheckout.vue` component from the library to your project

4. Provide all necessary data to the AdyenCheckout component like props, props functions, and mocked payment response.

```vue
// Checkout.vue

<template>
  <adyen-checkout
    :amount="mockedPrice.amount"
    :currency="mockedPrice.currency"`
    :paymentMethodsResponse="paymentMethodsMock"
    :onSubmit="onSubmit"
    :onAdditionalDetails="onAdditionalDetails"
    @payment-submitted="logPaymentSubmittedData"
    @additional-details="logAdditionalDetails"
  />
</template>

<script>
import AdyenCheckout from '../components/AdyenCheckout.vue';
import paymentMethodsMock from "../paymentMethodsMock.json";
export default {
  components: {
    AdyenCheckout
  },
  data() {
    return {
      mockedPrice: {
        amount: 1000,
        currency: 'EUR',
      }
    }
  },
  computed: {
    paymentMethodsMock() {
      return paymentMethodsMock;
    }
  },
  methods: {
    logPaymentSubmittedData(e) {
      console.log('logPaymentSubmittedData', e)
    },
    logAdditionalDetails(e) {
      console.log('logAdditionalDetails', e)
    },
    onSubmit(state, dropin) {
      dropin.setStatus("loading");

      setTimeout(() => {
        dropin.setStatus("finished")
      }, 3000)
    },
    onAdditionalDetails(state, dropin) {
      console.log(state);
    }
  }
}
</script>
```

## Testing

You can test the Adyen Checkout by using the following card:

Card Number: 2222 4000 7000 0005
Expiry Date: 03/2030
CVC3: 737

Or any other listed here:

<https://docs.adyen.com/development-resources/test-cards/test-card-numbers#mastercard>

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Baroshem <jakub.andrzejewski.dev@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-adyen-module/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-adyen-module

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-adyen-module.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-adyen-module

[github-actions-ci-src]: https://github.com/baroshem/nuxt-adyen-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/baroshem/nuxt-adyen-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/baroshem/nuxt-adyen-module.svg
[codecov-href]: https://codecov.io/gh/baroshem/nuxt-adyen-module

[license-src]: https://img.shields.io/npm/l/nuxt-adyen-module.svg
[license-href]: https://npmjs.com/package/nuxt-adyen-module
