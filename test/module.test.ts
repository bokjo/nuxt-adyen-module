import { getNuxt, setupTest } from '@nuxt/test-utils'

describe('module', () => {
  setupTest({
    testDir: __dirname,
    fixture: '../example',
    server: true,
    config: {
      dev: true,
      adyen: {
        locale: 'test',
        environment: 'test',
        clientKey: 'test'
      }
    }
  })

  test('should have config with Adyen options', () => {
    const { locale, environment, clientKey } = (getNuxt().options as any).adyen

    expect(locale).toBeDefined()
    expect(environment).toBeDefined()
    expect(clientKey).toBeDefined()
  })
})
