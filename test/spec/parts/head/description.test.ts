import { OpenAPIV3 } from 'openapi-types'

import { description } from 'src/spec/parts/head/description'

describe('Returns Description Markdown', () => {
  test('Given an OpenAPI spec generate markdown', () => {
    const spec= { description: 'My fancy API' } as unknown as OpenAPIV3.InfoObject
    expect(description(spec)).toBe('My fancy API')
  })
})
