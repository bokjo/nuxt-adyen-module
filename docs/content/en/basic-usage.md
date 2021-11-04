---
title: Basic Usage
description: 'The fastest way to get started with **nuxt-adyen-module** is to define the options like `clientKey`, `environment`, and `locale`:'
position: 3
category: Getting started
---

The fastest way to get started with **nuxt-adyen-module** is to define the options like `clientKey`, `environment`, and `locale`:

```js {}[nuxt.config.js]
{
  modules: [
    ['nuxt-adyen-module', {
      locale: "en_US",
      environment: "test | live",
      clientKey: <YOUR_CLIENT_TOKEN>,
    }]
  ],
}
```

With this setup, you will be able to use AdyenCheckout.vue component for collecting card details. This will then allow to send this data to Adyen for processing.

These options are passed as is to **@adyen/web**, refer to the [doc](https://github.com/Adyen/adyen-web) for available options.

## Checkout

In order to use AdyenCheckout.vue component make sure to import it to your project directly from this module:

```js
import AdyenCheckout from 'nuxt-adyen-module/lib/AdyenCheckout.vue';
```

Then, inside of your checkout component make sure to pass all required props, prop functions, and event handlers that are required for the component to work correctly (and for you to have advanced customizability and full control over component behavior)

```vue
// Checkout.vue

<template>
  <adyen-checkout
    :amount="mockedPrice.amount"
    :currency="mockedPrice.currency"`
    :paymentMethodsResponse="paymentMethodsMock"
    :onSubmit="onSubmit"
    :onError="onError"
    :onAdditionalDetails="onAdditionalDetails"
    @payment-submitted="logPaymentSubmittedData"
    @additional-details="logAdditionalDetails"
    @payment-error="logError"
  />
</template>

<script>
import AdyenCheckout from 'nuxt-adyen-module/lib/AdyenCheckout.vue';
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
    logError(e) {
      console.log('logError', e)
    },
    onSubmit(state, dropin) {
      dropin.setStatus("loading");

      setTimeout(() => {
        dropin.setStatus("finished")
      }, 3000)
    },
    onAdditionalDetails(state, dropin) {
      console.log(state);
    },
    onError(state, dropin) {
      console.log(state);
    }
  }
}
</script>
```

Providing all required props should result in the following checkout component in your project:

<img src="/adyen-checkout.png"/>
