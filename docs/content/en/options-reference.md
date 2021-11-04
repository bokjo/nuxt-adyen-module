---
title: Options
description: 'Here are all the options available when configuring the module and their default values:'
position: 4
category: Getting started
---

See the [Setup](/setup) section on where to set the module options.

## `locale`

- type: `string`
- default: `'en_US'`

Locale supported by the your application. Example of a locale can be `'en_US'`.

Check out all available locales [here](https://docs.adyen.com/online-payments/classic-integrations/checkout-sdks/web-sdk/customization/localization)

## `environment`

- type: `string`
- default: `test`

Identifies an environment type of your application. When you're ready to accept live payments, change the value to one of our live environments.


## `clientKey`

- type: `string`
- required

A public key linked to your API credential, used for client-side authentication.
