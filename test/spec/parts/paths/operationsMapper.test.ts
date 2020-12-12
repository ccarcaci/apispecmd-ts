import { OpenAPIV3 } from 'openapi-types'

import { operationsMapper } from 'src/spec/parts/paths/operationsMapper'

// eslint-disable-next-line max-lines-per-function
describe('Operations Mapper Edge Cases', () => {
  test('No verbs', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Pet API',
        },
      },
    } as unknown as OpenAPIV3.Document

    expect(operationsMapper(spec)).toEqual([])
  })

  test('No summary and description', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          get: { summary: 'Get pet' },
        },
      },
    } as unknown as OpenAPIV3.Document

    expect(operationsMapper(spec)).toEqual([
      {
        verb: 'GET',
        path: '/pet',
        security: [],
        operationObject: { summary: 'Get pet' },
      },
    ])
  })

  // eslint-disable-next-line max-lines-per-function
  test('Add global security', () => {
    const spec: OpenAPIV3.Document = {
      security: [
        {
          http_auth: [ ],
        },
      ],
      components: {
        securitySchemes: {
          http_auth: {
            type: 'http',
            description: 'HTTP authorization',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      paths: {
        '/pet': {
          get: { summary: 'Get pet' },
        },
      },
    } as unknown as OpenAPIV3.Document

    expect(operationsMapper(spec)).toEqual([
      {
        verb: 'GET',
        path: '/pet',
        operationObject: { summary: 'Get pet' },
        security: [
          {
            http_auth: {
              type: 'http',
              description: 'HTTP authorization',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        ],
      },
    ])
  })
})
