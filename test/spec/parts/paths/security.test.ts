import { OpenAPIV3 } from 'openapi-types'

// eslint-disable-next-line max-lines-per-function
describe('Generate Operation Security Part', () => {
  test('Global security', () => {
    const spec: OpenAPIV3.Document = {
      security: [
        {
          petstore_auth: [
            'write:pets',
            'read:pets',
          ],
        },
      ],
      components: {
        securitySchemes: {
          petstore_auth: {
            type: 'oauth2',
            flows: {
              implicit: {
                authorizationUrl: 'http://example.org/api/oauth/dialog',
                scopes: {
                  'write:pets': 'modify pets in your account',
                  'read:pets': 'read your pets',
                },
              },
            },
          },
        },
      },
    }
  })

  test('Global and operation security mix')

  test('Only operation security')

  test('Security scheme is not listed')
})
