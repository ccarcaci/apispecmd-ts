import { OpenAPIV3 } from 'openapi-types'

import { RefUnresolvedError } from './errors/RefUnresolvedError'
import { isReference } from './isReference'

export type CircularDependencyType = {
  circular: string,
}

export type ReusableObjectType = OpenAPIV3.ReferenceObject
| OpenAPIV3.SchemaObject
| OpenAPIV3.ResponsesObject
| OpenAPIV3.ParameterObject
| OpenAPIV3.ExampleObject
| OpenAPIV3.RequestBodyObject
| OpenAPIV3.HeaderObject
| OpenAPIV3.SecuritySchemeObject
| OpenAPIV3.LinkObject
| OpenAPIV3.CallbackObject
| CircularDependencyType

type ComponentObjecType = {
  [key: string]: ReusableObjectType,
}

const fetchReference = (
  $ref: string,
  components?: OpenAPIV3.ComponentsObject,
  knownRefs: string[] = []): ReusableObjectType => {
  if(!$ref.startsWith('#/components/')) { throw new RefUnresolvedError(`Invalid components path: ${$ref}`) }

  const reusableObject = getReusableObject($ref, components, knownRefs)

  if(isReference(reusableObject)) {
    return fetchReference((reusableObject as OpenAPIV3.ReferenceObject).$ref, components, knownRefs)
  }

  return reusableObject
}

// # ## ### ##### ########

const getReusableObject = (
  $ref: string,
  components?: OpenAPIV3.ComponentsObject,
  knownRefs: string[] = []): ReusableObjectType => {
  if(!components) { throw new RefUnresolvedError(`No components specified for reference: ${$ref}`) }
  if(alreadyKnown($ref, knownRefs)) { return { circular: $ref } as CircularDependencyType }

  const pathPieces = $ref.replace('#/components/', '').split('/')

  if(pathPieces.length !== 2) { throw new RefUnresolvedError(`Components path malformed: ${$ref}`) }

  const componentType = pathPieces[0]
  const component = resolveComponentObjectType(componentType, components)
  const reusableObjectName = pathPieces[1]
  // eslint-disable-next-line security/detect-object-injection
  const reusableObject = component[reusableObjectName]

  if(!reusableObject) {
    throw new ReferenceError(`Unable to find component reusable object with name: ${reusableObjectName}`)
  }

  return reusableObject
}

const resolveComponentObjectType = (
  componentType: string,
  components: OpenAPIV3.ComponentsObject): ComponentObjecType => {
  if(componentType === 'schemas' && components.schemas) { return components.schemas }
  if(componentType === 'responses' && components.responses) { return components.responses }
  if(componentType === 'parameters' && components.parameters) { return components.parameters }
  if(componentType === 'examples' && components.examples) { return components.examples }
  if(componentType === 'requestBodies' && components.requestBodies) { return components.requestBodies }
  if(componentType === 'headers' && components.headers) { return components.headers }
  if(componentType === 'securitySchemes' && components.securitySchemes) { return components.securitySchemes }
  if(componentType === 'links' && components.links) { return components.links }
  if(componentType === 'callbacks' && components.callbacks) { return components.callbacks }

  throw new RefUnresolvedError(`Unable to resolve component type: ${componentType}`)
}

const alreadyKnown = ($ref: string, knownRefs: string[] = []): boolean => knownRefs.includes($ref)

// # ## ### ##### ########

export { fetchReference }
