import { tags } from 'src/spec/parts/paths/tags'

describe('Generate Operation Tags Markdown', () => {
  test('No tags', () => expect(tags()).toBe(''))

  test('Generate list of tags, no description', () => expect(tags([
    { name: 'pet' },
    { name: 'store' } ])).toBe(`## Tags

- pet
- store`))

  test('Generate list of tags with description', () => expect(tags([
    {
      name: 'pet',
      description: 'Everything about your Pets',
    },
    {
      name: 'store',
      description: 'Access to Petstore orders',
    } ])).toBe(`## Tags

- pet: Everything about your Pets
- store: Access to Petstore orders`))
})
