---
title: Options
description: 'Here are all the options available when configuring the module and their default values:'
position: 4
category: Getting started
---

See the [Setup](/setup) section on where to set the module options.

## `merchantAccount`

<https://docs.adyen.com/account/manage-account-structure>

## `apiKey`

<https://docs.adyen.com/development-resources/api-credentials#generate-api-key>

## `clientKey`

<https://docs.adyen.com/online-payments/android/drop-in#client-key>

## `returnUrl`

i.e. <http://localhost:8080/api/handleShopperRedirect>

## `checkoutEndpoint`

i.e. <http://localhost:8080/checkout>

## `origin`

i.e. <http://localhost:8080>

## `hmacKey`

<https://docs.adyen.com/development-resources/webhooks/verify-hmac-signatures#enable-hmac-signatures>

## `channel`

`Web`, `IOS` or `Android`

## `registerCheckoutComponent`

When set to true, it will register the AdyenCheckout.vue component globally so that there is no need to import it and register manually. Disabled by default.

## `disableServerMiddleware`

When set to true, it will not register a serverMiddleware with all endpoints handled for Adyen payment handling. Useful when you already have a server and you do not need another one from Nuxt.
