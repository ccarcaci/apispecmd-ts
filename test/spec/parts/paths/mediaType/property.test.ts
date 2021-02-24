import { OpenAPIV3 } from 'openapi-types'

import { properties } from 'src/spec/parts/paths/mediaType/properties'

// eslint-disable-next-line max-lines-per-function
describe('Render Schema Property', () => {
  test('Complete property', () => {
    const propertyObject: OpenAPIV3.SchemaObject = {
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
    }

    const propertyContent = properties(propertyObject, 'paramA', true)

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(propertyContent).toEqual('|paramA|true|integer|int64|42|0|true|4242|true|1|10|nnn|true|true|true|true|')
  })

  test('Minimum set of information', () => {
    const propertyObject = {}
    const propertyContent = properties(propertyObject, 'paramA')

    // eslint-disable-next-line max-len
    // |name|required|type|format|default|minimum|exclusiveMinimum|maximum|exclusiveMaximum|minLength|maxLength|pattern|nullable|readOnly|writeOnly|deprecated|
    expect(propertyContent).toEqual('|paramA|false|||||||||||||||')
  })

  test('Property is an array')
})
