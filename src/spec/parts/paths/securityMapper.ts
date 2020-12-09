import { OpenAPIV3 } from 'openapi-types'
import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'

export type KeySecuritySchemesType = { [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject }

const explodeSecuritySchemes = (
  explodingSecurity?: OpenAPIV3.SecurityRequirementObject[],
  securitySchemes?: KeySecuritySchemesType): KeySecuritySchemeType[] => {
  if(!explodingSecurity) { return [] }
  if(!securitySchemes) { return [] }

  return explodingSecurity.map((securityRequirement) =>
    Object.keys(securityRequirement).reduce((previousValue, securityRequirementKey) => ({
      ...previousValue,
      // eslint-disable-next-line security/detect-object-injection
      [securityRequirementKey]: securitySchemes[securityRequirementKey],
    }), {}))
}

const securityMapper = (
  spec: OpenAPIV3.Document,
  operationObject: OpenAPIV3.OperationObject): KeySecuritySchemesType[] | undefined => {
  let securitySchemes: KeySecuritySchemesType[] = []

  securitySchemes = explodeSecuritySchemes(operationObject.security, spec.components?.securitySchemes)

  if(securitySchemes.length <= 0) {
    securitySchemes = explodeSecuritySchemes(spec.security, spec.components?.securitySchemes)
  }

  return securitySchemes
}

export { securityMapper }
