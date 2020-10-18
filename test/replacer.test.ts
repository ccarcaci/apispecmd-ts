import { replacer } from 'src/util/replacer'

describe('Substitute the Placeholders with Specified Variables', () => {
  test('No spaces identity', () => expect(replacer('{{}}')).toBe(''))
  test('Identity', () => expect(replacer('{{ }}')).toBe(''))
  test('No spaces placeholder', () =>
    expect(replacer('{{value.goes.here}}', { key: 'value.goes.here', value: 'eenie' })).toBe('eenie'))
  test('Placeholder', () =>
    expect(replacer('{{ value.goes.here }}', { key: 'value.goes.here', value: 'eenie' })).toBe('eenie'))
  test('Repeat placeholder', () =>
    expect(replacer('{{value.goes.here}} {{value.goes.here}}', { key: 'value.goes.here', value: 'eenie' }))
      .toBe('eenie eenie'))
  test('Mixed text', () =>
    expect(replacer('eenie {{value.meenie}} miny {{value.moe}}',
      [
        { key: 'value.meenie', value: 'meenie' },
        { key: 'value.moe', value: 'moe' },
      ])).toBe('eenie meenie miny moe'))
})
