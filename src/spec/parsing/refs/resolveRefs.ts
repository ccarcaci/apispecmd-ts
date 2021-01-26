import { OpenAPIV3 } from 'openapi-types'
import { breadthFirstResolution } from './resolution/breadthFirstResolution'

const resolveRefs = (spec: OpenAPIV3.Document): void => {
  breadthFirstResolution(spec as unknown, spec.components)
}

export { resolveRefs }
