import { Module } from '@nuxt/types'
import { AdyenConfigOptions } from './runtime/api';
import { createMiddleware } from './runtime/middleware';
import { AdyenClientApi } from './runtime';
const path = require('path')

export interface ModuleOptions extends AdyenConfigOptions {}

const CONFIG_KEY = 'adyen'

const nuxtModule: Module<ModuleOptions> = async function (moduleOptions) {
  const options = {
    ...this.options.adyen,
    ...moduleOptions
  }

  if (!options.clientKey) { throw new Error('[nuxt-adyen-module] property clientKey is required') }
  if (!options.environment) { throw new Error('[nuxt-adyen-module] property environment is required') }
  if (!options.merchantAccount) { throw new Error('[nuxt-adyen-module] property merchantAccount is required') }
  if (!options.returnUrl) { throw new Error('[nuxt-adyen-module] property returnUrl is required') }
  if (!options.origin) { throw new Error('[nuxt-adyen-module] property origin is required') }
  if (!options.checkoutEndpoint) { throw new Error('[nuxt-adyen-module] property checkoutEndpoint is required') }
  if (!options.apiKey) { throw new Error('[nuxt-adyen-module] property apiKey is required') }
  if (!options.channel) { throw new Error('[nuxt-adyen-module] property channel is required') }

  const runtimeDir = path.resolve(__dirname, 'runtime')
  this.nuxt.options.alias['~adyen'] = runtimeDir
  this.nuxt.options.build.transpile.push(runtimeDir)
  this.addServerMiddleware(createMiddleware(options));

  this.addPlugin({
    src: path.resolve(runtimeDir, 'plugin.mjs'),
    fileName: 'adyen.js',
    options: { registerCheckoutComponent: options.registerCheckoutComponent }
  })
}

;(nuxtModule as any).meta = require('../package.json')

declare module '@nuxt/types' {
  interface NuxtConfig {
    [CONFIG_KEY]: ModuleOptions
  } // Nuxt 2.14+
  interface Configuration {
    [CONFIG_KEY]: ModuleOptions
  } // Nuxt 2.9 - 2.13
  interface Context {
    $adyen: AdyenClientApi
  }
}

export default nuxtModule
