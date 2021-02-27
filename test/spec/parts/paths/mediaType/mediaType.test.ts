import { OpenAPIV3 } from 'openapi-types'

import { mediaType } from 'src/spec/parts/paths/mediaType/mediaType'
import { mocked } from 'ts-jest/utils'
import { properties } from 'src/spec/parts/paths/mediaType/properties'
import { EmptySchemaError } from 'src/spec/parts/paths/mediaType/errors/EmptySchemaError'

jest.mock('src/spec/parts/paths/mediaType/properties')

const propertiesMock = mocked(properties)

// eslint-disable-next-line max-lines-per-function
describe('Generate Media Type', () => {
  afterEach(() => jest.clearAllMocks())

  // eslint-disable-next-line max-lines-per-function
  test('Generate media type with all possible information', () => {
    propertiesMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        title: 'Fancy params',
        description: 'The most fancy params in the world',
        type: 'object',
        required: [
          'paramA',
        ],
        properties: {
          paramA: {},
        },
      },
      example: {
        foo: 'bar',
      },
    }

    const mediaTypeContent = mediaType('application/json', mediaTypeObject)

    expect(propertiesMock).toBeCalledWith(
      { paramA: {} },
      ['paramA'])
    expect(mediaTypeContent).toBe(`## Fancy params (application/json)
The most fancy params in the world

The table

### Fancy params Example

\`\`\`
{
 "foo": "bar"
}
\`\`\``)
  })

  test('Minimum set of information', () => {
    propertiesMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        type: 'object',
        properties: {
          paramA: {},
        },
      },
    }

    const mediaTypeContent = mediaType('application/json', mediaTypeObject)
    expect(mediaTypeContent).toBe(`## (application/json)

The table`)
  })

  test('Media Type Schema is empty', () => {
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {},
    }

    try {
      mediaType('application/json', mediaTypeObject)
    } catch(error) {
      expect(error).toBeInstanceOf(EmptySchemaError)
    }
  })
})
