import { OpenAPI } from 'openapi-types'
import { title } from 'src/spec/parts/head/title'

describe('Returns Title Markdown', () => {
  test('Given an OpenAPI spec generate markdown', () => {
    const spec: OpenAPI.Document = {
      info: {
        title: 'My API',
        version: '1.0.0',
      },
    } as unknown as OpenAPI.Document

    expect(title(spec)).toBe('# My API (1.0.0)')
  })
})
