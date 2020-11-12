import { OpenAPIV3 } from 'openapi-types'
import { operationsMapper } from 'src/spec/parts/paths/operationsMapper'

import { OperationType } from 'src/spec/parts/paths/types/OperationType'

// eslint-disable-next-line max-lines-per-function
describe('Given an OpenAPI Spec Create Operations Array', () => {
  // eslint-disable-next-line max-lines-per-function
  test('Happy Path', () => {
    const spec: OpenAPIV3.Document = {
      paths: {
        '/pet': {
          summary: 'Pet API',
          description: 'Manage your pet',
          get: { summary: 'Get pet' },
          put: { summary: 'Put pet' },
          post: { summary: 'Post pet' },
          delete: { summary: 'Delete pet :(' },
          options: { summary: 'Options pet' },
          head: { summary: 'Head pet' },
          patch: { summary: 'Patch pet' },
          trace: { summary: 'Trace pet' },
          parameters: [{ name: 'param', in: 'path' }],
        },
        '/store': {
          summary: 'Store API',
          description: 'Pet store',
          get: { summary: 'Get store' },
          put: { summary: 'Put store' },
          post: { summary: 'Post store' },
        },
      },
    } as unknown as OpenAPIV3.Document

    expect(operationsMapper(spec)).toEqual([
      {
        verb: 'GET',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Get pet' },
      } as OperationType,
      {
        verb: 'PUT',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Put pet' },
      } as OperationType,
      {
        verb: 'POST',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Post pet' },
      } as OperationType,
      {
        verb: 'DELETE',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Delete pet :(' },
      } as OperationType,
      {
        verb: 'OPTIONS',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Options pet' },
      } as OperationType,
      {
        verb: 'HEAD',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Head pet' },
      } as OperationType,
      {
        verb: 'PATCH',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Patch pet' },
      } as OperationType,
      {
        verb: 'TRACE',
        path: '/pet',
        summary: 'Pet API',
        description: 'Manage your pet',
        parameters: [{ name: 'param', in: 'path' }],
        operationObject: { summary: 'Trace pet' },
      } as OperationType,
      {
        verb: 'GET',
        path: '/store',
        summary: 'Store API',
        description: 'Pet store',
        operationObject: { summary: 'Get store' },
      } as OperationType,
      {
        verb: 'PUT',
        path: '/store',
        summary: 'Store API',
        description: 'Pet store',
        operationObject: { summary: 'Put store' },
      } as OperationType,
      {
        verb: 'POST',
        path: '/store',
        summary: 'Store API',
        description: 'Pet store',
        operationObject: { summary: 'Post store' },
      } as OperationType,
    ])
  })
})
