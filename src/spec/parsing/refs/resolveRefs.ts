import { OpenAPIV3 } from 'openapi-types'
import { componentsHeadersParameterBaseObjectRefsUpdater }
  from './specializedCases/componentsHeadersParameterBaseObjectRefsUpdater'
import { pathsOperationParametersRefsUpdater } from './specializedCases/pathsOperationParametersRefsUpdater'

import { pathsParametersRefsUpdater } from './specializedCases/pathsParametersRefsUpdater'
import { pathsRequestBodyRefsUpdater } from './specializedCases/pathsRequestBodyRefsUpdater'

const resolveRefs = (spec: OpenAPIV3.Document): OpenAPIV3.Document => {
  const specCopy = spec
  pathsParametersRefsUpdater(spec)
  pathsRequestBodyRefsUpdater(spec)
  pathsOperationParametersRefsUpdater(spec)

  componentsHeadersParameterBaseObjectRefsUpdater(spec)

  return specCopy
}

export { resolveRefs }
