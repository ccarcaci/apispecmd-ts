import { OpenAPIV3 } from 'openapi-types'

export type KeySecuritySchemesType = { [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SecuritySchemeObject }

const securityMapper = (
  spec: OpenAPIV3.Document,
  operationObject: OpenAPIV3.OperationObject): KeySecuritySchemesType | undefined => {
  operationObject

  return spec.components?.securitySchemes
}

export { securityMapper }
