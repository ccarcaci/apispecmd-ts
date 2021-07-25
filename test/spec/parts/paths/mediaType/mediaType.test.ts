import { OpenAPIV3 } from 'openapi-types'

import { mediaType } from 'src/spec/parts/paths/mediaType/mediaType'
import { mocked } from 'ts-jest/utils'
import { schema } from 'src/spec/parts/paths/mediaType/schema/schema'
import { EmptySchemaError } from 'src/spec/parts/paths/mediaType/errors/EmptySchemaError'

jest.mock('src/spec/parts/paths/mediaType/schema/schema')

const schemaMock = mocked(schema)

// eslint-disable-next-line max-lines-per-function
describe('Generate Media Type', () => {
  afterEach(() => jest.clearAllMocks())

  // eslint-disable-next-line max-lines-per-function
  test('Generate media type with all possible information', () => {
    schemaMock.mockReturnValue(['The table'])
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

    expect(schemaMock).toBeCalledWith(
      'Properties',
      { paramA: {} },
      ['paramA'])
    expect(mediaTypeContent).toBe(`### Fancy params (application/json)
The most fancy params in the world

The table

#### Fancy params Example

\`\`\`
{
 "foo": "bar"
}
\`\`\``)
  })

  test('Minimum set of information', () => {
    schemaMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        type: 'object',
        properties: {
          paramA: {},
        },
      },
    }

    const mediaTypeContent = mediaType('application/json', mediaTypeObject)
    expect(mediaTypeContent).toBe(`### (application/json)

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

  test('Media Type Schema contains allOf', () => {
    schemaMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        allOf: [
          {
            properties: {
              paramA: {},
              paramB: {},
            },
          },
          {
            properties: {
              paramC: {},
            },
          },
        ],
      },
    }
    const mediaTypeContent = mediaType('application/json', mediaTypeObject)

    expect(mediaTypeContent).toBe(`### all of the tables below (application/json)

The table

The table`)
  })

  test('Media Type Schema contains oneOf', () => {
    schemaMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        oneOf: [
          {
            properties: {
              paramA: {},
              paramB: {},
            },
          },
          {
            properties: {
              paramC: {},
            },
          },
        ],
      },
    }
    const mediaTypeContent = mediaType('application/json', mediaTypeObject)

    expect(mediaTypeContent).toBe(`### one of the tables below (application/json)

The table

The table`)
  })

  test('Media Type Schema contains allOf and other attributes that are ignored', () => {
    schemaMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        type: 'object',
        properties: {
          paramA: {},
        },
        oneOf: [
          {
            properties: {
              paramA: {},
              paramB: {},
            },
          },
          {
            properties: {
              paramC: {},
            },
          },
        ],
      },
    }
    const mediaTypeContent = mediaType('application/json', mediaTypeObject)

    expect(mediaTypeContent).toBe(`### one of the tables below (application/json)

The table

The table`)
  })

  test('Media Type Schema is a binary string', () => {
    schemaMock.mockReturnValue(['The table'])
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        type: 'string',
        format: 'binary',
      },
    }
    const mediaTypeContent = mediaType('application/octet-stream', mediaTypeObject)

    expect(mediaTypeContent).toBe(`### (application/octet-stream)

The table`)
  })
})
