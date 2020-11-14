import { OpenAPIV3 } from 'openapi-types'

import { operationsMapper } from 'src/spec/parts/paths/operationsMapper'

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
        operationObject: { summary: 'Get pet' },
      },
    ])
  })
})
