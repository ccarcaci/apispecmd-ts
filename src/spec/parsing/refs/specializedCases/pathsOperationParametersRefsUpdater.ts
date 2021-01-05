/* eslint-disable security/detect-object-injection */
import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'
import { getPathNames } from '../getPathNames'
import { isReference } from '../isReference'

const pathsOperationParametersRefsUpdater = (spec: OpenAPIV3.Document): void => {
  if(!spec.components) { return }

  const pathNames = getPathNames(spec.paths)

  pathNames.forEach((pathName) =>
    pathItemOperationParametersRefsUpdater(
      spec.paths[pathName],
      spec.components as OpenAPIV3.ComponentsObject))
}

const pathItemOperationParametersRefsUpdater = (
  pathItem: OpenAPIV3.PathItemObject | undefined,
  components: OpenAPIV3.ComponentsObject): void => {
  if(pathItem?.get?.parameters && pathItem.get.parameters.length > 0) {
    pathItem.get.parameters = operationParametersRefsResolver(pathItem.get.parameters, components)
  }
  if(pathItem?.put?.parameters && pathItem.put.parameters.length > 0) {
    pathItem.put.parameters = operationParametersRefsResolver(pathItem.put.parameters, components)
  }
  if(pathItem?.post?.parameters && pathItem.post.parameters.length > 0) {
    pathItem.post.parameters = operationParametersRefsResolver(pathItem.post.parameters, components)
  }
  if(pathItem?.delete?.parameters && pathItem.delete.parameters.length > 0) {
    pathItem.delete.parameters = operationParametersRefsResolver(pathItem.delete.parameters, components)
  }
  if(pathItem?.options?.parameters && pathItem.options.parameters.length > 0) {
    pathItem.options.parameters = operationParametersRefsResolver(pathItem.options.parameters, components)
  }
  if(pathItem?.head?.parameters && pathItem.head.parameters.length > 0) {
    pathItem.head.parameters = operationParametersRefsResolver(pathItem.head.parameters, components)
  }
  if(pathItem?.patch?.parameters && pathItem.patch.parameters.length > 0) {
    pathItem.patch.parameters = operationParametersRefsResolver(pathItem.patch.parameters, components)
  }
  if(pathItem?.trace?.parameters && pathItem.trace.parameters.length > 0) {
    pathItem.trace.parameters = operationParametersRefsResolver(pathItem.trace.parameters, components)
  }
}

const operationParametersRefsResolver = (
  parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
  components: OpenAPIV3.ComponentsObject): OpenAPIV3.ParameterObject[] => parameters.map((parameter) => {
  if(!isReference(parameter)) { return parameter as OpenAPIV3.ParameterObject }

  const resolvedParameter = fetchReference(
    (parameter as OpenAPIV3.ReferenceObject).$ref,
    components) as OpenAPIV3.ParameterObject
  return resolvedParameter
})

export { pathsOperationParametersRefsUpdater }
