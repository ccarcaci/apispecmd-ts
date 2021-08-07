import { apiSupport } from 'src/spec/parts/head/apiSupport'

describe('Generate API Support part', () => {
  test('No contact info', () => expect(apiSupport()).toBe(''))

  test('Contact is empty', () => expect(apiSupport({})).toBe(''))

  test('Only name is provided', () => expect(apiSupport({ name: 'Sally' })).toBe('API Support: Sally | '))

  test('Only url is provided', () =>
    expect(apiSupport({ url: 'support.url' })).toBe('API Support: [support.url](support.url) | '))

  test('Only email is provided', () =>
    expect(apiSupport({ email: 'support@eenie' })).toBe('API Support: [support@eenie](support@eenie) | '))

  test('Name and url are provided', () =>
    expect(
      apiSupport({
        name: 'Sally',
        url: 'support.url',
      })
    ).toBe('API Support: Sally [support.url](support.url) | '))

  test('Name, url and email are provided', () =>
    expect(
      apiSupport({
        email: 'support@eenie',
        name: 'Sally',
        url: 'support.url',
      })
    ).toBe('API Support: Sally [support@eenie](support@eenie) [support.url](support.url) | '))
})
