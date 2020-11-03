import { license } from 'src/spec/parts/head/license'

describe('Generate License Part', () => {
  test('No license part provided', () => expect(license()).toBe(''))

  test('Only license name provided', () => expect(license({ name: 'MIT' })).toBe('License: MIT'))

  test('License name and URL provided', () =>
    expect(license({ name: 'MIT', url: 'link.to.mit.license' })).toBe('License: [MIT](link.to.mit.license)'))
})
