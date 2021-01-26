import { OpenAPIV3 } from 'openapi-types'

import { resolveRefs } from 'src/spec/parsing/refs/resolveRefs'

// eslint-disable-next-line max-lines-per-function
describe('Resolve Refs', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Path parameters item object uses ref', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          parameters: [
            { $ref: '#/components/parameters/PetParams' },
          ],
        },
      },
      components: {
        parameters: {
          PetParams: {
            name: 'petName',
            in: 'param',
          },
        },
      },
    } as unknown as OpenAPIV3.Document

    resolveRefs(spec)

    expect(spec).toEqual({
      paths: {
        '/pet': {
          parameters: [
            {
              name: 'petName',
              in: 'param',
            },
          ],
        },
      },
      components: {
        parameters: {
          PetParams: {
            name: 'petName',
            in: 'param',
          },
        },
      },
    })
  })

  test('No paths', () => {
    const spec: OpenAPIV3.Document = {} as unknown as OpenAPIV3.Document

    resolveRefs(spec)

    expect(spec).toEqual({})
  })
})
