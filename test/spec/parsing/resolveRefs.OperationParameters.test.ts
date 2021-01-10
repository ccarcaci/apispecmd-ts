import { OpenAPIV3 } from 'openapi-types'

import { resolveRefs } from 'src/spec/parsing/refs/resolveRefs'

// eslint-disable-next-line max-lines-per-function
describe('Resolve Refs', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Operation Object parameters is a $ref', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            parameters: [
              { $ref: '#/components/parameters/PetParams' },
            ],
          },
        },
      },
      components: {
        parameters: {
          PetParams: {
            name: 'PetParam',
            in: 'header',
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    const result = resolveRefs(spec)

    expect(result).toEqual({
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            parameters: [
              {
                name: 'PetParam',
                in: 'header',
              },
            ],
          },
        },
      },
      components: {
        parameters: {
          PetParams: {
            name: 'PetParam',
            in: 'header',
          },
        },
      },
    })
  })

  // eslint-disable-next-line max-lines-per-function
  test('Leave Operation Object untouched', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            parameters: [
              {
                name: 'PetParam',
                in: 'header',
              },
            ],
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    const result = resolveRefs(spec)

    expect(result).toEqual({
      paths: {
        '/pet': {
          summary: 'Your Pet Operations',
          post: {
            parameters: [
              {
                name: 'PetParam',
                in: 'header',
              },
            ],
          },
        },
      },
    })
  })

  test('No paths', () => {
    const spec: OpenAPIV3.Document = {} as unknown as OpenAPIV3.Document

    const result = resolveRefs(spec)

    expect(result).toEqual({})
  })
})
