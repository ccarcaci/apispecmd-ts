import { convertApiSpecToMd } from 'src/convertApiSpecToMd'

describe('Generate Markdown String', () => {
  test('Get string as output', async () => {
    const markdownContent: string | void = await convertApiSpecToMd('openapi/examples/petstore.yaml')

    if (typeof markdownContent !== 'string') {
      throw new Error('Output is not a string')
    }

    expect(markdownContent.length).toBeGreaterThan(0)
  })
})
