import { OpenAPIV3 } from 'openapi-types'

import { resolveRefs } from 'src/spec/parsing/resolveRefs'

// eslint-disable-next-line max-lines-per-function
describe('Resolve Refs', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Path item object use ref', () => {
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

    const result = resolveRefs(spec)

    expect(result).toEqual({
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
})
