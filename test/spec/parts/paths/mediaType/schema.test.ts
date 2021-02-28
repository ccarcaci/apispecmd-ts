import { OpenAPIV3 } from 'openapi-types'

import { schema } from 'src/spec/parts/paths/mediaType/schema/schema'

// eslint-disable-next-line max-lines-per-function
describe('Render Schema Property', () => {
  test('Complete property', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
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
        nullable: true,
        readOnly: true,
        writeOnly: true,
        deprecated: true,
      },
    }

    const schemaContent = schema('Properties', schemaObj, ['paramA'])

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(schemaContent).toEqual([`### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|true|integer|int64|42|0|true|4242|true|1|10|nnn|true|true|true|true|`])
  })

  test('Minimum set of information', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = { paramA: {} }
    const schemaContent = schema('Properties', schemaObj)

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(schemaContent).toEqual([`### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|||||||||||||||`])
  })

  test('Nested properties', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
      paramA: {
        type: 'string',
      },
      paramB: {
        type: 'object',
        properties: {
          paramC: {
            type: 'boolean',
          },
        },
      },
    }
    const schemaContent = schema('Properties', schemaObj)

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(schemaContent).toEqual([
      `### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|string||||||||||||||
|paramB|false|object (Watch related table)||||||||||||||`,
      `### Properties paramB

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramC|false|boolean||||||||||||||`,
    ])
  })

  test('Enum types', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
      paramA: {
        type: 'number',
        enum: [ 1, 2, 3 ],
      },
    }
    const schemaContent = schema('Properties', schemaObj)

    expect(schemaContent).toEqual([
      `### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|number||||||||||||||

#### Enums

* paramA: [1,2,3]`,
    ])
  })

  test('Property is an array')

  test('allOf/oneOf/anyOf')
})
