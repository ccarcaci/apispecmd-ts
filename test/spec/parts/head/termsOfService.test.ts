import { termsOfService } from 'src/spec/parts/head/termsOfService'

describe('Generate Terms Of Service Part', () => {
  test('Terms of service are missing', () => expect(termsOfService()).toBe(''))

  test('Terms of service provided', () =>
    expect(termsOfService('url.to.terms.of.service')).toBe('[Terms of Service](url.to.terms.of.service)'))
})
