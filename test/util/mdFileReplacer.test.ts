import { mdFileReplacer } from 'src/util/markdownReplacer'

describe('Markdown Template Replace', () => {
  test('Produce markdown', () =>
    expect(
      mdFileReplacer(
        'test/markdowns/templates/description.md',
        { description: 'This is the best API in the World' }))
      .toBe('Description: This is the best API in the World'))
})
