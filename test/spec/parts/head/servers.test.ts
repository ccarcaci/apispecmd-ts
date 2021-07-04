import { servers } from 'src/spec/parts/head/servers'

describe('Generate Servers Part', () => {
  test('Given OpenAPI servers part with single server generate markdown', () => {
    const spec = [{ url: 'server-1.com', description: 'The Fancy Server' }]
    expect(servers(spec)).toBe(`# Servers

- The Fancy Server | [server-1.com](server-1.com)`)
  })

  test('Given OpenAPI servers part with multiple servers generate markdown', () => {
    const spec = [
      { url: 'server-1.com', description: 'The Fancy Server' },
      { url: 'server-2.com', description: 'The Best Server' },
    ]
    expect(servers(spec)).toBe(`# Servers

- The Fancy Server | [server-1.com](server-1.com)

- The Best Server | [server-2.com](server-2.com)`)
  })
})
