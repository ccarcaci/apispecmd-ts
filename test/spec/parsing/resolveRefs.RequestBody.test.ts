import { OpenAPIV3 } from 'openapi-types'

import { resolveRefs } from 'src/spec/parsing/refs/resolveRefs'

// eslint-disable-next-line max-lines-per-function
describe('Resolve Refs', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Operation Object request body is a $ref', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/PetRequestBody',
            },
          },
        },
      },
      components: {
        requestBodies: {
          PetRequestBody: {
            description: 'Your Pet Description',
            content: {
              'application/json': {
                schema: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    resolveRefs(spec)

    expect(spec).toEqual({
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            requestBody: {
              description: 'Your Pet Description',
              content: {
                'application/json': {
                  schema: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
      },
      components: {
        requestBodies: {
          PetRequestBody: {
            description: 'Your Pet Description',
            content: {
              'application/json': {
                schema: {
                  type: 'boolean',
                },
              },
            },
          },
        },
      },
    })
  })

  test('Leave untouched Operation Object', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            requestBody: {
              description: 'Your Pet Description',
              content: {
                'application/json': {
                  schema: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    resolveRefs(spec)

    expect(spec).toEqual(spec)
  })

  test('No paths', () => {
    const spec: OpenAPIV3.Document = {} as unknown as OpenAPIV3.Document

    resolveRefs(spec)

    expect(spec).toEqual({})
  })
})