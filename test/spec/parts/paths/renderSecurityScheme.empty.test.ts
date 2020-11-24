import { renderSecurityScheme } from 'src/spec/parts/paths/renderSecurityScheme'

describe('Render Different Types of Security Schemes', () => {
  test('No security schemes passed', () => {
    expect(renderSecurityScheme({})).toBe('')
  })
})
