import { server } from 'src/spec/parts/head/server'

describe('Generate Server Information', () => {
  test('Generate part with just the url', () =>
    expect(server({ url: 'server.url' })).toBe('- [server.url](server.url)'))

  test('Generate server part', () =>
    expect(server({ url: 'server.url', description: 'My fancy server' }))
      .toBe('- My fancy server | [server.url](server.url)'))
})
