import { OpenAPIV3 } from 'openapi-types'

import { securityMapper } from 'src/spec/parts/paths/securityMapper'

// eslint-disable-next-line max-lines-per-function
describe('Extract Security Specific to Operation', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Global security applies', () => {
    const spec: OpenAPIV3.Document = {
      security: [
        {
          petstore_auth: [
            'write:pets',
            'read:pets',
          ],
        },
        {
          http_auth: [],
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
          http_auth: {
            type: 'http',
            description: 'HTTP authorization',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    const operationObject: OpenAPIV3.OperationObject = {}

    expect(securityMapper(spec, operationObject)).toStrictEqual([
      {
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
      {
        http_auth: {
          type: 'http',
          description: 'HTTP authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    ])
  })

  // eslint-disable-next-line max-lines-per-function
  test('Multiple security restrictions', () => {
    const spec: OpenAPIV3.Document = {
      security: [
        {
          petstore_auth: [
            'write:pets',
            'read:pets',
          ],
          http_auth: [],
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
          http_auth: {
            type: 'http',
            description: 'HTTP authorization',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    const operationObject: OpenAPIV3.OperationObject = {}

    expect(securityMapper(spec, operationObject)).toStrictEqual([
      {
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
        http_auth: {
          type: 'http',
          description: 'HTTP authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    ])
  })

  // test('Apply only a subset of oauth2 scopes')

  // test('Overwrite global security with operation security spec')

  // test('Security disabled for specific operation')

  // test('Security scheme is not listed')
})
