import { title } from 'src/spec/parts/paths/title'
import { OperationType } from 'src/spec/parts/paths/types/OperationType'

// eslint-disable-next-line max-lines-per-function
describe('Returns Operation Title Markdown', () => {
  test('Given an OpenAPI Path object', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
      summary: 'Pet call summary',
      description: 'Your pets will be happy',
      operationObject: {},
    } as unknown as OperationType

    expect(title(spec)).toBe(`# [POST] /pet

Pet call summary

Your pets will be happy`)
  })

  test('No summary, no description', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
      operationObject: {},
    } as unknown as OperationType

    expect(title(spec)).toBe('# [POST] /pet')
  })

  test('No summary', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
      description: 'Your pets will be happy',
      operationObject: {},
    } as unknown as OperationType

    expect(title(spec)).toBe(`# [POST] /pet

Your pets will be happy`)
  })

  test('No description', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
      summary: 'Pet call summary',
      operationObject: {},
    } as unknown as OperationType

    expect(title(spec)).toBe(`# [POST] /pet

Pet call summary`)
  })

  test('OperationId', () => {
    const spec: OperationType = {
      verb: 'POST',
      path: '/pet',
      operationObject: {
        operationId: 'RegisterPet',
      },
    } as unknown as OperationType

    expect(title(spec)).toBe('# [POST] /pet (RegisterPet)')
  })
})
