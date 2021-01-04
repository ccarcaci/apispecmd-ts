/* eslint-disable security/detect-object-injection */
import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'
import { getPathNames } from '../getPathNames'
import { isReference } from '../isReference'

const pathsParametersRefsUpdater = (spec: OpenAPIV3.Document): void => {
  const pathNames = getPathNames(spec.paths)

  pathNames.forEach((pathName) => {
    if(!spec.paths[pathName].parameters) { return }

    spec.paths[pathName].parameters = spec.paths[pathName].parameters?.map((parameter) => {
      if(!isReference(parameter)) { return parameter }
      return fetchReference(
        (parameter as OpenAPIV3.ReferenceObject).$ref,
        spec.components) as OpenAPIV3.ReferenceObject
    })
  })
}

export { pathsParametersRefsUpdater }
