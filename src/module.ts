import { Module } from '@nuxt/types'
import { AdyenConfigOptions } from './runtime/api';
import { AdyenServerApi } from './runtime/server';
const path = require('path')

export interface ModuleOptions extends AdyenConfigOptions {}

const CONFIG_KEY = 'adyen'

const nuxtModule: Module<ModuleOptions> = async function (moduleOptions) {
  const options = {
    ...this.options.adyen,
    ...moduleOptions
  }

  // if (!options.clientKey) { throw new Error('[nuxt-adyen-module] property clientKey is required') }
  // if (!options.environment) { throw new Error('[nuxt-adyen-module] property environment is required') }

  // const $adyenClient = new AdyenServerApi(options.client);

  const runtimeDir = path.resolve(__dirname, 'runtime')
  this.nuxt.options.alias['~adyen'] = runtimeDir
  this.nuxt.options.build.transpile.push(runtimeDir)

  // Add server plugin
  this.addPlugin({
    src: path.resolve(__dirname, './runtime/plugin.server.mjs'),
    fileName: 'adyen/plugin.server.js',
    options: options.client
  })

  this.addPlugin({
    src: path.resolve(runtimeDir, 'plugin.mjs'),
    fileName: 'adyen.js',
    options: options.checkout
  })

  // module.exports.$adyenClient = $adyenClient
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
    $adyenClient: AdyenServerApi
  }
}

export default nuxtModule
