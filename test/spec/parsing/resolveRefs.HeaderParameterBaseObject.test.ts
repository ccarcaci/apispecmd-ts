import { OpenAPIV3 } from 'openapi-types'

import { resolveRefs } from 'src/spec/parsing/refs/resolveRefs'

describe('Resolve Refs', () => {
  test('Component headers object use $ref in schema attribute', () => {
    const spec: OpenAPIV3.Document = {
      components: {
        headers: {
          MyHeader: {
            schema: {
              $ref: '#/components/headers/MyHeaderSchema',
            },
          },
          MyHeaderSchema: {
            description: 'The header schema',
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    const result = resolveRefs(spec)

    expect(result).toEqual({
      components: {
        headers: {
          MyHeader: {
            schema: {
              description: 'The header schema',
            },
          },
          MyHeaderSchema: {
            description: 'The header schema',
          },
        },
      },
    })
  })
})
