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
  pathItem: OpenAPIV3.PathItemObject | undefined,
  components: OpenAPIV3.ComponentsObject): void => {
  if(isReference(pathItem?.get?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).get = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).get as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.put?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).put = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).put as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.post?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).post = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).post as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.delete?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).delete = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).delete as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.options?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).options = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).options as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.head?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).head = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).head as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.patch?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).patch = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).patch as OpenAPIV3.OperationObject),
      components)
  }
  if(isReference(pathItem?.trace?.requestBody)) {
    (pathItem as OpenAPIV3.PathItemObject).trace = operationObjectRequestBodyRefsResolver(
      ((pathItem as OpenAPIV3.PathItemObject).trace as OpenAPIV3.OperationObject),
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
