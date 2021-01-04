/* eslint-disable security/detect-object-injection */
import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'
import { getPathNames } from '../getPathNames'
import { isReference } from '../isReference'

const pathsRequestBodyRefsUpdater = (spec: OpenAPIV3.Document): void => {
  if(!spec.components) { return }

  const pathNames = getPathNames(spec.paths)

  pathNames.forEach((pathName) =>
    pathItemRequestBodyRefsUpdater(
      spec.paths[pathName],
      spec.components as OpenAPIV3.ComponentsObject))
}

// eslint-disable-next-line max-lines-per-function
const pathItemRequestBodyRefsUpdater = (
  pathItem: OpenAPIV3.PathItemObject,
  components: OpenAPIV3.ComponentsObject): void => {
  if(isReference(pathItem.get?.requestBody)) {
    pathItem.get = operationObjectRequestBodyRefsResolver(
      (pathItem.get as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.put?.requestBody)) {
    pathItem.put = operationObjectRequestBodyRefsResolver(
      (pathItem.put as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.post?.requestBody)) {
    pathItem.post = operationObjectRequestBodyRefsResolver(
      (pathItem.post as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.delete?.requestBody)) {
    pathItem.delete = operationObjectRequestBodyRefsResolver(
      (pathItem.delete as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.options?.requestBody)) {
    pathItem.options = operationObjectRequestBodyRefsResolver(
      (pathItem.options as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.head?.requestBody)) {
    pathItem.head = operationObjectRequestBodyRefsResolver(
      (pathItem.head as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.patch?.requestBody)) {
    pathItem.patch = operationObjectRequestBodyRefsResolver(
      (pathItem.patch as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem.trace?.requestBody)) {
    pathItem.trace = operationObjectRequestBodyRefsResolver(
      (pathItem.trace as OpenAPIV3.OperationObject),
      components)
  }
}

const operationObjectRequestBodyRefsResolver = (
  operation: OpenAPIV3.OperationObject,
  components: OpenAPIV3.ComponentsObject): OpenAPIV3.OperationObject => {
  const operationCopy = operation
  operationCopy.requestBody = fetchReference(
    (operationCopy.requestBody as OpenAPIV3.ReferenceObject).$ref,
    components) as OpenAPIV3.RequestBodyObject

  return operationCopy
}

export { pathsRequestBodyRefsUpdater }
