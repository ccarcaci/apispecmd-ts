import { tags } from 'src/spec/parts/paths/tags'

describe('Generate Operation Tags Markdown', () => {
  test('No tags', () => expect(tags()).toBe(''))

  test('Generate list of tags', () => expect(tags([ 'pet', 'store' ])).toBe(`### Tags

- pet
- store`))
})
