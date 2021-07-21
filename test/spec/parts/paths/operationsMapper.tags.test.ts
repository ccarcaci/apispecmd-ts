import { OpenAPIV3 } from 'openapi-types'

import { operationsMapper } from 'src/spec/parts/paths/operationsMapper'
import { OperationType } from 'src/spec/parts/paths/types/OperationType'

describe('Given an OpenAPI Spec Create Operations Array', () => {
  test('Extract tags information', () => {
    const spec: OpenAPIV3.Document = {
      tags: [
        {
          name: 'pet',
          description: 'Everything about your Pets',
        },
        {
          name: 'store',
          description: 'Access to Petstore orders',
        }
      ],
      paths: {
        '/pet': {
          summary: 'Pet API',
          description: 'Manage your pet',
          get: {
            tags: [
              'pet',
            ],
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    expect(operationsMapper(spec)).toEqual([
      {
        verb: 'GET',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        security: [],
        tags: [
          {
            name: 'pet',
            description: 'Everything about your Pets',
          },
        ],
        operationObject: {
          tags: [
            'pet',
          ],
        },
      } as OperationType,
    ])
  })
})
