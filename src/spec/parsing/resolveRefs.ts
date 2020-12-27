/* eslint-disable security/detect-object-injection */
import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from './fetchReference'
import { isReference } from './isReference'

const resolveRefs = (spec: OpenAPIV3.Document): OpenAPIV3.Document => {
  const specCopy = spec
  const pathNames = getPathNames(specCopy.paths)

  pathNames.forEach((pathName) => {
    if(!specCopy.paths[pathName].parameters) { return }

    specCopy.paths[pathName].parameters = specCopy.paths[pathName].parameters?.map((parameter) => {
      if(!isReference(parameter)) { return parameter }
      return fetchReference(
        (parameter as OpenAPIV3.ReferenceObject).$ref,
        spec.components) as OpenAPIV3.ReferenceObject
    })
  })

  return specCopy
}

const getPathNames = (paths: OpenAPIV3.PathsObject): string[] => Object.keys(paths)

export { resolveRefs }
