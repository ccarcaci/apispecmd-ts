import { renderSecurityScheme } from 'src/spec/parts/paths/renderSecurityScheme'
import { KeySecuritySchemeType } from 'src/spec/parts/paths/types/KeySecuritySchemeType'

describe('Render Different Types of Security Schemes', () => {
  test('HttpSecurityScheme', () => {
    const httpSecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'http',
        description: 'Http authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    }

    expect(renderSecurityScheme(httpSecurityScheme)).toBe(`### petstore_auth security (http)

Http authorization

bearer (JWT)`)
  })

  test('HttpSecurityScheme minimal information', () => {
    const httpSecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'http',
        scheme: 'bearer',
      },
    }

    expect(renderSecurityScheme(httpSecurityScheme)).toBe(`### petstore_auth security (http)

bearer`)
  })
})
