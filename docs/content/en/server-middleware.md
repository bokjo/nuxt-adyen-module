---
title: Server Middleware
description: "Handling payment on the server middleware"
position: 6
category: Guide
---

## Handling payment on the server middleware

By default `nuxt-adyen-module` provides you a built in serverMiddleware to handle all payment requests. You can trigger server middleware endpoints by calling `this.$adyen.someFunction()`. Under the hood, it will send the data to `AdyenClientApi` class, then to middleware file and finally to `AdyenServerApi`. All confidential data is stored inside this server middleware while on the frontend you have access to only the browser safe data that you will need to correctly handle the payment.

`AdyenClientApi` has the following methods implemented that will trigger corresponding endpoints in the server middleware and `AdyenServerApi`:

```ts
async createPaymentSession (amount: Amount): Promise<CreateCheckoutSessionResponse> {
  return await sendRequestToServer<CreateCheckoutSessionResponse>('POST', '/api/createPaymentSession', amount)
}

async getPaymentMethods (): Promise<PaymentMethodsResponse> {
  return await sendRequestToServer<PaymentMethodsResponse>('GET', '/api/getPaymentMethods')
}

async submitAdditionalDetails (paymentDetailsRequest: DetailsRequest): Promise<PaymentResponse> {
  return await sendRequestToServer<PaymentResponse>('POST', '/api/submitAdditionalDetails', paymentDetailsRequest)
}

  async handleShopperRedirect (paymentDetailsRequest: DetailsRequest): Promise<void> {
    await sendRequestToServer<void>('POST', '/api/handleShopperRedirect', paymentDetailsRequest)
  }

async initiatePayment (data: any): Promise<PaymentResponse> {
  return await sendRequestToServer<PaymentResponse>('POST', '/api/initiatePayment', data)
}

async getPaymentDataStore (): Promise<LocalStore> {
  return await sendRequestToServer<LocalStore>('GET', '/api/getPaymentDataStore')
}
```

## Disabling built in server middleware

In some situations you may want to disable the built in server middleware from `nuxt-adyen-module` in favor of your own node.js/express.js server. To do so, follow these steps:

### Set `disableServerMiddleware` property to `true` in the module options:

```js
{
  adyen: {
    disableServerMiddleware: true
  }
}
```

or

```js
{
  modules: [
    ['nuxt-adyen-module', {
      disableServerMiddleware: true
    }]
  ]
}
```

### Develop following checkout flow in your server

<https://docs.adyen.com/online-payments/web-drop-in>

### Develop following functions and pass them to AdyenCheckout.vue component:

- `getPaymentMethods`
- `createPaymentSession`
- `onSubmit`
- `onAdditionalDetails`

For more refence please go to [component options](/checkout-component)
