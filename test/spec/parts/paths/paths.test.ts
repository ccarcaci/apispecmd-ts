import { OpenAPIV3 } from 'openapi-types'
import { mocked } from 'ts-jest/utils'

import { operationsMapper } from 'src/spec/parts/paths/operationsMapper'
import { OperationType } from 'src/spec/parts/paths/types/OperationType'
import { paths } from 'src/spec/parts/paths'
import { WriteStream } from 'fs'
import { path } from 'src/spec/parts/paths/path'

jest.mock('src/spec/parts/paths/operationsMapper')
jest.mock('src/spec/parts/paths/path')

const operationsMapperMock = mocked(operationsMapper)
const pathMock = mocked(path)
const writeStreamMock = { write: jest.fn() }

// eslint-disable-next-line max-lines-per-function
describe('Transform OpenAPI Paths to Markdown', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Happy path', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Pet API',
          description: 'Manage your pet',
          get: { summary: 'Get pet' },
          parameters: [{ name: 'param', in: 'path' }],
        },
        '/store': {
          summary: 'Store API',
          description: 'Pet store',
          get: { summary: 'Get store' },
          post: { summary: 'Post store' },
        },
      },
    } as unknown as OpenAPIV3.Document

    operationsMapperMock.mockReturnValue([
      {
        verb: 'GET',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Get pet' },
      } as OperationType,
      {
        verb: 'GET',
        path: '/store',
        summary: 'Store API',
        description: 'Pet store',
        operationObject: { summary: 'Get store' },
      } as OperationType,
      {
        verb: 'POST',
        path: '/store',
        summary: 'Store API',
        description: 'Pet store',
        operationObject: { summary: 'Post store' },
      } as OperationType,
    ])

    paths(writeStreamMock as unknown as WriteStream, spec)

    expect(operationsMapperMock).toBeCalledTimes(1)
    expect(pathMock).toBeCalledTimes(3)
    expect(pathMock).toHaveBeenNthCalledWith(1, {
      verb: 'GET',
      path: '/pet',
      summary: 'Pet API',
      description: 'Manage your pet',
      parameters: [{ name: 'param', in: 'path' }],
      operationObject: { summary: 'Get pet' },
    } as OperationType)
    expect(pathMock).toHaveBeenNthCalledWith(2, {
      verb: 'GET',
      path: '/store',
      summary: 'Store API',
      description: 'Pet store',
      operationObject: { summary: 'Get store' },
    } as OperationType)
    expect(pathMock).toHaveBeenNthCalledWith(3, {
      verb: 'POST',
      path: '/store',
      summary: 'Store API',
      description: 'Pet store',
      operationObject: { summary: 'Post store' },
    } as OperationType)
    expect(writeStreamMock.write).toBeCalledTimes(3)
  })
})
