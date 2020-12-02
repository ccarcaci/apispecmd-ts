import { renderSecurityScheme } from "src/spec/parts/paths/renderSecurityScheme"
import { KeySecuritySchemeType } from 'src/spec/parts/paths/types/KeySecuritySchemeType'

describe('Render Different Types of Security Schemes', () => {
  test('openIdConnectSecurityScheme', () => {
    const openIdConnectSecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'openIdConnect',
        description: 'OpenIdConnect Authorization',
        openIdConnectUrl: 'http:://open.id.url/authorize',
      },
    }

    expect(renderSecurityScheme(openIdConnectSecurityScheme)).toBe(`### petstore_auth security (openIdConnect)

OpenIdConnect Authorization

OpenId Connect Url: [http:://open.id.url/authorize](http:://open.id.url/authorize)`)
  })

  test('openIdConnectSecurityScheme no description', () => {
    const openIdConnectSecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'openIdConnect',
        openIdConnectUrl: 'http:://open.id.url/authorize',
      },
    }

    expect(renderSecurityScheme(openIdConnectSecurityScheme)).toBe(`### petstore_auth security (openIdConnect)

OpenId Connect Url: [http:://open.id.url/authorize](http:://open.id.url/authorize)`)
  })
})
