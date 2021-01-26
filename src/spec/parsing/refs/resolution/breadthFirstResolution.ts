import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'

const breadthFirstResolution = (
  specNode: unknown | unknown[],
  components?: OpenAPIV3.ComponentsObject): unknown | unknown[] => {
  if(!components) { return }
  if(Array.isArray(specNode)) {
    specNode = specNode.map((element) => breadthFirstResolution(element, components))
    return specNode
  }
  if(typeof specNode === 'object' && specNode !== null) {
    Object.keys(specNode)
      .forEach((specNodeKey) => {
        if(specNodeKey === '$ref') {
          specNode = fetchReference((specNode as OpenAPIV3.ReferenceObject).$ref, components)
          return
        }

        // eslint-disable-next-line security/detect-object-injection
        (specNode as Record<string, unknown>)[specNodeKey] = breadthFirstResolution(
          // eslint-disable-next-line security/detect-object-injection
          (specNode as Record<string, unknown>)[specNodeKey],
          components)
      })
  }

  return specNode
}

export { breadthFirstResolution }
