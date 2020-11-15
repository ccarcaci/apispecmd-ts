import { OpenAPIV3 } from 'openapi-types'

import { OperationType } from './types/OperationType'

const createOperationType = (
  verb: string,
  path: string,
  summary?: string,
  description?: string,
  parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
  // eslint-disable-next-line max-params
  operationObject?: OpenAPIV3.OperationObject): OperationType | undefined => {
  if(!operationObject) { return }

  return {
    verb,
    path,
    summary,
    description,
    parameters,
    operationObject,
  }
}

const operationsMapper = (spec: OpenAPIV3.Document): OperationType[] => {
  const paths = Object.keys(spec.paths)

  const operations = paths.flatMap((path) => {
    // eslint-disable-next-line security/detect-object-injection
    const pathItem = spec.paths[path]

    return [
      createOperationType('GET', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.get),
      createOperationType('PUT', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.put),
      createOperationType('POST', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.post),
      // eslint-disable-next-line max-len
      createOperationType('DELETE', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.delete),
      // eslint-disable-next-line max-len
      createOperationType('OPTIONS', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.options),
      createOperationType('HEAD', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.head),
      createOperationType('PATCH', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.patch),
      createOperationType('TRACE', path, pathItem.summary, pathItem.description, pathItem.parameters, pathItem.trace),
    ].filter((removeUndefinedOnes) => removeUndefinedOnes)
  }) as OperationType[]

  return operations
}

export { operationsMapper }
