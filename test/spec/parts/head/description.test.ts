import { OpenAPI } from 'openapi-types'

import { description } from 'src/spec/parts/head/description'

describe('Returns Description Markdown', () => {
  test('Given an OpenAPI spec generate markdown', () => {
    const spec= {info: { description: 'My fancy API' }} as unknown as OpenAPI.Document
    expect(description(spec)).toBe('My fancy API')
  })
})
