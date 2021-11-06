import { Module } from '@nuxt/types'
const path = require('path')

type AdyenOptions = {
  locale: string;
  environment: string;
  clientKey: string;
};

export interface ModuleOptions extends Partial<AdyenOptions> {}

const CONFIG_KEY = 'adyen'

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const options = {
    ...this.options.adyen,
    ...moduleOptions
  }

  if (!options.clientKey) { throw new Error('[nuxt-adyen-module] property clientKey is required') }
  if (!options.environment) { throw new Error('[nuxt-adyen-module] property environment is required') }
  if (!options.locale) { throw new Error('[nuxt-adyen-module] property locale is required') }

  this.addPlugin({
    src: path.resolve(__dirname, './runtime/plugin.mjs'),
    fileName: 'nuxt-adyen-module.js',
    options
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
}

export default nuxtModule
