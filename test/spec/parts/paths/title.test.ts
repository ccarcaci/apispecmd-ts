import { title } from 'src/spec/parts/paths/title'
import { OperationType } from 'src/spec/parts/paths/types/OperationType'

describe('Returns Operation Title Markdown', () => {
  test('Given an OpenAPI Path object', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
      summary: 'Pet call summary',
      description: 'Your pets will be happy',
    } as unknown as OperationType

    expect(title(spec)).toBe(`## [POST] /pet

Pet call summary

Your pets will be happy`)
  })

  test('No summary, no description', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
    } as unknown as OperationType

    expect(title(spec)).toBe('## [POST] /pet')
  })
})
