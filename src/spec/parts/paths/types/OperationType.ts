import { OpenAPIV3 } from 'openapi-types'
import { KeySecuritySchemeType } from './KeySecuritySchemeType'

type OperationType = {
  verb: string,
  path: string,
  summary?: string,
  description?: string,
  parameters?: OpenAPIV3.ParameterObject[],
  security: KeySecuritySchemeType[],
  operationObject: OpenAPIV3.OperationObject,
  tags?: OpenAPIV3.TagObject[],
}

export { OperationType }
