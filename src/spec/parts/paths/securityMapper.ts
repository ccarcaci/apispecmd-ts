import { OpenAPIV3 } from 'openapi-types'
import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'

type ScopesType = { [scope: string]: string }

const extractScopes = (
  securityRequirementScopes: string[],
  securitySchemeScopes: ScopesType): ScopesType => {
  const filteredScopes: ScopesType = Object.keys(securitySchemeScopes)
    .filter((securitySchemeScope) => securityRequirementScopes.includes(securitySchemeScope))
    // eslint-disable-next-line security/detect-object-injection
    .reduce((previousValue, includedSecurityScope) => ({
      ...previousValue,
      // eslint-disable-next-line security/detect-object-injection
      [includedSecurityScope]: securitySchemeScopes[includedSecurityScope],
    }), {})

  return filteredScopes
}

const resolveScopes = (
  securityRequirementScopes: string[],
  securityScheme: OpenAPIV3.SecuritySchemeObject): OpenAPIV3.SecuritySchemeObject => {
  if(securityRequirementScopes.length <= 0) { return securityScheme }
  if(securityScheme.type !== 'oauth2') { return securityScheme }

  const securitySchemeWithFilteredScopes = securityScheme

  if(securitySchemeWithFilteredScopes.flows.implicit) {
    securitySchemeWithFilteredScopes.flows.implicit.scopes = extractScopes(
      securityRequirementScopes,
      securitySchemeWithFilteredScopes.flows.implicit.scopes)
  }
  if(securitySchemeWithFilteredScopes.flows.password) {
    securitySchemeWithFilteredScopes.flows.password.scopes = extractScopes(
      securityRequirementScopes,
      securitySchemeWithFilteredScopes.flows.password.scopes)
  }
  if(securitySchemeWithFilteredScopes.flows.clientCredentials) {
    securitySchemeWithFilteredScopes.flows.clientCredentials.scopes = extractScopes(
      securityRequirementScopes,
      securitySchemeWithFilteredScopes.flows.clientCredentials.scopes)
  }
  if(securitySchemeWithFilteredScopes.flows.authorizationCode) {
    securitySchemeWithFilteredScopes.flows.authorizationCode.scopes = extractScopes(
      securityRequirementScopes,
      securitySchemeWithFilteredScopes.flows.authorizationCode.scopes)
  }

  return securitySchemeWithFilteredScopes
}

const explodeSecuritySchemes = (
  explodingSecurity?: OpenAPIV3.SecurityRequirementObject[],
  securitySchemes?: KeySecuritySchemeType): KeySecuritySchemeType[] => {
  if(!explodingSecurity) { return [] }
  if(!securitySchemes) { return [] }

  return explodingSecurity.map((securityRequirement) =>
    Object.keys(securityRequirement).reduce((previousValue, securityRequirementKey) => ({
      ...previousValue,
      // eslint-disable-next-line security/detect-object-injection
      [securityRequirementKey]: resolveScopes(
        // eslint-disable-next-line security/detect-object-injection
        securityRequirement[securityRequirementKey],
        // eslint-disable-next-line security/detect-object-injection
        securitySchemes[securityRequirementKey]),
    }), {}))
}

const securityMapper = (
  spec: OpenAPIV3.Document,
  operationObject: OpenAPIV3.OperationObject | undefined): KeySecuritySchemeType[] => {
  if(!operationObject) { return [] }
  // No-ref!
  if(spec.components?.securitySchemes?.$ref) { return [] }

  let securitySchemes: KeySecuritySchemeType[] = []

  securitySchemes = explodeSecuritySchemes(
    operationObject.security,
    spec.components?.securitySchemes as KeySecuritySchemeType)

  if(securitySchemes.length <= 0) {
    securitySchemes = explodeSecuritySchemes(
      spec.security,
      spec.components?.securitySchemes as KeySecuritySchemeType)
  }

  return securitySchemes
}

export { securityMapper }
