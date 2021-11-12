---
title: Checkout Component
description: "Props, events, and functionality of AdyenCheckout component"
position: 5
category: Guide
---

`AdyenCheckout.vue` component provides checkout functionality and card component by default.

```html
<adyen-checkout
  :value="priceMock.amount"
  :currency="priceMock.currency"
  :locale="locale"
  :implemented-payment-methods="implementedPaymentMethods"
/>
```

It also allows for advanced customizability and control over the payment process.

## Props

AdyenCheckout.vue component allows for advanced customizability using following props:

### `value`

- type: `number`
- required

Amount of money that needs to be processed by Adyen. Example of a value can be `1000`.

### `currency`

- type: `string`
- required

Currency for the transaction that needs to be processed by Adyen. Example of a currency can be `'EUR'`.

### `locale`

- type: `string`
- default: `''`

Example of a locale can be `'en_US'`.

### `translations`

- type: `object`
- default: `{}`

Object used for tranlating the card component fields. For more details go [here](https://docs.adyen.com/online-payments/web-drop-in/customization#language-and-localization)

### `implementedPaymentMethods`

- type: `array`
- default: `[]`

Array holding currently implemented payment methods. If not passed all payment methods from Adyen will be displayed. Example of a implementedPaymentMethods can be `['klarna_paynow','klarna', ...]`

### `paymentMethodsConfiguration`

- type: `object`
- default: `{}`

Object containing configuration for payment methods (including card component). If not passed, default configuration will be loaded. Example of a paymentMethodsConfiguration can be `{ card: { hasHolderName: true }}`

### `configuration`

- type: `object`
- default: `{}`

Object containing whole configuration for AdyenCheckout class from `'@adyen/adyen-web'`. When passed it will completely override the functionality provided by `nuxt-adyen-module`.

### `onSubmit`

- type: `function`
- params: `state`, `dropin`

When passed it will override the onSubmit handler provided by `nuxt-adyen-module`. It accepts params of state (holding current card data from checkout component) and dropin (reference to the checkout component)

### `onAdditionalDetails`

- type: `function`
- params: `state`, `dropin`

When passed it will override the onAdditionalDetails handler provided by `nuxt-adyen-module`. It accepts params of state (holding current card data from checkout component) and dropin (reference to the checkout component)

### `onError`

- type: `function`
- params: `state`, `dropin`

When passed it will override the onError handler provided by `nuxt-adyen-module`. It accepts params of state (holding current card data from checkout component) and dropin (reference to the checkout component)

### `onPaymentCompleted`

- type: `function`
- params: `state`, `dropin`

When passed it will override the onPaymentCompleted handler provided by `nuxt-adyen-module`. It accepts params of state (holding current card data from checkout component) and dropin (reference to the checkout component)

### `handleRedirectAfterPayment`

- type: `function`
- params: `resultCode`

When passed it will be triggered after submition to handle the redirect for successful or failure response from Adyen.

### `getPaymentMethods` (to use when server middleware is disabled)

- type: `function`

After disabling the default server middleware provided by `nuxt-adyen-package` you would have to implement this method on your own to maintain the same functionality for the checkout component. This method must return following properties:

- `paymentMethodsResponse`
- `clientKey`
- `environment`

### `createPaymentSession` (to use when server middleware is disabled)

- type: `function`

After disabling the default server middleware provided by `nuxt-adyen-package` you would have to implement this method on your own to maintain the same functionality for the checkout component. This method must return an object with data about current adyen payment [session](https://docs.adyen.com/online-payments/web-drop-in?tab=codeBlocksessions_2#create-payment-session).

## Events

Triggered when certain functionality was done.

### `payment-submitted`

- params: `state`

Triggered after the payment was submitted.

### `additional-details`

- params: `state`

Triggered after submitting additional details.

### `payment-error`

- params: `state`

Triggered after there was an error with the payment.

### `payment-completed`

- params: `state`

Triggered after the payment was completed.
