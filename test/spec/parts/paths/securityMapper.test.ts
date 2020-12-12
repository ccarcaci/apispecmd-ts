/* eslint-disable max-lines */
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

  // eslint-disable-next-line max-lines-per-function
  test('Apply only a subset of oauth2 scopes', () => {
    const spec: OpenAPIV3.Document = {
      security: [
        {
          petstore_auth: [
            'write:pets',
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
              },
            },
          },
        },
      },
    ])
  })

  // eslint-disable-next-line max-lines-per-function
  test('Overwrite global security with operation security spec', () => {
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
          http_auth: {
            type: 'http',
            description: 'HTTP authorization',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    const operationObject: OpenAPIV3.OperationObject = {
      security: [
        { http_auth: [] },
      ],
    }

    expect(securityMapper(spec, operationObject)).toStrictEqual([
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
})
