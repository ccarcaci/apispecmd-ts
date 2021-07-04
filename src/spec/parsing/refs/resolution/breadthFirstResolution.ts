import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'

const breadthFirstResolution = (
  specNode: unknown | unknown[],
  components?: OpenAPIV3.ComponentsObject,
  knownRefs: string[] = []): unknown | unknown[] => {
  if(!components) { return }
  if(Array.isArray(specNode)) {
    specNode = specNode.map((element) => breadthFirstResolution(element, components, knownRefs))
    return specNode
  }
  if(typeof specNode === 'object' && specNode !== null) {
    Object.keys(specNode)
      .forEach((specNodeKey) => {
        if(specNodeKey === '$ref') {
          const $ref = (specNode as OpenAPIV3.ReferenceObject).$ref
          specNode = fetchReference($ref, components)
          knownRefs = [...new Set([ ...knownRefs, $ref ])]
          return
        }

        // eslint-disable-next-line security/detect-object-injection
        (specNode as Record<string, unknown>)[specNodeKey] = breadthFirstResolution(
          // eslint-disable-next-line security/detect-object-injection
          (specNode as Record<string, unknown>)[specNodeKey],
          components,
          knownRefs)
      })
  }

  return specNode
}

export { breadthFirstResolution }
