import { OpenAPIV3 } from 'openapi-types'

import { removeDuplicatedParameters } from 'src/spec/parts/paths/operationsParameters/removeDuplicatedParameters'

// eslint-disable-next-line max-lines-per-function
describe('Remove Duplicates in Operations Parameters', () => {
  test('No path parameters and no operation parameters', () => {
    const pathParameters: OpenAPIV3.ParameterObject[] = []
    const operationParameters: OpenAPIV3.ParameterObject[] = []
    const parameters: OpenAPIV3.ParameterObject[] = removeDuplicatedParameters(pathParameters, operationParameters)
    expect(parameters).toEqual([])
  })

  test('Path parameters and operation parameters are undefined', () => {
    const parameters: OpenAPIV3.ParameterObject[] = removeDuplicatedParameters(undefined, undefined)
    expect(parameters).toEqual([])
  })

  test('No duplicates in path and operation parameter', () => {
    const pathParameters: OpenAPIV3.ParameterObject[] = [
      {
        name: 'pathParam',
        in: 'query',
      },
    ]
    const operationParameters: OpenAPIV3.ParameterObject[] = [
      {
        name: 'operationParam',
        in: 'path',
      },
    ]
    const parameters: OpenAPIV3.ParameterObject[] = removeDuplicatedParameters(pathParameters, operationParameters)
    expect(parameters).toEqual([
      {
        name: 'pathParam',
        in: 'query',
      },
      {
        name: 'operationParam',
        in: 'path',
      },
    ])
  })

  // eslint-disable-next-line max-lines-per-function
  test('A parameter is duplicated', () => {
    const pathParameters: OpenAPIV3.ParameterObject[] = [
      {
        name: 'paramA',
        in: 'query',
      },
      {
        name: 'paramB',
        in: 'query',
      },
    ]
    const operationParameters: OpenAPIV3.ParameterObject[] = [
      {
        name: 'paramA',
        in: 'path',
      },
      {
        name: 'paramB',
        in: 'query',
      },
    ]
    const parameters: OpenAPIV3.ParameterObject[] = removeDuplicatedParameters(pathParameters, operationParameters)
    expect(parameters).toEqual([
      {
        name: 'paramA',
        in: 'query',
      },
      {
        name: 'paramB',
        in: 'query',
      },
      {
        name: 'paramA',
        in: 'path',
      },
    ])
  })
})
