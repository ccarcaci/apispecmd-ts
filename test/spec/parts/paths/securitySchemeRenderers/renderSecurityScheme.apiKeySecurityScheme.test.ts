import { renderSecurityScheme } from 'src/spec/parts/paths/renderSecurityScheme'
import { KeySecuritySchemeType } from 'src/spec/parts/paths/types/KeySecuritySchemeType'

describe('Render Different Types of Security Schemes', () => {
  test('apiKeySecurityScheme', () => {
    const apiKeySecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'apiKey',
        description: 'ApiKey authorization',
        name: 'api_key',
        in: 'query',
      },
    }

    expect(renderSecurityScheme(apiKeySecurityScheme)).toBe(`### petstore_auth security (apiKey)

ApiKey authorization

query param: api_key`)
  })

  test('apiKeySecurityScheme minimal information', () => {
    const apiKeySecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'apiKey',
        name: 'api_key',
        in: 'query',
      },
    }

    expect(renderSecurityScheme(apiKeySecurityScheme)).toBe(`### petstore_auth security (apiKey)

query param: api_key`)
  })
})
