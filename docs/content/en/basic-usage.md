---
title: Basic Usage
description: 'The fastest way to get started with **nuxt-adyen-module** is to define the options like `clientKey`, `environment`, and `locale`:'
position: 3
category: Getting started
---

## Options

The fastest way to get started with **nuxt-adyen-module** is to define the options:

```js {}[nuxt.config.js]
{
  modules: [
    ['nuxt-adyen-module', {
      merchantAccount: "test",
      returnUrl: "http://localhost:8080/api/handleShopperRedirect",
      checkoutEndpoint: "http://localhost:8080/checkout",
      apiKey: "<YOUR_API_KEY>",
      origin: "http://localhost:8080",
      channel: "Web | IOS | Android",
      hmacKey: "dwabhidwbaibdwia",
      environment: "test | live",
      clientKey: "<YOUR_CLIENT_KEY>",
    }]
  ],
}
```

*We strongly recommend to use environment variables for all these values!*

With this setup, you will be able to use AdyenCheckout.vue component for collecting card details. This will then allow to send this data to Adyen for processing.

These options are passed as is to **@adyen/web**, refer to the [doc](https://github.com/Adyen/adyen-web) for available options.

## Checkout

In order to use AdyenCheckout.vue component make sure to import it to your project directly from this module:

```js
import AdyenCheckout from 'nuxt-adyen-module/src/runtime/AdyenCheckout.vue';
```

Then, inside of your checkout component make sure to pass all required props, prop functions, and event handlers that are required for the component to work correctly (and for you to have advanced customizability and full control over component behavior)

```vue
// Checkout.vue

<template>
  <div>
    // Other checkout components
    <adyen-checkout
      :value="priceMock.amount"
      :currency="priceMock.currency"
      :locale="locale"
      :implemented-payment-methods="implementedPaymentMethods"
    />
  </div>
</template>

<script>
import AdyenCheckout from 'nuxt-adyen-module/src/runtime/AdyenCheckout.vue';

export default {
  components: {
    AdyenCheckout
  },
  data () {
    return {
      implementedPaymentMethods:
      [
        'scheme',
        'ideal',
        'dotpay',
        'giropay',
        'sepadirectdebit',
        'directEbanking',
        'ach',
        'alipay',
        'klarna_paynow',
        'klarna',
        'klarna_account',
        'boletobancario_santander'
      ],
      locale: 'en_US',
      priceMock: {
        amount: 1000,
        currency: 'EUR'
      }
    }
  }
}
</script>
```

Providing all required props should result in the following checkout component in your project:

<img src="/adyen-checkout.png"/>
