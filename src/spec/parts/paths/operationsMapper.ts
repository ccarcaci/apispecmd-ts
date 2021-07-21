import { OpenAPIV3 } from 'openapi-types'
import { securityMapper } from './securityMapper'
import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'

import { OperationType } from './types/OperationType'

const createOperationType = (
  verb: string,
  path: string,
  security: KeySecuritySchemeType[],
  pathItemObject: OpenAPIV3.PathItemObject,
  specTags?: OpenAPIV3.TagObject[]): OperationType | undefined => {
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
  const parameters = pathItemObject.parameters as OpenAPIV3.ParameterObject[]
  const tags = filterOutTags(operationObject.tags, specTags)

  return {
    verb,
    path,
    summary,
    description,
    parameters,
    security,
    operationObject,
    tags,
  }
}

const operationsMapper = (spec: OpenAPIV3.Document): OperationType[] => {
  const paths = Object.keys(spec.paths)
  const operations = paths.flatMap((path) => {
    // eslint-disable-next-line security/detect-object-injection
    if(!spec.paths[path]) { return [] }

    // eslint-disable-next-line security/detect-object-injection
    const pathItem = spec.paths[path] as OpenAPIV3.PathItemObject
    const specTags = spec.tags

    return [
      createOperationType('GET', path, securityMapper(spec, pathItem.get), pathItem, specTags),
      createOperationType('PUT', path, securityMapper(spec, pathItem.put), pathItem, specTags),
      createOperationType('POST', path, securityMapper(spec, pathItem.post), pathItem, specTags),
      createOperationType('DELETE', path, securityMapper(spec, pathItem.delete), pathItem, specTags),
      createOperationType('OPTIONS', path, securityMapper(spec, pathItem.options), pathItem, specTags),
      createOperationType('HEAD', path, securityMapper(spec, pathItem.head), pathItem, specTags),
      createOperationType('PATCH', path, securityMapper(spec, pathItem.patch), pathItem, specTags),
      createOperationType('TRACE', path, securityMapper(spec, pathItem.trace), pathItem, specTags),
    ].filter((removeUndefinedOnes) => removeUndefinedOnes)
  }) as OperationType[]

  return operations
}

// # ## ### ##### ########

const filterOutTags = (tags?: string[], specTags?: OpenAPIV3.TagObject[]): OpenAPIV3.TagObject[] | undefined => {
  if(tags === undefined) { return }
  if(specTags === undefined) {
    return tags.map((tag) => ({ name: tag }))
  }

  return specTags.filter((specTag) => tags.includes(specTag.name))
}

// # ## ### ##### ########

export { operationsMapper }
