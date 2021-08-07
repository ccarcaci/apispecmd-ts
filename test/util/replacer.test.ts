import { replacer } from 'src/util/replacer'

// eslint-disable-next-line max-lines-per-function
describe('Substitute the Placeholders with Specified Variables', () => {
  test('No spaces identity', () => expect(replacer('{{}}')).toBe(''))

  test('Identity', () => expect(replacer('{{ }}')).toBe(''))

  test('No spaces placeholder', () =>
    expect(replacer('{{value.goes.here}}', { 'value.goes.here': 'eenie' })).toBe('eenie'))

  test('Placeholder', () => expect(replacer('{{ value.goes.here }}', { 'value.goes.here': 'eenie' })).toBe('eenie'))

  test('Repeat placeholder', () =>
    expect(replacer('{{value.goes.here}} {{value.goes.here}}', { 'value.goes.here': 'eenie' })).toBe('eenie eenie'))
  test('Mixed text', () =>
    expect(
      replacer('eenie {{value.meenie}} miny {{value.moe}}', {
        'value.meenie': 'meenie',
        'value.moe': 'moe',
      })
    ).toBe('eenie meenie miny moe'))

  test('Trim multiple spaces within string', () =>
    expect(
      replacer('{{value.meenie}} {{value.miny}} {{value.moe}}', {
        'value.meenie': 'meenie',
        'value.miny': '',
        'value.moe': 'moe',
      })
    ).toBe('meenie moe'))

  test('Replace empty square brackets', () => expect(replacer('[{{value.eenie}}]', { 'value.eenie': '' })).toBe(''))

  test('Replace empty round brackets', () => expect(replacer('({{value.eenie}})', { 'value.eenie': '' })).toBe(''))

  test('Trim spaces before new lines', () =>
    expect(
      replacer(
        `{{eenie}} {{meenie}}
some content`,
        {
          eenie: 'eenie',
          meenie: '',
        }
      )
    ).toBe(`eenie
some content`))
})
