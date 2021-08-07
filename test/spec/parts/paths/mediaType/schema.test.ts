/* eslint-disable max-lines */
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
        uniqueItems: true,
        nullable: true,
        readOnly: true,
        writeOnly: true,
        deprecated: true,
      },
    }

    const schemaContent = schema('Properties', schemaObj, ['paramA'])

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(schemaContent).toEqual([
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|true|integer|int64|42|0|true|4242|true|1|10|true|nnn|true|true|true|true|`,
    ])
  })

  test('Minimum set of information', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = { paramA: {} }
    const schemaContent = schema('Properties', schemaObj)

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(schemaContent).toEqual([
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false||||||||||||||||`,
    ])
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
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|string|||||||||||||||
|paramB|false|object (See related table)|||||||||||||||`,
      `#### Properties -> paramB

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramC|false|boolean|||||||||||||||`,
    ])
  })

  test('Enum types', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
      paramA: {
        type: 'number',
        enum: [1, 2, 3],
      },
    }
    const schemaContent = schema('Properties', schemaObj)

    expect(schemaContent).toEqual([
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|number|||||||||||||||

**Enums**

* paramA: [1,2,3]`,
    ])
  })

  test('Property is an array', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
      paramA: {
        type: 'array',
        items: {
          type: 'boolean',
        },
        minItems: 10,
        maxItems: 20,
        uniqueItems: true,
      },
    }
    const schemaContent = schema('Properties', schemaObj)

    expect(schemaContent).toEqual([
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|array of booleans|||||||10|20|true||||||`,
    ])
  })

  test('Property is an array of objects', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
      paramA: {
        type: 'array',
        items: {
          type: 'object',
          required: ['paramB'],
          properties: {
            paramB: { type: 'string' },
            paramC: { type: 'integer' },
          },
        },
      },
    }
    const schemaContent = schema('Properties', schemaObj)

    expect(schemaContent).toEqual([
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|array of objects (See related table)|||||||||||||||`,
      `#### Properties -> paramA array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramB|true|string|||||||||||||||
|paramC|false|integer|||||||||||||||`,
    ])
  })

  // eslint-disable-next-line max-lines-per-function
  test('Property is an array of arrays', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {
      paramA: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['paramC'],
            properties: {
              paramC: { type: 'string' },
              paramD: { type: 'integer' },
            },
          },
        },
      },
    }
    const schemaContent = schema('Properties', schemaObj)

    expect(schemaContent).toEqual([
      `#### Properties

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|array of arrays|||||||||||||||`,
      `#### Properties -> paramA items

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramA|false|array of objects (See related table)|||||||||||||||`,
      `#### Properties -> paramA items -> paramA array

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|` +
        `Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|paramC|true|string|||||||||||||||
|paramD|false|integer|||||||||||||||`,
    ])
  })

  test('Schema has no properties', () => {
    const schemaObj: { [name: string]: OpenAPIV3.SchemaObject } = {}
    const schemaContent = schema('Properties', schemaObj)

    expect(schemaContent).toEqual([])
  })
})
