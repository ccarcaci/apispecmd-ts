import { OpenAPIV3 } from 'openapi-types'

import { mediaType } from 'src/spec/parts/paths/mediaType/mediaType'
import { property } from 'src/spec/parts/paths/mediaType/property'
import { mocked } from 'ts-jest/utils'

jest.mock('src/spec/parts/paths/mediaType/property')

const propertyMock = mocked(property)

// eslint-disable-next-line max-lines-per-function
describe('Generate Media Type', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Generate media type with all possible information', () => {
    propertyMock.mockReturnValue('Hey! Let\'s go!')
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        title: 'Fancy params',
        description: 'The most fancy params in the world',
        type: 'object',
        required: [
          'paramB',
        ],
        properties: {
          paramA: {
            type: 'integer',
            format: 'int64',
            default: 42,
            exclusiveMaximum: true,
            exclusiveMinimum: true,
            maximum: 4242,
            minimum: 0,
            maxLength: 10,
            minLength: 1,
            pattern: 'nnn',
            enum: [ 42, 43, 44 ],
            nullable: true,
            readOnly: true,
            writeOnly: true,
            deprecated: true,
          },
          paramB: {
            type: 'string',
            format: 'date',
          },
        },
      },
      example: {
        foo: 'bar',
      },
    }

    const mediaTypeContent = mediaType('application/json', mediaTypeObject)

    expect(propertyMock).toBeCalledWith('paramA', {
      type: 'integer',
      format: 'int64',
      default: 42,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      maximum: 4242,
      minimum: 0,
      maxLength: 10,
      minLength: 1,
      pattern: 'nnn',
      enum: [ 42, 43, 44 ],
      nullable: true,
      readOnly: true,
      writeOnly: true,
      deprecated: true,
    })
    expect(propertyMock).toBeCalledWith('paramB', {
      type: 'string',
      format: 'date',
    }, true)
    expect(mediaTypeContent).toBe(`## Fancy params (application/json)
The most fancy params in the world

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
Hey! Let's go!
Hey! Let's go!

### Enums

* paramA:
** 42
** 43
** 44

### Fancy params Examples

\`\`\`
{
  foo: 'bar',
}
\`\`\`
`)
  })

  // eslint-disable-next-line max-lines-per-function
  test('Minimum set of information', () => {
    propertyMock.mockReturnValue('Wow!')
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

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
Wow!
`)
  })

  // eslint-disable-next-line max-lines-per-function
  test('Media type is an array of composite properties', () => {
    propertyMock.mockReturnValue('Wow!')
    const mediaTypeObject: OpenAPIV3.MediaTypeObject = {
      schema: {
        type: 'array',
        items: {
          type: 'integer',
          format: 'int64',
          default: 42,
          exclusiveMaximum: true,
          exclusiveMinimum: true,
          maximum: 4242,
          minimum: 0,
          maxLength: 10,
          minLength: 1,
          pattern: 'nnn',
          enum: [ 42, 43, 44 ],
          nullable: true,
          readOnly: true,
          writeOnly: true,
          deprecated: true,
        },
      },
    }

    const mediaTypeContent = mediaType('application/json', mediaTypeObject)

    expect(mediaTypeContent).toBe(`## (application/json)
* Array

Array items type:
|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
Wow!
`)
  })

  test('Nested object properties')
})
