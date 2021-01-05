import { OpenAPIV3 } from 'openapi-types'
import { securityMapper } from './securityMapper'
import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'

import { OperationType } from './types/OperationType'

const createOperationType = (
  verb: string,
  path: string,
  security: KeySecuritySchemeType[],
  pathItemObject: OpenAPIV3.PathItemObject): OperationType | undefined => {
  const operationObject = verb === 'GET' && pathItemObject.get
    || verb === 'PUT' && pathItemObject.put
    || verb === 'POST' && pathItemObject.post
    || verb === 'DELETE' && pathItemObject.delete
    || verb === 'OPTIONS' && pathItemObject.options
    || verb === 'HEAD' && pathItemObject.head
    || verb === 'PATCH' && pathItemObject.patch
    || verb === 'TRACE' && pathItemObject.trace

  if(!operationObject) { return }

  const summary = pathItemObject.summary
  const description = pathItemObject.description
  const parameters = pathItemObject.parameters

  return {
    verb,
    path,
    summary,
    description,
    parameters,
    security,
    operationObject,
  }
}

const operationsMapper = (spec: OpenAPIV3.Document): OperationType[] => {
  const paths = Object.keys(spec.paths)
  const operations = paths.flatMap((path) => {
    // eslint-disable-next-line security/detect-object-injection
    if(!spec.paths[path]) { return [] }

    // eslint-disable-next-line security/detect-object-injection
    const pathItem = spec.paths[path] as OpenAPIV3.PathItemObject

    return [
      createOperationType('GET', path, securityMapper(spec, pathItem.get), pathItem),
      createOperationType('PUT', path, securityMapper(spec, pathItem.put), pathItem),
      createOperationType('POST', path, securityMapper(spec, pathItem.post), pathItem),
      createOperationType('DELETE', path, securityMapper(spec, pathItem.delete), pathItem),
      createOperationType('OPTIONS', path, securityMapper(spec, pathItem.options), pathItem),
      createOperationType('HEAD', path, securityMapper(spec, pathItem.head), pathItem),
      createOperationType('PATCH', path, securityMapper(spec, pathItem.patch), pathItem),
      createOperationType('TRACE', path, securityMapper(spec, pathItem.trace), pathItem),
    ].filter((removeUndefinedOnes) => removeUndefinedOnes)
  }) as OperationType[]

  return operations
}

export { operationsMapper }
