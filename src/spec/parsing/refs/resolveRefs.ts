import { OpenAPIV3 } from 'openapi-types'

import { pathsParametersRefsUpdater } from './specializedCases/pathsParametersRefsUpdater'
import { pathsRequestBodyRefsUpdater } from './specializedCases/pathsRequestBodyRefsResolver'

const resolveRefs = (spec: OpenAPIV3.Document): OpenAPIV3.Document => {
  const specCopy = spec
  pathsParametersRefsUpdater(spec)
  pathsRequestBodyRefsUpdater(spec)

  return specCopy
}

export { resolveRefs }
