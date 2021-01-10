/* eslint-disable security/detect-object-injection */
import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'
import { getStringKeys } from '../getStringKeys'
import { isReference } from '../isReference'

const pathsParametersRefsUpdater = (spec: OpenAPIV3.Document): void => {
  const pathNames = getStringKeys(spec.paths)

  pathNames.forEach((pathName) => {
    if(!spec.paths[pathName]?.parameters) { return }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    spec.paths[pathName]!.parameters = spec.paths[pathName]!.parameters?.map((parameter) => {
      if(!isReference(parameter)) { return parameter }
      return fetchReference(
        (parameter as OpenAPIV3.ReferenceObject).$ref,
        spec.components) as OpenAPIV3.ReferenceObject
    })
  })
}

export { pathsParametersRefsUpdater }
